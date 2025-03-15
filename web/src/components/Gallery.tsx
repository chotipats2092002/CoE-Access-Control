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
    <div className="container mx-auto p-4">
      {/* Filter Controls */}
      <div className="flex items-center gap-4 mb-4 flex-row-reverse justify-start">
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="border p-2 rounded"
        />
        {selectedDate && (
          <button
            onClick={() => {
              setSelectedDate("");
              setUseFilter(false);
              setCurrentPage(1);
            }}
            className="bg-[#2354E6] text-white w-26 h-10 px-3 py-1 rounded cursor-pointer hover:bg-white hover:text-[#2354E6]"
          >
            Show all
          </button>
        )}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {loading ? (
          // ... Skeleton Loading ...
          Array.from({ length: perPage }).map((_, index) => (
            <div key={index} className="animate-pulse border rounded-lg">
              {/* ... */}
            </div>
          ))
        ) : images.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No image today
          </p>
        ) : (
          images.map((image, index) => (
            <div
              key={image.id}
              className="border rounded-lg overflow-hidden cursor-pointer"
              onClick={() => handleImageClick(index)}
            >
              <img
                src={image.url}
                alt={image.filename}
                className="w-full h-48 object-cover"
              />
              <p className="text-center p-2">{image.filename}</p>
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
  );
};

export default Gallery;
