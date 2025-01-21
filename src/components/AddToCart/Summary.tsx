import { PropsWithChildren } from "react";
type Product = {
    id: number;
    name: string;
    details: string;
    price: number;
    quantity: number;
  };

type SummaryProps = {
  products: Product[];
};

const Summary = ({ products }: SummaryProps) => {
    const subtotal = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
    const tax = subtotal * 0.1; // Assuming 10% tax
    const total = subtotal + tax;
  
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