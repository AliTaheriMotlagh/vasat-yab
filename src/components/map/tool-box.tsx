"use client";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useCurrentLocation } from "@/store/use-current-location";
import { useLocation } from "@/store/use-location";
import { useEffect } from "react";

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
      <h1>
        {coordinate.latitude}-{coordinate.longitude}
      </h1>
      <Card className="p-4 m-4">
        <Button
          onClick={getLoc}
          className="w-full rounded-lg transform transition bg-brand hover:bg-brand-light hover:-translate-y-0.5 focus:ring-brand focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-2 uppercase tracking-wider font-bold text-sm text-white shadow-lg sm:text-base">
          {isSet && <span>Cancel</span>}
          {!isSet && <span>Use This Location</span>}
        </Button>
      </Card>
    </>
  );
};

export default ToolBox;
