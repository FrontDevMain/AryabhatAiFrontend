import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  Divider,
  Grid,
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
import { useSettingsContext } from "src/components/settings";
import { preset } from "src/components/settings/presets";

//form
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, {
  RHFRadioGroup,
  RHFTextField,
} from "../../components/hook-form";

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
  const { onChangeFontSize, onChangeColor, onChangeNeturalColor } =
    useSettingsContext();

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
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    // getConfig();
  }, []);

  const getConfig = async () => {
    try {
      const Response = await fetcher.get(END_POINTS.ADMIN.SETTINGS.GET_CONFIG);
      console.log(Response);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = () => {};

  return (
    <>
      <Stack direction={"row"} alignItems={"center"}>
        <Typography>Themes Setting</Typography>
      </Stack>

      {/* logo */}
      <Card
        sx={{
          p: 2,
          boxShadow: "none",
          borderRadius: 2,
          mt: 2,
          display: "flex",
          flexDirection: "column",
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
          <Typography>Theme</Typography>
          <Stack flexDirection={"row"} gap={2}>
            {[
              { label: "Light", value: "#F4F4F5" },
              { label: "Dark", value: "#000" },
            ].map((item) => (
              <Stack gap={0.5}>
                <span
                  style={{
                    width: 85,
                    height: 50,
                    backgroundColor: item.value,
                    borderRadius: 10,
                  }}
                ></span>
                <Typography textAlign={"center"}>{item.label}</Typography>
              </Stack>
            ))}
          </Stack>
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
              value={parseFloat(theme.typography.body1.fontSize + "") * 16}
              onChange={(e: any) => onChangeFontSize(e)}
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
                }}
                onClick={() => onChangeColor(item.main)}
              ></span>
            ))}
          </Stack>
        </Stack>
        {/* <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography>Netural Colors</Typography>
          <Stack flexDirection={"row"} gap={1}>
            {["#D9D9D9", "#EAEAEA", "#F4F4F5", "#ffffff"].map((item) => (
              <span
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: "50%",
                  backgroundColor: item,
                  cursor: "pointer",
                }}
                onClick={() => onChangeNeturalColor(item)}
              ></span>
            ))}
          </Stack>
        </Stack> */}
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
          gap: 2,
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography>Reset All Settings</Typography>
          <LoadingButton variant="contained">Reset Now</LoadingButton>
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
          <Typography>SMTP Detail</Typography>
          <Divider sx={{ my: 1 }} />
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container sx={{ alignItems: "center" }}>
              <Grid item xs={4}>
                Server Address (SMTP)
              </Grid>
              <Grid item xs={8}>
                <RHFTextField name="serverAddress" />
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container sx={{ alignItems: "center" }}>
              <Grid item xs={4}>
                Port
              </Grid>
              <Grid item xs={8}>
                <RHFTextField name="port" />
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
                    { label: "StartTLC", value: "StartTLC" },
                    { label: "SSL/TLS", value: "SSL/TLS" },
                    { label: "None", value: "None" },
                  ]}
                />
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container sx={{ alignItems: "center" }}>
              <Grid item xs={4}>
                Sender Email Address
              </Grid>
              <Grid item xs={8}>
                <RHFTextField name="senderEmail" />
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container sx={{ alignItems: "center" }}>
              <Grid item xs={4}>
                Username
              </Grid>
              <Grid item xs={8}>
                <RHFTextField name="username" />
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container sx={{ alignItems: "center" }}>
              <Grid item xs={4}>
                Password
              </Grid>
              <Grid item xs={8}>
                <RHFTextField name="password" type="password" />
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
