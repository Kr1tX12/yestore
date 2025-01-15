import React from "react";
import { DataStoredChart } from "../../components/charts/data-stored-chart";
import MostBiggestFiles from "../../components/charts/most-biggest-files";
import { FileTypesChart } from "../../components/charts/file-types-chart";
import LatestFiles from "../../components/charts/latest-files";
import HeaderStats from "../../components/charts/header-stats";

const cols = 3;
const content = [
  <DataStoredChart />,
  <MostBiggestFiles />,
  <FileTypesChart />,
  <LatestFiles />,
];

const generateBentoGrid = (cols: number, content: Array<React.JSX.Element>) => {
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

const StatsPage = () => {
  return (
    <div className="mt-8 p-8">
      <HeaderStats />
      <div className="flex gap-8">
        {generateBentoGrid(cols, content)}
      </div>
    </div>
  );
};

export default StatsPage;
