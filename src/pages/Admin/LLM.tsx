import { Icon } from "@iconify/react";
import { BorderRight, ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Collapse,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Stack,
  styled,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Plus } from "src/assets/icons/Plus";
import { RootState } from "src/redux/reducers";

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    backgroundColor: theme.palette.primary.main,
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

type llmProviderTypes = {
  provider_id: string;
  provider_name: string;
  model_id: string;
  model_name: string;
  user_id: string;
  apikey: string;
  api_proxy_address: string;
  is_enabled: boolean;
  created_at: string;
};

export default function LLM() {
  const [open, setOpen] = useState<number | null>();
  const { LLM } = useSelector((state: RootState) => state.llm);
  const [value, setValue] = useState<string[] | undefined>();
  const [isShowKey, setIsShowKey] = useState<string | null>();

  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={2}
      >
        <Typography variant="h5">LLM List</Typography>
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <Button variant="contained" sx={{ borderRadius: 12 }}>
            <Plus /> Create Model LLM
          </Button>
        </Stack>
      </Stack>
      {LLM.map((item, index) => {
        return (
          <List
            sx={{
              width: "100%",
              bgcolor: "background.default",
              borderRadius: 2,
              cursor: "pointer",
              marginBottom: 2,
            }}
            component="nav"
            key={item.provider_id}
            aria-labelledby="nested-list-subheader"
          >
            <ListItem>
              {open == index ? <ExpandLess /> : <ExpandMore />}
              <ListItemText
                primary={item.provider_name}
                sx={{ ml: 2 }}
                onClick={() => setOpen(open == index ? null : index)}
              />
              <FormControlLabel
                control={<Android12Switch checked={item.is_enabled} />}
                label=""
              />
            </ListItem>
            <Collapse
              in={open == index}
              timeout="auto"
              unmountOnExit
              sx={{ px: 2 }}
            >
              <Grid container spacing={3} mt={1}>
                <Grid item xs={4}>
                  <Typography>API Key</Typography>
                  <Typography variant="body2" color="text.disabled">
                    Please enter your OpenAI API Key
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Input Text"
                    type={
                      isShowKey == `${item.apikey}_${index}`
                        ? "text"
                        : "password"
                    }
                    value={item.apikey}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setIsShowKey(
                                isShowKey == `${item.apikey}_${index}`
                                  ? null
                                  : `${item.apikey}_${index}`
                              )
                            }
                            edge="end"
                          >
                            <Icon
                              icon={
                                isShowKey == `${item.apikey}_${index}`
                                  ? "eva:eye-fill"
                                  : "eva:eye-off-fill"
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Typography>API Proxy Address</Typography>
                  <Typography variant="body2" color="text.disabled">
                    Must include http(s):// in addition to the default address
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Input Text"
                    type={
                      isShowKey == `${item.api_proxy_address}_${index}`
                        ? "text"
                        : "password"
                    }
                    value={item.api_proxy_address}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setIsShowKey(
                                isShowKey ==
                                  `${item.api_proxy_address}_${index}`
                                  ? null
                                  : `${item.api_proxy_address}_${index}`
                              )
                            }
                            edge="end"
                          >
                            <Icon
                              icon={
                                isShowKey ==
                                `${item.api_proxy_address}_${index}`
                                  ? "eva:eye-fill"
                                  : "eva:eye-off-fill"
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Typography>Mode List</Typography>
                  <Typography variant="body2" color="text.disabled">
                    Select the models to display in the session. The selected
                    models will be displayed in the model list.
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Autocomplete
                    value={[item.model_name]}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    multiple
                    freeSolo
                    size="small"
                    options={[]}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) =>
                      setInputValue(newInputValue)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label={"Please select searchBy"}
                        variant="outlined"
                        autoComplete="off"
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Typography>Connectivity Check</Typography>
                  <Typography variant="body2" color="text.disabled">
                    Test if the API Key and proxy address are filled in
                    correctly
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Input Text"
                    type={
                      isShowKey == `${item.api_proxy_address}_${index}`
                        ? "text"
                        : "password"
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setIsShowKey(
                                isShowKey ==
                                  `${item.api_proxy_address}_${index}`
                                  ? null
                                  : `${item.api_proxy_address}_${index}`
                              )
                            }
                            edge="end"
                          >
                            <Icon
                              icon={
                                isShowKey ==
                                `${item.api_proxy_address}_${index}`
                                  ? "eva:eye-fill"
                                  : "eva:eye-off-fill"
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Divider sx={{ my: 3 }} />
            </Collapse>
          </List>
        );
      })}
    </>
  );
}
