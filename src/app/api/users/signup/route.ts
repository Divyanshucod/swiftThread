import Connection from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
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
    } = reqBody;
    console.log({
      fisrtName:firstName,
      lastName: lastName,
      email: email,
      password:password
    });
    
    const user = await User.findOne({ email: email });
   
    // check user already exist
    if (user) {
      return NextResponse.json(
        { message: "User already exist. please login!" },
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
        password
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
        "",
        "",
        hashedPassword
      );

      console.log(createdUser);

      return NextResponse.json({ message: "User Created Successfully!" }, { status: 200 });
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
  providerId: string,
  password: string
) {
    try{
        if (providerId.length !== 0) {
            const user = new User({
              firstName: firstName,
              lastName: lastName,
              email: email,
              profilePicture: profilePic,
              provider: provider,
              providerId: providerId,
            });
        
            await user.save();
        
            return user;
          } else {
            const user = new User({
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password,
              provider:'manual'
            });
        
            await user.save();
        
            return user;
          }
    }
    catch(error){
        console.log("error in createUser function",error);
        
    }
  
}
