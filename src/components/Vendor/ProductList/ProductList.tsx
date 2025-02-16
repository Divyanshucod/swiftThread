'use client'
import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import EditProductForm from "./EditProductForm";
import DeleteProductWarning from "./DeleteProductWarning";
// Product List Component
interface Product {
    _id:string,
    title: string;
    description: string;
    sizes: string[];
    price: string;
    gender: string;
    material: string;
  }
export const ProductList = () => {
  const [products,setProducts] = React.useState<Product[]>([])
  const [editFormVisible,setEditFormVisible] = React.useState<boolean>(false)
  const [deleteWarVisible,setdeleteWarVisible] = React.useState<boolean>(false)
  useEffect(()=>{
    async function fetchProducts(){
      try {
        const response = await axios.get(`/api/vendors/products`)
        setProducts(response.data.products)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        if(error.status === 500){
          return toast.error(error.response.data.message);
         }
        toast.error(error.message)
      }
    }                                                                                                                                                                             
    fetchProducts()
  },[])
    return (
      <div className="p-4 bg-white shadow rounded-lg">
        <h2 className="text-xl font-bold mb-4">Existing Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Title</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Sizes</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Gender</th>
                <th className="border p-2">Material</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="text-center">
                  <td className="border p-2">{product.title}</td>
                  <td className="border p-2">{product.description}</td>
                  <td className="border p-2">{product.sizes.join(', ')}</td>
                  <td className="border p-2">${product.price}</td>
                  <td className="border p-2">{product.gender}</td>
                  <td className="border p-2">{product.material}</td>
                  <td className="border p-2">
                    <button onClick={() => setEditFormVisible(!editFormVisible)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                    <button onClick={() => setdeleteWarVisible(!deleteWarVisible)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                  </td>
                  {editFormVisible && <EditProductForm price={product.price} title={product.title} description={product.description} sizes={product.sizes} gender={product.gender} material={product.material} setEditFormVisible={setEditFormVisible}/>}
                  {deleteWarVisible && <DeleteProductWarning productName={product.title} setdeleteWarVisible={setdeleteWarVisible} id={product._id}/>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  