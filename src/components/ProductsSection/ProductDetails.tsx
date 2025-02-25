"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Rating } from "./Rating";
import { FaUserCircle } from "react-icons/fa";
import GiveRating from "./GiveRating";
import { toast } from "react-toastify";

const ProductDetails = ({ product, relatedProducts }) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [comments, setComments] = useState(product.comments || []);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const handleCommentSubmit = () => {
    try {
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
       toast.error(error.message)
    }
  };

  useEffect(()=>{

  },[])
  return (
    <div className="p-4 max-w-7xl mx-auto grid gap-8 lg:grid-cols-2">
      {/* Product Image Section */}
      <div>
        <Image
          src={selectedImage}
          alt="Product"
          className="w-full h-auto rounded-2xl shadow-lg"
          height={500}
          width={500}
        />
        <div className="flex mt-4 gap-2 overflow-x-auto">
          {product.images.map((img, index) => (
            <Image
              key={index}
              alt="productImage"
              src={img}
              onClick={() => setSelectedImage(img)}
              height={100}
              width={100}
              className={`w-20 h-20 rounded-lg cursor-pointer border-2 ${
                selectedImage === img ? "border-black" : "border-transparent"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-red-500">
            ${product.discountedPrice}
          </span>
          <span className="line-through text-gray-500">
            ${product.originalPrice}
          </span>
        </div>
        <div className="flex gap-2">
          {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
            <Button key={size} variant="outline">
              {size}
            </Button>
          ))}
        </div>
        <Button className="w-full bg-black text-white">Checkout Now</Button>
        <Button variant="outline" className="w-full">
          Add To Cart
        </Button>

        {/* Description Section */}
        <div className="mt-4">
          <h2 className="text-xl font-bold">Description</h2>
          <p className="text-gray-700">{product.description}</p>
        </div>
      </div>

      {/* You May Also Like Section */}
      <div className="lg:col-span-2 mt-10">
        <h2 className="text-2xl font-bold">You May Also Like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {relatedProducts.map((item, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-lg"
                  width={100}
                  height={100}
                />
                <h3 className="mt-2 font-semibold">{item.name}</h3>
                <p className="text-red-500">${item.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="w-full md:mx-auto p-4 bg-white rounded-2xl shadow-lg space-y-4">
        <h2 className="text-xl font-semibold">Ratings & Reviews</h2>
        <div className="flex items-center gap-4">
          <div className="text-4xl font-bold">4.2</div>
          <div className="flex flex-col">
            <span className="text-sm">412 Ratings</span>
            <span className="text-sm">25 Reviews</span>
          </div>
        </div>
        <div className="space-y-2">
          <Rating stars={5} count={237} color="bg-green-500" />
          <Rating stars={4} count={99} color="bg-green-400" />
          <Rating stars={3} count={40} color="bg-green-300" />
          <Rating stars={2} count={9} color="bg-yellow-400" />
          <Rating stars={1} count={27} color="bg-red-400" />
        </div>
      </div>

      {/* Comments Section */}
      <div className="lg:col-span-2 mt-6">
        <h2 className="text-xl font-bold">Comments</h2>
        <div className="space-y-3">
          {comments.map((comment, index) => (
            <Card key={index}>
              <CardContent className="p-3 flex gap-3 items-center">
                <FaUserCircle className="rounded-full h-10 w-10" />
                <div>
                  <strong>{comment.user}</strong>
                  <p>{comment.text}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div
          className="flex gap-2 mt-4 relative"
          onClick={() => setIsFocused(true)} // Keeps focus on click
        >
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
            className="flex-1 p-2 border rounded-lg"
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                setIsFocused(false);
              }
            }}
          />
          <Button onClick={handleCommentSubmit}>Post</Button>

          {/* Show rating only when focused */}
          {isFocused && (
            <GiveRating rating={newRating} setRating={setNewRating} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
