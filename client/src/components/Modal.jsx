import React, { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./Button";


export const Modal = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-dialog">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </Button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};
