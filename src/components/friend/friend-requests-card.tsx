"use client";

import { useEffect, useState, useTransition } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { acceptFriend } from "@/actions/accept-friend";
import { allFriendRequest } from "@/actions/all-friend-request";
import { useMyFriendsRequests } from "@/store/use-my-friend-requests";
import UserCard from "@/components/user/user-card";
import { rejectFriend } from "@/actions/reject-friend";
import { toast } from "sonner";
import { Check, X } from "lucide-react";

export const FriendRequestsCard = () => {
  const [isPending, startTransition] = useTransition();

  const { friendRequests, setFriendRequests } = useMyFriendsRequests(
    (state) => state,
  );

  const onAcceptFriend = (friendId: string) => {
    startTransition(() => {
      acceptFriend({ friendId })
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            getAllFriendsRequest();
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  const onRejectFriend = (friendId: string) => {
    startTransition(() => {
      rejectFriend({ friendId })
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            getAllFriendsRequest();
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  const getAllFriendsRequest = async () => {
    startTransition(() => {
      allFriendRequest()
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            setFriendRequests(data.data);
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  useEffect(() => {
    getAllFriendsRequest();
  }, []);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>My Friend Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {friendRequests && (
            <div>
              {friendRequests.map((item) => (
                <UserCard user={item} key={item.id}>
                  <X
                    className=" cursor-pointer"
                    onClick={() => {
                      onRejectFriend(item.id);
                    }}
                  />
                  <Check
                    className=" cursor-pointer"
                    onClick={() => {
                      onAcceptFriend(item.id);
                    }}
                  />
                </UserCard>
              ))}
            </div>
          )}
          {friendRequests.length === 0 && (
            <div className="">
              <p className="">No new friend request!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};
