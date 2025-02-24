import React, { useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import Image from 'next/image';

interface ImageViewerProps {
  images: string[];
  startIndex: number;
  onClose: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ images, startIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(startIndex);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <button
        className="absolute top-5 right-5 text-white hover:text-red-500"
        onClick={onClose}
      >
        <RxCross1 size={30} />
      </button>

      <button
        className="absolute left-5 text-white hover:text-gray-400"
        onClick={handlePrev}
      >
        <FaArrowLeft size={40} />
      </button>

      <Image
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        className="max-w-full max-h-[80vh] rounded-xl shadow-lg"
        width={500}
        height={500}
      />

      <button
        className="absolute right-5 text-white hover:text-gray-400"
        onClick={handleNext}
      >
        <FaArrowRight size={40} />
      </button>
    </div>
  );
};

export default ImageViewer;
