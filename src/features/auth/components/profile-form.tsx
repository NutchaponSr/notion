import { Loader, XIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useEdgeStore } from "@/lib/edgestore";

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { Hint } from "@/components/hint";

import { useUpdateProfile } from "@/features/auth/api/use-update-profile";

export const ProfileForm = () => {
  const { data, update } = useSession();
  const { edgestore } = useEdgeStore();
  const updateProfile = useUpdateProfile();

  const id = data?.user.id ?? "";
  const username = data?.user.name ?? "";
  const imageUrl = data?.user.image ?? "";

  const [name, setName] = useState<string>(username);
  const [image, setImage] = useState<string>(imageUrl);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [tempImageUrl, setTempImageUrl] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };
  
  const deleteImage = useCallback(async (urlToDelete: string) => {
    if (!urlToDelete) return;
    
    try {
      await edgestore.publicFiles.delete({
        url: urlToDelete,
      });
    } catch (error) {
      console.error('Failed to delete image:', error);
    }
  }, [edgestore.publicFiles]);
  
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setUploading(true);
      if (tempImageUrl) {
        await deleteImage(tempImageUrl);
      }
      const res = await edgestore.publicFiles.upload({
        file,
      });
      
      setTempImageUrl(res.url);
      setPreviewImage(res.url);
    } finally {
      setUploading(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;

    if (image && previewImage && image !== previewImage) {
      await deleteImage(image);
    }

    await updateProfile.mutateAsync({
      param: { id },
      json: {
        name,
        image: previewImage || image,
      },
    }, {
      onSuccess: async () => {
        await update();
      }
    });
    
    setImage(previewImage || image);
    setPreviewImage("");
    setTempImageUrl("");
  };


  const handleRemoveImage = async () => {
    if (tempImageUrl) {
      await deleteImage(tempImageUrl);
      setTempImageUrl("");
    }
    setPreviewImage("");
  };
  
  useEffect(() => {
    return () => {
      if (tempImageUrl) {
        deleteImage(tempImageUrl).catch(console.error);
      }
    };
  }, [deleteImage, tempImageUrl]);

  return (

    <form onSubmit={handleSubmit} className="flex items-center justify-between">
      <div className="flex flex-row items-center space-x-5">

        <div className="relative flex items-center justify-center">
          {uploading ? (
            <Loader className="size-8 animate-spin text-[#37352fa6]" />
          ) : (
            <Hint label="Replace photo" side="bottom">
              <div className="relative flex items-center justify-center border border-[#e3e2e0] rounded-full group cursor-pointer">
                <Avatar className="size-[60px]" onClick={handleAvatarClick}>
                  <AvatarImage src={previewImage || image} className="object-cover" />
                  <AvatarFallback className="size-[60px] bg-[#2383e2] text-white text-2xl font-semibold">
                    {name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <input 
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={updateProfile.isPending}
                />
                {(previewImage) && (
                  <button type="button" onClick={handleRemoveImage} className="absolute hidden group-hover:block right-0 top-0 bg-white p-0.5 rounded-full shadow-[0_0_0_1px_rgba(15,15,15,0.1),0_2px_4px_rgba(15,15,15,0.1)] hover:bg-[#e3e2e0]">
                    <XIcon className="size-3 text-[#7c7c78]" />
                  </button>
                )}
              </div>
            </Hint>
          )}
        </div>
        <div className="w-[250px]">
          <Label htmlFor="name" className="text-xs text-[#37352fa6]">
            Preferred name
          </Label>
          <input 
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="max-w-full w-full whitespace-pre-wrap break-words grow text-sm py-1 px-2.5 rounded-sm shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] bg-[#f2f1ee99] focus-visible:outline-none text-[#37352f]"
          />
        </div>
      </div>
      <Button 
        size="md"
        type="submit"
        variant="primary"
      >
        Save changes
      </Button>
    </form>
  );
}