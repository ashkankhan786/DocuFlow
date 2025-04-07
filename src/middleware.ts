import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("Middleware is running...");
  const session = getKindeServerSession(); // Get the session object

  if (!(await session.isAuthenticated())) {
    console.log("User is not authenticated, redirecting to login...");
    // Call the method on the session object
    return NextResponse.redirect(
      new URL("/api/auth/login?post_login_redirect_url=/dashboard", request.url)
    );
  }
  console.log("User is authenticated, allowing access.");
}

export const config = {
  matcher: ["/dashboard"],
};
