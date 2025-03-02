"use client";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import React from "react";
import StarRating from "./StarRating";

interface ProductProps {
  name: string;
  price: string;
  rating: number;
  reviews: number;
  imageUrl: string;
  handleAddToCart: (id: string) => void;
  id: string;
}

const ProductCard: React.FC<ProductProps> = ({
  name,
  price,
  rating,
  reviews,
  imageUrl,
  handleAddToCart,
  id,
}) => {
  const [isFilled, setIsFilled] = React.useState<boolean>(false);

  return (
    <div className="relative bg-white rounded-lg shadow-md p-2 h-full flex flex-col">
      {/* Favorite Icon */}
      <div className="absolute top-3 right-3">
        <button className="text-gray-300 hover:text-gray-400">
          <FaHeart
            className={`w-6 h-6 ${isFilled ? "text-red-500" : ""}`}
            onClick={() => setIsFilled(!isFilled)}
          />
        </button>
      </div>

      {/* Product Image */}
      <div className="flex justify-center">
        <Image
          src={imageUrl}
          alt={name}
          width={300}
          height={300}
          className="rounded-lg w-full h-52 object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-grow p-3">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{name}</h3>

        <StarRating rating={rating} reviews={reviews} />

        <p className="text-xl font-semibold text-gray-900">${price}</p>

        {/* Add to Cart Button */}
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg mt-auto"
          onClick={() => handleAddToCart(id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
