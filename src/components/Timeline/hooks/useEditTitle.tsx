import { useCallback, useRef, useState } from "react";
import { Event } from "../types";

export function useEditTitle() {
  const event = useRef<Event | null>(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const openEditModal = useCallback((eventToEdit: Event) => {
    event.current = eventToEdit;
    setIsOpen(true);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    event.current = null;
  };

  const confirm = useCallback((value: string) => {
    if (event.current) {
      event.current.name = value;

      event.current = null;
    }

    closeModal();
  }, []);

  return {
    openEditModal,
    modalIsOpen,
    event,
    closeModal,
    confirm
  };
}
