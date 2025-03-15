import React, { useEffect } from "react";
import Swal, { SweetAlertOptions } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface ModalProps {
  isOpen: boolean;
  iconName?: "success" | "error"| "warning" | null; // Supports SweetAlert2's built-in icon types
  title?:string,
  text?: string;
  previewImage?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm?: () => void;
  onCancel?:() => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  iconName,
  title,
  text,
  previewImage,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
}) => {
  const MySwal = withReactContent(Swal);
  useEffect(() => {
    if (isOpen) {
      const swalOptions: SweetAlertOptions = {
        icon: iconName ? iconName : undefined,
        title: title,
        showCancelButton: !!cancelButtonText,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        confirmButtonColor: "#2354E6",
        cancelButtonColor: "#d33",
      };

      if (previewImage) {
        swalOptions.html = `<div style="text-align:center;">
          <img src="${previewImage}" alt="Preview" style="max-width:100%; margin-bottom:1rem;" />
          ${text ? `<p>${text}</p>` : ""}
        </div>`;
      } else {
        swalOptions.text = text;
      }

      MySwal.fire(swalOptions).then((result) => {
        if (result.isConfirmed && onConfirm) {
          onConfirm();
        } else if (result.dismiss === Swal.DismissReason.cancel && onCancel) {
          onCancel();
        }
      });
    }
  }, [isOpen, MySwal, iconName, title, text, previewImage, confirmButtonText, cancelButtonText, onConfirm, onCancel]);

  return null;
};

export default Modal;