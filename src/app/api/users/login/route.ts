import Connection from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";
import Vendor from "@/models/vendorModel";

Connection();

export async function POST(request: NextRequest) {
  try {
    //data structure : manual form : firstName,lastName,email,password
    //data structure : authProvider : FullName, ProfilePic, email,authId/Providerid

    const reqBody = await request.json();
    const {
      email,
      password,
      provider,
      isVendor
    } = reqBody;
     console.log(
      reqBody
     );
     
    let user = undefined
    if(!isVendor){
       user = await User.findOne({email:email})
      if(!user){
        return NextResponse.json({message:"User doesn't exists.please sign up!"},{status:400})
       }
    console.log(user);
    }
    else{
      user = await Vendor.findOne({email:email})
      if(!user){
        return NextResponse.json({message:"Vendor doesn't exists.please sign up!"},{status:400})
       }
    console.log(user);
    }
    
     
     if(!provider){
        // compare password
        const matched = await bcryptjs.compare(password,user.password)
        console.log(
          'inside the pass check'
        );
        
        if(!matched){
            return NextResponse.json({message:"email or password is incorrect!"},{status:400})
        }
     }
    console.log('before the token creation');
    
    // token data 
    const tokenData = {
        id: user._id,
        firstName: user.firstName,
        email:user.email,
        isVendor:isVendor
    }

    // token  creation
    const token = await jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET!, { expiresIn: '1h' })
    console.log(
      'after token creation'
    );
    console.log(token);
    const cookieStore = await cookies();
    cookieStore.set('userId',token)
    return NextResponse.json({
        message:'Login Successfull',
        success:true
    },{status:200})
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
