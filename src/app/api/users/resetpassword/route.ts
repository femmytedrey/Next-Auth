import { connectToDb } from "@/dbConfig/connectToDb";
import { User } from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connectToDb();

export const PATCH = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { token, password } = reqBody;
    // //console.log(token, password, "here i am")

    //findUser based on the forgotpasswordtoken
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    //console.log(user, "here is the user")

    if (!user) {
      return NextResponse.json(
        { error: "token expired or invalid" },
        { status: 400 }
      );
    }

    // Check if the token has expired
    if (user.forgotPasswordTokenExpiry < Date.now()) {
      return NextResponse.json(
        { error: "Token has expired. Please request a new password reset." },
        { status: 400 }
      );
    }

    //console.log(user);

    //hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    user.password = hashPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Password is successfully reset",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
