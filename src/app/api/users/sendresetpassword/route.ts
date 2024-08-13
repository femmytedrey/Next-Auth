import { connectToDb } from "@/dbConfig/connectToDb";
import { sendEmail } from "@/helpers/mailer";
import { User } from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

connectToDb();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Email is not registered" },
        { status: 404 }
      );
    }

    //console.log(user);

    //send email
    await sendEmail({ email, emailType: "RESET", userId: user._id });
    return NextResponse.json({ message: "Email sent" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error sending email" }, { status: 500 });
  }
};
