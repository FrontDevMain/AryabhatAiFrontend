import { Icon } from "@iconify/react";
import { Close, CloseOutlined, CloudUpload, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItemText,
  MenuItem,
  Modal,
  Popover,
  Select,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { END_POINTS } from "src/api/EndPoints";
import fetcher from "src/api/fetcher";

import { Filters } from "src/assets/icons/filter";
import { Plus } from "src/assets/icons/Plus";
import { useAuthContext } from "src/auth/useAuthContext";
import ConfirmationModal from "src/components/CustomComponents/ConfirmationModal";
import Scrollbar from "src/components/scrollbar";
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

export default function FileRepository() {
  const theme = useTheme();
  const { user } = useAuthContext();
  const [files, setFiles] = useState<filesType[]>([]);
  const [tags, setTags] = useState<tagListTypes[]>([]);

  const [file, setFile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFile(null);
  };

  useEffect(() => {
    getAllFiles();
    getAllTags();
  }, []);

  const handleFileUpload = (event: any) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      if (uploadedFile.size > 25 * 1024 * 1024) {
        alert("File size exceeds 25MB.");
        return;
      }
      setFile(uploadedFile);
    }
  };

  const handleFileRemove = () => {
    setFile(null);
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    const uploadedFile = event.dataTransfer.files[0];
    if (uploadedFile) {
      if (uploadedFile.size > 25 * 1024 * 1024) {
        alert("File size exceeds 25MB.");
        return;
      }
      setFile(uploadedFile);
    }
  };

  const getAllFiles = useCallback(async () => {
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
  }, []);

  const getAllTags = useCallback(async () => {
    try {
      const Response = await fetcher.get(END_POINTS.ADMIN.TAGS.GET_TAGS);
      if (Response.status == 200) {
        setTags(Response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const onUploadFile = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("user_id", user.user_id);
      const Response = await fetcher.postFile(
        END_POINTS.ADMIN.FILE_REPOSITORIES.UPLOAD_FILE,
        formData
      );
      if (Response.status == 200) {
        handleClose();
        setFiles([...files, Response.data]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFileList = (method: string, data: any) => {
    console.log(method, data);
    if (method == "delete") {
      setFiles(files.filter((item) => item._id !== data));
    }
    if (method == "rename") {
      setFiles([...files.map((item) => (item._id == data._id ? data : item))]);
    }
  };

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography>File Repository</Typography>
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <IconButton>
            <Filters />
          </IconButton>
          <Button
            variant="contained"
            sx={{ borderRadius: 12 }}
            onClick={handleOpen}
          >
            <Plus /> Upload File
          </Button>
        </Stack>
      </Stack>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>File name</TableCell>
              <TableCell>File type</TableCell>
              <TableCell>File size</TableCell>
              <TableCell>Time of upload</TableCell>
              <TableCell>Tag</TableCell>
              <TableCell>File Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((item, index) => (
              <UserDetail
                key={item._id}
                item={item}
                tags={tags}
                updateFileList={updateFileList}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack flexDirection={"row"} justifyContent={"space-between"}>
            <Typography color="text.disabled" onClick={handleOpen}>
              Upload
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseOutlined />
            </IconButton>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Stack
            sx={{
              border: "2px dashed #ccc",
              borderRadius: "8px",
              padding: "20px",
              textAlign: "center",
              position: "relative",
              backgroundColor: "#f9f9f9",
            }}
            alignItems={"center"}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <CloudUpload sx={{ fontSize: 50, textAlign: "center" }} />
            <Typography variant="body2" textAlign={"center"} sx={{ mt: 2 }}>
              <label
                htmlFor="file-upload"
                style={{ cursor: "pointer", color: theme.palette.primary.main }}
              >
                Click to Upload
              </label>{" "}
              or drag and drop
            </Typography>
            <Typography
              variant="caption"
              textAlign={"center"}
              color="text.disabled"
            >
              (Max. File size: 25 MB)
            </Typography>
            <input
              id="file-upload"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
          </Stack>
          {file && (
            <Stack
              sx={{
                border: `1px solid  #ccc`,
                borderRadius: 1,
                px: 1,
                py: 3,
                mt: 1,
              }}
            >
              <Stack
                gap={4}
                flexDirection={"row"}
                justifyContent={"space-between"}
              >
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </Typography>
                <IconButton color="error" onClick={handleFileRemove}>
                  <Delete />
                </IconButton>
              </Stack>
              <LoadingButton
                variant="contained"
                onClick={onUploadFile}
                loading={isLoading}
              >
                Upload
              </LoadingButton>
            </Stack>
          )}
        </Box>
      </Modal>
    </>
  );
}

function UserDetail({
  item,
  tags,
  updateFileList,
}: {
  item: filesType;
  tags: tagListTypes[];
  updateFileList: (method: string, data: any) => void;
}) {
  const theme = useTheme();
  const { user } = useAuthContext();
  const [tagName, setTagName] = useState(item.department_tag);
  const [htmlContent, setHtmlContent] = useState("");

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

  //preview modal
  const [openModal1, setOpenModal1] = useState(false);
  const handleOpenModal1 = () => setOpenModal1(true);
  const handleCloseModal1 = () => setOpenModal1(false);

  const downloadFiles = async (id: string) => {
    handleClosePopover();
    try {
      const Response = await fetcher.get(
        END_POINTS.ADMIN.FILE_REPOSITORIES.DOWNLOAD_FILES(id)
      );

      if (Response.status == 200) {
        // const blob = new Blob([Response.data], {
        //   type: Response.headers["content-type"] || "application/octet-stream",
        // });
        // const url = window.URL.createObjectURL(blob);
        // const link = document.createElement("a");
        // link.href = url;
        // link.setAttribute("download", item.filename);
        // document.body.appendChild(link);
        // link.click();
        // link.remove();
        // console.log(link);
        // console.log(url);
        // // Revoke the object URL after download
        // window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const previewFile = async (id: string) => {
    try {
      handleClosePopover();
      const Response = await fetcher.get(
        END_POINTS.ADMIN.FILE_REPOSITORIES.DOWNLOAD_PREVIEW(id)
      );
      if (Response.status == 200) {
        handleOpenModal1();
        setHtmlContent(Response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onModifyDepartment = async () => {
    handleClosePopover();
    try {
      const body = {
        file_id: item._id,
        department_tag: tagName,
        modified_by: user.user_id,
      };
      const Response = await fetcher.put(
        END_POINTS.ADMIN.FILE_REPOSITORIES.MODIFY_DEPARTMENT,
        body
      );
      if (Response.status == 200) {
        updateFileList("rename", Response.data);
        setTagName("");
        handleCloseModal();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTag = async () => {
    handleClosePopover();
    try {
      const Response = await fetcher.delete(
        END_POINTS.ADMIN.FILE_REPOSITORIES.DELETE_FILE(item._id)
      );
      if (Response.status == 200) {
        updateFileList("delete", item._id);
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
      <CustomTableRow>
        <TableCell>
          <Typography>{item.username}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{item.filename}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{item.filetype}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{item.filesize}</Typography>
        </TableCell>
        <TableCell>
          {" "}
          <Typography noWrap>{formatDate(item.time_of_upload)}</Typography>
        </TableCell>
        <TableCell>
          {" "}
          <Typography>{item.department_tag}</Typography>
        </TableCell>
        <TableCell>
          {" "}
          <Typography>{item.file_status}</Typography>
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
              <CustomListItemText onClick={() => previewFile(item._id)}>
                Preview
              </CustomListItemText>
              <CustomListItemText onClick={handleOpenConfirm}>
                Delete
              </CustomListItemText>
              <CustomListItemText onClick={() => downloadFiles(item._id)}>
                Download
              </CustomListItemText>
              <CustomListItemText onClick={handleOpenModal}>
                Modify Tag
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
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4">
            Modify Department
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tag Name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={tagName}
              label="Tag Name"
              onChange={(e) => setTagName(e.target.value)}
            >
              {tags.map((item) => (
                <MenuItem key={item._id} value={item.tag_name}>
                  {item.tag_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Stack direction={"row"} gap={2} mt={3}>
            <Button variant="outlined" fullWidth onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="contained" fullWidth onClick={onModifyDepartment}>
              Submit
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Modal
        open={openModal1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: "90%", height: "90%" }}>
          <IconButton
            sx={{ position: "absolute", top: 10, left: 15 }}
            onClick={handleCloseModal1}
          >
            <Close />
          </IconButton>
          <Typography textAlign={"center"}>Preview</Typography>
          <div
            style={{
              height: "95%",
              width: "100%",
              marginTop: 10,
              overflow: "scroll",
            }}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </Box>
      </Modal>
    </>
  );
}
