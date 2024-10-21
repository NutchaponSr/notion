"use client";

import { z } from "zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { departments, positions } from "@/db/schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { RequestSchema } from "@/features/contact-admins/schemas";

import { useRequest } from "@/features/contact-admins/api/use-request";
import { useRequestModal } from "@/features/contact-admins/hooks/use-request-modal";

type Request = z.infer<typeof RequestSchema>;

export const ContactForm = () => {
  const { onOpen } = useRequestModal();
  const { mutate: request, isPending } = useRequest();

  const form = useForm<Request>({
    resolver: zodResolver(RequestSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      position: "",
      description: ""
    }
  });

  const onSubmit = (value: Request) => {
    request({ json: value }, {
      onSuccess: () => {
        form.reset();
        onOpen();
      }
    });
  }

  return (
    <Form {...form}>
      <form 
        className="flex flex-col gap-7"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex gap-x-7 justify-between">
          <FormField 
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>First name
                  <span className="ml-1 text-[#0009]">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field}
                    type="text"
                    placeholder="Ada"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Last name
                  <span className="ml-1 text-[#0009]">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field}
                    type="text"
                    placeholder="Lovelace"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField 
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work email
                <span className="ml-1 text-[#0009]">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  type="email"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-x-7 justify-between">
          <FormField 
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Department
                  <span className="ml-1 text-[#0009]">*</span>
                </FormLabel>
                <Select 
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {departments.enumValues.map((department) => (
                      <SelectItem key={department} value={department}>
                        {department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Position
                  <span className="ml-1 text-[#0009]">*</span>
                </FormLabel>
                <Select 
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {positions.enumValues.map((position) => (
                      <SelectItem key={position} value={position}>
                        {position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <FormField 
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Provide more detail (optional)</FormLabel>
              <FormControl>
                <Textarea 
                  {...field}
                  value={field.value ?? ""}
                  placeholder="How are you looking to use Notion?"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-fit" size="lg" disabled={isPending}>
          {isPending && <Loader className="size-4 animate-spin" />}
          Contact admins
        </Button>
      </form>
    </Form>
  );
}