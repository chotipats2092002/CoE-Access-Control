import Swal from "sweetalert2";

type AlertType = "success" | "error";

interface AlertModalProps {
  type: AlertType;
  title?: string;
  message: string;
}

export const showAlertModal = ({ type, title, message }: AlertModalProps) => {
  Swal.fire({
    icon: type,
    title: title || type.toUpperCase(),
    text: message,
    confirmButtonText: "OK",
  });
};