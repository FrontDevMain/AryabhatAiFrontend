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
        width: 300,
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
                formatter: () =>
                  `${series.reduce(
                    (acc, elem) => (acc += elem.file_count),
                    0
                  )}`,
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        // type: "gradient",
      },
      legend: {
        show: false,
        horizontalAlign: "center",
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
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
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
      width={380}
    />
  );
}

export default memo(DonutChart);
