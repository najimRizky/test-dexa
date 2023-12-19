import { NextRequest, NextResponse } from "next/server"

export const GET = async () => {
  try {
    return NextResponse.json({ message: "GET All" })
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500, statusText: "Internal Server Error" });
  }
}

export const POST = async (request: NextRequest) => {
  try {
    return NextResponse.json({ message: "Create" })
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500, statusText: "Internal Server Error" });
  }
}