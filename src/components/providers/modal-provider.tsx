"use client";

import { useEffect, useState } from "react"; 

import { SettingsModal } from "@/components/settings-modal";

import { SearchCommand } from "@/features/search/components/search-command";
import { SuccessModal } from "@/features/contact-admins/components/success-modal";
import { ChangePasswordModal } from "@/features/auth/components/change-password-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SuccessModal />
      <SettingsModal />
      <SearchCommand />
      <ChangePasswordModal />
    </>
  );
} 