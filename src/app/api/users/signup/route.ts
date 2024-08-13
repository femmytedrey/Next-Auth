import { connectToDb } from "@/dbConfig/connectToDb";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModels";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectToDb();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    //console.log(reqBody);

    //check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "user already exists" },
        { status: 400 }
      );
    }

    //lets hash password
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);

    //create user
    const newUser = new User({
      username,
      email,
      password: hash,
    });

    const savedUser = await newUser.save();

    //console.log(savedUser);

    //send email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "user created successfully",
      success: true,
      savedUser,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "something went wrong",
      },
      { status: 500 }
    );
  }
};
