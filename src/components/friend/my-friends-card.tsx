"use client";

import { useEffect, useTransition } from "react";
import { toast } from "sonner";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { allFriend } from "@/actions/all-friend";
import { useMyFriends } from "@/store/use-my-friends";
import UserCard from "../../app/mehrad/_components/user-card";
import { Check } from "lucide-react";

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
                    <Check />
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
