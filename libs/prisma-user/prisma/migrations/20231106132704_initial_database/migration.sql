-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'inactive', 'deactivate');

-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('normal', 'github', 'google');

-- CreateTable
CREATE TABLE "auth" (
    "user_id" VARCHAR(28) NOT NULL,
    "device" VARCHAR(128) NOT NULL,
    "refresh_token" VARCHAR(255),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "auth_pkey" PRIMARY KEY ("user_id","device")
);

-- CreateTable
CREATE TABLE "users" (
    "id" VARCHAR(28) NOT NULL,
    "phone" VARCHAR(15),
    "email" VARCHAR(64),
    "image" VARCHAR(128),
    "password" VARCHAR(128),
    "provider" "Provider" NOT NULL DEFAULT 'normal',
    "status" "Status" NOT NULL DEFAULT 'inactive',
    "role" "Role" NOT NULL DEFAULT 'user',
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "auth" ADD CONSTRAINT "auth_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
