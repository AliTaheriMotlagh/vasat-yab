"use client";

import { acceptInvite } from "@/actions/accept-invite";
import { GetLocation } from "@/components/map/get-location";
import { useCurrentLocation } from "@/store/use-current-location";
import { useRoomInfoId } from "@/store/use-room-info-id";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { toast } from "sonner";

interface IAcceptInviteCardProps {}

const AcceptInviteCard = () => {
  const { isCoordinateSet, coordinate, removeCoordinate } = useCurrentLocation(
    (state) => state,
  );
  const { roomInfoId } = useRoomInfoId((state) => state);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const params = useParams<{ slug: string }>();

  const onAcceptInvite = async () => {
    if (!isCoordinateSet && !roomInfoId) {
      toast.error("invalid field!");
    }
    const formValue = {
      roomInfoId: roomInfoId,
      location: {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      },
    };
    startTransition(() => {
      acceptInvite(formValue)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.info(data.success);
            router.push(`/room/${params.slug}`);
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  useEffect(() => {
    if (isCoordinateSet) {
      onAcceptInvite();
    }
  }, [isCoordinateSet]);

  useEffect(() => {
    removeCoordinate();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        <GetLocation />
        {isCoordinateSet && <div></div>}
      </div>
    </>
  );
};

export default AcceptInviteCard;
