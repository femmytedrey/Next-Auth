import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = NextResponse.json({
      message: "User logged out successfully",
      success: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      sameSite: "strict",
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to log user out" },
      { status: 500 }
    );
  }
};
