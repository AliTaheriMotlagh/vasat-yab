import RoomCard from "@/components/room/room-card";

interface RoomPageProps {
  params: {
    slug: string;
  };
}

const RoomPage = async ({ params }: RoomPageProps) => {
  return (
    <>
      <RoomCard url={params.slug} />
    </>
  );
};

export default RoomPage;
