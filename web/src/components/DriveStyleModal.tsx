import React, { useEffect, useState, useRef } from "react";

interface DriveStyleModalProps {
  isOpen: boolean;
  previewImage?: string;
  title?: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  showPrevButton?: boolean;
  showNextButton?: boolean;
}

const DriveStyleModal: React.FC<DriveStyleModalProps> = ({
  isOpen,
  previewImage,
  title,
  onClose,
  onPrev,
  onNext,
  showPrevButton = true,
  showNextButton = true,
}) => {
  // ระดับการซูม (1 = ปกติ, 2 = ซูม)
  const [scale, setScale] = useState(1);

  // เก็บ transformOrigin (ค่าเริ่มต้น = "50% 50%")
  const [origin, setOrigin] = useState("50% 50%");

  // ใช้ ref เพื่ออ้างถึง <img> เพื่อคำนวณตำแหน่งคลิก
  const imgRef = useRef<HTMLImageElement | null>(null);

  // เมื่อปิด Modal → รีเซ็ต
  useEffect(() => {
    if (!isOpen) {
      setScale(1);
      setOrigin("50% 50%");
    }
  }, [isOpen]);

  // จอ >= 640px → ให้กดปุ่มลูกศรได้
  useEffect(() => {
    if (!isOpen) return;
    if (window.innerWidth >= 640) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowLeft") onPrev?.();
        else if (e.key === "ArrowRight") onNext?.();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onPrev, onNext]);

  // ฟังก์ชันคำนวณ transform-origin ตามจุดคลิก
  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    // ถ้า scale = 2 → กลับมา 1
    if (scale === 2) {
      setScale(1);
      setOrigin("50% 50%");
      e.stopPropagation(); // กันไม่ให้คลิกทะลุ
      return;
    }

    // ถ้า scale = 1 → ซูมเข้า
    if (imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
      // ตำแหน่ง X,Y ที่คลิกใน viewport
      const clickX = e.clientX;
      const clickY = e.clientY;

      // หาระยะว่าอยู่กี่เปอร์เซ็นต์ภายในรูป
      // สมมติ (clickX - rect.left) / rect.width → ได้ 0~1
      const relX = ((clickX - rect.left) / rect.width) * 100;
      const relY = ((clickY - rect.top) / rect.height) * 100;

      // ตั้ง transform-origin เป็นจุดนั้น (เช่น "30% 70%")
      const newOrigin = `${relX}% ${relY}%`;
      setOrigin(newOrigin);

      // ซูมเป็น 2
      setScale(2);
    }

    e.stopPropagation(); // กันไม่ให้คลิกทะลุไปปิด modal
  };

  // ไม่เปิด modal → ไม่ render
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex opacity-100 scale-100 transition-all duration-300 ease-out">
      {/* พื้นหลังเบลอ + คลิกปิด */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative flex flex-col flex-1">
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 bg-black/60 backdrop-blur-sm text-white">
          <div>
            <span className="font-semibold text-lg">{title}</span>
          </div>
          <button
            onClick={onClose}
            className="text-3xl w-12 h-12 flex items-center justify-center cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* ส่วนแสดงรูป + ปุ่มก่อนหน้า/ถัดไป */}
        <div className="relative flex-1 flex items-center justify-center overflow-hidden">
          {/* ปุ่มก่อนหน้า */}
          {showPrevButton && onPrev && (
            <button
              onClick={onPrev}
              className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl w-12 h-12 items-center justify-center rounded-full cursor-pointer"
            >
              &lt;
            </button>
          )}

          {/* รูปภาพ (คลิกเพื่อซูมจากตำแหน่งคลิก) */}
          {previewImage && (
            <img
              ref={imgRef}
              src={previewImage}
              alt={title}
              onClick={handleImageClick}
              style={{
                transform: `scale(${scale})`,
                transformOrigin: origin,
              }}
              className={`
                transition-transform duration-300
                max-w-[80vw] max-h-[80vh]
                object-contain
                ${scale === 1 ? "cursor-zoom-in" : "cursor-zoom-out"}
              `}
            />
          )}

          {/* ปุ่มถัดไป */}
          {showNextButton && onNext && (
            <button
              onClick={onNext}
              className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl w-12 h-12 items-center justify-center rounded-full cursor-pointer"
            >
              &gt;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriveStyleModal;
