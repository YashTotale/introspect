// React Imports
import React, { FC } from "react";
import ApexChart from "react-apexcharts";

// Material UI Imports
import { useTheme } from "@material-ui/core";

interface LineChartProps {
  data: (string | number | null)[];
  categories: (string | number)[];
}

const LineChart: FC<LineChartProps> = ({ data, categories }) => {
  const theme = useTheme();

  return (
    <ApexChart
      series={[
        {
          name: "Rating",
          data,
        },
      ]}
      options={{
        theme: {
          mode: theme.palette.type,
        },
        chart: {
          height: 350,
          type: "area",
          foreColor: "#ccc",
          zoom: {
            type: "x",
            enabled: true,
            autoScaleYaxis: true,
          },
          toolbar: {
            autoSelected: "pan",
          },
        },
        colors: [theme.palette.primary[theme.palette.type]],
        stroke: {
          width: 3,
        },
        grid: {
          borderColor: "#555",
          clipMarkers: false,
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          gradient: {
            enabled: true,
            opacityFrom: 0.55,
            opacityTo: 0,
          },
        },
        markers: {
          size: 5,
          colors: ["#000524"],
          strokeColor: theme.palette.primary[theme.palette.type],
          strokeWidth: 3,
        },
        title: {
          text: "Rating over time",
          align: "left",
          style: {
            color: theme.palette.text.primary,
          },
        },
        yaxis: {
          min: 0,
          max: 5,
          tickAmount: 5,
          title: {
            text: "Rating",
            style: {
              color: theme.palette.text.primary,
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
          type: "datetime",
          categories,
          labels: {
            show: true,
            hideOverlappingLabels: true,
            trim: true,
            style: {
              colors: theme.palette.text.primary,
            },
          },
          axisBorder: {
            show: true,
            color: theme.palette.text.primary,
          },
          axisTicks: {
            show: true,
            color: theme.palette.text.primary,
          },
          tooltip: {
            enabled: true,
          },
        },
      }}
    />
  );
};

export default LineChart;
