import React, { useEffect } from "react";

type Product = {
  _id: string;
  title: string;
  price: string;
  description: string;
  quantity: number;
  productImages: string[];
  };

type SummaryProps = {
  products: Product[];
};

const Summary = ({ products }: SummaryProps) => {
    const [subtotal, setSubtotal] = React.useState<number>(0)
    const [tax,setTax] = React.useState<number>(subtotal * 0.1); // Assuming 10% tax
    const [total,setTotal] = React.useState<number>(subtotal + tax);
  
    useEffect(()=>{
         const val = products.reduce((acc, product) => acc + parseFloat(product.price) * product.quantity, 0);
         const taxs = val * 0.1
         setSubtotal(val)
         setTax(taxs)
         setTotal(val+taxs)
    },[products])
    return (
      <div className="border p-4 rounded-md shadow-md">
        <h2 className="text-lg font-bold mb-4">Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Sales Tax:</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t pt-2">
          <span>Grand Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-md">Check Out</button>
      </div>
    );
  };
  
  export default Summary;