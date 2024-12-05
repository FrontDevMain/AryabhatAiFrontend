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
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { END_POINTS } from "src/api/EndPoints";
import fetcher from "src/api/fetcher";

import { Filters } from "src/assets/icons/filter";
import { Plus } from "src/assets/icons/Plus";
import { Avatar } from "src/components/avatar";

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
  username: "Aryabhat";
  email: "aryabhat@aryahat.ai";
  roles: "SuperAdmin";
  license: true;
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
      const Response = await fetcher.get(
        END_POINTS.ADMIN.ADMIN_PRIVILEGES.USER_DETAILS
      );
      if (Response.status == 200) {
        const array = [];
        for (let keys in Response.data) {
          array.push(Response.data[keys]);
        }
        setUsers(array);
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
            <UserDetail item={item} />
          ))}
        </TableBody>
      </Table>
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

function UserDetail({ item }: { item: usersList }) {
  const theme = useTheme();

  //onclick popover
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClosePopover = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // nested popoover for roles
  const [anchorEl1, setAnchorEl1] = useState<HTMLElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl1(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl1(null);
  const open1 = Boolean(anchorEl1);
  const id1 = open1 ? "simple-popover" : undefined;

  // nested popoover for roles
  const [anchorEl2, setAnchorEl2] = useState<HTMLElement | null>(null);
  const handlePopoverOpen2 = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl2(event.currentTarget);
  const handlePopoverClose2 = () => setAnchorEl2(null);
  const open2 = Boolean(anchorEl2);
  const id2 = open2 ? "simple-popover" : undefined;

  //modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const toggleLicense = async (username: string) => {
    try {
      const body = { user_username: username };
      const Response = await fetcher.post(
        END_POINTS.ADMIN.ADMIN_PRIVILEGES.USERS_LICENSE,
        body
      );
      if (Response.status == 200) {
        console.log(Response);
      }
    } catch (err) {
      console.log(err);
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
            {item.username}
          </Stack>
        </TableCell>
        <TableCell>{item.email}</TableCell>
        <TableCell>{item.roles}</TableCell>
        <TableCell>
          {" "}
          <Chip
            label={item.license ? "YES" : "NO"}
            sx={{
              color: "common.white",
              backgroundColor: item.license ? "#008080" : "secondary.main",
            }}
          />
        </TableCell>
        <TableCell
          sx={{ borderTopRightRadius: 20, borderBottomRightRadius: 20 }}
        >
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
              <CustomListItemText
                aria-describedby={id1}
                onClick={handlePopoverOpen}
              >
                Edit Roles
              </CustomListItemText>
              <Popover
                id={id1}
                open={open1}
                anchorEl={anchorEl1}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                onMouseLeave={handlePopoverClose}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <CustomList disablePadding>
                  <CustomListItemText>User</CustomListItemText>
                  <CustomListItemText>Admin</CustomListItemText>
                </CustomList>
              </Popover>
              <CustomListItemText
                aria-describedby={id2}
                onClick={() => toggleLicense(item.username)}
              >
                Apply License
              </CustomListItemText>
              <Popover
                id={id2}
                open={open2}
                anchorEl={anchorEl2}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                onMouseLeave={handlePopoverClose2}
                onClose={handlePopoverClose2}
                disableRestoreFocus
              >
                <CustomList disablePadding>
                  <CustomListItemText onClick={handleOpenModal}>
                    Yes
                  </CustomListItemText>
                  <CustomListItemText onClick={handleOpenModal}>
                    No
                  </CustomListItemText>
                </CustomList>
              </Popover>
              <CustomListItemText>View</CustomListItemText>
            </CustomList>
          </Popover>
        </TableCell>
      </CustomTableRow>

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
