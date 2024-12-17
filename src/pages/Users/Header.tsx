import { Icon } from "@iconify/react";
import {
  ExpandLess,
  ExpandMore,
  ImportExport,
  IosShareOutlined,
} from "@mui/icons-material";
import {
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import { sentenceCase } from "change-case";
import { useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedLlm } from "src/redux/actions/llm/LlmActions";
import { updateSelectedTag } from "src/redux/actions/tags/TagsActions";
import { RootState } from "src/redux/reducers";

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: 0,
  "&:hover": {
    backgroundColor: theme.palette.secondary.main, // Hover background
  },
}));

const CustomListItemText = styled(ListItemText)(({ theme }) => ({
  margin: 0,
  padding: "12px",
  color: theme.palette.text.primary, // Hover background
  "&:hover": {
    color: theme.palette.background.default,
  },
}));

function HeaderDashboard() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const { TAG, selectedTag } = useSelector((state: RootState) => state.tag);
  const { LLM, selectedLlm } = useSelector((state: RootState) => state.llm);

  return (
    <Stack direction={"row"} justifyContent={"space-between"} gap={2}>
      <Stack direction={"row"} justifyContent={"start"} gap={2}>
        <List
          sx={{
            width: 120,
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
              "&:hover": {
                color: theme.palette.background.default, // Hover background
                backgroundColor: theme.palette.secondary.main, // Hover background
              },
            }}
          >
            <ListItemText
              sx={{ padding: 1.5 }}
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
              ).map((item) => (
                <CustomListItemButton
                  key={item.provider_id}
                  onClick={() => {
                    dispatch(updateSelectedLlm(item));
                    setOpen(!open);
                  }}
                >
                  <CustomListItemText>{item.provider_name}</CustomListItemText>
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
            <ListItemText
              sx={{ padding: 1.5 }}
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
                    <CustomListItemText>
                      {sentenceCase(item.tag_name || "")}
                    </CustomListItemText>
                  </CustomListItemButton>
                ))}
            </Stack>
          </Collapse>
        </List>
        <IconButton sx={{ bgcolor: "#fff" }}>
          <IosShareOutlined sx={{ width: "30px", height: "30px" }} />
        </IconButton>
        <IconButton sx={{ bgcolor: "#fff" }}>
          <Icon
            icon="mynaui:dots-solid"
            width="30px"
            height="30px"
            style={{
              borderRadius: 20,
            }}
          />
        </IconButton>
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
      <CustomListItemText>
        <Typography color={"#ffffff"}>{item}</Typography>
      </CustomListItemText>
    </ListItemButton>
  );
}

export default memo(HeaderDashboard);
