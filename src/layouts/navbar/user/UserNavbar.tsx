import {
  alpha,
  Box,
  Button,
  Collapse,
  Icon,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Modal,
  Popover,
  Stack,
  styled,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { NoteAddOutlined, PushPinOutlined } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/reducers";
import fetcher from "src/api/fetcher";
import { END_POINTS } from "src/api/EndPoints";
import { NotebookList } from "src/redux/actions/Notebook/NotebookActionTypes";
import { useAuthContext } from "src/auth/useAuthContext";
import { useDispatch } from "react-redux";
import {
  fetchNotebookList,
  onChangeNotebookHeaderName,
  onNotebookDelete,
  toggleNotebookArchive,
  toggleNotebookPin,
} from "src/redux/actions/Notebook/NotebookActions";
import { LoadingButton } from "@mui/lab";
import { fetchChat } from "src/redux/actions/chat/ChatActions";
import {
  CustomListItemButton,
  CustomListItemText,
} from "src/theme/globalStyles";
import { Loading } from "src/assets/icons/loading";
import { PATH_USER_DASHBOARD } from "src/routes/path";
import { useNavigate } from "react-router-dom";

const CustomListSubItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius, // Rounded corners
  color: theme.palette.text.secondary,
  backgroundColor: "transparent",
  "&:hover": {
    color: theme.palette.primary.main, // Selected text color
  },
  "&.Mui-selected": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1), // Selected text color
    color: theme.palette.primary.main, // Selected text color
    fontWeight: 700,
    "&:hover": {
      color: theme.palette.primary.main, // Darker on hover when selected
    },
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

type navbarType = {
  title: string;
  path: string | any;
  icon: string;
  roles: [string];
  children: any[];
};

export default function UserNavbar() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const [active, setActive] = useState("Notebook");
  const { loading, notebookList } = useSelector(
    (state: RootState) => state.notebook
  );
  const { theme: themeSetting } = useSelector(
    (state: RootState) => state.theme
  );

  const [navbarList, setNavbarList] = useState([] as navbarType[]);

  useEffect(() => {
    setNavbarList([
      {
        title: "Notebook",
        path: PATH_USER_DASHBOARD.notebook,
        icon: "notebook",
        roles: ["User"],
        children: notebookList.filter((item) => !item.is_archieved),
      },
      {
        title: "Archive",
        path: PATH_USER_DASHBOARD.dashboard,
        icon: "archive",
        roles: ["User"],
        children: notebookList.filter((item) => item.is_archieved),
      },
    ]);
  }, [notebookList]);

  const createNewNotebook = async (userId: string) => {
    try {
      const body = {
        user_id: userId,
      };
      const Response = await fetcher.post(
        END_POINTS.USER.QUERY.CREATE_NOTEBOOK,
        body
      );
      if (Response.status == 200) {
        dispatch(fetchNotebookList(userId));
        dispatch(fetchChat(user.user_id, Response.data.Notebook_id));
      }
    } catch (error) {}
  };

  return (
    <Box
      sx={{
        overflow: "auto",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <List component="nav" aria-labelledby="nested-list-subheader">
        {navbarList?.map((item) => {
          return (
            <>
              <CustomListItemButton
                onClick={async () => {
                  await dispatch(
                    fetchChat(user.user_id, item.children[0]?.chat_id)
                  );
                  setActive(item.title);
                }}
                selected={active == item.title}
              >
                <Box
                  component="span"
                  className="svg-color"
                  sx={{
                    width: 24,
                    height: 24,
                    mr: 1,
                    display: "inline-block",
                    bgcolor:
                      active == item.title
                        ? "#ffffff"
                        : theme.palette.text.primary,
                    mask: `url(${`/assets/icons/adminIcons/${item.icon}.svg`}) no-repeat center / contain`,
                    WebkitMask: `url(${`/assets/icons/userIcons/${item.icon}.svg`}) no-repeat center / contain`,
                  }}
                />
                {themeSetting.Theme_Layout == "vertical" && (
                  <ListItemText
                    primary={item.title}
                    sx={{
                      color: active == item.title ? "#fff" : "text.primary",
                    }}
                  />
                )}
                {themeSetting.Theme_Layout == "vertical" && (
                  <>
                    {item.title == "Notebook" && (
                      <Tooltip title="New Chat" placement="top">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            createNewNotebook(user.user_id);
                          }}
                        >
                          <NoteAddOutlined
                            sx={{
                              color:
                                active == item.title
                                  ? "#fff"
                                  : theme.palette.text.primary,
                            }}
                          />
                        </IconButton>
                      </Tooltip>
                    )}
                  </>
                )}
              </CustomListItemButton>
              {themeSetting.Theme_Layout == "vertical" && (
                <>
                  {!loading ? (
                    <Collapse
                      in={active == item.title}
                      timeout="auto"
                      unmountOnExit
                    >
                      {item.children.map((child: NotebookList) => (
                        <SubNotebook child={child} />
                      ))}
                    </Collapse>
                  ) : (
                    <Collapse
                      in={active == item.title}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Loading />
                    </Collapse>
                  )}
                </>
              )}
            </>
          );
        })}
      </List>
    </Box>
  );
}

const SubNotebook = ({ child }: { child: NotebookList }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [headerName, setHeaderName] = useState("");
  const { CHAT } = useSelector((state: RootState) => state.chat);
  const { updateLoading } = useSelector((state: RootState) => state.notebook);

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
    <List component="div" disablePadding key={child.chat_id}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <CustomListSubItemButton
          sx={{ pl: 2 }}
          onClick={() =>
            navigate(
              `/user/${child.is_archieved ? "archive" : "notebook"}/${
                child.chat_id
              }`
            )
          }
          selected={CHAT.chat_id == child.chat_id}
        >
          <Typography sx={{ flex: "1 1 0", fontWeight: "inherit" }}>
            {child.chat_header}
          </Typography>
          {child.is_pin ? (
            <PushPinOutlined
              sx={{
                transform: "rotate(45deg)",
                color: "primary.main",
                fontSize: 20,
              }}
            />
          ) : null}
          <IconButton
            aria-describedby={id}
            onClick={(e) => {
              e.stopPropagation();
              handleOpenPopover(e);
            }}
          >
            <Icon>
              <MoreVertIcon />
            </Icon>
          </IconButton>
        </CustomListSubItemButton>
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
          <List
            disablePadding
            key={child.chat_id}
            sx={{ padding: 1 }}
            onClick={handleClosePopover}
          >
            <CustomListItemText
              onClick={() =>
                dispatch(toggleNotebookPin(user.user_id, child.chat_id))
              }
            >
              {child.is_pin ? "Unpin Chat from Top" : "Pin Chat on Top"}
            </CustomListItemText>
            <CustomListItemText
              onClick={() =>
                dispatch(toggleNotebookArchive(user.user_id, child.chat_id))
              }
            >
              {child.is_archieved ? "Unarchive" : "Archive"}
            </CustomListItemText>
            <CustomListItemText
              onClick={() => dispatch(onNotebookDelete(child.chat_id))}
            >
              Delete
            </CustomListItemText>
            <CustomListItemText
              onClick={() => {
                setHeaderName(child.chat_header);
                handleOpenModal();
              }}
            >
              Rename
            </CustomListItemText>
          </List>
        </Popover>
      </Stack>
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
                    child.user_id,
                    child.chat_id,
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
    </List>
  );
};
