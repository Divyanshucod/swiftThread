import { PropsWithChildren } from "react";

import React from "react";

type Product = {
  id: number;
  name: string;
  details?: string; // Optional details
  price: number;
  quantity: number;
  image: string; // Image URL
};

type Props = Product;

const CartItem = (product: Props) => {
  return (
    <div className="flex items-center justify-between border-b py-4">
      {/* Product Image */}
      <div className="flex items-center space-x-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h2 className="text-lg font-bold">{product.name}</h2>
          {product.details && (
            <p className="text-sm text-orange-600">{product.details}</p>
          )}
        </div>
      </div>

      {/* Price and Quantity Controls */}
      <div className="flex items-center space-x-4">
        <span className="font-bold text-gray-700">${product.price.toFixed(2)}</span>
        <div className="flex items-center space-x-2 border px-2 py-1 rounded">
          <button className="text-lg">-</button>
          <span>{product.quantity}</span>
          <button className="text-lg">+</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
