import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const path = request.nextUrl.pathname
  const isPublicPath = path === "/login" || path ==="/signup" || path === "/verifyemail" || path === "/forgotpassword" || path === "/resetpassword"
  const token = request.cookies.get("token")?.value || null

  if(isPublicPath && token){
    return NextResponse.redirect(new URL("/", request.nextUrl))
  }

  if(!isPublicPath && !token){
    return NextResponse.redirect(new URL("/login", request.nextUrl))
  }
};

export const config = {
  matcher: ["/", "/profile", "/profile/:path*", "/login", "/signup", "/verifyemail", "/forgotpassword", "/resetpassword"],
};
