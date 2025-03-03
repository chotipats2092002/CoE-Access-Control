import React from "react";

// กำหนด Props สำหรับ Pagination
interface PaginationProps {
  totalImages: number;
  imagesPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalImages, imagesPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalImages / imagesPerPage);

  return (
    <div className="flex justify-center items-center mt-4 space-x-2">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        &lt;
      </button>

      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index + 1}
          onClick={() => setCurrentPage(index + 1)}
          className={`px-3 py-1 border rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white"}`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
