// handling cart related calls

import Connection from "@/dbConfig/dbConfig";
import { getUserVendorId } from "@/handlers/getUserVendorId";
import Product from "@/models/productModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

Connection()
export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const id = reqBody.id as string; // Fixing how ID is extracted
    
        // Now getUserVendorId() returns userId or throws an error
        const userId = await getUserVendorId('users');
    
        const userInfo = await User.findByIdAndUpdate(
          userId,
          { $addToSet: { cartProducts: id } }, // Ensures no duplicate entries
          { new: true, runValidators: true }
        );
    
        if (!userInfo) {
          return NextResponse.json(
            { message: "User is not registered, yet!" },
            { status: 400 }
          );
        }
    
        return NextResponse.json(
          { message: "Product added to your cart successfully!" },{status:200}
        );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return NextResponse.json({ message: error.message }, {
          status: error.statusCode || 500,
        });
      }
}

export async function PUT(req: NextRequest) {
    try {
        const url = new URL(req.url); // Create a URL object from the request URL
        const id = url.searchParams.get('id'); // Fixing how ID is extracted
    
        // Now getUserVendorId() returns userId or throws an error
        const userId = await getUserVendorId('users');
    
        const userInfo = await User.findByIdAndUpdate(
          userId,
          { $pull: { cartProducts: id } },
          { new: true, runValidators: true }
        );
    
        if (!userInfo) {
          return NextResponse.json(
            { message: "User is not exist!" },
            { status: 400 }
          );
        }
    
        return NextResponse.json(
          { message: "Product removed from cart successfully!" },{status:200}
        );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return NextResponse.json({ message: error.message }, {
          status: error.statusCode || 500,
        });
      }
}

export async function GET() {
    try {
        // Now getUserVendorId() returns userId or throws an error
        const userId = await getUserVendorId('users');
    
        const userInfo = await User.findById(userId)
    
        if (!userInfo) {
          return NextResponse.json(
            { message: "User is not exist!" },
            { status: 400 }
          );
        }
    // fetching products info
    const products = [];
    for (const id of userInfo?.cartProducts) {
      const product = await Product.findById(id).lean(); // used lean just to get plain javascript object instead of mongoose document 
      if (product) {
        const updatedProduct = {...product,quantity:1}
        products.push(updatedProduct);
      }
    }
    return NextResponse.json({ products: products }, { status: 200 });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return NextResponse.json({ message: error.message }, {
          status: error.statusCode || 500,
        });
      }
}



