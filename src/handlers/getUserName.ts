import { cookies } from "next/headers";
import { AuthError } from "./AuthError";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function getUserName(){
    try{
        const cookieStore = await cookies()
        const userIdCookie = cookieStore.get("userId");
    
        if (!userIdCookie || !userIdCookie.value) {
            throw new AuthError("Please login before accessing the products", 401);
          }
        
          let decodedData: JwtPayload;
          try {
            decodedData = jwt.verify(
              userIdCookie.value,
              process.env.JWT_TOKEN_SECRET as string
            ) as JwtPayload;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            throw new AuthError("Invalid token: " + error.message, 401);
          }
        
          if (!decodedData.id) {
            throw new AuthError("Invalid token: User ID missing", 400);
          }
    
          return decodedData.firstName
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new AuthError(error.message, error.statusCode || 500); // Ensure correct status code
      }
  
}