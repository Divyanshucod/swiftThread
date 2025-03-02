"use client";

import React, { useEffect, useState } from "react";
import CatTag from "./CatTag";
import ProductCard from "./ProductCard";
import { toast } from "react-toastify";
import axios from "axios";

interface Product {
  _id: string;
  title: string;
  price: string;
  description: string;
  sizes: string[];
  gender: string;
  material: string;
  productImages: string[];
}

export function Products() {
  const categories = [
    "T-Shirts",
    "Leggings",
    "Jeans",
    "Sportswear",
    "Formal",
    "Casual",
    "Tops",
    "Skirts",
    "Trousers",
  ];

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/cart/filterbased?category=${activeCategory}`
        );
        setAllProducts(response.data.products);
      } catch (error: any) {
        toast.error(error.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, [activeCategory]);

  const handleAddToCart = async (id: string) => {
    try {
      const response = await axios.post("/api/cart", { id });
      toast.success(response.data.message);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Error adding to cart";
      toast.error(errorMessage);
    }
  };

  return (
    <section className="bg-white py-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        Today&apos;s Best Deals For You!
      </h2>

      {/* Category Tags */}
      <div className="mb-8 container mx-auto px-4">
        <CatTag
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Product Grid */}
      {loading ? (
        <p className="text-center text-lg text-gray-500">Loading products...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 container mx-auto px-4">
          {allProducts.length > 0 ? (
            allProducts.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                price={product.price}
                imageUrl={product.productImages[0]}
                rating={109}
                reviews={1092}
                name={product.title}
                handleAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No products found in this category.
            </p>
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <ul className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <li
              key={page}
              className="px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer text-gray-700"
            >
              {page}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
