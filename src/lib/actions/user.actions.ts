"use server";

import bcrypt from "bcrypt";
import prisma from "../prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createUser({
  name,
  email,
  password,
  imageUrl,
}: {
  name: string;
  email: string;
  password: string;
  imageUrl: string;
}) {
  try {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: {
        email,
        hashedPassword,
        name,
        imageUrl,
      },
    });

    return {
      message: "Success",
    };
  } catch (error: any) {
    console.log(error);
    return {
      error: error.message,
    };
  }
}

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  return {
    id: currentUser?.id,
    name: currentUser?.name,
    email: currentUser?.email,
  };
}
