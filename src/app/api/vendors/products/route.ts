import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import Connection from "@/dbConfig/dbConfig";
import { cookies } from "next/headers";
import User from "@/models/userModel";

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
    const reqBody = await req.formData();
    const title = reqBody.get("title") as string;
    const description = reqBody.get("description") as string;
    const sizes = reqBody.getAll("sizes") as string[];
    const price = reqBody.get("price") as string;
    const gender = reqBody.get("gender") as string;
    const material = reqBody.get("material") as string;
    const imageFiles = reqBody.getAll("images") as File[];

    if (!title || !description || !sizes || !price || !gender || !material || imageFiles.length === 0) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    for (const imageFile of imageFiles) {
      if (!imageFile.type.startsWith("image/")) {
        return NextResponse.json({ message : "Invalid file type, only images are feasible" }, { status: 400 });
      }
    }

    const existingProduct = await Product.findOne({ title });
    if (existingProduct) {
      return NextResponse.json({ message : "Product already exists!" }, { status: 400 });
    }

    const imageUrls: string[] = [];

    for (const imageFile of imageFiles) {
      const params = {
        Bucket: bucketName,
        Key: `products/${Date.now()}-${Math.random().toString(36).substring(7)}-${imageFile.name}`,
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
    });

    await newProduct.save();
    return NextResponse.json({message:"Product added in the stock"},{status:200})
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ message:error.message || "Failed to create product" }, { status: 500 });
  }
}

export async function GET(){  // ToDo: send all the products added by specific user 
     try {
       const cookieStore = await cookies()
       const userId = cookieStore.get('userId')
       
       console.log('after cookie',userId);
       
       if(!userId){
        return NextResponse.json({ message : "Please login, before accessing the products" }, { status: 400 });
       }
       
       console.log('after userid exists');
       //ToDo, we can not user userId to find user so store _id as userId or pass email to find
       
       const userInfo = await User.findById(userId)

       if(!userInfo){
        return NextResponse.json({ message : "User no more exists" }, { status: 400 });
       }
      

       const products = []
       for (const id of userInfo.createdProducts){
           const product = await Product.findById(id)
           products.push(product)
       }

       return NextResponse.json({products:products},{status:200})

     } catch (error) {
      return NextResponse.json({ message:error.message || "Failed to create product" }, { status: 500 });
     }
}
