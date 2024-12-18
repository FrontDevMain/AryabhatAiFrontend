import { alpha, useTheme } from "@mui/material";
import { capitalCase, sentenceCase } from "change-case";
import { useState, memo } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/reducers";

function BarChart({
  series,
}: {
  series: {
    _id: string;
    queries: number;
  }[];
}) {
  const theme = useTheme();
  const { theme: themeSetting } = useSelector(
    (state: RootState) => state.theme
  );
  const [state, setState] = useState({
    series: [
      {
        name: "",
        data: series?.map((item) => item.queries),
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 300,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: "end",
          horizontal: true,
          barHeight: 20,
        },
      },
      colors: [theme.palette.primary.main, theme.palette.secondary.main],
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: series?.map((item) => item._id),
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
      },
      yaxis: {
        axisBorder: {
          show: false, // Remove Y-axis line
        },
        axisTicks: {
          show: false, // Remove Y-axis ticks
        },
        labels: {
          style: {
            fontSize: theme.typography.fontSize, // Adjust font size here
            colors: theme.palette.text.primary, // Optional: font color
          },
        },
      },
      tooltip: {
        theme: themeSetting.Theme_theme == "Light" ? "light" : "dark", // Optional: change the tooltip theme
        style: {
          fontSize: theme.typography.fontSize,
          color: theme.palette.text.primary, // Tooltip text color
        },
      },
      title: {
        text: "Top quired files",
        align: "start",
        style: {
          fontSize: theme.typography.fontSize,
          color: theme.palette.text.primary,
        },
      },
    },
  });
  return (
    <ReactApexChart
      options={state.options as any}
      series={state.series}
      type="bar"
      height={300}
    />
  );
}

export default memo(BarChart);
