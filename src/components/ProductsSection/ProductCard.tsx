type ProductCardProps = {
    product: {
      name: string;
      price: number;
      image: string;
      rating: number;
      reviews: number;
    };
  };
  
  export default function ProductCard({ product }: ProductCardProps) {
    return (
      <div className="border rounded-lg p-4 flex flex-col items-center">
        <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-4" />
        <h3 className="font-bold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-600">${product.price}</p>
        <p className="text-yellow-500">{`⭐ ${product.rating} (${product.reviews} reviews)`}</p>
      </div>
    );
  }