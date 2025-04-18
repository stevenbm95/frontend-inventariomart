import React from "react";
import useConfirmModalStore from "../store/confirmModalStore";

const ConfirmModal = () => {
  const { isOpen, message, onConfirm, closeModal } = useConfirmModalStore();

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirmación</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={closeModal}>
            Cancelar
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              onConfirm?.();
              closeModal();
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
