'use client'
import ImageViewer from '@/components/ImageViewer/ImageViewer';
import axios from 'axios';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


interface Product {
  title: string;
  price: number;
  productImages: string[];
  description: string;
  sizes: string[];
  gender: string;
  material: string;
}


export default function QueriedProducts() {
  const [selectedImages, setSelectedImages] = useState<string[] | null>(null);
  const [startIndex, setStartIndex] = useState<number>(0);
  const searchParams = useSearchParams()
  const [products,setProducts] = useState<Product[]>([])
  const [page,setPage] = useState<number>(1)
  const [visibleLoadMore,setVisibleLoadMore] = useState<boolean>(true)
  const [totleFoundPro,setTotalFoundPro] = useState<number>(0)
  const handleImageClick = (images: string[], index: number) => {
    setSelectedImages(images);
    setStartIndex(index);
  };

  const closeImageViewer = () => {
    setSelectedImages(null);
  };
  
  useEffect(()=>{
    const fetchProducts = async ()=>{
        try{
          const color = searchParams.get('color')
          const price_max = searchParams.get('price_max')
          const price_min = searchParams.get('price_min')
          const gender = searchParams.get('gender')
          const title = searchParams.get('text')

          const response = await axios.get(`/api/cart/filterbased?color=${color ? color : ''}&gender=${gender ? gender : ''}&price_max=${price_max ? price_max : ''}&price_min=${price_min ? price_min : ''}&name=${title ? title : ''}&page=${page}`)
          
          if( page >=response.data.totalPages){
            setVisibleLoadMore(false)
          }
          setTotalFoundPro(response.data.totalProducts)
          setProducts(response.data.products)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }catch(error:any){
          toast.error(error.message)
        }
    }
    fetchProducts()
  },[searchParams,page])
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {/* <p className='text-center font-medium text-2xl'>Total found Products {totleFoundPro}</p>  for showing the no of matched products*/} 
      {products.map((product, idx) => (
        <div key={idx} className="border rounded-2xl shadow-lg p-4">
          <Image
            src={product.productImages[0]}
            alt={product.title}
            height={100}
            width={100}
            className="w-full h-64 object-cover rounded-xl cursor-pointer"
            onClick={() => handleImageClick(product.productImages, 0)}
          />
          <h2 className="text-xl font-bold mt-2">{product.title}</h2>
          <p className="text-lg text-green-600 font-semibold">${product.price}</p>
          <p className="text-gray-600 mt-1">{product.description}</p>
          <p className="mt-2"><strong>Gender:</strong> {product.gender}</p>
          <p><strong>Material:</strong> {product.material}</p>
          {/* <div className="flex space-x-2 mt-2">
            {product.colors.map((color, i) => (
              <span
                key={i}
                className="w-5 h-5 rounded-full border"
                style={{ backgroundColor: color }}
              ></span>
            ))}
          </div> */}
          <div className="flex flex-wrap gap-2 mt-2">
            {product.sizes.map((size, i) => (
              <span
                key={i}
                className="px-2 py-1 border rounded-lg text-sm"
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      ))}
      {visibleLoadMore && <button className='text-white bg-blue-500 rounded-sm py-2 px-4' onClick={()=> setPage(page+1)}>Load More</button>}
      {selectedImages && (
        <ImageViewer
          images={selectedImages}
          startIndex={startIndex}
          onClose={closeImageViewer}
        />
      )}
    </div>
  );
}
