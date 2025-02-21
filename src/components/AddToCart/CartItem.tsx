'use client';
import axios from 'axios';
import Image from 'next/image';
import React from 'react';
import { RxCross2 } from "react-icons/rx";
import { toast } from 'react-toastify';
type Product = {
  _id: string;
  title: string;
  price: string;
  description: string;
  quantity: number;
  productImages: string[];
};

type Props = {
  product: Product;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

const CartItem: React.FC<Props> = ({ product, setProducts }) => {

  const handleQuantityChange = (delta: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p._id === product._id
          ? { ...p, quantity: Math.max(1, p.quantity + delta) } // Prevent quantity from going below 1
          : p
      )
    );
  };

  const handleRemoveCartItem = async ()=>{
       try {
         const response = await axios.put(`/api/cart?id=${product._id}`)
         toast.success(response.data.message)
         location.reload();
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
       } catch (error:any) {
        if(error.status !== 500){
          return toast.error(error.response.data.message);
         }
        toast.error(`Error: ${error.message}`);
       }
  }
  return (
    <div className="flex items-center justify-between border-b py-4 relative">
      {/* Product Image */}
      <RxCross2
  className="
    absolute -top-1 -right-1
    h-6 w-6
    border border-gray-300
    rounded-full
    bg-white
    shadow-md
    text-gray-600
    hover:bg-red-500 hover:text-white
    transition-all duration-200 ease-in-out
    cursor-pointer
    flex items-center justify-center
  "
  onClick={handleRemoveCartItem}
/>

      <div className="flex items-center space-x-4">
        <Image
          src={product.productImages[0]}
          alt={product.title}
          width={64}
          height={64}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h2 className="text-lg font-bold">{product.title}</h2>
          <p className="text-sm text-gray-600">{product.description}</p>
        </div>
      </div>

      {/* Price and Quantity Controls */}
      <div className="flex items-center space-x-4">
        <span className="font-bold text-gray-700">${parseFloat(product.price).toFixed(2)}</span>
        <div className="flex items-center space-x-2 border px-2 py-1 rounded">
          <button
            className="text-lg"
            onClick={() => handleQuantityChange(-1)}
            disabled={product.quantity === 1}
          >
            -
          </button>
          <span>{product.quantity}</span>
          <button
            className="text-lg"
            onClick={() => handleQuantityChange(1)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
