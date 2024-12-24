import { Icon } from "@iconify/react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItemText,
  Modal,
  Pagination,
  Popover,
  RadioGroup,
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
import { sentenceCase } from "change-case";
import { useCallback, useEffect, useState, memo } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { END_POINTS } from "src/api/EndPoints";
import fetcher from "src/api/fetcher";
import { Filters } from "src/assets/icons/filter";
import { Plus } from "src/assets/icons/Plus";
import { useAuthContext } from "src/auth/useAuthContext";
import ConfirmationModal from "src/components/CustomComponents/ConfirmationModal";
import {
  MaskControl,
  StyledCard,
  StyledWrap,
} from "src/layouts/navbar/common/styles";
import { fetchTags, updateTags } from "src/redux/actions/tags/TagsActions";
import { tagType } from "src/redux/actions/tags/TagsActionTypes";
import { RootState } from "src/redux/reducers";
import { CustomListItemText } from "src/theme/globalStyles";
import { formatDate } from "src/utils/utility";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import RoleBasedGaurd from "src/auth/RoleBasedGaurd";

const CustomTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  "&:not(:last-child)": {
    marginBottom: "16px", // Adds spacing between rows
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

type filterTypes = {
  created_date: Date | null;
  tag_name: null | string;
  username: null | string;
};

function Tags() {
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const { TAG } = useSelector((state: RootState) => state.tag);
  const [tagName, setTagName] = useState("");
  const [page, setPage] = useState(1);

  //filter
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClosePopover = () => setAnchorEl(null);
  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  const [selectedFilerTab, setSelectedFilterTab] = useState("created_date");
  const [filter, setFilter] = useState<filterTypes>({
    created_date: null,
    tag_name: "",
    username: "",
  });

  //modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    dispatch(fetchTags(page, 10, filter));
  }, [page]);

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
        dispatch(updateTags([Response.data, ...TAG.tags]));
        setTagName("");
        handleCloseModal();
      }
    } catch (err) {
      console.log(err);
    }
  }, [tagName]);

  const updateTagList = (method: string, data: any) => {
    if (method == "delete") {
      dispatch(updateTags(TAG.tags.filter((item) => item._id !== data)));
    }
    if (method == "rename") {
      dispatch(
        updateTags(TAG.tags.map((item) => (item._id == data._id ? data : item)))
      );
    }
  };

  const resetFilters = () => {
    setFilter({ ...filter, created_date: null, tag_name: "", username: "" });
  };

  return (
    <RoleBasedGaurd roles={["Admin", "SuperAdmin"]}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography>Tags List</Typography>
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <IconButton onClick={handleOpenPopover}>
            <Filters />
          </IconButton>
          <Popover
            id={id}
            anchorEl={anchorEl}
            open={openPopover}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <RadioGroup
              name="themeMode"
              value={selectedFilerTab}
              onChange={(e) => {
                setSelectedFilterTab(e.target.value);
                resetFilters();
              }}
            >
              <StyledWrap>
                {Object.keys(filter).map((mode) => (
                  <StyledCard key={mode} selected={selectedFilerTab == mode}>
                    <Stack flexDirection={"row"} gap={1}>
                      <Typography
                        color="text.primary"
                        sx={{ whiteSpace: "nowrap", p: 2 }}
                      >
                        {sentenceCase(mode)}
                      </Typography>
                    </Stack>
                    <MaskControl value={mode} />
                  </StyledCard>
                ))}
              </StyledWrap>
            </RadioGroup>
            <Box sx={{ px: 2 }}>
              {selectedFilerTab == "created_date" && (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      sx={{ width: "100%" }}
                      label="Date"
                      value={dayjs(filter.created_date)}
                      maxDate={dayjs(new Date())}
                      onChange={(newValue: any) =>
                        setFilter({
                          ...filter,
                          created_date: newValue,
                          tag_name: "",
                          username: "",
                        })
                      }
                    />
                  </DemoContainer>
                </LocalizationProvider>
              )}
              {selectedFilerTab == "tag_name" && (
                <TextField
                  fullWidth
                  label="Tag Name"
                  value={filter.tag_name}
                  onChange={(event: any) =>
                    setFilter({
                      ...filter,
                      created_date: null,
                      tag_name: event.target.value?.toLowerCase(),
                      username: "",
                    })
                  }
                />
              )}
              {selectedFilerTab == "username" && (
                <TextField
                  fullWidth
                  label="User Name"
                  value={filter.username}
                  onChange={(event: any) =>
                    setFilter({
                      ...filter,
                      created_date: null,
                      tag_name: "",
                      username: event.target.value?.toLowerCase(),
                    })
                  }
                />
              )}
              <Stack
                flexDirection={"row"}
                justifyContent={"end"}
                gap={1}
                my={2}
              >
                <LoadingButton
                  variant="outlined"
                  onClick={() => {
                    resetFilters();
                    handleClosePopover();
                    dispatch(fetchTags(1, 10, ""));
                  }}
                >
                  Reset
                </LoadingButton>
                <LoadingButton
                  variant="contained"
                  onClick={() => {
                    dispatch(fetchTags(1, 10, filter));
                    setPage(1);
                    handleClosePopover();
                  }}
                >
                  Apply
                </LoadingButton>
              </Stack>
            </Box>
          </Popover>
          <Button
            variant="contained"
            sx={{ borderRadius: 12 }}
            onClick={handleOpenModal}
          >
            <Plus /> Create Tag
          </Button>
        </Stack>
      </Stack>
      <TableContainer>
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
            {TAG?.tags?.map((item) => (
              <TagsRow
                key={item._id}
                item={item}
                updateTagList={updateTagList}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        sx={{ position: "relative", bottom: -10, right: 10, width: "100%" }}
        alignItems={"end"}
      >
        {TAG.total_pages && (
          <Pagination
            count={TAG.total_pages}
            page={page}
            onChange={(event: React.ChangeEvent<unknown>, value: number) => {
              setPage(value);
            }}
            // variant="outlined"
            color="primary"
            size="small"
          />
        )}
      </Stack>
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
    </RoleBasedGaurd>
  );
}

function TagsRow({
  item,
  updateTagList,
}: {
  item: tagType;
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

  const renameTags = useCallback(async () => {
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
  }, [tagName]);

  const deleteTag = useCallback(async () => {
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
  }, []);

  return (
    <>
      <TableRow>
        <TableCell sx={{ p: 0.5 }}></TableCell>
      </TableRow>
      <CustomTableRow key={item._id}>
        <TableCell>
          <Typography>{sentenceCase(item.tag_name)}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{item.username}</Typography>
        </TableCell>
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
            <List disablePadding sx={{ p: 1 }}>
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
            </List>
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

export default memo(Tags);
