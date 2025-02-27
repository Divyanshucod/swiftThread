"use client";

import React, {useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Rating } from "./Rating";
import { FaUserCircle } from "react-icons/fa";
import GiveRating from "./GiveRating";
interface Comment{
  user:string,
  profileImage:string,
  rating:string,
  comment:string
}
interface Product{
    _id:string,
    title:string,
    price:string,
    description:string,
    sizes:string[],
    gender:string,
    material:string,
    productImages:string[],
    discountedPrice:string,
    starDistribution:{
      fiveStar:number,
      fourStar:number,
      threeStar:number,
      twoStar:number,
      oneStar:number,
    },
  comments:Comment[]
}
type props = {
   product:Product
   relatedProducts:Product[],
   handleCommentSubmit: ()=> void,
   newRating:number,
   setNewRating: React.Dispatch<React.SetStateAction<number>>; 
   newComment:string,
   setNewComment: React.Dispatch<React.SetStateAction<string>>; 
}
const ProductDetails = ({ product, relatedProducts,handleCommentSubmit,newRating,setNewRating,newComment,setNewComment}:props) => {
  const [selectedImage, setSelectedImage] = useState(product?.productImages?.[0] ?? '/login_woman.jpg');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="p-4 max-w-7xl mx-auto grid gap-8 lg:grid-cols-2">
      {/* Product Image Section */}
      <div>
        <Image
          src={selectedImage}
          alt="Product"
          className="w-full h-2/3 rounded-2xl shadow-lg"
          height={400}
          width={400}
        />
        <div className="flex mt-4 gap-2 overflow-x-auto">
          {product?.productImages?.length ? product.productImages.map((img, index) => (
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
          )) : <p className="text-gray-500">No images available</p>}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{product?.title ?? "No Title Available"}</h1>
        <div className="flex items-center gap-2">
          {product?.discountedPrice && <span className="text-xl font-semibold text-red-500">
            ${product.discountedPrice}
          </span>}
          <span className={`${ product?.discountedPrice ? 'line-through text-gray-500' : 'text-xl font-semibold text-green-500'}`}>
            ${product?.price ?? "N/A"}
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
          <p className="text-gray-700">{product?.description ?? "No description available"}</p>
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
                  src={item.productImages[0]}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-lg"
                  width={100}
                  height={100}
                />
                <h3 className="mt-2 font-semibold">{item.title}</h3>
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
          <Rating stars={5} count={product?.starDistribution?.fiveStar ?? 0} color="bg-green-500" />
          <Rating stars={4} count={product.starDistribution?.fourStar ?? 0} color="bg-green-400" />
          <Rating stars={3} count={product.starDistribution?.threeStar ?? 0} color="bg-green-300" />
          <Rating stars={2} count={product.starDistribution?.twoStar ?? 0} color="bg-yellow-400" />
          <Rating stars={1} count={product.starDistribution?.oneStar ?? 0} color="bg-red-400" />
        </div>
      </div>

      {/* Comments Section */}
      <div className="lg:col-span-2 mt-6">
        <h2 className="text-xl font-bold">Comments</h2>
        <div className="space-y-3">
          {product?.comments?.length ? product.comments.map((comment, index) => (
            <Card key={index}>
              <CardContent className="p-3 flex gap-3 items-center">
                <FaUserCircle className="rounded-full h-10 w-10" />
                <div>
                  <strong>{comment.user}</strong>
                  <p>{comment.comment}</p>
                </div>
              </CardContent>
            </Card>
          )) : <p>No Comments</p>}
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
