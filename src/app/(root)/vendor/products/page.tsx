'use client'
import { AddProductForm } from "@/components/Vendor/ProductList/AddProductForm";
import { ProductList } from "@/components/Vendor/ProductList/ProductList";

// Main Vendor Dashboard Component
const VendorDashboard = () => {
    return (
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Vendor Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProductList/>
          <AddProductForm/>
        </div>
      </div>
    );
  };
  
  export default VendorDashboard;