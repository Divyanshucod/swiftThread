import Connection from "@/dbConfig/dbConfig";
import { getUserName } from "@/handlers/getUserName";
import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";
const map = ['one','two','three','four','five']
Connection()
export async function POST(req:NextRequest){
    try {
        const reqBody = await req.json()
        const {newComment,newRating,id} = reqBody
        //getting name 
        console.log(newComment,newRating,id);
        
        const userName = await getUserName();
        const ratingField = `starDistribution.${map[newRating-1]}Star`;

        // Update product: Push new comment & increment corresponding star count
        const product = await Product.findByIdAndUpdate(
            id,
            {
                $push: { comments: { name: userName, comment: newComment, rating: newRating } },
                $inc: { [ratingField]: 1 }, // Increment the respective rating count
            },
            { runValidators: true, new: true }
        );

        if (!product) {
            return NextResponse.json({ message: "No product exists for the given ID" }, { status: 400 });
        }

        return NextResponse.json({message:"Comment added successfully!"},{status:200})
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}