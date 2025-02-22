
import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        const url = new URL(req.url)
        const gender = url.searchParams.get('gender') as string
        const price_min = url.searchParams.get('price_min')
        const price_max = url.searchParams.get('price_max') 
        const color = url.searchParams.get('color') as string 
        const category = url.searchParams.get('category') as string 
        const brand = url.searchParams.get('brand') as string 
        const page = url.searchParams.get('page') as string;
        const limit = 5;
       
        let filters = {};

    if (gender) filters.gender = gender;
    if (color) filters.color = color;
    if (category) filters.category = category;
    if (brand) filters.brand = brand;
    if (price_min || price_max) {
      filters.price = {};
      if (price_min) filters.price.$gte = parseFloat(parseInt(price_min));
      if (price_max) filters.price.$lte = parseFloat(parseInt(price_max));
    }
    
     // Pagination logic
     const skip = (parseInt(page) - 1) * limit; // Skips products from previous pages

     // Fetch products
     const products = await Product.find(filters)
       .skip(skip)
       .limit(limit);
 
     // Total count for frontend to know when to stop loading
     const totalProducts = await Product.countDocuments(filters);
 
     return NextResponse.json({page: parseInt(page),
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
        products}, {status:200})

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }

}