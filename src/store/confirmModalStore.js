import { create } from "zustand";

const useConfirmModalStore = create((set) => ({
  isOpen: false,
  message: "",
  onConfirm: null,

  openModal: ({ message, onConfirm }) =>
    set({
      isOpen: true,
      message,
      onConfirm,
    }),

  closeModal: () =>
    set({
      isOpen: false,
      message: "",
      onConfirm: null,
    }),
}));

export default useConfirmModalStore;
