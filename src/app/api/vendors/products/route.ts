import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import Connection from "@/dbConfig/dbConfig";
import Vendor from "@/models/vendorModel";
import { getUserVendorId } from "@/handlers/getUserVendorId";
import generateEmbeddingAWS from "@/handlers/generateEmbeddingAWS";

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};
const region = process.env.AWS_REGION;

const s3Client = new S3Client({ region: region, credentials: credentials });
const bucketName = "swiftthreadproducts";

Connection();

export async function POST(req: NextRequest) {
  try {
    // u can add check to check the user is a vendor then only let them add products. although it is not required
    const reqBody = await req.formData();
    const title = reqBody.get("title") as string;
    const description = reqBody.get("description") as string;
    const sizes = reqBody.getAll("sizes") as string[];
    const price = reqBody.get("price") as string;
    const gender = reqBody.get("gender") as string;
    const material = reqBody.get("material") as string;
    const imageFiles = reqBody.getAll("images") as File[];
    const category = reqBody.get("category") as string;
    const brand = reqBody.get("brand") as string
    console.log({
      title:title,
      description:description,
      sizes:sizes,
      price:price,
      gender:gender,
      material:material,
      imageFiles:imageFiles,
      category:category,
      brand:brand
    });
    
    if (
      !title ||
      !description ||
      !sizes ||
      !price ||
      !gender ||
      !material ||
      imageFiles.length === 0 ||
      !category || 
      !brand
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    for (const imageFile of imageFiles) {
      if (!imageFile.type.startsWith("image/")) {
        return NextResponse.json(
          { message: "Invalid file type, only images are feasible" },
          { status: 400 }
        );
      }
    }

    const existingProduct = await Product.findOne({ title });
    if (existingProduct) {
      return NextResponse.json(
        { message: "Product already exists!" },
        { status: 400 }
      );
    }
    const textEmbedding = await generateEmbeddingAWS(`Title:${title} Brand:${brand} Material${material} Category:${category}}`);
    const imageUrls: string[] = [];

    for (const imageFile of imageFiles) {
      const params = {
        Bucket: bucketName,
        Key: `products/${Date.now()}-${Math.random()
          .toString(36)
          .substring(7)}-${imageFile.name}`,
        Body: Buffer.from(await imageFile.arrayBuffer()), // Use arrayBuffer for compatibility
        ContentType: imageFile.type,
      };

      await s3Client.send(new PutObjectCommand(params));
      const fileUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${params.Key}`;
      imageUrls.push(fileUrl);
    }
    
    const newProduct = new Product({
      title,
      description,
      sizes,
      price,
      gender,
      material,
      productImages: imageUrls,
      category,
      embedding:textEmbedding,
      brand,
    });

    const val = await newProduct.save();
    const userId = await getUserVendorId('vendors')
    const updatedDocument = await Vendor.findByIdAndUpdate(
      { _id: userId },
      { $push: { createdProducts: val._id } }, // Use $push to add to the array
      { new: true, runValidators: true } // Options: return updated document, run validators
    );

    if (!updatedDocument) {
      return NextResponse.json(
        { message: "Document Not Found!" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Product added in the stock" },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, {
      status: error.statusCode || 500,
    });
  }
}

export async function GET() {
  // ToDo: send all the products added by specific user
  try {
    const userId = await getUserVendorId('vendors')
    const userInfo = await Vendor.findById(userId);

    if (!userInfo) {
      return NextResponse.json(
        { message: "Vendor is not registered, yet!" },
        { status: 400 }
      );
    }

    const products = [];
    for (const id of userInfo.createdProducts) {
      const product = await Product.findById(id);
      if (product) {
        products.push(product);
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

export async function PUT(req: NextRequest) {
  try {
    const reqBody = await req.formData();

    const title = reqBody.get("title") as string;
    const description = reqBody.get("description") as string;
    const sizes = reqBody.getAll("sizes") as string[];
    const price = reqBody.get("price") as string;
    const gender = reqBody.get("gender") as string;
    const material = reqBody.get("material") as string;
    const imageFiles = reqBody.getAll("images") as File[];
    const id = reqBody.get("id") as string;

    if (
      !title ||
      !description ||
      !sizes ||
      !price ||
      !gender ||
      !material ||
      !id
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    for (const imageFile of imageFiles) {
      if (!imageFile.type.startsWith("image/")) {
        return NextResponse.json(
          { message: "Invalid file type, only images are feasible" },
          { status: 400 }
        );
      }
    }
    const imageUrls: string[] = [];

    for (const imageFile of imageFiles) {
      const params = {
        Bucket: bucketName,
        Key: `products/${Date.now()}-${Math.random()
          .toString(36)
          .substring(7)}-${imageFile.name}`,
        Body: Buffer.from(await imageFile.arrayBuffer()), // Use arrayBuffer for compatibility
        ContentType: imageFile.type,
      };

      await s3Client.send(new PutObjectCommand(params));
      const fileUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${params.Key}`;
      imageUrls.push(fileUrl);
    }

    const product = await Product.findByIdAndUpdate(
      id,
      {
        title,
        description,
        sizes, // Directly replacing sizes is fine
        price,
        gender,
        material,
        $push: { productImages: { $each: imageUrls } }, // Append new images
      },
      { new: true, runValidators: true }
    );
    if (!product) {
      return NextResponse.json(
        { message: "Product not found!" },
        { status: 400 }
      );
    }

    return NextResponse.json({message:'Product updated successfully!'},{status:200})
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, {
      status: error.statusCode || 500,
    });
  }
}  // use one instance of aws upload image code do not repeat the code
export async function DELETE(req:NextRequest){
  try{
    const url = new URL(req.url); // Create a URL object from the request URL
    const id = url.searchParams.get('id');

    if(!id){
      return NextResponse.json({message:'id is required!'},{status:400})
    }
    
    const userId = await getUserVendorId('vendors')
    const userInfo = await Vendor.findById(userId);

    if (!userInfo) {
      return NextResponse.json(
        { message: "Vendor is not registered, yet!" },
        { status: 400 }
      );
    }
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    const vendorInfoUpdated = await Vendor.findByIdAndUpdate(userId,{$pull:{createdProducts:id}}, { new: true, runValidators: true });
    if(!vendorInfoUpdated){
      return NextResponse.json(
        { message: "Vendor Not Exist!" },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: `Product deleted successfully!`, deletedProduct },{status:200});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }catch(error:any){
    return NextResponse.json({ message: error.message }, {
      status: error.statusCode || 500,
    });
  }
}
