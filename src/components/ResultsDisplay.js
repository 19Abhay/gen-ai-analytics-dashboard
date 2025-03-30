import React from "react";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const ResultsDisplay = () => {
  const { currentResult } = useSelector((state) => state.query);

  if (!currentResult) {
    return null;
  }

  const renderChart = () => {
    const { chartType, chartData } = currentResult;

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: currentResult.title || "Data Visualization",
        },
      },
    };

    switch (chartType) {
      case "bar":
        return <Bar options={options} data={chartData} />;
      case "pie":
        return <Pie options={options} data={chartData} />;
      case "line":
        return <Line options={options} data={chartData} />;
      default:
        return <Bar options={options} data={chartData} />;
    }
  };

  return (
    <div className="card">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{currentResult.title}</h2>
        <p className="text-gray-600">{currentResult.description}</p>
      </div>

      <div className="h-80">{renderChart()}</div>

      {currentResult.insights && (
        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h3 className="font-medium text-blue-800 mb-2">Key Insights</h3>
          <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
            {currentResult.insights.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;
