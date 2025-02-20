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
  handleAddToCart:(id:string)=> void,
  id:string
}

const ProductCard: React.FC<ProductProps> = ({
  name,
  price,
  rating,
  reviews,
  imageUrl,
  handleAddToCart,
  id
}) => {
  const [isFilled, setIsFilled] = React.useState<boolean>(false);
  return (
    <div className="relative bg-white rounded-lg shadow-md p-2 h-8/10">
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
        width={300}
        height={300}
        className="rounded-lg mb-4 w-full h-3/5"
      />

      <h3 className="text-lg font-semibold mb-2">{name}</h3>

       <StarRating rating={rating} reviews={reviews}/>

      <p className="text-xl font-semibold">${price}</p>

      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg" onClick={() => handleAddToCart(id)}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
