'use client';
import CartItem from '@/components/AddToCart/CartItem';
import Summary from '@/components/AddToCart/Summary';
import axios from 'axios';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

type Product = {
  _id: string;
  title: string;
  price: string;
  description: string;
  quantity: number;
  productImages: string[];
};

const Cart = () => {
  // Dummy data for products
  const [products, setProducts] = React.useState<Product[]>([]);
  
  useEffect(()=>{
     const fetchCartProducts= async ()=>{
             try {
                const response = await axios.get('/api/cart')
                console.log(response.data.products);
                
                setProducts(response.data.products)
             // eslint-disable-next-line @typescript-eslint/no-explicit-any
             } catch (error:any) {
              if(error.status === 500){
                return toast.error(error.response.data.message);
               }
              toast.error(error.message)
             }
     }

     fetchCartProducts();
  },[])
  return (
    <div className="container mx-auto p-4 min-h-screen mt-10">
      <h1 className="text-2xl font-bold mb-4">Your Cart ({products.length} items)</h1>

      {/* Cart Items Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2">
          {products.map((product) => (
            <CartItem
              key={product._id}
              product={product}
              setProducts={setProducts}
            />
          ))}
        </div>

        {/* Summary Section */}
        <div>
          <Summary products={products} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
