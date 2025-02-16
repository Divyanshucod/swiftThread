'use client'
import { AddProductForm } from "@/components/Vendor/ProductList/AddProductForm";
import { ProductList } from "@/components/Vendor/ProductList/ProductList";
import { useState } from "react";

// Main Vendor Dashboard Component
const VendorDashboard = () => {
    const [products, setProducts] = useState([]);
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const addProduct = (product: any) => {
      setProducts([...products, product]);
    };
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const deleteProduct = (product:any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setProducts(products.filter((p:any) => p !== product));
    };
  
    return (
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Vendor Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProductList products={products} onEdit={() => {}} onDelete={deleteProduct} />
          <AddProductForm onSubmit={addProduct} />
        </div>
      </div>
    );
  };
  
  export default VendorDashboard;