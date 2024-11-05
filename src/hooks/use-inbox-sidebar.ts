import { useQueryState, parseAsBoolean } from "nuqs";

export const useInboxSidebar = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "inbox",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false); 
  const toggle = () => setIsOpen(!isOpen);

  return {
    isOpen,
    open,
    close,
    toggle
  }
}