'use client'
import axios from "axios";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";


 interface FormData {
    title: string;
    description: string;
    sizes: string[];
    price: string;
    gender: string;
    material: string;
    id:string;
    setEditFormVisible :React.Dispatch<React.SetStateAction<boolean>>; 
  };

const EditProductForm = ({
    title,
    description,
    sizes,
    price,
    gender,
    material,
    id,
    setEditFormVisible
}:FormData) => {
    const [formData, setFormData] = React.useState({
        title: title,
        description: description,
        sizes: sizes,
        price: price,
        gender: gender,
        material: material,
        images: [] as File[],
        // Store actual files
      });
      const [previewImages, setPreviewImages] = React.useState<string[]>([]);
      const Sizes = ['S', 'M', 'L', 'XL', 'XXL'];
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setFormData((prev:any) => ({ ...prev, [name]: value }));
      };
      const handleImages = (e: React.ChangeEvent<HTMLInputElement>)=>{
           const files = e.target.files;
           if(files){
              const newFiles = Array.from(files)
              const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
              
              setFormData(prev => ({
                ...prev,
                images:[...prev.images,...newFiles]
            }))

            setPreviewImages((prev)=> [...prev,...newPreviews])
           }
      }
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try{
            const productData = new FormData();
            productData.append("title", formData.title);
            productData.append("description", formData.description);
            formData.sizes.forEach((size) => productData.append("sizes", size));
            productData.append("price", formData.price);
            productData.append("gender", formData.gender);
            productData.append("material", formData.material);
            formData.images.forEach((image) => productData.append("images", image));
            productData.append('id',id)
            const response = await axios.put('/api/vendors/products',productData)
            toast.success(response.data.message);
            setEditFormVisible(false)
           
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }catch(error:any){
          if(error.status !== 500){
            return toast.error(error.response.data.message)
           }
            toast.error(error.message)
        }
      };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Edit The Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          value={formData.title}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          value={formData.description}
          required
        />

        <div className="flex gap-2">
          {Sizes.map((size) => (
            <div
              key={size}
              className={`p-2 border rounded cursor-pointer ${formData.sizes.includes(size) ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => handleSizeToggle(size)}
            >
              {size}
            </div>
          ))}
        </div>

        <input
          type="number"
          name="price"
          placeholder="Price"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          value={formData.price}
          required
        />

        <select
          name="gender"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          value={formData.gender}
          required
        >
          <option value="">Select Gender</option>
          {genders.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>

        <select
          name="material"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          value={formData.material}
          required
        >
          <option value="">Select Material</option>
          {materials.map((material) => (
            <option key={material} value={material}>
              {material}
            </option>
          ))}
        </select>
        {/* Image Upload Field */}
        <input type="file" name="images" className="w-full p-2 border rounded" accept="image/*" multiple onChange={handleImages} />

        {/* Preview of uploaded images */}
        {previewImages.length > 0 && (
          <div className="flex gap-2 mt-4">
            {previewImages.map((image, index) => (
              <Image key={index} src={image} height={100} width={100} alt={`Product Image ${index + 1}`} className="w-20 h-20 object-cover rounded" />
            ))}
          </div>
        )}
        <button onClick={()=> setEditFormVisible(false)} className="w-full p-2 bg-green-500 text-white rounded">
          Cancel
        </button>
        <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">
          Edit Product
        </button>
        
      </form>
    </div>
    </div>
  );
};

export default EditProductForm;
