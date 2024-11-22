import { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import { Event } from "../types";

type EditTitleModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  confirm: (value: string) => void;
  event: Event | null;
};

export function EditTitleModal({ isOpen, confirm, closeModal, event }: EditTitleModalProps) {
  const [value, setValue] = useState(event?.name || "");

  useEffect(() => {
    if (event && !value) {
      setValue(event.name);
    }
  }, [event, value]);

  const onConfirm = useCallback(() => {
    confirm(value);
    setValue("");
  }, [confirm, value]);

  const onClose = useCallback(() => {
    setValue("");
    closeModal();
  }, [closeModal]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white p-6 rounded-lg shadow-lg max-w-[400px] max-h-[300px] align-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="flex flex-col">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventNameInpt">
            Edit Name
          </label>

          <input
            id="eventNameInpt"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </div>

        <div className="flex h-full justify-end gap-4">
          <button
            className="px-4 py-2 bg-grey-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-300 text-white rounded hover:bg-green-600"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}
