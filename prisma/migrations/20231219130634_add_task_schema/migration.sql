-- CreateTable
CREATE TABLE "Task" (
    "Id" TEXT NOT NULL,
    "Title" VARCHAR(255) NOT NULL,
    "Description" TEXT NOT NULL,
    "Status" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("Id")
);
