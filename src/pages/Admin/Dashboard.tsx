import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { END_POINTS } from "src/api/EndPoints";
import fetcher from "src/api/fetcher";
import DonutChart from "src/components/dashboard/DonutChart";
import LineChart from "src/components/dashboard/LineChart";
import StatsCard from "src/components/dashboard/StatsCard";

type dashboardDataTypes = {
  total_users: number;
  total_notebook: number;
  total_files_uploaded: number;
  monthly_user_activity: {
    _id: {
      year: null | number;
      month: null | number;
    };
    user_count: number;
  }[];
  Monthly_notebook_count: {
    _id: {
      year: number;
      month: number;
    };
    notebook_count: number;
  }[];
  files_by_type: {
    _id: string;
    file_count: number;
  }[];
  Top_queried_files: {
    _id: string;
    queries: number;
  }[];
};

function Dashboard() {
  useEffect(() => {
    getDashboardData();
  }, []);

  const [dashboardData, setDashboardData] = useState({} as dashboardDataTypes);

  const getDashboardData = async () => {
    try {
      const Response = await fetcher.get(END_POINTS.ADMIN.DASHBOARD);
      if (Response.status == 200) {
        setDashboardData(Response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const colors = ["#008080", "#F5B700", "#1B75BC"];
  const totalFiles = dashboardData?.files_by_type?.reduce(
    (acc, elem) => (acc += elem.file_count),
    0
  );

  return (
    <Box>
      <Grid container>
        <Grid item lg={3} sm={6} xs={1}>
          <StatsCard
            data={{ title: "Total Users", count: dashboardData.total_users }}
          />
        </Grid>
        <Grid item lg={3} sm={6} xs={1}>
          <StatsCard
            data={{
              title: "Total Notebook",
              count: dashboardData.total_notebook,
            }}
          />
        </Grid>
        <Grid item lg={3} sm={6} xs={1}>
          <StatsCard
            data={{
              title: "Total Files Uploaded",
              count: dashboardData.total_files_uploaded,
            }}
          />
        </Grid>
        <Grid item lg={3} sm={6} xs={1}>
          <StatsCard
            data={{
              title: "Average Session Time",
              count: 0,
            }}
          />
        </Grid>
      </Grid>
      <Grid container mt={2}>
        <Grid item xs={6}>
          {/* <LineChart series={[]} /> */}
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              backgroundColor: (theme) => theme.palette.background.default,
              borderRadius: 3,
              padding: 3,
            }}
          >
            <Grid container>
              <Grid item xs={6}>
                {dashboardData.files_by_type?.length && (
                  <DonutChart series={dashboardData.files_by_type} />
                )}
              </Grid>
              <Grid item xs={6}>
                <Stack
                  gap={3}
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  {dashboardData?.files_by_type?.map((item, index) => (
                    <Stack flexDirection={"row"} gap={2}>
                      <span
                        style={{
                          height: 10,
                          width: 10,
                          backgroundColor: colors[index],
                          borderRadius: "50%",
                        }}
                      ></span>
                      <Typography>{item?._id?.toUpperCase()}</Typography> -
                      <Typography>
                        {((item.file_count / totalFiles) * 100).toFixed(2)}%
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
