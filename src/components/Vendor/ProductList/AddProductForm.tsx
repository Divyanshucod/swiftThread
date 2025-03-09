'use client'

import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

export const AddProductForm =() => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    sizes: [] as string[],
    price: '',
    gender: '',
    material: '',
    images: [] as File[],
    category:'',
    brand:'',
     // Store actual files
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]); // Store preview URLs

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const materials = ["Denim","Cotton", "Rayon", "Woolen","Silk","Linen","Mesh","Recycled Polyester","Nylon","Cashmere"];
  const genders = ['Men', 'Women', 'Kids', 'Unisex'];
  const categories = ["Jeans", "T-shirt", "Leggings","Jacket", "Hoodies","Pants", "Pajamas", "Tops", "Shorts", "Sneakers"]
  // const colors = [{color:"#0000FF",colorName:'blue'}, "#FF0000", "#000000", "#FFFFFF", "#808080", "#FFC0CB", "#FFA500", "#008000"]
  const handleSizeToggle = (size: string) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newFiles],
      }));

      setPreviewImages((prev) => [...prev, ...newPreviews]);
    }
  };
  // const handleColorChange = ()=>{

  // }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.images.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    try{
        const productData = new FormData();
        productData.append("title", formData.title);
        productData.append("description", formData.description);
        formData.sizes.forEach((size) => productData.append("sizes", size));
        productData.append("price", formData.price);
        productData.append("gender", formData.gender);
        productData.append("material", formData.material);
        productData.append('category',formData.category);
        productData.append('brand',formData.brand)
        formData.images.forEach((image) => productData.append("images", image)); // Append images as file
        
        const response = await axios.post('/api/vendors/products',productData)
        
        toast.success(response.data.message);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(error:any){
      if(error.status !== 500){
        return toast.error(error.response.data.message)
       }
        toast.error(error.message)
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" className="w-full p-2 border rounded" onChange={handleChange} required />
        <input type="text" name="brand" placeholder="Brand" className="w-full p-2 border rounded" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" className="w-full p-2 border rounded" onChange={handleChange} required />
        
        <div className="flex gap-2">
          {sizes.map((size) => (
            <div key={size} className={`p-2 border rounded cursor-pointer ${formData.sizes.includes(size) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => handleSizeToggle(size)}>
              {size}
            </div>
          ))}
        </div>
        
        <input type="number" name="price" placeholder="Price" className="w-full p-2 border rounded" onChange={handleChange} required />

        <select name="gender" className="w-full p-2 border rounded" onChange={handleChange} required>
          <option value="">Select Gender</option>
          {genders.map((gender) => (
            <option key={gender} value={gender}>{gender}</option>
          ))}
        </select>

        <select name="material" className="w-full p-2 border rounded" onChange={handleChange} required>
          <option value="">Select Material</option>
          {materials.map((material) => (
            <option key={material} value={material}>{material}</option>
          ))}
        </select>
          
        <select name="category" className="w-full p-2 border rounded" onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        {/* <div>
           {colors.map((color,index) => (<span className={`bg-[${color}] rounded-full w-5 h-5 cursor-pointer`} key={index} onClick={handleColorChange}></span>))}
        </div> */}
        {/* Image Upload Field */}
        <input type="file" name="images" className="w-full p-2 border rounded" accept="image/*" multiple onChange={handleImageChange} />

        {/* Preview of uploaded images */}
        {previewImages.length > 0 && (
          <div className="flex gap-2 mt-4">
            {previewImages.map((image, index) => (
              <Image key={index} src={image} height={100} width={100} alt={`Product Image ${index + 1}`} className="w-20 h-20 object-cover rounded" />
            ))}
          </div>
        )}

        <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">Add Product</button>
      </form>
    </div>
  );
};
