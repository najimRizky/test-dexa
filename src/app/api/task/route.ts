import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient();

export const GET = async () => {
  try {
    const tasks = await prisma.task.findMany({ orderBy: [{ updatedAt: 'desc' }, { Title: 'asc' }] })
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500, statusText: "Internal Server Error" });
  }
}

export const POST = async (request: NextRequest) => {
  try {
    const {
      Title,
      Description,
      Status,
    } = await request.json();

    await prisma.task.create({
      data: {
        Title,
        Description,
        Status,
      }
    });
    return NextResponse.json({ message: "Task created" });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500, statusText: "Internal Server Error" });
  }
}