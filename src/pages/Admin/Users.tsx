import { Icon } from "@iconify/react";
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  List,
  ListItemText,
  Modal,
  Popover,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { END_POINTS } from "src/api/EndPoints";
import fetcher from "src/api/fetcher";

import { Filters } from "src/assets/icons/filter";
import { Plus } from "src/assets/icons/Plus";
import { useAuthContext } from "src/auth/useAuthContext";
import { Avatar } from "src/components/avatar";
import ConfirmationModal from "src/components/CustomComponents/ConfirmationModal";
import { RootState } from "src/redux/reducers";

const CustomTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  "&:not(:last-child)": {
    marginBottom: "16px", // Adds spacing between rows
  },
}));

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
  width: 400,
  bgcolor: "background.default",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

type usersList = {
  username: string;
  email: string;
  roles: string;
  license: boolean;
};

function Users() {
  const [users, setUsers] = useState<usersList[]>([]);
  const [inviteEmails, setInviteEmails] = useState("");

  //modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const body = {
        usernames: [""],
        emails: [""],
        roles: [""],
        license: null,
      };
      const Response = await fetcher.post(
        END_POINTS.ADMIN.ADMIN_PRIVILEGES.USER_DETAILS,
        body
      );
      console.log(Response);
      if (Response.status == 200) {
        // const array = [];
        // for (let keys in Response.data) {
        //   array.push(Response.data[keys]);
        // }
        // setUsers(array);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onInvite = async () => {
    try {
      const body = {
        emails: inviteEmails.split("\n"),
      };
      const Response = await fetcher.post(
        END_POINTS.ADMIN.ADMIN_PRIVILEGES.INVITE_USERS,
        body
      );
      if (Response.status == 200) {
        handleCloseModal();
        setInviteEmails("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const changeRole = (username: string, role: string) => {
    setUsers([
      ...users.map((item) =>
        item.username == username ? { ...item, roles: role } : item
      ),
    ]);
  };

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography>User List</Typography>
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <IconButton>
            <Filters />
          </IconButton>
          <Button
            variant="contained"
            sx={{ borderRadius: 12 }}
            onClick={handleOpenModal}
          >
            <Plus /> Invite User
          </Button>
        </Stack>
      </Stack>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>License</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item, index) => (
              <UserDetail key={index} item={item} changeRole={changeRole} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" mb={3}>
            Invite Users
          </Typography>
          <TextField
            fullWidth
            multiline
            maxRows={6}
            label="Enter Emails"
            value={inviteEmails}
            onChange={(e) => setInviteEmails(e.target.value)}
          />
          <Stack direction={"row"} gap={2} mt={3}>
            <Button variant="outlined" fullWidth onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="contained" fullWidth onClick={onInvite}>
              Invite
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

function UserDetail({
  item,
  changeRole,
}: {
  item: usersList;
  changeRole: (username: string, role: string) => void;
}) {
  const { license } = useSelector((state: RootState) => state.license);
  const theme = useTheme();
  const { user } = useAuthContext();
  const [isloading, setIsLoading] = useState(false);
  //onclick popover
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClosePopover = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [openConfirm, setOpenConfirm] = useState(false);
  const handleOpenConfirm = () => setOpenConfirm(true);
  const handleCloseConfirm = () => setOpenConfirm(false);

  //modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const toggleLicense = async () => {
    setIsLoading(true);
    try {
      const body = {
        signed_license_key: license.signed_license_key,
        username: item.username,
      };
      const Response = await fetcher.post(
        item.license
          ? END_POINTS.ADMIN.LICENSE.REVOKE_USER_LICENSE
          : END_POINTS.ADMIN.LICENSE.ISSUE_LICENSE,
        body
      );
      if (Response.status == 200) {
        console.log(Response);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeRole = async () => {
    try {
      setIsLoading(true);
      const body = {
        user_username: item.username,
        roles: item.roles == "User" ? "Admin" : "User",
      };
      const Response = await fetcher.put(
        END_POINTS.ADMIN.ADMIN_PRIVILEGES.USERS_ROLE,
        body
      );
      if (Response.status == 200) {
        handleCloseConfirm();
        handleClosePopover();
        changeRole(item.username, body.roles);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <TableRow>
        <TableCell sx={{ p: 0.5 }}></TableCell>
      </TableRow>
      <CustomTableRow>
        <TableCell sx={{ borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}>
          <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
            <Avatar
              src=""
              name={item.username}
              sx={{ height: 33, width: 33 }}
            />
            <Typography> {item.username}</Typography>
          </Stack>
        </TableCell>
        <TableCell>
          <Typography>{item.email}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{item.roles}</Typography>
        </TableCell>
        <TableCell>
          <Typography>
            {" "}
            <Chip
              label={item.license ? "YES" : "NO"}
              sx={{
                color: "common.white",
                backgroundColor: item.license ? "#008080" : "secondary.main",
              }}
            />
          </Typography>
        </TableCell>
        <TableCell
          sx={{ borderTopRightRadius: 20, borderBottomRightRadius: 20 }}
        >
          {item.roles != "SuperAdmin" && (
            <IconButton aria-describedby={id} onClick={handleOpenPopover}>
              <Icon
                icon="mynaui:dots-solid"
                width="30px"
                height="30px"
                style={{
                  backgroundColor: theme.palette.background.neutral,
                  borderRadius: 20,
                }}
              />
            </IconButton>
          )}
          <Popover
            id={id}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <CustomList disablePadding>
              <CustomListItemText onClick={handleOpenConfirm}>
                {item.roles == "User" ? "Switch to Admin" : "Switch to User"}
              </CustomListItemText>
              {!item.license && (
                <CustomListItemText onClick={toggleLicense}>
                  Apply License
                </CustomListItemText>
              )}
              {item.license && user.user_accountType == "SuperAdmin" && (
                <CustomListItemText onClick={toggleLicense}>
                  Cancel License
                </CustomListItemText>
              )}

              <CustomListItemText>View</CustomListItemText>
            </CustomList>
          </Popover>
        </TableCell>
      </CustomTableRow>

      <ConfirmationModal
        open={openConfirm}
        handleClose={handleCloseConfirm}
        onConfirm={onChangeRole}
        loading={isloading}
        title={"Delete Confirmation"}
        content={`Are you sure you want to change the role from ${
          item.roles == "User" ? "User to Admin" : "Admin To User"
        } ?`}
      />

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4">
            Edit Role
          </Typography>
          <Typography id="modal-modal-description" color="text.disabled">
            Are you sure you want to change the role of ByeWind from User to
            Admin?
          </Typography>
          <Stack direction={"row"} gap={2} mt={3}>
            <Button variant="outlined" fullWidth>
              No
            </Button>
            <Button variant="contained" fullWidth>
              Yes
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default Users;
