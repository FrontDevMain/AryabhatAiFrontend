import HeaderDashboard from "./Header";
import SearchBar from "./SearchBar";
import ChatBox from "./ChatBox";
import { Divider } from "@mui/material";

function UserDashboard() {
  return (
    <div style={{ position: "relative", height: "calc(100vh - 100px)" }}>
      <HeaderDashboard />
      <Divider sx={{ mt: 1 }} />
      <ChatBox />
      <SearchBar />
    </div>
  );
}

export default UserDashboard;
