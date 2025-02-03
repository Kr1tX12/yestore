import React from "react";
import { DataStoredChart } from "../../components/charts/data-stored-chart";
import MostBiggestFiles from "../../components/charts/most-biggest-files";
import { FileTypesChart } from "../../components/charts/file-types-chart";
import LatestFiles from "../../components/charts/latest-files";
import HeaderStats from "../../components/charts/header-stats";
import { getDashboardStats } from "@/lib/actions/files.actions";
import { DashboardStatsType } from "../../../../../types";

const cols = 3;
const getContent = (stats: DashboardStatsType) => [
  <MostBiggestFiles stats={stats} />,
  <FileTypesChart stats={stats} />,
  <LatestFiles stats={stats} />,
];

const generateBentoGrid = (cols: number, content: React.JSX.Element[]) => {
  // Создаем массив колонок
  const columns = Array.from({ length: cols }, () => [] as React.JSX.Element[]);

  // Распределяем элементы по колонкам
  content.forEach((item, index) => {
    const colIndex = index % cols;
    columns[colIndex].push(item);
  });

  // Возвращаем готовые JSX-элементы
  return columns.map((column, colIndex) => (
    <div key={colIndex} className="flex flex-col gap-8 flex-1">
      {column.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  ));
};

const StatsPage = async () => {
  const stats = await getDashboardStats();
  return (
    <div className="mt-8 p-8">
      <HeaderStats stats={stats} />
      <div className="flex gap-8">
        {generateBentoGrid(cols, getContent(stats))}
      </div>
    </div>
  );
};

export default StatsPage;
