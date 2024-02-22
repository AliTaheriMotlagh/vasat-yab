"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { type User } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { SearchUserSchema } from "@/schemas/friend";
import { searchUser } from "@/actions/search-user";
import { addFriend } from "@/actions/add-friend";
import { useMyFriends } from "@/store/use-my-friends";
import UserCard from "../../app/mehrad/_components/user-card";

export const SearchUserForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const [user, setUser] = useState<User | undefined>();
  const { friends } = useMyFriends((state) => state);

  const searchForm = useForm<z.infer<typeof SearchUserSchema>>({
    resolver: zodResolver(SearchUserSchema),
    defaultValues: {
      email: undefined,
    },
  });

  const onSubmitSearchForm = (values: z.infer<typeof SearchUserSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    setUser(undefined);

    startTransition(() => {
      searchUser(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            setUser(data.data);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  const onAddFriend = () => {
    if (!user) {
      return false;
    }
    const friendId = user.id;

    setError(undefined);
    setSuccess(undefined);
    setUser(undefined);

    startTransition(() => {
      addFriend({ friendId })
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  const isMyFriend = (friendId: String): boolean => {
    return friends?.some((item) => item.id === friendId);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <p className="text-center text-2xl font-semibold">👋 Friends</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Form {...searchForm}>
              <form
                className="space-y-6"
                onSubmit={searchForm.handleSubmit(onSubmitSearchForm)}
              >
                <div className="space-y-4">
                  <FormField
                    control={searchForm.control}
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
                            autoComplete="false"
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
              </form>
            </Form>
            <div>
              {user && (
                <span onClick={onAddFriend} className=" cursor-pointer">
                  <UserCard
                    user={user!}
                    checked={isMyFriend(user.id)}
                    addFriendIcon={!isMyFriend(user.id)}
                  />
                </span>
              )}
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>
        </CardContent>
      </Card>
    </>
  );
};
