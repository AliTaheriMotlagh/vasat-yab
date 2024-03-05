"use client";

import { useEffect, useTransition } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import UserCard from "@/components/user/user-card";
import { toast } from "sonner";
import { useNotifications } from "@/store/use-notifications";
import { allNotifications } from "@/actions/all-notifications";
import { FriendRequestsCard } from "@/components/friend/friend-requests-card";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRoomInfoId } from "@/store/use-room-info-id";

export const NotificationsCard = () => {
  const [isPending, startTransition] = useTransition();

  const { notifications, setNotifications } = useNotifications(
    (state) => state,
  );

  const { setRoomInfoId: setRoomInfo } = useRoomInfoId((state) => state);

  const router = useRouter();

  const onAcceptNotification = (roomUrl: string, roomInfoId: string) => {
    setRoomInfo(roomInfoId);
    router.push(`/invite/${roomUrl}`);
  };

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
      <div className="grid  gap-4 lg:grid-cols-3">
        <FriendRequestsCard />
        <Card>
          <CardHeader>
            <CardTitle>My Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            {notifications && (
              <div>
                {notifications.map((item) => (
                  <div key={item.id}>
                    <h2>{item.Room.title}</h2>
                    <UserCard user={item.Room.User}>
                      <Check
                        className=" cursor-pointer"
                        onClick={() => {
                          onAcceptNotification(item.Room.url, item.id);
                        }}
                      />
                    </UserCard>
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
      </div>
    </>
  );
};
