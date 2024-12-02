import React from "react";
import { useParams } from "react-router-dom";

function UserDashboard() {
  const { id } = useParams();

  return <div>UserDashboard {id}</div>;
}

export default UserDashboard;
