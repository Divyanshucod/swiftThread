import Connection from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Vendor from '@/models/vendorModel'
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

Connection();

export async function POST(request: NextRequest) {
  try {
    //data structure : manual form : firstName,lastName,email,password
    //data structure : authProvider : FullName, ProfilePic, email,authId/Providerid

    const reqBody = await request.json();
    const {
      firstName,
      lastName,
      email,
      password,
      fullName,
      ProfilePic,
      providerId,
      provider,
      isVendor
    } = reqBody;
    console.log({
      fisrtName:firstName,
      lastName: lastName,
      email: email,
      password:password,
      isVendor:isVendor
    });
    

    let user = undefined
    if(isVendor){
    user = await User.findOne({ email: email });
    }
    else{
      user = await Vendor.findOne({ email: email });
    }
    // check user already exist
    if (user) {
      return NextResponse.json(
        { message: ` ${isVendor ? 'Vendor' : 'User'} already exist. please login!` },
        { status: 400 }
      );
    }
    // signup via authProvider
    if (providerId) {
      const nameSplit = fullName.split();
      if (nameSplit.length() === 1) {
        nameSplit.push("");
      }

      await createUser(
        firstName,
        lastName,
        email,
        ProfilePic,
        provider,
        providerId,
        password,
        isVendor
      );
      return NextResponse.json({ message: "User Created Successfully!" }, { status: 200 });
    } else {
        const salt = await bcryptjs.genSalt(10)
      const hashedPassword = await bcryptjs.hash(password,salt)
      const createdUser = await createUser(
        firstName,
        lastName,
        email,
        "",
        "manual",
        "",
        hashedPassword,
        isVendor
      );

      console.log(createdUser);

      return NextResponse.json({ message: ` ${isVendor ? 'Vendor' : 'User'} Created Successfully! `}, { status: 200 });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  profilePic: string,
  provider: string,
  providerId: string | null,
  password: string,
  isVendor: boolean
) {
  try {
    // If providerId is not provided, explicitly set it to null (to match schema)
    const formattedProviderId = providerId?.trim() ? providerId : null;

    // If the user signs up via OAuth (Google, etc.)
    if (provider !== 'manual') {
      const user = new User({
        firstName,
        lastName,
        email,
        profilePicture: profilePic,
        provider,
        providerId: formattedProviderId, // Will be null for manual users
      });

      await user.save();
      return user;
    } 
    
    // If the user signs up manually (email + password)
    if (!isVendor) {
      const user = new User({
        firstName,
        lastName,
        email,
        password,  // Store hashed password for security in actual implementation
        provider: 'manual',
        providerId: formattedProviderId, // Will be null for manual users
      });

      await user.save();
      return user;
    } 
    
    // If the user is a vendor
    const vendor = new Vendor({
      firstName,
      lastName,
      email,
      password, // Store hashed password for security
    });

    await vendor.save();
    return vendor;
    
  } catch (error) {
    console.error("Error in createUser function:", error);
    throw new Error("User creation failed.");
  }
}

