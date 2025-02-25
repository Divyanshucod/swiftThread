import ProductDetails from "@/components/ProductsSection/ProductDetails"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
export default function ProductPage(){
    const [product,setProduct] = useState({})
    const [relatedProducts,setRelatedProducts] = useState([])
    const [error,setError] = useState(false)
    const router = useRouter()
    useEffect(()=>{
        const fetchProduct = async ()=>{
             try {
                const id = router.query.slug;
                const response = await axios.get(`/api/product?id=${id}`) // update the api endpoint from poducts to product
                setProduct(response.data.product)
                setRelatedProducts(response.data.relatedProducts)
             // eslint-disable-next-line @typescript-eslint/no-explicit-any
             } catch (error:any) {
                toast.error(error.message)
                setError(true)
             }
        }
      fetchProduct()  
    },[router.query.slug])
    return (
        <>
        {error === false ? <ProductDetails product={product} relatedProducts={relatedProducts}/> : <div>Not found</div>}
    </>
    )
}