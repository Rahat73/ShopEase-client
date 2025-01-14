import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: { month: string; products: number }[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const labels = data.map((item) => item.month);
  const values = data.map((item) => item.products);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Products Ordered",
        data: values,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Products Ordered Per Month",
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
