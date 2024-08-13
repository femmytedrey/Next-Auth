import { connectToDb } from "@/dbConfig/connectToDb";
import { User } from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectToDb();

const SECRET = process.env.SECRET;

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    //check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Email not found" }, { status: 400 });
    }

    //validate password
    const validatePassword = await bcryptjs.compare(password, user.password);
    if (!validatePassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    //create token data
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };
    //create token
    const token = await jwt.sign(tokenData, process.env.SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "login successful",
      success: true,
    });

    response.cookies.set("token", token, {
        httpOnly: true,
        sameSite: "strict",
    })
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
