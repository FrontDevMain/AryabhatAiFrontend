import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  Divider,
  Grid,
  IconButton,
  Modal,
  Slider,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { END_POINTS } from "src/api/EndPoints";
import fetcher from "src/api/fetcher";
import { preset } from "src/components/settings/presets";

//form
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, {
  RHFRadioGroup,
  RHFTextField,
} from "../../components/hook-form";
import { Close } from "@mui/icons-material";
import { useAuthContext } from "src/auth/useAuthContext";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/reducers";
import { useDispatch } from "react-redux";
import {
  fetchTheme,
  fetchThemeSuccess,
} from "src/redux/actions/theme/ThemeActions";

const PrettoSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.primary.main,
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: theme.palette.primary.main,
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&::before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { sm: "95%", md: "70%" },
  bgcolor: "background.default",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

type FormValuesProps = {
  serverAddress: string;
  port: string;
  security: string;
  SenderEmail: string;
  username: string;
  password: string;
};

export default function Settings() {
  const theme = useTheme();
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const { theme: themeSetting } = useSelector(
    (state: RootState) => state.theme
  );

  const [isLoading, setIsLoading] = useState(false);

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const themeData = {
    user_id: "default_user",
    Theme_logo: "string",
    Theme_theme: "Light",
    Theme_font_size: 14,
    Theme_primary_colour: "#1b75bc",
    Theme_neutral_colour: "#ffffff",
    Setting_archive_record: 30,
    SMTP_server_address: "localhost",
    SMTP_server_port: 587,
    SMTP_server_sequrity: "StartTLS",
    SMTP_email_address: "support@diagonal.ai",
    SMTP_username: "support@diagonal.ai",
    SMTP_password: "string",
    intend: "string",
  };

  const LoginSchema = Yup.object().shape({
    serverAddress: Yup.string().required("Password is required"),
    port: Yup.string().required("Password is required"),
    security: Yup.string().required("Password is required"),
    SenderEmail: Yup.string().required("Password is required"),
    username: Yup.string().required("Password is required"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    serverAddress: "",
    port: "",
    security: "",
    SenderEmail: "",
    username: "",
    password: "",
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const [themeDefaultKeys, setThemeDefaultKeys] = useState(themeSetting);

  useEffect(() => {
    setThemeDefaultKeys(themeSetting);
  }, [themeSetting]);

  const applySetting = async (method: string) => {
    try {
      setIsLoading(true);
      let body = {
        ...themeDefaultKeys,
        user_id: user.user_id,
        intend: method,
      };
      const Response = await fetcher.post(
        END_POINTS.ADMIN.SETTINGS.GET_CONFIG,
        body
      );
      if (Response.status == 200) {
        if (method == "set") dispatch(fetchThemeSuccess(body));
        if (method == "reset")
          dispatch(
            fetchTheme({
              user_id: user.user_id,
              Theme_logo: "",
              Theme_theme: "",
              Theme_font_size: 0,
              Theme_primary_colour: "",
              Theme_neutral_colour: "",
              Setting_archive_record: 0,
              SMTP_server_address: "",
              SMTP_server_port: 0,
              SMTP_server_sequrity: "",
              SMTP_email_address: "",
              SMTP_username: "",
              SMTP_password: "",
              intend: "get",
            })
          );
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = () => {};

  return (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography>Themes Setting</Typography>
        <LoadingButton
          variant="contained"
          onClick={() => applySetting("set")}
          loading={isLoading}
        >
          Apply Theme
        </LoadingButton>
      </Stack>

      <Card
        sx={{
          p: 2,
          boxShadow: "none",
          borderRadius: 2,
          mt: 2,
          display: "flex",
          flexDirection: "column",
          bgcolor: theme.palette.background.default,
          gap: 2,
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography>Logo</Typography>
          <img src={`data:image/png;base64,${themeData.Theme_logo}`} />
        </Stack>
        <Divider />

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography>Font Size</Typography>
          <Stack sx={{ width: 300 }}>
            <PrettoSlider
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              min={10}
              max={24}
              value={themeDefaultKeys.Theme_font_size}
              onChange={(e: any) =>
                setThemeDefaultKeys({
                  ...themeDefaultKeys,
                  Theme_font_size: Number(e.target.value),
                })
              }
            />
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <Typography fontSize={12}>A</Typography>
              <Typography fontSize={15}>Normal</Typography>
              <Typography fontSize={18}>A</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Divider />
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography>Primary Colors</Typography>
          <Stack flexDirection={"row"} gap={1}>
            {preset.map((item) => (
              <span
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: "50%",
                  backgroundColor: item.main,
                  cursor: "pointer",
                  border:
                    themeDefaultKeys.Theme_primary_colour == item.main
                      ? `3px solid ${theme.palette.text.primary}`
                      : "none",
                }}
                onClick={() =>
                  setThemeDefaultKeys({
                    ...themeDefaultKeys,
                    Theme_primary_colour: item.main,
                  })
                }
              ></span>
            ))}
          </Stack>
        </Stack>
        <Divider />
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography>Neutral Color</Typography>
          <Stack flexDirection={"row"} gap={1}>
            {[
              "#121212",
              "#1E1E2F",
              "#23262A",
              "#F0F4F8",
              "#F7F8FA",
              "#ffffff",
            ].map((item) => (
              <span
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: "50%",
                  backgroundColor: item,
                  cursor: "pointer",
                  border:
                    themeDefaultKeys.Theme_neutral_colour == item
                      ? `3px solid ${theme.palette.primary.main}`
                      : "none",
                }}
                onClick={() =>
                  setThemeDefaultKeys({
                    ...themeDefaultKeys,
                    Theme_neutral_colour: item,
                  })
                }
              ></span>
            ))}
          </Stack>
        </Stack>
        <Divider />
      </Card>

      <Stack direction={"row"} alignItems={"center"} mt={3}>
        <Typography>System Setting</Typography>
      </Stack>

      {/* System Setting */}
      <Card
        sx={{
          p: 2,
          boxShadow: "none",
          borderRadius: 2,
          mt: 2,
          display: "flex",
          flexDirection: "column",
          bgcolor: theme.palette.background.default,
          gap: 2,
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography>Reset All Settings</Typography>
          <LoadingButton
            variant="contained"
            onClick={() => applySetting("reset")}
          >
            Reset Now
          </LoadingButton>
        </Stack>
      </Card>

      <Stack direction={"row"} alignItems={"center"} mt={3}>
        <Typography>Chat Setting</Typography>
      </Stack>

      {/* System Setting */}
      <Card
        sx={{
          p: 2,
          boxShadow: "none",
          borderRadius: 2,
          mt: 2,
          display: "flex",
          flexDirection: "column",
          bgcolor: theme.palette.background.default,
          gap: 2,
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography>Archived Chat Retention Period</Typography>
          <LoadingButton variant="contained">30 Days (Default)</LoadingButton>
        </Stack>
      </Card>

      <Card
        sx={{
          p: 2,
          boxShadow: "none",
          borderRadius: 2,
          mt: 2,
          display: "flex",
          flexDirection: "column",
          bgcolor: theme.palette.background.default,
          gap: 2,
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography>SMTP Details</Typography>
          <LoadingButton variant="contained" onClick={handleOpen}>
            Configure
          </LoadingButton>
        </Stack>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography>SMTP Details</Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container sx={{ alignItems: "center" }}>
              <Grid item xs={4}>
                Server Address (SMTP)
              </Grid>
              <Grid item xs={8}>
                <RHFTextField
                  name="serverAddress"
                  value={themeDefaultKeys.SMTP_server_address}
                  onChange={(e) => {
                    setThemeDefaultKeys({
                      ...themeDefaultKeys,
                      SMTP_server_address: e.target.value,
                    });
                  }}
                />
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container sx={{ alignItems: "center" }}>
              <Grid item xs={4}>
                Port
              </Grid>
              <Grid item xs={8}>
                <RHFTextField
                  name="port"
                  type=""
                  value={themeDefaultKeys.SMTP_server_port}
                  onChange={(e) => {
                    setThemeDefaultKeys({
                      ...themeDefaultKeys,
                      SMTP_server_port: Number(e.target.value),
                    });
                  }}
                />
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container sx={{ alignItems: "center" }}>
              <Grid item xs={4}>
                Security
              </Grid>
              <Grid item xs={8}>
                <RHFRadioGroup
                  name="security"
                  options={[
                    { label: "StartTLS", value: "StartTLS" },
                    { label: "SSL/TLS", value: "SSL/TLS" },
                    { label: "None", value: "None" },
                  ]}
                  value={themeDefaultKeys.SMTP_server_sequrity}
                  onChange={(e) => {
                    setThemeDefaultKeys({
                      ...themeDefaultKeys,
                      SMTP_server_sequrity: e.target.value,
                    });
                  }}
                />
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container sx={{ alignItems: "center" }}>
              <Grid item xs={4}>
                Sender Email Address
              </Grid>
              <Grid item xs={8}>
                <RHFTextField
                  name="senderEmail"
                  value={themeDefaultKeys.SMTP_email_address}
                  onChange={(e) => {
                    setThemeDefaultKeys({
                      ...themeDefaultKeys,
                      SMTP_email_address: e.target.value,
                    });
                  }}
                />
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container sx={{ alignItems: "center" }}>
              <Grid item xs={4}>
                Username
              </Grid>
              <Grid item xs={8}>
                <RHFTextField
                  name="username"
                  value={themeDefaultKeys.SMTP_username}
                  onChange={(e) => {
                    setThemeDefaultKeys({
                      ...themeDefaultKeys,
                      SMTP_username: e.target.value,
                    });
                  }}
                />
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container sx={{ alignItems: "center" }}>
              <Grid item xs={4}>
                Password
              </Grid>
              <Grid item xs={8}>
                <RHFTextField
                  name="password"
                  type="password"
                  value={themeDefaultKeys.SMTP_password}
                  onChange={(e) => {
                    setThemeDefaultKeys({
                      ...themeDefaultKeys,
                      SMTP_password: e.target.value,
                    });
                  }}
                />
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Stack flexDirection={"row"} justifyContent={"flex-end"} gap={2}>
              <LoadingButton variant="contained" disabled>
                Send Test Email
              </LoadingButton>
              <LoadingButton variant="contained" onClick={handleClose}>
                Save
              </LoadingButton>
            </Stack>
          </FormProvider>
        </Box>
      </Modal>
    </>
  );
}
