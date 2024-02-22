"use client";

import { useEffect, useState, useTransition } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { acceptFriend } from "@/actions/accept-friend";
import { allFriendRequest } from "@/actions/all-friend-request";
import { useMyFriendsRequests } from "@/store/use-my-friend-requests";
import UserCard from "../../app/mehrad/_components/user-card";

export const FriendRequestsCard = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const { friendRequests, setFriendRequests } = useMyFriendsRequests(
    (state) => state,
  );

  const onAcceptFriend = (friendId: string) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      acceptFriend({ friendId })
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            setSuccess(data.success);
            getAllFriendsRequest();
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
            setFriendRequests(data.data);
          }
        })
        .catch(() => setError("Something went wrong!"));
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
            <div className=" cursor-pointer">
              {friendRequests.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onAcceptFriend(item.id);
                  }}
                >
                  <UserCard user={item} checked={true} addFriendIcon={false} />
                </div>
              ))}
            </div>
          )}
          {friendRequests.length === 0 && (
            <div className="">
              <p className="">No new friend request!</p>
            </div>
          )}

          <FormError message={error} />
          <FormSuccess message={success} />
        </CardContent>
      </Card>
    </>
  );
};
