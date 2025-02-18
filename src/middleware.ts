import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from "jwt-decode";

export function middleware(request: NextRequest) {

    const token = request.cookies.get("userId")?.value as string; // Get token from cookies
    
    const vendorRoutes = request.nextUrl.pathname.startsWith("/vendor");
    const publicRoutes = ["/login", "/signup"];

    // Allow public routes for all users (vendors, customers, guests)
    if (publicRoutes.includes(request.nextUrl.pathname)) {
        return NextResponse.next();
    }

    // If no token, redirect to login
    if (!token) {
        
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        const decodedToken: { isVendor: boolean } = jwtDecode(token);
        

        // If trying to access /vendor/* but not a vendor, redirect
        if (vendorRoutes && !decodedToken.isVendor) {
           
            return NextResponse.redirect(new URL("/login", request.url));
        }

        // Vendors can access only /vendor/*, /login, /signup
        if (decodedToken.isVendor && !vendorRoutes && !publicRoutes.includes(request.nextUrl.pathname)) {
           
            return NextResponse.redirect(new URL("/login", request.url));
        }

        return NextResponse.next();
    } catch (error) {
      
        return NextResponse.redirect(new URL("/login", request.url)); // Redirect if token is invalid
    }
}

// **Apply Middleware to Specific Routes**
export const config = {
    matcher: ['/((?!api|static|.*\\..*|_next).*)'], // Match almost all routes
};
