import Product from "@/models/productModel"
import { NextResponse } from "next/server"
import Connection from "@/dbConfig/dbConfig";

Connection()
export async function GET(){
    try{
        const products = await Product.find({})
        console.log(products);
        
        return NextResponse.json({ProductInfo: products},{status:200})
    }
    catch(error){
        return NextResponse.json({error},{status:500})
    }

}