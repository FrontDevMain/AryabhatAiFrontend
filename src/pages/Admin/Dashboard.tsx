import React, { useEffect } from "react";
import { END_POINTS } from "src/api/EndPoints";
import fetcher from "src/api/fetcher";

function Dashboard() {
  useEffect(() => {
    getLicenseoverView();
  }, []);

  const getLicenseoverView = async () => {
    try {
      const Response = await fetcher.get(END_POINTS.ADMIN.DASHBOARD);
      console.log(Response);
    } catch (err) {
      console.log(err);
    }
  };

  return <div>Dashboard</div>;
}

export default Dashboard;
