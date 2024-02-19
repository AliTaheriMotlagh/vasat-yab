"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCurrentLocation } from "@/store/use-current-location";
import { useLocation } from "@/store/use-location";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useEffect, useState } from "react";

const ToolBox = () => {
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);
  //TODO clean
  const coordinate = useCurrentLocation((state) => state.coordinate);
  const { isSet, onCancel, onSet } = useLocation((state) => state);

  const getLoc = () => {
    if (isSet) {
      onCancel();
    } else {
      onSet();
    }
  };
  return (
    <>
      <Card className="m-4 p-4">
        {render && (
          <Drawer>
            <DrawerTrigger className="w-full">
              <Button
                onClick={getLoc}
                className="w-full transform rounded-lg bg-brand text-sm font-bold uppercase tracking-wider text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-light focus:outline-none focus:ring focus:ring-brand focus:ring-opacity-50 focus:ring-offset-2 sm:text-base"
              >
                {isSet && <span>Cancel</span>}
                {!isSet && <span>Use This Location</span>}
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>
                  This action cannot be undone.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
      </Card>
    </>
  );
};

export default ToolBox;
