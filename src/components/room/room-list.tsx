import { currentUser } from "@/lib/auth";
import { getMyRooms, getRoomInfos } from "@/lib/room";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import SelectedUserList from "@/app/mehrad/_components/selected-users-list";
import Link from "next/link";
import { Button } from "../ui/button";
import { ListChecks, ListTodo } from "lucide-react";

interface RoomListProps {}

const RoomList = async () => {
  const user = await currentUser();
  const rooms = await getMyRooms(user?.id!);
  return (
    <>
      {rooms && (
        <div className="flex flex-col gap-4">
          {rooms.map((item) => {
            return (
              <div key={item.Room.id}>
                <Card>
                  <CardHeader>
                    <CardTitle>{item.Room.title}</CardTitle>
                    <CardDescription>
                      {item.Room.createdAt.toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-row justify-between">
                      <SelectedUserList
                        users={item.Room.RoomInfo.map((i) => i.User)}
                      />
                      <Link href={`/room/${item.Room.url}`}>
                        <Button className=" transform rounded-l text-sm font-bold uppercase tracking-wide shadow-lg transition hover:-translate-y-0.5 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-2 sm:text-base">
                          {item.Room.isFinished && <ListChecks></ListChecks>}
                          {!item.Room.isFinished && <ListTodo></ListTodo>}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default RoomList;
