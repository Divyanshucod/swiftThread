'use client'

import CatTag from './CatTag';
import ProductCard from './ProductCard';
import { useState } from 'react';

export function Products() {
  const categories = ['T-Shirts', 'Leggies', 'Jeans', 'Sportswear', 'Formal', 'Casual', 'Tops', 'Skirts', 'Trousers'];
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const products = [
    { name: 'Hoodies', price: 59, imageUrl: '/hoodies.jpg', rating: 4.5, reviews: 121, color:'red'},
    { name: 'Jackets', price: 559, imageUrl: '/jackets.jpg', rating: 4.7, reviews: 200, color:'blue' },
    { name: 'Jeans', price: 39, imageUrl: '/jeans.jpg', rating: 4.4, reviews: 100, color:'yellow' },
    { name: 'Shirt', price: 59, imageUrl: '/shirt.jpg', rating: 4.2, reviews: 90 , color:'green'},
    // Add more products here
  ];

  const handleCategoryChange = (category:string) => {
    setActiveCategory(category);
  };

  return (
    <section className="bg-white py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Today's Best Deals For You!</h2>
      <div className="mb-8 container mx-auto px-4">
        <CatTag
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 container mx-auto px-4">
        {products.map((product, index) => (
          <ProductCard price={product.price} imageUrl={product.imageUrl} rating={product.rating} reviews={product.reviews} color={product.color} name={product.name}/>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <ul className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((page, index) => (
            <li key={index} className="px-4 py-2 border rounded hover:bg-gray-200 cursor-pointer">
              {page}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}