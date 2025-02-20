import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthError } from "./AuthError";

export async function getUserVendorId(permissionedCategory:string): Promise<string> {
  try {
    const cookieStore = await cookies(); // Get cookie store
    const userIdCookie = cookieStore.get("userId"); // Retrieve cookie

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

    if(permissionedCategory === 'users'){
      if (decodedData.isVendor) {
        throw new AuthError("Only users can access this endpoint!", 403);
      }
    }else{
      if (!decodedData.isVendor) {
        throw new AuthError("Only vendors can access this endpoint!", 403);
      }
    }

    return decodedData.id; // Return the user ID
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new AuthError(error.message, error.statusCode || 500); // Ensure correct status code
  }
}
