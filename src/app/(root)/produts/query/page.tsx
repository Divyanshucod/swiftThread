import ImageViewer from '@/components/ImageViewer/ImageViewer';
import Image from 'next/image';
import React, { useState } from 'react';


interface Product {
  title: string;
  price: number;
  images: string[];
  description: string;
  colors: string[];
  sizes: string[];
  gender: string;
  material: string;
}

interface QueriedProductsProps {
  products: Product[];
}

export default function QueriedProducts({ products }: QueriedProductsProps) {
  const [selectedImages, setSelectedImages] = useState<string[] | null>(null);
  const [startIndex, setStartIndex] = useState<number>(0);

  const handleImageClick = (images: string[], index: number) => {
    setSelectedImages(images);
    setStartIndex(index);
  };

  const closeImageViewer = () => {
    setSelectedImages(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((product, idx) => (
        <div key={idx} className="border rounded-2xl shadow-lg p-4">
          <Image
            src={product.images[0]}
            alt={product.title}
            className="w-full h-64 object-cover rounded-xl cursor-pointer"
            onClick={() => handleImageClick(product.images, 0)}
          />
          <h2 className="text-xl font-bold mt-2">{product.title}</h2>
          <p className="text-lg text-green-600 font-semibold">${product.price}</p>
          <p className="text-gray-600 mt-1">{product.description}</p>
          <p className="mt-2"><strong>Gender:</strong> {product.gender}</p>
          <p><strong>Material:</strong> {product.material}</p>
          <div className="flex space-x-2 mt-2">
            {product.colors.map((color, i) => (
              <span
                key={i}
                className="w-5 h-5 rounded-full border"
                style={{ backgroundColor: color }}
              ></span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {product.sizes.map((size, i) => (
              <span
                key={i}
                className="px-2 py-1 border rounded-lg text-sm"
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      ))}
      {selectedImages && (
        <ImageViewer
          images={selectedImages}
          startIndex={startIndex}
          onClose={closeImageViewer}
        />
      )}
    </div>
  );
}
