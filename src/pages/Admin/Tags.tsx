import { Icon } from "@iconify/react";
import {
  Box,
  Button,
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
import { useCallback, useEffect, useState } from "react";
import { END_POINTS } from "src/api/EndPoints";
import fetcher from "src/api/fetcher";
import { Filters } from "src/assets/icons/filter";
import { Plus } from "src/assets/icons/Plus";
import { useAuthContext } from "src/auth/useAuthContext";
import ConfirmationModal from "src/components/CustomComponents/ConfirmationModal";
import { formatDate } from "src/utils/utility";

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

type tagListTypes = {
  _id: string;
  tag_name: string;
  user_id: string;
  created_at: string;
  modified_at: string;
  modified_by: string;
  username: string;
  modified_by_username: string;
};

function Tags() {
  const { user } = useAuthContext();
  const [tags, setTags] = useState<tagListTypes[]>([]);
  const [tagName, setTagName] = useState("");

  //modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    getAllTags();
  }, []);

  const getAllTags = async () => {
    try {
      const Response = await fetcher.get(END_POINTS.ADMIN.TAGS.GET_TAGS);
      if (Response.status == 200) {
        setTags(Response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createTag = useCallback(async () => {
    try {
      const body = {
        tag_name: tagName,
        user_id: user.user_id,
      };
      const Response = await fetcher.post(
        END_POINTS.ADMIN.TAGS.CREATE_TAGS,
        body
      );
      if (Response.status == 200) {
        setTags([...tags, Response.data]);
        setTagName("");
        handleCloseModal();
      }
    } catch (err) {
      console.log(err);
    }
  }, [tagName]);

  const updateTagList = (method: string, data: any) => {
    if (method == "delete") {
      setTags(tags.filter((item) => item._id !== data));
    }
    if (method == "rename") {
      setTags([...tags.map((item) => (item._id == data._id ? data : item))]);
    }
  };

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography>Tags List</Typography>
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <IconButton>
            <Filters />
          </IconButton>
          <Button
            variant="contained"
            sx={{ borderRadius: 12 }}
            onClick={handleOpenModal}
          >
            <Plus /> Create Tag
          </Button>
        </Stack>
      </Stack>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Tags Name</TableCell>
            <TableCell>Created Username</TableCell>
            <TableCell>Created Date</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tags.map((item) => (
            <TagsRow key={item._id} item={item} updateTagList={updateTagList} />
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
            Create Tag
          </Typography>
          <TextField
            fullWidth
            label="Tag Name"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
          />
          <Stack direction={"row"} gap={2} mt={3}>
            <Button variant="outlined" fullWidth onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="contained" fullWidth onClick={createTag}>
              Submit
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

function TagsRow({
  item,
  updateTagList,
}: {
  item: tagListTypes;
  updateTagList: (method: string, data: any) => void;
}) {
  const theme = useTheme();
  const { user } = useAuthContext();
  const [tagName, setTagName] = useState(item.tag_name);

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

  const renameTags = async () => {
    try {
      const body = {
        tag_id: item._id,
        tag_name: tagName,
        modified_by: user.user_id,
      };
      const Response = await fetcher.put(
        END_POINTS.ADMIN.TAGS.RENAME_TAGS,
        body
      );
      if (Response.status == 200) {
        updateTagList("rename", Response.data);
        handleCloseModal();
        handleClosePopover();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTag = async () => {
    try {
      const Response = await fetcher.delete(
        END_POINTS.ADMIN.TAGS.DELETE_TAGS(item._id)
      );
      if (Response.status == 200) {
        updateTagList("delete", item._id);
        handleClosePopover();
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
      <CustomTableRow key={item._id}>
        <TableCell>{item.tag_name}</TableCell>
        <TableCell>{item.username}</TableCell>
        <TableCell>
          <Typography noWrap>{formatDate(item.created_at)}</Typography>
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
                onClick={() => {
                  handleClosePopover();
                  handleOpenModal();
                }}
              >
                Rename
              </CustomListItemText>
              <CustomListItemText
                onClick={() => {
                  handleClosePopover();
                  handleOpenConfirm();
                }}
              >
                Delete
              </CustomListItemText>
            </CustomList>
          </Popover>
        </TableCell>
      </CustomTableRow>
      <ConfirmationModal
        open={openConfirm}
        handleClose={handleCloseConfirm}
        onConfirm={deleteTag}
        title={"Delete Confirmation"}
        content={"Are you sure you want to delete the tag ?"}
      />

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{ ...style, backgroundColor: theme.palette.background.neutral }}
        >
          <Typography id="modal-modal-title" variant="h4" mb={3}>
            Edit Tag
          </Typography>
          <TextField
            fullWidth
            label="Tag Name"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
          />
          <Stack direction={"row"} gap={2} mt={3}>
            <Button variant="outlined" fullWidth onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="contained" fullWidth onClick={renameTags}>
              Submit
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default Tags;
