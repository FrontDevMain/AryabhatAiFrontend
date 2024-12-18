import { useTheme } from "@mui/material";
import { useState, memo } from "react";
import ReactApexChart from "react-apexcharts";

type seriesType = {
  name: string;
  data: [number];
}[];

function LineChart({ series }: { series: { name: string; data: number[] }[] }) {
  const theme = useTheme();
  const [state, setState] = useState({
    options: {
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.5,
        },
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: [theme.palette.primary.main, theme.palette.secondary.main],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      // title: {
      //   text: "Average High & Low Temperature",
      //   align: "left",
      // },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 0,
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        title: {
          text: "Month",
        },
      },
      yaxis: {
        // title: {
        //   text: "Temperature",
        // },
        min: 5,
        max: 40,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  });
  return (
    <ReactApexChart
      options={state.options as any}
      series={series}
      type="line"
      height={350}
    />
  );
}

export default memo(LineChart);
