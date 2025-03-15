import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-4 space-x-3">
  <button 
    className="px-4 py-2 border rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 focus:outline-none
               disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:border-gray-200 disabled:shadow-none
               bg-[#2354E6] text-white cursor-pointer hover:bg-[#1a3eb8] hover:shadow-md active:scale-95 shadow-sm"
    onClick={() => onPageChange(currentPage - 1)}
    disabled={currentPage <= 1}
  >
    Previous
  </button>
  
  <span className="px-4 py-2 border border-gray-200 rounded-lg bg-white shadow-sm font-medium text-gray-700">
    {currentPage} / {totalPages}
  </span>
  
  <button 
    className="px-4 py-2 border rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 focus:outline-none
               disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:border-gray-200 disabled:shadow-none
               bg-[#2354E6] text-white cursor-pointer hover:bg-[#1a3eb8] hover:shadow-md active:scale-95 shadow-sm"
    onClick={() => onPageChange(currentPage + 1)}
    disabled={currentPage >= totalPages}
  >
    Next
  </button>
</div>
  );
};

export default Pagination;
