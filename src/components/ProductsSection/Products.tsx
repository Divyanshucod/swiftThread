'use client'

import React, { useEffect } from 'react';
import CatTag from './CatTag';
import ProductCard from './ProductCard';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
interface Product {
  _id:string,
  title: string,
  price: string,
  description:string,
  sizes:string[],
  gender:string,
  material:string,
  productImages:string[]
}
export function Products() {
  const categories = ['T-Shirts', 'Leggies', 'Jeans', 'Sportswear', 'Formal', 'Casual', 'Tops', 'Skirts', 'Trousers'];
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [allProducts,setAllProducts] = React.useState<Product[]>([])
  const handleCategoryChange = (category:string) => {
    setActiveCategory(category);
  };

  useEffect(()=>{
    async function getProducts() {
       try{
          const response = await axios.get('/api/products');
          console.log(response);
          
          setAllProducts(response.data.ProductInfo)
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
       }catch(error:any){
        toast.error(error.message)
       }
    }
    getProducts()
  },[])

  const handleAddToCart = async (id:string)=>{
       try {
         const response = await axios.post('/api/cart',{id})
         toast.success(response.data.message)
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
       } catch (error:any) {
          toast.error(error.message)
       }
  }
  return (
    <section className="bg-white py-8">
      <h2 className="text-2xl font-bold text-center mb-6"> Today&apos;s Best Deals For You! </h2>
      <div className="mb-8 container mx-auto px-4">
        <CatTag
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 container mx-auto px-4">
        {allProducts.map((product) => (
          <ProductCard key={product._id} id={product._id} price={product.price} imageUrl={product.productImages[0]} rating={109} reviews={1092} name={product.title} handleAddToCart={handleAddToCart}/>
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