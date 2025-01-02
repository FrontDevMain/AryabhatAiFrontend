import HeaderDashboard from "./Header";
import SearchBar from "./SearchBar";
import { Divider } from "@mui/material";
import RoleBasedGaurd from "src/auth/RoleBasedGaurd";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/reducers";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const navigate = useNavigate();
  const { notebookList } = useSelector((state: RootState) => state.notebook);

  useEffect(() => {
    navigate(`/user/notebook/${notebookList[0]?.chat_id}`);
  }, [notebookList[0]?.chat_id]);

  return (
    <RoleBasedGaurd roles={["User"]}>
      <div style={{ position: "relative", height: "calc(100vh - 100px)" }}>
        <HeaderDashboard />
        <Divider sx={{ mt: 1 }} />
        {/* <ChatBox /> */}
        <SearchBar />
      </div>
    </RoleBasedGaurd>
  );
}

export default UserDashboard;
