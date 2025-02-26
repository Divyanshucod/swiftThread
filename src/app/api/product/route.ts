import Product from "@/models/productModel"
import { NextRequest, NextResponse } from "next/server"
import Connection from "@/dbConfig/dbConfig";

Connection()
export async function GET(req:NextRequest){
    try{
        const url = new URL(req.url)
        const productId = url.searchParams.get('id') as string
        console.log(productId);
        
        const product = await Product.findById(productId)
        console.log(product);
        
        if(!product){
            return NextResponse.json({message:"Didn't find a product with the given id"},{status:400})
        }
        const relatedProducts = await Product.find({material:product.material},{ comments: 0, starDistribution: 0 }); // this should be generated based on recommendation system.
        return NextResponse.json({product: product,relatedProducts:relatedProducts},{status:200})
    }
    catch(error){
        return NextResponse.json({error},{status:500})
    }

}