"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { SearchUserSchema } from "@/schemas/friend";

export const searchUser = async (values: z.infer<typeof SearchUserSchema>) => {
  const self = await currentUser();

  if (!self) {
    return { error: "Unauthorized" };
  }

  const dbSelfUser = await getUserById(self.id);

  if (!dbSelfUser) {
    return { error: "Unauthorized" };
  }

  const validatedFields = SearchUserSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email } = validatedFields.data;

  const searchedUser = await db.user.findUnique({
    where: { email },
    // select: { id: true, email: true, image: true, name: true }, TODO:not all field user
  });

  if (!searchedUser) {
    return { error: "not found!" };
  }

  if (searchedUser.id === dbSelfUser.id) {
    return { error: "it your self!" };
  }

  return { data: searchedUser, success: true };
};
