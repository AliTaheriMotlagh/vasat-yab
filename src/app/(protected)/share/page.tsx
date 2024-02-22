import { GetLocation } from "@/components/map/get-location";
import { CreateRoomCard } from "@/components/room/create-room-card";

const SharePage = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <GetLocation />
        <CreateRoomCard />
      </div>
    </>
  );
};

export default SharePage;
