import { useQueryState, parseAsBoolean } from "nuqs";

export const useChangePassword = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "change-password",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return {
    isOpen,
    onOpen,
    onClose,
  }
}