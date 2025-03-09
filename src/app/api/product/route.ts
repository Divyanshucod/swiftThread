import Product from "@/models/productModel"
import { NextRequest, NextResponse } from "next/server"
import Connection from "@/dbConfig/dbConfig";

Connection()
export async function GET(req:NextRequest){
    try{
        const url = new URL(req.url)
        const productId = url.searchParams.get('id') as string
        
        const product = await Product.findById(productId)
        
        if(!product){
            return NextResponse.json({message:"Didn't find a product with the given id"},{status:400})
        }
        const relatedProducts = await Product.aggregate([
            {
              $search: {
                index: "embedding", 
                knnBeta: {
                  vector: product.embedding,
                  path: "embedding",
                  k: 5 // Number of similar products to fetch
                }
              }
            },
            {
              $match: { _id: { $ne: product._id } }
            },
            {
              $project: { comments: 0, starDistribution: 0 }
            }
          ]);// this should be generated based on recommendation system.
        return NextResponse.json({product: product,relatedProducts:relatedProducts},{status:200})
    }
    catch(error){
        return NextResponse.json({error},{status:500})
    }

}