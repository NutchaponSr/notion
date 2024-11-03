import { KeyboardType } from "@/types";
import { useCallback, useEffect } from "react";

export const useKeyboard = (shortcuts: KeyboardType[]) => {
  const handleKey = useCallback((event: KeyboardEvent) => {
    shortcuts.forEach(shortcuts => {
      const isCtrl = shortcuts.ctrl ? (event.ctrlKey || event.metaKey) : true;
      const isMeta = shortcuts.meta ? event.metaKey : true;

      if (isCtrl && isMeta && event.key === shortcuts.key) {
        event.preventDefault();
        shortcuts.action();
      }
    });
  }, [shortcuts])

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return (() => {
      document.removeEventListener("keydown", handleKey);
    })
  }, [handleKey]);
}