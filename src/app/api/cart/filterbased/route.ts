import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const gender = url.searchParams.get("gender") as string;
    const price_min = url.searchParams.get("price_min") as string;
    const price_max = url.searchParams.get("price_max") as string;
    const color = url.searchParams.get("color") as string;
    const category = url.searchParams.get("category") as string;
    const brand = url.searchParams.get("brand") as string;
    const title = url.searchParams.get("name") as string; // New: Product name search
    const page = url.searchParams.get("page") as string;
    const limit = 5;

    let filters: any = {};

    if (gender && gender !== '') filters.gender = gender;
    if (color && color !== '') filters.color = color;
    if (category && category !== '') filters.category = category;
    if (brand && brand !== '') filters.brand = brand;

    // 🔍 Add fuzzy search for product name
    if (title && title !== '') {
      filters.title = { $regex: title, $options: "i" }; // Case-insensitive and partial match
    }

    // 💰 Price range filter
    if ((price_min && price_min !== '') || (price_max && price_max !== '')){
      filters.price = {};
      if (price_min) filters.price.$gte = parseFloat(price_min);
      if (price_max) filters.price.$lte = parseFloat(price_max);
    }

    // 📄 Pagination logic
    const skip = (parseInt(page) - 1) * limit;
    console.log(filters);
    
    // 🔥 Fetch filtered products
    const products = await Product.find(filters).skip(skip).limit(limit);
    
    console.log(products);
    
    // 📊 Count total matching products
    const totalProducts = await Product.countDocuments(filters);

    return NextResponse.json(
      {
        page: parseInt(page),
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
        products,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
