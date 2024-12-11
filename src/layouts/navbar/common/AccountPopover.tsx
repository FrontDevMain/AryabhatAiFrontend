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
} from "@mui/material";
import { useState } from "react";
import { END_POINTS } from "src/api/EndPoints";
import fetcher from "src/api/fetcher";
import { useAuthContext } from "src/auth/useAuthContext";
import CustomAvatar from "src/components/avatar/Avatar";
import ConfirmationModal from "src/components/CustomComponents/ConfirmationModal";

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
  const { user, logout, initialize } = useAuthContext();

  //openpopover
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClosePopover = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [isLoading, setIsLoading] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);
  const handleOpenConfirm = () => setOpenConfirm(true);
  const handleCloseConfirm = () => setOpenConfirm(false);

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
      const Response = await fetcher.delete(END_POINTS.AUTH.DELETE_PROFILE);
      if (Response.status == 200) {
        initialize();
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
              src={`data:image/png;base64,${user.user_profile_picture}`}
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
                onChange={onChangeProfile}
              />
              <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                Click to Upload
              </label>{" "}
            </LoadingButton>
            <Button
              variant="outlined"
              onClick={onDeleteProfile}
              disabled={isLoading}
            >
              Delete Picture
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
}

export default AccountPopover;
