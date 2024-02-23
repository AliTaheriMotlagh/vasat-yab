"use client";

import { useEffect, useState, useTransition } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { acceptFriend } from "@/actions/accept-friend";
import { allFriendRequest } from "@/actions/all-friend-request";
import { useMyFriendsRequests } from "@/store/use-my-friend-requests";
import UserCard from "../../app/mehrad/_components/user-card";
import { toast } from "sonner";
import { useNotifications } from "@/store/use-notifications";
import { allNotifications } from "@/actions/all-notifications";

export const NotificationsCard = () => {
  const [isPending, startTransition] = useTransition();

  const { notifications, setNotifications } = useNotifications(
    (state) => state,
  );

  const onAcceptNotification = (roomInfoId: string) => {};

  const getAllNotifications = async () => {
    startTransition(() => {
      allNotifications()
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            setNotifications(data.data);
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  useEffect(() => {
    getAllNotifications();
  }, []);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>My Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          {notifications && (
            <div className=" cursor-pointer">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onAcceptNotification(item.id);
                  }}
                >
                  <h2>{item.Room.title}</h2>
                  <UserCard
                    user={item.User}
                    checked={true}
                    addFriendIcon={false}
                  />
                </div>
              ))}
            </div>
          )}
          {notifications.length === 0 && (
            <div className="">
              <p className="">No new notification!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};