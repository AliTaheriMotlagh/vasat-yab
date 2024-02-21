"use client";

import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { searchUser } from "@/actions/search-user";
import { Friend, type User } from "@prisma/client";
import UserCard from "../../app/mehrad/_components/user-card";
import { addFriend } from "@/actions/add-friend";
import { allFriend } from "@/actions/all-friend";
import { getAllFriend } from "@/data/friend";
import { acceptFriend } from "@/actions/accept-friend";
import { allFriendRequest } from "@/actions/all-friend-request";

export const FriendsCard = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const [seachedUser, setSeachedUser] = useState<User | undefined>();
  const [allFriendsState, setAllFriendsState] = useState<User[]>([]);
  const [allFriendsRequestedState, setallFriendsRequestedState] = useState<
    User[]
  >([]);

  const form = useForm<z.infer<typeof SearchUserSchema>>({
    resolver: zodResolver(SearchUserSchema),
    defaultValues: {
      email: undefined,
    },
  });

  const onSearchUser = (values: z.infer<typeof SearchUserSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    setSeachedUser(undefined);

    startTransition(() => {
      searchUser(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            setSeachedUser(data.data);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  const onAddFriend = () => {
    if (!seachedUser) {
      return false;
    }
    const friendId = seachedUser.id;

    setError(undefined);
    setSuccess(undefined);
    setSeachedUser(undefined);

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

  const onAcceptFriend = (friendId: string) => {
    setError(undefined);
    setSuccess(undefined);
    setSeachedUser(undefined);

    startTransition(() => {
      acceptFriend({ friendId })
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

  const getAllFriends = async () => {
    startTransition(() => {
      allFriend()
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            setAllFriendsState(data.data);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  const getAllFriendsRequest = async () => {
    startTransition(() => {
      allFriendRequest()
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            setallFriendsRequestedState(data.data);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  useEffect(() => {
    getAllFriends();
    getAllFriendsRequest();
  }, []);

  const isMyFriend = (friendId: String) => {
    return !!allFriendsState?.find((item) => {
      item.id === friendId;
    });
  };

  return (
    <>
      <div className="grid  gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <p className="text-center text-2xl font-semibold">👋 Friends</p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Form {...form}>
                <form
                  className="space-y-6"
                  onSubmit={form.handleSubmit(onSearchUser)}
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
                </form>
              </Form>
              <div>
                {seachedUser && (
                  <span onClick={onAddFriend} className=" cursor-pointer">
                    <UserCard
                      user={seachedUser!}
                      checked={isMyFriend(seachedUser.id)}
                      addFriendIcon={true}
                    />
                  </span>
                )}
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            {allFriendsRequestedState && (
              <div className=" cursor-pointer">
                {allFriendsRequestedState.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onAcceptFriend(item.id);
                    }}
                  >
                    <UserCard
                      user={item}
                      checked={true}
                      addFriendIcon={false}
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Friends</CardTitle>
          </CardHeader>
          <CardContent>
            {allFriendsState && (
              <div>
                {allFriendsState.map((item) => (
                  <div key={item.id}>
                    <UserCard
                      user={item}
                      checked={true}
                      addFriendIcon={false}
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};
