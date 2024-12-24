import HeaderDashboard from "./Header";
import SearchBar from "./SearchBar";
import ChatBox from "./ChatBox";
import { Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import RoleBasedGaurd from "src/auth/RoleBasedGaurd";

function Archive() {
  const { id } = useParams();

  return (
    <RoleBasedGaurd roles={["User"]}>
      <div style={{ position: "relative", height: "calc(100vh - 100px)" }}>
        <HeaderDashboard />
        <Divider sx={{ mt: 1 }} />
        <ChatBox chatid={id} />
        <SearchBar />
      </div>
    </RoleBasedGaurd>
  );
}

export default Archive;
