import React from "react";

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  children : React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
      <div className="modal-box text-xl font-bold">
        {children}
        <div className="modal-footer py-4">
          <label onClick={() => setModalOpen(false)} className="btn">
            Close!
          </label>
        </div>
      </div>
    </div>
  );
};

export default Modal;
