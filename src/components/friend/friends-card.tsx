"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useForm } from "react-hook-form";
import { SearchUserSchema } from "@/schemas/friend";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserByEmail } from "@/data/user";
import { searchUser } from "@/actions/search-user";
import { type User } from "@prisma/client";
import UserCard from "../../app/mehrad/_components/user-card";

export const FriendsCard = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const [seachedUser, setSeachedUser] = useState<User | undefined>();

  const form = useForm<z.infer<typeof SearchUserSchema>>({
    resolver: zodResolver(SearchUserSchema),
    defaultValues: {
      email: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SearchUserSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    setSeachedUser(undefined);

    startTransition(() => {
      searchUser(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.data) {
            setSuccess(data.success);
            setSeachedUser(data.data);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <p className="text-center text-2xl font-semibold">👋 Friends</p>
        </CardHeader>
        <CardContent>
          <div>
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="john.doe@example.com"
                            disabled={isPending}
                            type="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button className="w-full" disabled={isPending} type="submit">
                  seach
                </Button>
                <FormError message={error} />
                <FormSuccess message={success} />
              </form>
            </Form>
            <div className="mt-4">
              <UserCard user={seachedUser!} checked={false} />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
