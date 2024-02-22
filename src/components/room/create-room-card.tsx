"use client";

import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { room } from "@/actions/room";
import { allFriend } from "@/actions/all-friend";
import { useCurrentLocation } from "@/store/use-current-location";
import { useMyFriends } from "@/store/use-my-friends";
import { CreateRoomSchema } from "@/schemas/room";
import InviteFriendsModal from "@/app/mehrad/_components/invite-friends-modal";

export const CreateRoomCard = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const { coordinate, removeCoordinate } = useCurrentLocation((state) => state);

  const { friends, setFriends } = useMyFriends((state) => state);

  const form = useForm<z.infer<typeof CreateRoomSchema>>({
    resolver: zodResolver(CreateRoomSchema),
    defaultValues: {
      title: undefined,
      creatorLocation: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof CreateRoomSchema>) => {
    startTransition(() => {
      room(values)
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
            setFriends(data.data);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  useEffect(() => {
    getAllFriends();
  }, []);

  return (
    <>
      <div className=" flex flex-col gap-4">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                Are you absolutely sure this is your location?
              </CardTitle>
              <CardDescription>
                you are sharing it with your friend!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <InviteFriendsModal
                  users={friends}
                  title="Create channel"
                  description="all users in chanel are can see your location"
                >
                  <Button className="w-full transform rounded-lg  text-sm font-bold uppercase tracking-wider shadow-lg transition hover:-translate-y-0.5  focus:outline-none focus:ring  focus:ring-opacity-50 focus:ring-offset-2 sm:text-base">
                    ☎️ Add friend
                  </Button>
                </InviteFriendsModal>
                <div>
                  <Form {...form}>
                    <form
                      className="space-y-6"
                      onSubmit={form.handleSubmit(onSubmit)}
                    >
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="John Party"
                                  disabled={isPending}
                                  autoComplete="off"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="creatorLocation.latitude"
                          defaultValue={coordinate.latitude}
                          render={({ field }) => <></>}
                        />
                        <FormField
                          control={form.control}
                          name="creatorLocation.longitude"
                          defaultValue={coordinate.longitude}
                          render={({ field }) => <></>}
                        />
                      </div>
                      <FormError message={error} />
                      <FormSuccess message={success} />
                      <Button disabled={isPending} type="submit">
                        Save
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
