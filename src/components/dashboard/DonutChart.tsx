import { alpha, useTheme } from "@mui/material";
import { capitalCase, sentenceCase } from "change-case";
import { useState, memo } from "react";
import ReactApexChart from "react-apexcharts";

function DonutChart({
  series,
}: {
  series: {
    _id: string;
    file_count: number;
  }[];
}) {
  const theme = useTheme();
  const [state, setState] = useState({
    options: {
      chart: {
        type: "donut",
      },
      labels: series?.map((item) => item._id?.toUpperCase()),
      colors: ["#008080", "#F5B700", "#1B75BC"],
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                label: "Total",
                fontSize: theme.typography.fontSize,
                color: theme.palette.text.primary,
                formatter: () =>
                  `${series.reduce(
                    (acc, elem) => (acc += elem.file_count),
                    0
                  )}`,
                style: {
                  fontSize: "24px", // Font size for total text
                  fontWeight: "bold", // Font weight for total text
                  colors: ["#FF5733"], // Total text color (you can change this color)
                },
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
      },
      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
        labels: {
          fontSize: theme.typography.fontSize,
          colors: theme.palette.text.primary,
        },
        formatter: function (val: any, opts: any) {
          return (
            series[opts.seriesIndex]?._id?.toUpperCase() +
            " - " +
            (
              (series[opts.seriesIndex]?.file_count /
                series.reduce((acc, elem) => (acc += elem.file_count), 0)) *
              100
            ).toFixed(2) +
            "%"
          );
        },
      },
      title: {
        text: "File Types",
        style: {
          fontSize: theme.typography.fontSize,
          color: theme.palette.text.primary,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      states: {
        hover: {
          filter: {
            type: "none", // Disable hover effect
          },
        },
      },
    },
  });
  return (
    <ReactApexChart
      options={state.options as any}
      series={series?.map((item) => item.file_count)}
      type="donut"
      height={300}
    />
  );
}

export default memo(DonutChart);
