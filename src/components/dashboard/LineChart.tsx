import { useTheme } from "@mui/material";
import { useState, memo } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/reducers";
import { preset } from "../settings/presets";

type seriesType = {
  name: string;
  data: [number];
}[];

function LineChart({ series }: { series: { name: string; data: number[] }[] }) {
  const theme = useTheme();
  const { theme: themeSetting } = useSelector(
    (state: RootState) => state.theme
  );
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
      colors: preset
        .filter((item) => item.main != theme.palette.primary.main)
        .map((item) => item.main) || [
        theme.palette.primary.main,
        theme.palette.secondary.main,
      ],
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
        show: false,
      },
      markers: {
        size: 0,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        axisBorder: {
          show: false, // Remove X-axis line
        },
        axisTicks: {
          show: false, // Remove X-axis ticks
        },
        labels: {
          style: {
            fontSize: theme.typography.fontSize, // Adjust font size here
            colors: theme.palette.text.primary, // Optional: font color
          },
        },
        // title: {
        //   text: "Month",
        // },
      },
      yaxis: {
        axisBorder: {
          show: false, // Remove X-axis line
        },
        axisTicks: {
          show: false, // Remove X-axis ticks
        },
        labels: {
          style: {
            fontSize: theme.typography.fontSize, // Adjust font size here
            colors: theme.palette.text.primary, // Optional: font color
          },
        },
        // title: {
        //   text: "Temperature",
        // },
      },
      tooltip: {
        theme: themeSetting.Theme_theme == "Light" ? "light" : "dark", // Optional: change the tooltip theme
        style: {
          fontSize: theme.typography.fontSize,
          color: theme.palette.text.primary, // Tooltip text color
        },
        y: {
          formatter: function (value: any) {
            return value; // Example of custom formatter
          },
        },
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
      height={300}
    />
  );
}

export default memo(LineChart);
