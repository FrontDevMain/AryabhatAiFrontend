import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateSelectedLlm } from "src/redux/actions/llm/LlmActions";
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
  const { LLM, selectedLlm } = useSelector((state: RootState) => state.llm);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Stack direction={"row"} justifyContent={"start"} gap={2}>
      <List
        sx={{
          width: 120,
          padding: 0,
        }}
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton
          onClick={handleClick}
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
                  handleClick();
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

export default HeaderDashboard;
