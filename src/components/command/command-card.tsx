"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export const CommandCard = () => {
  return (
    <div className="p-4 md:p-8">
      <Carousel orientation="vertical">
        <CarouselContent className="">
          <CarouselItem>
            <Link href="/share" className="cursor-pointer ">
              <div>
                <Card className=" transform cursor-pointer rounded-lg bg-brand  tracking-wider text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-light focus:outline-none focus:ring focus:ring-brand focus:ring-opacity-50 focus:ring-offset-2 active:bg-brand-dark">
                  <CardContent className="flex items-center justify-center p-6">
                    <span className="text-3xl font-semibold">
                      Create Room 📍
                    </span>
                  </CardContent>
                </Card>
              </div>
            </Link>
          </CarouselItem>
          <CarouselItem>
            <Link href="/rooms" className="cursor-pointer">
              <div>
                <Card>
                  <CardContent className="flex items-center justify-center p-6">
                    <span className="text-3xl font-semibold">Rooms 🚻</span>
                  </CardContent>
                </Card>
              </div>
            </Link>
          </CarouselItem>
          <CarouselItem>
            <Link href="/friends" className="cursor-pointer">
              <div>
                <Card>
                  <CardContent className="flex items-center justify-center p-6">
                    <span className="text-3xl font-semibold">
                      Friends 👨‍👩‍👦‍👧
                    </span>
                  </CardContent>
                </Card>
              </div>
            </Link>
          </CarouselItem>
          <CarouselItem>
            <Link href="/notifications" className="cursor-pointer">
              <div>
                <Card>
                  <CardContent className="flex items-center justify-center p-6">
                    <span className="text-3xl font-semibold">
                      Notifications 📩
                    </span>
                  </CardContent>
                </Card>
              </div>
            </Link>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};
