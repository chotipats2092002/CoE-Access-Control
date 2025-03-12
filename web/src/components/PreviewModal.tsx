import Swal from "sweetalert2";

interface PreviewModalProps {
  image: string;
  onConfirm: () => void;
}

export const showPreviewModal = ({ image, onConfirm }: PreviewModalProps) => {
  Swal.fire({
    title: "Preview Image",
    html: `<img src="${image}" alt="Captured preview" style="max-height:70vh; width:auto;"/>`,
    showCancelButton: true,
    confirmButtonText: "Upload",
    cancelButtonText: "Try Again",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    }
  });
};