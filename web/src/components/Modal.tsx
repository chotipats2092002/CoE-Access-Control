import React, { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface ModalProps {
  isOpen: boolean;
  iconName?: "success" | "error"| "warning"; // Supports SweetAlert2's built-in icon types
  title?:string,
  text?: string;
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
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
}) => {
  const MySwal = withReactContent(Swal);
oncancel
  useEffect(() => {
    if (isOpen) {
      MySwal.fire({
        icon: iconName,
        title: title,
        text: text,
        showCancelButton: !!cancelButtonText,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        confirmButtonColor:  "#1E88E5",
        cancelButtonColor: "#d33",  
      }).then((result) => {
        if (result.isConfirmed && onConfirm) {
            onConfirm();
        }else if(result.dismiss === Swal.DismissReason.cancel && onCancel){
            onCancel();
        }
      });
    }
  }, [isOpen]);

  return null;
};

export default Modal;