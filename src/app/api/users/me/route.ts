import { connectToDb } from "@/dbConfig/connectToDb";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { User } from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

connectToDb();

export const GET = async (request: NextRequest) => {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({ message: "User found", info: user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
