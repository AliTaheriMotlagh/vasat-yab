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

const ToolBox = () => {
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
      <Card className="p-4 m-4">
        <Drawer>
          <DrawerTrigger className="w-full">
            <Button
              onClick={getLoc}
              className="w-full rounded-lg transform transition bg-brand hover:bg-brand-light hover:-translate-y-0.5 focus:ring-brand focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-2 uppercase tracking-wider font-bold text-sm text-white shadow-lg sm:text-base">
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
      </Card>
    </>
  );
};

export default ToolBox;
