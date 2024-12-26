import { Box, Grid, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { END_POINTS } from "src/api/EndPoints";
import fetcher from "src/api/fetcher";
import RoleBasedGaurd from "src/auth/RoleBasedGaurd";
import BarChart from "src/components/dashboard/BarChart";
import ColumnChart from "src/components/dashboard/ColumnChart";
import DonutChart from "src/components/dashboard/DonutChart";
import LineChart from "src/components/dashboard/LineChart";
import StatsCard from "src/components/dashboard/StatsCard";

const CustomBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: 15,
  padding: 15,
}));

type dashboardDataTypes = {
  total_users: number;
  total_notebook: number;
  total_files_uploaded: number;
  average_session_time: number;
  line_plot: number;
  monthly_user_activity: {
    _id: {
      year: null | number;
      month: null | number;
    };
    user_count: number;
  }[];
  Monthly_notebook_count: {
    _id: {
      year: null | number;
      month: null | number;
    };
    notebook_count: number;
  }[];
  Monthly_files_upload: {
    _id: {
      year: number;
      month: number;
    };
    file_count: number;
  }[];
  Monthly_average_session_time: {
    _id: {
      year: number;
      month: number;
    };
    Average_Session_Duration_Minutes: number;
  }[];
  files_by_type: {
    _id: string;
    file_count: number;
  }[];
  Top_queried_files: {
    _id: string;
    queries: number;
  }[];
  users_by_time: {};
};

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({} as dashboardDataTypes);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = async () => {
    try {
      setIsLoading(true);
      const Response = await fetcher.get(END_POINTS.ADMIN.DASHBOARD);
      if (Response.status == 200) {
        setDashboardData(Response.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>...Loading</p>;
  }

  return (
    <RoleBasedGaurd roles={["Admin", "SuperAdmin"]}>
      <Box>
        <Grid container spacing={2}>
          <Grid item lg={3} sm={6} xs={1}>
            <StatsCard
              title="Total Users"
              data={dashboardData?.monthly_user_activity?.map(
                (item) => item.user_count
              )}
            />
          </Grid>
          {dashboardData.Monthly_notebook_count?.length && (
            <Grid item lg={3} sm={6} xs={1}>
              <StatsCard
                title="Total Notebook"
                data={dashboardData?.Monthly_notebook_count?.map(
                  (item) => item.notebook_count
                )}
              />
            </Grid>
          )}
          <Grid item lg={3} sm={6} xs={1}>
            <StatsCard
              title="Total Files Uploaded"
              data={dashboardData?.Monthly_files_upload?.map(
                (item) => item.file_count
              )}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={1}>
            <StatsCard
              title="Average Session Time"
              data={dashboardData?.Monthly_average_session_time?.map(
                (item) => item.Average_Session_Duration_Minutes
              )}
            />
          </Grid>
        </Grid>
        <Grid container mt={2} spacing={3}>
          <Grid item xs={7}>
            <CustomBox>
              <LineChart
                series={[
                  {
                    name: "monthly",
                    data: [10, 20, 15, 8, 6, 12, 2, 3, 6, 12, 8, 10],
                  },
                  {
                    name: "Yearly",
                    data: [15, 21, 5, 5, 12, 5, 14, 13, 16, 5, 10, 13],
                  },
                ]}
              />
            </CustomBox>
          </Grid>
          <Grid item xs={5}>
            <CustomBox>
              {dashboardData.Top_queried_files && (
                <BarChart
                  series={Object.entries(dashboardData.Top_queried_files).map(
                    ([_id, queries]) => ({
                      _id,
                      queries,
                    })
                  )}
                />
              )}
            </CustomBox>
          </Grid>
          <Grid item xs={6}>
            <CustomBox>
              {dashboardData?.files_by_type?.length && (
                <ColumnChart
                  series={Object.entries(dashboardData.users_by_time).map(
                    ([name, session_time]) => ({
                      name: name.split(" "),
                      session_time,
                    })
                  )}
                />
              )}
            </CustomBox>
          </Grid>
          <Grid item xs={6}>
            <CustomBox>
              {dashboardData?.files_by_type?.length && (
                <DonutChart series={dashboardData.files_by_type} />
              )}
            </CustomBox>
          </Grid>
        </Grid>
      </Box>
    </RoleBasedGaurd>
  );
}

export default Dashboard;
