import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient();

export const GET = async (_: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const task = await prisma.task.findUnique({ where: { Id: id } });

    if (!task) {
      return NextResponse.json({ message: "Not found" }, { status: 404, statusText: "Not Found" });
    }

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500, statusText: "Internal Server Error" });
  }
}

export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const {
      Title,
      Description,
      Status,
    } = await request.json();

    const task = await prisma.task.update({ where: { Id: id }, data: { Title, Description, Status } });
    
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500, statusText: "Internal Server Error" });
  }
}

export const DELETE = async (_: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    await prisma.task.delete({ where: { Id: id } });
    return NextResponse.json({ message: `Delete ${id}` })
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500, statusText: "Internal Server Error" });
  }
}