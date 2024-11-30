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
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

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

export default function FileRepository() {
  const users = [
    {
      id: 0,
      name: "Alpha",
      filename: "file01",
      filetype: "PDF",
      filesize: "32.04kb",
      timeOfUpload: "25-04-2024",
      departmentTag: "Sales",
      fileStatus: "uploading",
    },
    {
      id: 1,
      name: "Alpha",
      filename: "file02",
      filetype: "PNG",
      filesize: "1.01mb",
      timeOfUpload: "25-04-2024",
      departmentTag: "Finance",
      fileStatus: "processed",
    },
  ];

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography>File Repository list</Typography>
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <IconButton>
            <Filters />
          </IconButton>
          <Button variant="contained" sx={{ borderRadius: 12 }}>
            <Plus /> Upload File
          </Button>
        </Stack>
      </Stack>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>File name</TableCell>
            <TableCell>File type</TableCell>
            <TableCell>File size</TableCell>
            <TableCell>Time of upload</TableCell>
            <TableCell>Department tags</TableCell>
            <TableCell>File Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((item, index) => (
            <UserDetail item={item} />
          ))}
        </TableBody>
      </Table>
    </>
  );
}

function UserDetail({ item }: any) {
  const theme = useTheme();

  //onclick popover
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClosePopover = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  //modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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

  return (
    <>
      <TableRow>
        <TableCell sx={{ p: 0.5 }}></TableCell>
      </TableRow>
      <CustomTableRow>
        <TableCell sx={{ borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}>
          <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
            <Avatar src="" name={item.name} sx={{ height: 33, width: 33 }} />
            {item.name}
          </Stack>
        </TableCell>
        <TableCell>{item.filename}</TableCell>
        <TableCell>{item.filetype}</TableCell>
        <TableCell>{item.filesize}</TableCell>
        <TableCell>{item.timeOfUpload}</TableCell>
        <TableCell>{item.departmentTag}</TableCell>
        <TableCell>{item.fileStatus}</TableCell>

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
              <CustomListItemText>Preview</CustomListItemText>
              <CustomListItemText>Delete</CustomListItemText>
              <CustomListItemText>Download</CustomListItemText>
              <CustomListItemText>Modify Department</CustomListItemText>
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
