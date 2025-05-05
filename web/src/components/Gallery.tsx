import React, { useEffect, useState } from "react";
import getImages from "../services/getImagesService";
import getImageByFilter from "../services/getImageByFilter";
import getImageById from "../services/getImageByIdService";
import Pagination from "./Pagination";

// <-- Import DriveStyleModal ตามตำแหน่งไฟล์ของคุณ
import DriveStyleModal from "./DriveStyleModal";

interface ImageType {
  id: number;
  url: string;
  filename: string;
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [useFilter, setUseFilter] = useState(false);

  // state สำหรับ Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const perPage = 12;

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(null);
  };

  const handlePrevImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (
      selectedImageIndex !== null &&
      selectedImageIndex < images.length - 1
    ) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const fetchImages = async () => {
    try {
      setLoading(true);
      let data;
      if (useFilter && selectedDate) {
        const [yearStr, monthStr, dayStr] = selectedDate.split("-");
        const year = parseInt(yearStr, 10);
        const month = parseInt(monthStr, 10);
        const day = parseInt(dayStr, 10);

        data = await getImageByFilter(year, month, day);
        setTotalPages(1);
      } else {
        data = await getImages(currentPage, perPage);
        setTotalPages(data.pages);
      }

      const imagesFromData = Array.isArray(data) ? data : data.images;
      const updatedData = await Promise.all(
        imagesFromData.map(async (image: ImageType) => {
          const imageUrl = await getImageById(image.id);
          return { ...image, url: imageUrl };
        })
      );

      setImages(updatedData);
    } catch (error) {
      console.error("Failed to load images", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, useFilter, selectedDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedDate(value);
    setCurrentPage(1);
    if (value) {
      setUseFilter(true);
    } else {
      setUseFilter(false);
    }
  };

  return (
    <>
    <style>{`
      /* ซ่อน placeholder ของ input type="date" เมื่อยังไม่มีค่า (invalid) */
      input[type="date"]:invalid::-webkit-datetime-edit-text,
      input[type="date"]:invalid::-webkit-datetime-edit-month-field,
      input[type="date"]:invalid::-webkit-datetime-edit-day-field,
      input[type="date"]:invalid::-webkit-datetime-edit-year-field {
        color: transparent;
      }
      /* เมื่อมีค่าแล้ว (valid) ให้แสดงผลตามปกติ */
      input[type="date"]:valid::-webkit-datetime-edit-text,
      input[type="date"]:valid::-webkit-datetime-edit-month-field,
      input[type="date"]:valid::-webkit-datetime-edit-day-field,
      input[type="date"]:valid::-webkit-datetime-edit-year-field {
        color: inherit;
      }
    `}</style>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Image Gallery</h1>
      {/* Filter Controls */}
      <div className="flex flex-row sm:flex-row justify-end items-center gap-2 sm:gap-4 mb-4">
        <div className="relative inline-block">
          <input
            type="date"
            required
            value={selectedDate}
            onChange={handleDateChange}
            className="border p-2 rounded w-full sm:w-auto min-w-[160px]"
          />
          {!selectedDate && (
            <span className="absolute left-3 top-2 text-gray-400 pointer-events-none">
              Select Date
            </span>
          )}
        </div>

        {selectedDate && (
          <button
            onClick={() => {
              setSelectedDate("");
              setUseFilter(false);
              setCurrentPage(1);
            }}
            className="bg-[#2354E6] text-white px-4 py-2 rounded cursor-pointer 
                 hover:bg-white hover:text-[#2354E6] hover:border hover:border-[#2354E6]"
          >
            Clear
          </button>
        )}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {loading ? (
          // ... Skeleton Loading ...
          Array.from({ length: perPage }).map((_, index) => (
            <div
              key={index}
              role="status"
              className="space-y-2 animate-pulse border rounded-lg overflow-hidden"
            >
              <div className="flex items-center justify-center w-full h-48 bg-gray-300 dark:bg-gray-700">
                <svg
                  className="w-12 h-12 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 640 512"
                >
                  <path d="M0 96C0 60.7 28.7 32 64 32H576C611.3 32 640 60.7 640 96V416C640 
                  451.3 611.3 480 576 480H64C28.7 480 0 451.3 0 416V96zM384 320H544V192H384V320zM96 
                  208C96 216.8 103.2 224 112 224H320C328.8 224 336 216.8 336 208C336 199.2 328.8 
                  192 320 192H112C103.2 192 96 199.2 96 208zM112 288C103.2 288 96 295.2 96 304C96 
                  312.8 103.2 320 112 320H224C232.8 320 240 312.8 240 304C240 295.2 232.8 288 224 
                  288H112z"></path>
                </svg>
              </div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 w-3/4 mx-2"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 w-2/3 mx-2"></div>
              <span className="sr-only">Loading...</span>
            </div>
          ))
        ) : images.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No image
          </p>
        ) : (
          images.map((image, index) => (
            <div
              key={image.id}
              className="p-2 rounded-lg overflow-hidden cursor-pointer bg-gray-100 flex flex-col gap-2 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
              onClick={() => handleImageClick(index)}
            >
              <img
                src={image.url}
                alt={image.filename}
                className="w-full h-48 object-cover rounded-sm"
              />
              <p className="text-center">{image.filename}</p>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {!useFilter && !loading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Modal Preview แบบ Google Drive */}
      <DriveStyleModal
        isOpen={isModalOpen}
        previewImage={
          selectedImageIndex !== null ? images[selectedImageIndex].url : ""
        }
        title={
          selectedImageIndex !== null ? images[selectedImageIndex].filename : ""
        }
        onClose={handleCloseModal}
        onPrev={handlePrevImage}
        onNext={handleNextImage}
        showPrevButton={selectedImageIndex !== null && selectedImageIndex > 0}
        showNextButton={
          selectedImageIndex !== null &&
          selectedImageIndex < images.length - 1
        }
      />
    </div>
    </>
  );
};

export default Gallery;
