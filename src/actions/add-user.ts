"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { CreateRoomSchema } from "@/schemas/room";
import { SearchUserSchema } from "@/schemas/friend";

export const addUser = async (values: z.infer<typeof SearchUserSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  const validatedFields = SearchUserSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email } = validatedFields.data;

  //todo

  return { data: "Room Created!" };
};
