import React, { useEffect, useState } from "react";
import getImages from "../services/getImagesService"
import Pagination from "./Pagination";
import getImageById from "../services/getImageByIdService";

interface ImageType {
  id: number;
  url: string;
  filename: string;
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 12; // แสดง 12 รูปต่อหน้า

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getImages(currentPage, perPage);
        console.log("Image data =>", data);
        // const urlList:string[] = []
        const updatedData = await Promise.all(data.images.map(async (image:ImageType) => {
          const imageUrl = await getImageById(image.id)
          // urlList.push(imageUrl)
          return {...image, url: imageUrl}
        })) 


        // console.log(data.images);
        // setBlobUrls(urlList)
        console.log(updatedData);
        setImages(updatedData);
        setTotalPages(data.pages);
      } catch (error) {
        console.error("Failed to load images", error);
      }
    };

    fetchImages();

 
  }, [currentPage]); // ดึงข้อมูลใหม่เมื่อเปลี่ยนหน้า

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Image Gallery</h1>
      
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {images.map(  (image) => (
          <div  className="border rounded-lg overflow-hidden">
            <img src={ image.url } alt={image.filename} className="w-full h-48 object-cover" />
            <p className="text-center p-2">{image.filename}</p>
          </div>
        ))}
      </div>

      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
};

export default Gallery;
