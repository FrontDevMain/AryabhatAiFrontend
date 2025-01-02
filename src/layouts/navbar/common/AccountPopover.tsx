import { Close, MoreVert } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  AvatarGroup,
  Box,
  Button,
  Icon,
  IconButton,
  List,
  ListItemText,
  Modal,
  Popover,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { END_POINTS } from "src/api/EndPoints";
import fetcher from "src/api/fetcher";
import { useAuthContext } from "src/auth/useAuthContext";
import CustomAvatar from "src/components/avatar/Avatar";
import ConfirmationModal from "src/components/CustomComponents/ConfirmationModal";
import { PATH_AFTER_ADMIN_LOGIN, PATH_AFTER_USER_LOGIN } from "src/config";
import { RootState } from "src/redux/reducers";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", md: 600 },
  bgcolor: "background.default",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

function AccountPopover() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { theme: themeSetting } = useSelector(
    (state: RootState) => state.theme
  );
  const isVertical = themeSetting.Theme_Layout == "vertical";
  const { user, logout, initialize, updateUserType } = useAuthContext();

  //openpopover
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClosePopover = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);

  // logout confirmation
  const [openConfirm, setOpenConfirm] = useState(false);
  const handleOpenConfirm = () => setOpenConfirm(true);
  const handleCloseConfirm = () => setOpenConfirm(false);

  // profile photo delete confirmation
  const [openConfirm1, setOpenConfirm1] = useState(false);
  const handleOpenConfirm1 = () => setOpenConfirm1(true);
  const handleCloseConfirm1 = () => setOpenConfirm1(false);

  //modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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

  const onChangeProfile = async (event: any) => {
    setIsLoading(true);
    try {
      const uploadedFile = event.target.files[0];
      if (uploadedFile) {
        if (uploadedFile.size > 25 * 1024 * 1024) {
          alert("File size exceeds 25MB.");
          return;
        }
      }
      const formData = new FormData();
      formData.append("profile_picture", uploadedFile);
      const Response = await fetcher.putFile(
        END_POINTS.AUTH.CHANGE_PROFILE,
        formData
      );
      if (Response.status == 200) {
        initialize();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onDeleteProfile = async () => {
    try {
      setIsLoading1(true);
      const Response = await fetcher.delete(END_POINTS.AUTH.DELETE_PROFILE);
      if (Response.status == 200) {
        initialize();
        handleCloseConfirm1();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading1(false);
    }
  };

  return (
    <Stack
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      gap={1}
      sx={{
        mb: 2,
        px: isVertical ? 2 : 0.5,
      }}
    >
      <IconButton onClick={(e) => !isVertical && handleOpenPopover(e)}>
        <CustomAvatar
          src={`data:image/png;base64,${user?.user_profile_picture}`}
          name={user?.user_username}
          sx={{ border: `1px solid ${theme.palette.primary.main}` }}
        />
      </IconButton>
      {isVertical && (
        <Box sx={{ maxWidth: 130 }}>
          <Typography color="text.secondary" noWrap textOverflow={"ellipsis"}>
            {user?.user_firstname}
          </Typography>
          <Typography color="text.disabled" noWrap textOverflow={"ellipsis"}>
            {user?.user_email}
          </Typography>
        </Box>
      )}
      <div style={{ position: "relative" }}>
        {isVertical && (
          <IconButton aria-describedby={id} onClick={handleOpenPopover}>
            <Icon>
              <MoreVert />
            </Icon>
          </IconButton>
        )}
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
          <CustomList disablePadding onClick={handleClosePopover}>
            {user?.user_accountType !== "User" && (
              <CustomListItemText
                onClick={() => {
                  updateUserType(
                    user?.tempAccountType == "User"
                      ? user?.user_accountType
                      : "User"
                  );
                  navigate(
                    user?.tempAccountType == "User"
                      ? PATH_AFTER_ADMIN_LOGIN
                      : PATH_AFTER_USER_LOGIN
                  );
                }}
              >
                Switch to{" "}
                {user?.tempAccountType == "User"
                  ? user?.user_accountType
                  : "User"}
              </CustomListItemText>
            )}
            <CustomListItemText onClick={handleOpenModal}>
              Change Profile Picture
            </CustomListItemText>
            <CustomListItemText onClick={handleOpenConfirm}>
              Logout
            </CustomListItemText>
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

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              id="modal-modal-title"
              variant="h4"
              sx={{ fontSize: 40 }}
            >
              Uplaod
            </Typography>
            <IconButton onClick={handleCloseModal}>
              <Close />
            </IconButton>
          </Stack>
          <Stack flexDirection={"row"} gap={5} alignItems={"center"} mt={2}>
            <CustomAvatar
              src={`data:image/png;base64,${user?.user_profile_picture}`}
              sx={{ height: 120, width: 120 }}
            />
            <LoadingButton
              variant="contained"
              sx={{ position: "relative" }}
              loading={isLoading}
            >
              <input
                id="file-upload"
                type="file"
                style={{ display: "none" }}
                accept=".png, .jpeg"
                onChange={onChangeProfile}
              />
              <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                Change Picture
              </label>{" "}
            </LoadingButton>
            <Button variant="outlined" onClick={handleOpenConfirm1}>
              Delete Picture
            </Button>
          </Stack>
          <Typography variant="h6" mt={2}>
            Profile Name
          </Typography>
          <Typography>{user.user_firstname}</Typography>
          <Typography variant="h6" mt={2}>
            Email Id
          </Typography>
          <Typography>{user.user_email}</Typography>
        </Box>
      </Modal>

      <ConfirmationModal
        open={openConfirm1}
        handleClose={handleCloseConfirm1}
        onConfirm={onDeleteProfile}
        loading={isLoading1}
        title={"Delete Confirmation"}
        content={"Are you sure want to Delete profile picture?"}
      />
    </Stack>
  );
}

export default AccountPopover;
