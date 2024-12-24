import { Icon } from "@iconify/react";
import {
  ExpandLess,
  ExpandMore,
  MoreHoriz,
  SystemUpdateAltOutlined,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Modal,
  Popover,
  Stack,
  styled,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { sentenceCase } from "change-case";
import { useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "src/auth/useAuthContext";
import GeneratePdfDocument from "src/components/CustomComponents/GeneratePdfDocument";
import { updateSelectedLlm } from "src/redux/actions/llm/LlmActions";
import {
  onChangeNotebookHeaderName,
  onNotebookDelete,
  toggleNotebookArchive,
  toggleNotebookPin,
} from "src/redux/actions/Notebook/NotebookActions";
import { updateSelectedTag } from "src/redux/actions/tags/TagsActions";
import { RootState } from "src/redux/reducers";
import { CustomListItemText } from "src/theme/globalStyles";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: 0,
  "&:hover": {
    backgroundColor: theme.palette.secondary.main, // Hover background
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

function HeaderDashboard() {
  const { user } = useAuthContext();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [headerName, setHeaderName] = useState("");
  const { TAG, selectedTag } = useSelector((state: RootState) => state.tag);
  const { LLM, selectedLlm } = useSelector((state: RootState) => state.llm);
  const { CHAT } = useSelector((state: RootState) => state.chat);
  const { updateLoading, notebookList } = useSelector(
    (state: RootState) => state.notebook
  );

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClosePopover = () => setAnchorEl(null);
  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  //modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setHeaderName("");
  };

  return (
    <Stack direction={"row"} justifyContent={"space-between"} gap={2}>
      <Stack direction={"row"} justifyContent={"start"} gap={2}>
        <List
          sx={{
            width: 160,
            minWidth: "fit-content",
            padding: 0,
          }}
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton
            onClick={() => setOpen(!open)}
            sx={{
              padding: 0,
              backgroundColor: theme.palette.background.default,
              borderRadius: open ? "20px 20px 0 0" : 20,
              overflow: "clip",
              color: theme.palette.text.primary, // Hover background
              zIndex: 9999,
              "&:hover": {
                color: theme.palette.background.default, // Hover background
                backgroundColor: theme.palette.secondary.main, // Hover background
              },
            }}
          >
            <ListItemText
              sx={{ padding: "8px 13px" }}
              primary={selectedLlm.provider_name}
            />
            {open ? (
              <ExpandLess sx={{ marginRight: 2 }} />
            ) : (
              <ExpandMore sx={{ marginRight: 2 }} />
            )}
          </ListItemButton>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            sx={{
              position: "absolute",
              top: 20,
              zIndex: 9998,
              width: "100%",
            }}
          >
            <Stack
              sx={{
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                overflow: "clip",
              }}
            >
              {LLM.filter(
                (elem) => elem.provider_id !== selectedLlm.provider_id
              ).map((item, index) => (
                <CustomListItemButton
                  key={item.provider_id}
                  style={{ paddingTop: index == 0 ? 20 : 0 }}
                  onClick={() => {
                    setOpen(!open);
                    setTimeout(() => {
                      dispatch(updateSelectedLlm(item));
                    }, 300);
                  }}
                >
                  <ListItemText
                    sx={{
                      margin: 0,
                      padding: "10px 13px",
                      color: theme.palette.text.primary, // Hover background
                      "&:hover": {
                        color: theme.palette.background.default,
                      },
                    }}
                  >
                    {item.provider_name}
                  </ListItemText>
                </CustomListItemButton>
              ))}
            </Stack>
          </Collapse>
        </List>
        <VersionCard item={selectedLlm.model_name} />
      </Stack>
      <Stack flexDirection={"row"} gap={2}>
        <List
          sx={{
            width: 200,
            padding: 0,
          }}
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton
            onClick={() => setOpen1(!open1)}
            sx={{
              padding: 0,
              backgroundColor: theme.palette.background.default,
              borderRadius: open1 ? "20px 20px 0 0" : 20,
              overflow: "clip",
              color: theme.palette.text.primary, // Hover background
              "&:hover": {
                color: theme.palette.background.default, // Hover background
                backgroundColor: theme.palette.secondary.main, // Hover background
              },
            }}
          >
            {" "}
            <span
              style={{
                height: 10,
                width: 10,
                marginLeft: 20,
                backgroundColor: "#F5B700",
                borderRadius: "50%",
              }}
            ></span>
            <ListItemText
              sx={{ padding: "8px 13px" }}
              primary={sentenceCase(selectedTag.tag_name || "")}
            />
            {open1 ? (
              <ExpandLess sx={{ marginRight: 2 }} />
            ) : (
              <ExpandMore sx={{ marginRight: 2 }} />
            )}
          </ListItemButton>
          <Collapse
            in={open1}
            timeout="auto"
            unmountOnExit
            sx={{
              position: "absolute",
              zIndex: 9999,
              width: "100%",
            }}
          >
            <Stack
              sx={{
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                overflow: "clip",
              }}
            >
              {TAG?.tags
                ?.filter((elem) => elem._id !== selectedTag._id)
                ?.map((item) => (
                  <CustomListItemButton
                    key={item._id}
                    onClick={() => {
                      dispatch(updateSelectedTag(item));
                      setOpen1(!open1);
                    }}
                  >
                    <CustomListItemText sx={{ margin: 0 }}>
                      {sentenceCase(item.tag_name || "")}
                    </CustomListItemText>
                  </CustomListItemButton>
                ))}
            </Stack>
          </Collapse>
        </List>
        {CHAT.chat_id && (
          <>
            <PDFDownloadLink
              document={
                <GeneratePdfDocument
                  data={CHAT.messages}
                  llm={selectedLlm}
                  tag={selectedTag}
                  userName={user.user_firstname}
                />
              }
              fileName={`${
                notebookList.find((item) => item.chat_id == CHAT.chat_id)
                  ?.chat_header
              }.pdf`}
            >
              <IconButton
                sx={{
                  bgcolor: theme.palette.background.default,
                  height: "100%",
                }}
              >
                <SystemUpdateAltOutlined />
              </IconButton>
            </PDFDownloadLink>
            <IconButton
              sx={{ bgcolor: theme.palette.background.default }}
              aria-describedby={id}
              onClick={handleOpenPopover}
            >
              <MoreHoriz />
            </IconButton>
          </>
        )}
        <Popover
          id={id}
          anchorEl={anchorEl}
          open={openPopover}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <List disablePadding sx={{ padding: 1 }} onClick={handleClosePopover}>
            <CustomListItemText
              onClick={() =>
                dispatch(toggleNotebookPin(CHAT.user_id, CHAT.chat_id))
              }
            >
              {notebookList.find((item) => item.chat_id == CHAT.chat_id)?.is_pin
                ? "Unpin Chat from Top"
                : "Pin Chat on Top"}
            </CustomListItemText>
            <CustomListItemText
              onClick={() =>
                dispatch(toggleNotebookArchive(CHAT.user_id, CHAT.chat_id))
              }
            >
              {notebookList.find((item) => item.chat_id == CHAT.chat_id)
                ?.is_archieved
                ? "Unarchive"
                : "Archive"}
            </CustomListItemText>
            <CustomListItemText
              onClick={() => dispatch(onNotebookDelete(CHAT.chat_id))}
            >
              Delete
            </CustomListItemText>
            <CustomListItemText
              onClick={() => {
                setHeaderName(
                  notebookList.find((item) => item.chat_id == CHAT.chat_id)
                    ?.chat_header || ""
                );
                handleOpenModal();
              }}
            >
              Rename
            </CustomListItemText>
          </List>
        </Popover>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              ...style,
              backgroundColor: (theme) => theme.palette.background.default,
            }}
          >
            <Typography id="modal-modal-title" variant="h4" mb={3}>
              Edit Header
            </Typography>
            <TextField
              fullWidth
              label="Tag Name"
              value={headerName}
              onChange={(e) => setHeaderName(e.target.value)}
            />
            <Stack direction={"row"} gap={2} mt={3}>
              <Button variant="outlined" fullWidth onClick={handleCloseModal}>
                Cancel
              </Button>
              <LoadingButton
                variant="contained"
                fullWidth
                loading={updateLoading}
                onClick={() => {
                  dispatch(
                    onChangeNotebookHeaderName(
                      CHAT.user_id,
                      CHAT.chat_id,
                      headerName
                    )
                  );
                  handleCloseModal();
                }}
              >
                Submit
              </LoadingButton>
            </Stack>
          </Box>
        </Modal>
      </Stack>
    </Stack>
  );
}

function VersionCard({ item }: { item: string }) {
  const theme = useTheme();
  return (
    <ListItemButton
      selected={true}
      sx={{
        padding: 0,
        borderRadius: 20,
        flexGrow: 0,
        overflow: "clip",
        backgroundColor: theme.palette.background.default,
        "&:hover": {
          backgroundColor: theme.palette.primary.main, // Hover background
        },
        "&.Mui-selected": {
          backgroundColor: theme.palette.primary.main, // Selected text color
          "&:hover": {
            backgroundColor: theme.palette.primary.dark, // Darker on hover when selected
          },
        },
      }}
    >
      <ListItemText
        sx={{
          margin: 0,
          padding: "8px 13px",
          color: theme.palette.text.primary, // Hover background
          "&:hover": {
            color: theme.palette.background.default,
          },
        }}
      >
        <Typography color={"#ffffff"}>{item}</Typography>
      </ListItemText>
    </ListItemButton>
  );
}

export default memo(HeaderDashboard);
