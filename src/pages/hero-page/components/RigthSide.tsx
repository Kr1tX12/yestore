import React from "react";
import { DemoChart } from "./DemoChart";
import Button from "@/components/aceternity/Button";
import { Chart1Data, Chart2Data } from "../data/ChartsData";



const RightSide = () => {
  return (
    <div className="flex gap-8 items-end justify-end pb-20 z-10 bg-grid-gray-800 relative mt-60">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-[#0a0a0a] bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black)]"></div>

      <div className="flex flex-col gap-8 items-center justify-end z-50">
        <DemoChart {...Chart2Data} />
        <div className="flex gap-8">
          <Button color="purple-100">Цены</Button>
        </div>
      </div>
      <div className="flex flex-col gap-8 items-center justify-end">
        <DemoChart {...Chart1Data} />
        <div className="flex gap-8">
          <Button color="lime-500">Приемущества</Button>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
