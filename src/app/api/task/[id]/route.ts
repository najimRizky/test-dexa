import { NextRequest, NextResponse } from "next/server"

export const GET = async (_: NextRequest, { params }: { params: { id: string } }) => {
  try {
    return NextResponse.json({ message: `GET ${params.id}` })
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500, statusText: "Internal Server Error" });
  }
}

export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    return NextResponse.json({ message: `Update ${params.id}` })
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500, statusText: "Internal Server Error" });
  }
}

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    return NextResponse.json({ message: `Delete ${params.id}` })
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500, statusText: "Internal Server Error" });
  }
}