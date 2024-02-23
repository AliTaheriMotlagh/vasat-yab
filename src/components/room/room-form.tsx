"use client";

import * as z from "zod";
import { useEffect, useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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
import { Button } from "@/components/ui/button";
import { room } from "@/actions/room";
import { allFriend } from "@/actions/all-friend";
import { useCurrentLocation } from "@/store/use-current-location";
import { useMyFriends } from "@/store/use-my-friends";
import { CreateRoomSchema } from "@/schemas/room";
import InviteFriendsModal from "@/app/mehrad/_components/invite-friends-modal";
import { useInvitedFriends } from "@/store/use-invited-friends";
import { useRouter } from "next/navigation";

export const RoomForm = () => {
  const { coordinate, isCoordinateSet } = useCurrentLocation((state) => state);
  const { invitedFriends } = useInvitedFriends((state) => state);

  const { friends, setFriends } = useMyFriends((state) => state);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof CreateRoomSchema>>({
    resolver: zodResolver(CreateRoomSchema),
    defaultValues: {
      title: new Date().toLocaleString(),
      creatorLocation: undefined,
      invitedFriends: undefined,
    },
  });

  let inviteFriendBtn = useRef<HTMLButtonElement>(null);

  const openInviteFriend = () => {
    inviteFriendBtn?.current?.click();
  };

  const onSubmit = (values: z.infer<typeof CreateRoomSchema>) => {
    if (!isCoordinateSet) {
      toast.error("select your location!");
      return;
    }

    if (invitedFriends.length == 0) {
      toast.error("select some friend!");
      return;
    }

    console.log(values.invitedFriends);

    startTransition(() => {
      room(values)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.info(data.success);
            router.push(`/room/${data.data.url}`);
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  const getAllFriends = async () => {
    startTransition(() => {
      allFriend()
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            setFriends(data.data);
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  useEffect(() => {
    if (isCoordinateSet) {
      openInviteFriend();
    }
  }, [coordinate]);

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
                <InviteFriendsModal users={friends}>
                  <Button
                    ref={inviteFriendBtn}
                    className="w-full transform rounded-lg  text-sm font-bold uppercase tracking-wider shadow-lg transition hover:-translate-y-0.5  focus:outline-none focus:ring  focus:ring-opacity-50 focus:ring-offset-2 sm:text-base"
                  >
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
                        <FormField
                          control={form.control}
                          name="invitedFriends"
                          defaultValue={invitedFriends}
                          render={({ field }) => <></>}
                        />
                      </div>
                      <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full transform rounded-lg bg-brand text-sm font-bold uppercase tracking-wider text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-light focus:outline-none focus:ring focus:ring-brand focus:ring-opacity-50 focus:ring-offset-2 sm:text-base"
                      >
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
