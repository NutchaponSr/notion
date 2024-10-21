"use client";

import { SuccessModal } from "@/features/contact-admins/components/success-modal";
import { useEffect, useState } from "react"; 

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SuccessModal />
    </>
  );
} 