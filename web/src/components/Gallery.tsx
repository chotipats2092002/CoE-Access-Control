import React, { useEffect, useState } from "react";
import getImages from "../services/getImagesService";
import getImageByFilter from "../services/getImageByFilter";
import getImageById from "../services/getImageByIdService";
import Pagination from "./Pagination";

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

  // Using a string for the date input value
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [useFilter, setUseFilter] = useState(false);

  const perPage = 12;

  // Fetch images
  const fetchImages = async () => {
    try {
      setLoading(true);
      let data;
      if (useFilter && selectedDate) {
        // Split the string 'YYYY-MM-DD' into year, month, day
        const [yearStr, monthStr, dayStr] = selectedDate.split("-");
        const year = parseInt(yearStr, 10);
        const month = parseInt(monthStr, 10);
        const day = parseInt(dayStr, 10);

        data = await getImageByFilter(year, month, day);
        // For filtering, assume all matching images are returned at once
        setTotalPages(1);
      } else {
        // No filter → use pagination
        data = await getImages(currentPage, perPage);
        setTotalPages(data.pages);
      }

      // data can be an array (from /filter) or an object (from /images)
      const imagesFromData = Array.isArray(data) ? data : data.images;

      // Convert each item to a blob URL
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

  // Run fetchImages when currentPage, useFilter, or selectedDate changes
  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, useFilter, selectedDate]);

  // Automatically update filtering on date change
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
          className="border p-2 rounded-xl"
        />
        {/* Optional: a clear button for convenience */}
        {selectedDate && (
          <button
            onClick={() => {
              setSelectedDate("");
              setUseFilter(false);
              setCurrentPage(1);
            }}
            className="bg-sky-500 text-white w-26 h-10 px-3 py-1 rounded cursor-pointer hover:bg-sky-700"
          >
            Show all
          </button>
        )}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {loading ? (
          // Display Tailwind skeleton loaders while images are loading
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
          // If not loading and no images, show a "no image" message
          <p className="col-span-full text-center text-gray-500">
            No image today
          </p>
        ) : (
          images.map((image) => (
            <div
              key={image.id}
              className="border rounded-lg overflow-hidden cursor-pointer"
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

      {/* Pagination (only if not filtering and not loading) */}
      {!useFilter && !loading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      
    </div>
  );
};

export default Gallery;
