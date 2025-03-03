import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";

// ประเภทของรูปภาพ
interface Image {
  id: number;
  url: string;
  date: string;
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [filteredImages, setFilteredImages] = useState<Image[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const imagesPerPage = 12;

  // จำลองการโหลดข้อมูล
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const fetchedImages: Image[] = Array.from({ length: 100 }).map((_, index) => ({
        id: index + 1,
        url: `https://media.discordapp.net/attachments/1204409536388272150/1319316709965824150/458338790_1043268680917923_6910155064228869957_n.png?ex=67c66b2f&is=67c519af&hm=7db97b7b63838f57bb412928b37b298b99c96a28d948412cece633b9e77080a2&=&format=webp&quality=lossless&width=800&height=479`,
        date: `2024-02-${String((index % 28) + 1).padStart(2, "0")}`,
      }));

      setImages(fetchedImages);
      setFilteredImages(fetchedImages);
      setLoading(false);
    }, 1500);
  }, []);

  // ฟังก์ชัน filter ตามวันที่
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    setSelectedDate(date);
    if (date === "") {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter((img) => img.date === date));
    }
    setCurrentPage(1);
  };

  // คำนวณรูปที่ต้องแสดงต่อหน้าตาม pagination
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = filteredImages.slice(indexOfFirstImage, indexOfLastImage);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full mx-auto">
      <div className="mb-4 flex justify-end items-center">
        <label className="text-gray-700 font-semibold mr-2">Filter by Date:</label>
        <input
          type="date"
          className="border p-2 rounded"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      {/* Skeleton Loading */}
      {loading ? (
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="animate-pulse bg-gray-300 w-full h-40 rounded-lg"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {currentImages.map((image) => (
            <div key={image.id} className="border rounded-lg overflow-hidden">
              <img src={image.url} alt={`Image ${image.id}`} className="w-full h-56 object-cover" />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && (
        <Pagination
          totalImages={filteredImages.length}
          imagesPerPage={imagesPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Gallery;
