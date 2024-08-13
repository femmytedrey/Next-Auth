import { connectToDb } from "@/dbConfig/connectToDb";
import { User } from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

connectToDb();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    //console.log(token);

    //check if user already exists
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "token expired or invalid" },
        { status: 400 }
      );
    }

    //console.log(user)

    //update user
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({ message: "Email verified", success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
