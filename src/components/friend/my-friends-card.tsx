"use client";

import { useEffect, useState, useTransition } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { FormError } from "@/components/form-error";
import { allFriend } from "@/actions/all-friend";
import { useMyFriends } from "@/store/use-my-friends";
import UserCard from "../../app/mehrad/_components/user-card";

export const MyFriendsCard = () => {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const { friends, setFriends } = useMyFriends((state) => state);

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
      <Card>
        <CardHeader>
          <CardTitle>My Friends</CardTitle>
        </CardHeader>
        <CardContent>
          {friends && (
            <div>
              {friends.map((item) => (
                <div key={item.id}>
                  <UserCard user={item} checked={true} addFriendIcon={false} />
                </div>
              ))}
            </div>
          )}

          {friends.length === 0 && (
            <div className="">
              <p className="">add some friend!</p>
            </div>
          )}
          <FormError message={error} />
        </CardContent>
      </Card>
    </>
  );
};
