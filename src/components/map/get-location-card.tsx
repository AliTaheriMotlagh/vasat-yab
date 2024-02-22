"use client";

import { GetLocation } from "@/components/map/get-location";
import { CreateRoomCard } from "@/components/room/create-room-card";
import { useCurrentLocation } from "@/store/use-current-location";

const GetLocationCard = () => {
  const { isCoordinateSet } = useCurrentLocation((state) => state);
  return (
    <>
      <div className="flex flex-col gap-4">
        <GetLocation />
        {isCoordinateSet && <CreateRoomCard />}
      </div>
    </>
  );
};

export default GetLocationCard;
