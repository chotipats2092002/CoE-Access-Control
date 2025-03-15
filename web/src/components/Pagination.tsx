import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-4 space-x-2">
      <button 
        className="px-3 py-1 border rounded disabled:bg-gray-400 bg-[#2354E6] text-white cursor-pointer hover:bg-[#237ee6]"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Previous
      </button>
      
      <span className="px-3 py-1 border border-gray-200 rounded bg-white">{currentPage} / {totalPages}</span>
      
      <button 
        className="px-3 py-1 border rounded disabled:bg-gray-400 bg-[#2354E6] text-white cursor-pointer hover:bg-[#237ee6]"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
