import React, { useEffect, useState } from "react";
import getImages from "../services/getImagesService";
import Pagination from "./Pagination";
import getImageById from "../services/getImageByIdService";
import ModalTest from "./ModalTest";

interface ImageType {
  id: number;
  url: string;
  filename: string;
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const perPage = 12;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getImages(currentPage, perPage);
        const updatedData = await Promise.all(data.images.map(async (image: ImageType) => {
          const imageUrl = await getImageById(image.id);
          return { ...image, url: imageUrl };
        }));
        setImages(updatedData);
        setTotalPages(data.pages);
      } catch (error) {
        console.error("Failed to load images", error);
      }
    };

    fetchImages();
  }, [currentPage]);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Image Gallery</h1>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {images.map((image) => (
          <div key={image.id} className="border rounded-lg overflow-hidden" onClick={() => handleImageClick(image.url)}>
            <img src={image.url} alt={image.filename} className="w-full h-48 object-cover" />
            <p className="text-center p-2">{image.filename}</p>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <ModalTest isOpen={!!selectedImage} onClose={closeModal} imageUrl={selectedImage || ""} />
    </div>
  );
};

export default Gallery;