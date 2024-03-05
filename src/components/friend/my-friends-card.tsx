"use client";

import { useEffect, useTransition } from "react";
import { toast } from "sonner";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { allFriend } from "@/actions/all-friend";
import { useMyFriends } from "@/store/use-my-friends";
import UserCard from "@/components/user/user-card";
import { Trash } from "lucide-react";
import { deleteFriend } from "@/actions/delete-friend";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const MyFriendsCard = () => {
  const [isPending, startTransition] = useTransition();

  const { friends, setFriends } = useMyFriends((state) => state);

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

  const onDeleteFriend = (friendId: string) => {
    startTransition(() => {
      deleteFriend({ friendId })
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            getAllFriends();
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  useEffect(() => {
    getAllFriends();
  }, []);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>My Friends</CardTitle>
        </CardHeader>
        <CardContent>
          {friends && (
            <div>
              {friends.map((item) => (
                <div key={item.id}>
                  <UserCard user={item}>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Trash className=" cursor-pointer" />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your friend.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 hover:bg-red-400"
                            onClick={() => {
                              onDeleteFriend(item.id);
                            }}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </UserCard>
                </div>
              ))}
            </div>
          )}

          {friends.length === 0 && (
            <div className="">
              <p className="">add some friend!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};
