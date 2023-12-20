import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export const GET = async () => {
  try {
    const tasks = Array(10).fill(0).map((_, index) => ({
      Title: `Task ${index + 1}`,
      Description: `Description ${index + 1}`,
      Status: ["To Do", "Done", "In Progress"][Math.floor(Math.random() * 3)]
    }))

    await prisma.task.createMany({ data: tasks })

    return NextResponse.json({ message: "Tasks created" })
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500, statusText: "Internal Server Error" });
  }
}