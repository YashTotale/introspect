// React Imports
import React, { FC } from "react";
import ApexChart from "react-apexcharts";

// Material UI Imports
import { useTheme } from "@material-ui/core";

interface BarChartProps {
  title: string;
  y: string;
  categories: (string | number)[];
  data: number[];
}

const BarChart: FC<BarChartProps> = ({ title, y, categories, data }) => {
  const theme = useTheme();

  return (
    <ApexChart
      type="bar"
      series={[
        {
          name: y,
          data,
        },
      ]}
      options={{
        title: {
          text: title,
          align: "left",
          style: {
            color: theme.palette.text.primary,
            fontFamily: theme.typography.fontFamily,
          },
        },
        theme: {
          mode: theme.palette.type,
        },
        colors: [theme.palette.primary.dark],
        grid: {
          borderColor: "#555",
        },
        dataLabels: {
          enabled: false,
        },
        yaxis: {
          title: {
            text: y,
            style: {
              color: theme.palette.text.primary,
              fontFamily: theme.typography.fontFamily,
            },
          },
          labels: {
            show: true,
            style: {
              colors: theme.palette.text.primary,
            },
          },
        },
        xaxis: {
          categories,
          labels: {
            show: true,
            hideOverlappingLabels: true,
            trim: true,
            style: {
              colors: theme.palette.text.primary,
            },
          },
          axisTicks: {
            show: false,
          },
        },
      }}
    />
  );
};

export default BarChart;
