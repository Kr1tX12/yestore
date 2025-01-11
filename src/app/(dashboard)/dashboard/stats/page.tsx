import React from "react";
import { DataStoredChart } from "../../components/charts/data-stored-chart";
import MostBiggestFiles from "../../components/charts/most-biggest-files";
import { FileTypesChart } from "../../components/charts/file-types-chart";
import LatestFiles from "../../components/charts/latest-files";

const StatsPage = () => {
  return (
    <div className="mt-16 px-4 grid grid-cols-3 gap-8">
      <DataStoredChart />
      <MostBiggestFiles />
      <FileTypesChart />
      <LatestFiles />
    </div>
  );
};

export default StatsPage;
