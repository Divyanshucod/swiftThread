"use client";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import React from "react";
import StarRating from "./StarRating";
interface ProductProps {
  name: string;
  price: number;
  color: string;
  rating: number;
  reviews: number;
  imageUrl: string;
}

const ProductCard: React.FC<ProductProps> = ({
  name,
  price,
  color,
  rating,
  reviews,
  imageUrl,
}) => {
  const [isFilled, setIsFilled] = React.useState<boolean>(false);
  return (
    <div className="relative bg-white rounded-lg shadow-md p-2 h-3/5">
      <div className="absolute top-3 right-3">
        <button className="text-gray-300 hover:text-gray-400">
          <FaHeart
            className={`w-6 h-6 ${isFilled ? "text-red-500" : ""}`}
            onClick={() => setIsFilled(!isFilled)}
          />
        </button>
      </div>

      <Image
        src={imageUrl}
        alt={name}
        width={200}
        height={200}
        className="rounded-lg mb-4 w-full h-1/2"
      />

      <h3 className="text-lg font-semibold mb-2">{name}</h3>

      <p className="text-gray-500 mb-2">Color - {color}</p>

       <StarRating rating={rating} reviews={reviews}/>

      <p className="text-xl font-semibold">${price.toFixed(2)}</p>

      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
