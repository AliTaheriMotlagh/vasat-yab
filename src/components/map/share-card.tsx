import { GetLocation } from "@/components/map/get-location";
import { RoomForm } from "@/components/room/room-form";

const ShareCard = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <GetLocation />
        <RoomForm />
      </div>
    </>
  );
};

export default ShareCard;
