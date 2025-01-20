'use client'

import CatTag from './CatTag';
import ProductCard from './ProductCard';
import { useState } from 'react';

export function Products() {
  const categories = ['Gadgets', 'Fashion', 'Toys', 'Education', 'Beauty', 'Travel', 'Fitness', 'Furniture', 'Sneakers'];
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const products = [
    { name: 'Laptop Sleeve MacBook', price: 59, image: '/laptop-sleeve.png', rating: 4.5, reviews: 121 },
    { name: 'AirPods Max', price: 559, image: '/airpods-max.png', rating: 4.7, reviews: 200 },
    { name: 'Flower Laptop Sleeve', price: 39, image: '/flower-sleeve.png', rating: 4.4, reviews: 100 },
    { name: 'Product Name', price: 59, image: '/product-name.png', rating: 4.2, reviews: 90 },
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
          <ProductCard key={index} product={product} />
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