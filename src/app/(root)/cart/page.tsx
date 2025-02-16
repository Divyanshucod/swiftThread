// pages/cart.js
import CartItem from "@/components/AddToCart/CartItem";
import Summary from "@/components/AddToCart/Summary";

const Cart = () => {
  // Dummy data for products
  const products = [
    {
      id: 1,
      name: "Pi Pizza Oven",
      details: "Estimated Ship Date: June 6th",
      price: 469.99,
      quantity: 1,
      image:'/hoodies.jpg'
    },
    {
      id: 2,
      name: "Grill Ultimate Bundle",
      details: "Add accident protection for $29.99",
      price: 549.99,
      quantity: 1,
      image:'/jeans.jpg'
    },
    {
      id: 3,
      name: "Starters (4 pack)",
      details: "Estimated Ship Date: June 6th",
      price: 0.0,
      quantity: 1,
       image:'/jackets.jpg'
    },
    {
      id: 4,
      name: "Charcoal Grill Pack",
      details: "Estimated Ship Date: June 6th",
      price: 0.0,
      quantity: 1,
       image:'/dress.jpg'
    },
  ];

  return (
    <div className="container mx-auto p-4 min-h-screen mt-10">
      <h1 className="text-2xl font-bold mb-4">Your Cart ({products.length} items)</h1>

      {/* Cart Items Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2">
          {products.map((product) => (
            <CartItem key={product.name} {...product} />
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