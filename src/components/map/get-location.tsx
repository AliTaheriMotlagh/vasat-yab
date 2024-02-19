import MainMap from "@/components/map/main-map";

import ToolBox from "./tool-box";

//TODO Clean
const GetLocation = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="h-[400px] md:h-[600px]">
          <MainMap></MainMap>
        </div>
        <div>
          <ToolBox></ToolBox>
        </div>
      </div>
    </>
  );
};

export default GetLocation;
