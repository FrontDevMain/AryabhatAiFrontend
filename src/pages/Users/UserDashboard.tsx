import React from "react";
import { useParams } from "react-router-dom";
import HeaderDashboard from "./Header";
import SearchBar from "./SearchBar";
import ChatBox from "./ChatBox";

function UserDashboard() {
  // const { id } = useParams();

  return (
    <div style={{ position: "relative", height: "calc(100vh - 80px)" }}>
      <HeaderDashboard />
      <ChatBox />
      <SearchBar />
    </div>
  );
}

export default UserDashboard;
