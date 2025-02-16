'use client'

import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

interface AddProductFormProps {
  onSubmit: (product: FormData) => void; // Update function to handle FormData
}

export const AddProductForm =({ onSubmit }: AddProductFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    sizes: [] as string[],
    price: '',
    gender: '',
    material: '',
    images: [] as File[], // Store actual files
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]); // Store preview URLs

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const materials = ['Cotton', 'Polyester', 'Wool', 'Silk', 'Denim'];
  const genders = ['Men', 'Women', 'Kids', 'Unisex'];

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
        formData.images.forEach((image) => productData.append("images", image)); // Append images as file
        
        const response = await axios.post('/api/vendors/products',productData)
        toast.success(response.data.message);
        onSubmit(productData);
        
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
