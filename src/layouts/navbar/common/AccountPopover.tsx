import { MoreVert } from "@mui/icons-material";
import {
  Box,
  Icon,
  IconButton,
  List,
  ListItemText,
  Popover,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { END_POINTS } from "src/api/EndPoints";
import fetcher from "src/api/fetcher";
import { useAuthContext } from "src/auth/useAuthContext";
import { Avatar } from "src/components/avatar";
import CustomAvatar from "src/components/avatar/Avatar";
import ConfirmationModal from "src/components/CustomComponents/ConfirmationModal";

function AccountPopover() {
  const { user, logout } = useAuthContext();
  //openpopover
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClosePopover = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [openConfirm, setOpenConfirm] = useState(false);
  const handleOpenConfirm = () => setOpenConfirm(true);
  const handleCloseConfirm = () => setOpenConfirm(false);

  const CustomList = styled(List)(({ theme }) => ({
    padding: theme.spacing(1),
  }));

  const CustomListItemText = styled(ListItemText)(({ theme }) => ({
    padding: "15px 10px",
    width: 200,
    borderRadius: 5,
    color: "text.secondary",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.background.default,
      backgroundColor: theme.palette.secondary.light, // Selected text color
    },
  }));

  const logoutUser = async () => {
    try {
      const Response = await fetcher.post(END_POINTS.AUTH.LOGOUT, {});
      if (Response.status == 200) {
        logout();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Stack
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      gap={1}
      sx={{ mb: 2, px: 2 }}
    >
      <CustomAvatar
        src={`data:image/png;base64,${user.user_profile_picture}`}
        name={user.user_username}
      />
      <Box sx={{ maxWidth: 130 }}>
        <Typography color="text.secondary" noWrap textOverflow={"ellipsis"}>
          {user.user_firstname}
        </Typography>
        <Typography color="text.disabled" noWrap textOverflow={"ellipsis"}>
          {user.user_email}
        </Typography>
      </Box>
      <div style={{ position: "relative" }}>
        <IconButton aria-describedby={id} onClick={handleOpenPopover}>
          <Icon>
            <MoreVert />
          </Icon>
        </IconButton>
        <Popover
          id={id}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <CustomList disablePadding>
            <CustomListItemText>Change Profile Picture</CustomListItemText>
            <CustomListItemText onClick={handleOpenConfirm}>
              Logout
            </CustomListItemText>
            <CustomListItemText>Choose LLM</CustomListItemText>
          </CustomList>
        </Popover>
      </div>
      <ConfirmationModal
        open={openConfirm}
        handleClose={handleCloseConfirm}
        onConfirm={logoutUser}
        title={"Logout"}
        content={"Are you sure want to Logout from your account?"}
      />
    </Stack>
  );
}

export default AccountPopover;
