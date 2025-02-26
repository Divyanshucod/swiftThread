'use client'
import ProductDetails from "@/components/ProductsSection/ProductDetails"
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
export default function ProductPage(){
    const [product,setProduct] = useState({})
    const [relatedProducts,setRelatedProducts] = useState([])
    const [error,setError] = useState(false)
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(1);
    const params = useParams()
    const id = params.id
    const handleCommentSubmit = async () => {
        try {
          const response = await axios.post(`api/product/comments`,{newComment,newRating,id})
          toast.success(response.data.message);
          window.location.reload()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
          toast.error(error.message)
        }
      };
    useEffect(()=>{
        const fetchProduct = async ()=>{
            console.log(id);
            
             try {
                const response = await axios.get(`/api/product?id=${id}`)
                console.log(response.data);
                 // update the api endpoint from poducts to product
                setProduct(response.data.product)
                setRelatedProducts(response.data.relatedProducts)
             // eslint-disable-next-line @typescript-eslint/no-explicit-any
             } catch (error:any) {
                toast.error(error.message)
                setError(true)
             }
        }
      fetchProduct()  
    },[id])
    return (
        <>
        {error === false ? <ProductDetails product={product} relatedProducts={relatedProducts} handleCommentSubmit={handleCommentSubmit} newComment={newComment} setNewComment={setNewComment} newRating={newRating} setNewRating={setNewRating}/> : <div>Not found</div>}
    </>
    )
}