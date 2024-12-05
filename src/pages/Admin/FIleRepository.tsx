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

type filesType = {
  _id: string;
  filename: string;
  filetype: string;
  filesize: number;
  time_of_upload: string;
  department_tag: string;
  file_status: string;
  user_id: string;
  username: string;
  modified_at: string;
  modified_by: string;
  modified_by_username: string;
};

export default function FileRepository() {
  const [files, setFiles] = useState<filesType[]>([]);

  useEffect(() => {
    getAllFiles();
  }, []);

  const getAllFiles = async () => {
    try {
      const Response = await fetcher.get(
        END_POINTS.ADMIN.FILE_REPOSITORIES.GET_ALL_FILES
      );
      if (Response.status == 200) {
        setFiles(Response.data);
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
          {files.map((item, index) => (
            <UserDetail item={item} />
          ))}
        </TableBody>
      </Table>
    </>
  );
}

function UserDetail({ item }: { item: filesType }) {
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

  const downloadFiles = async (id: string) => {
    const Response = await fetcher.get(
      END_POINTS.ADMIN.FILE_REPOSITORIES.DOWNLOAD_FILES(id)
    );
    try {
      if (Response.status == 200) {
        console.log(Response.data);
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
        <TableCell>{item.username}</TableCell>
        <TableCell>{item.filename}</TableCell>
        <TableCell>{item.filetype}</TableCell>
        <TableCell>{item.filesize}</TableCell>
        <TableCell>{new Date(item.time_of_upload).toLocaleString()}</TableCell>
        <TableCell>{item.department_tag}</TableCell>
        <TableCell>{item.file_status}</TableCell>

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
              <CustomListItemText onClick={() => downloadFiles(item._id)}>
                Download
              </CustomListItemText>
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
