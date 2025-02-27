'use client'
import ProductDetails from "@/components/ProductsSection/ProductDetails"
import axios from "axios"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Link from "next/link"
import Loader from "@/components/Loaders/page"

interface Product {
  _id: string,
  title: string,
  price: string,
  description: string,
  sizes: string[],
  gender: string,
  material: string,
  productImages: string[],
  discountedPrice: string,
  starDistribution: {
    fiveStar: number,
    fourStar: number,
    threeStar: number,
    twoStar: number,
    oneStar: number,
  },
  comments: Comment[]
}

export default function ProductPage() {
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(1);

    const params = useParams();
    const id = params.id;

    const handleCommentSubmit = async () => {
        try {
          const response = await axios.post(`/api/product/comments`, { newComment, newRating, id });
          toast.success(response.data.message);
          window.location.reload();
        } catch (error: any) {
          toast.error(error.message);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/product?id=${id}`);
                setProduct(response.data.product);
                setRelatedProducts(response.data.relatedProducts);
                setLoading(false);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                toast.error(error.message);
                setError(true);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <h1 className="text-4xl font-bold text-gray-700">Product Not Found</h1>
                <p className="text-gray-500 mt-2">{`Sorry, we couldn't find the product you're looking for.`}</p>
                <Link href="/" className="mt-4 bg-black text-white px-4 py-2 rounded-lg">Go Back</Link>
            </div>
        );
    }

    return (
        <ProductDetails
            product={product}
            relatedProducts={relatedProducts}
            handleCommentSubmit={handleCommentSubmit}
            newComment={newComment}
            setNewComment={setNewComment}
            newRating={newRating}
            setNewRating={setNewRating}
        />
    );
}
