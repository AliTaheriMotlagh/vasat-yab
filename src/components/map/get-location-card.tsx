"use client";

import { GetLocation } from "@/components/map/get-location";
import { RoomForm } from "@/components/room/room-form";
import { useCurrentLocation } from "@/store/use-current-location";

const GetLocationCard = () => {
  const { isCoordinateSet } = useCurrentLocation((state) => state);
  return (
    <>
      <div className="flex flex-col gap-4">
        <GetLocation />
        {isCoordinateSet && <RoomForm />}
      </div>
    </>
  );
};

export default GetLocationCard;
