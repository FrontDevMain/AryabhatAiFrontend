import { CheckCircle, Close, RadioButtonUnchecked } from "@mui/icons-material";
import {
  Box,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useDeferredValue, useEffect, useState } from "react";
import { END_POINTS } from "src/api/EndPoints";
import fetcher from "src/api/fetcher";
import RoleBasedGaurd from "src/auth/RoleBasedGaurd";

//form
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import { LoadingButton } from "@mui/lab";
import { showToast } from "src/utils/Toast";
import { noCase } from "change-case";

type connectorsDataType = {
  isLoading: boolean;
  filterData: {
    database_service_provider_id: string;
    database_icon: string;
    database_service_provider_name: string;
    is_default: number;
  }[];
  data: {
    database_service_provider_id: string;
    database_icon: string;
    database_service_provider_name: string;
    is_default: number;
  }[];
};

type FormValuesProps = {
  database_service_provider_id: string;
  id: string | null;
  server: string;
  port: string;
  database: string;
  is_encrypt: number;
  username: string;
  password: string;
  query_timeout: number;
  database_icon: string;
  database_service_provider_name: string;
  conn_id: string;
  intend: string;
};

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

export default function Connectors() {
  const theme = useTheme();
  const [connectors, setConnectors] = useState<connectorsDataType>({
    isLoading: false,
    data: [],
    filterData: [],
  });
  const [localSearch, setLocalSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const deferredLocalSearch = useDeferredValue(localSearch);

  useEffect(() => {
    setConnectors((prevState) => ({
      ...prevState,
      filterData: connectors.data.filter(
        (item) =>
          noCase(item.database_service_provider_name) ==
          noCase(deferredLocalSearch)
      ),
    }));
  }, [deferredLocalSearch]);

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const LoginSchema = Yup.object().shape({
    database_service_provider_id: Yup.string(),
    id: Yup.string(),
    server: Yup.string(),
    port: Yup.string(),
    database: Yup.string(),
    username: Yup.string(),
    password: Yup.string(),
  });

  const defaultValues = {
    database_service_provider_id: "",
    id: null,
    server: "",
    port: "",
    database: "",
    is_encrypt: 0,
    username: "",
    password: "",
    query_timeout: 0,
    database_icon: "",
    database_service_provider_name: "",
    conn_id: "",
    intend: "",
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    getValues,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    getConnectorsList();
  }, []);

  const getConnectorsList = async () => {
    try {
      const Response = await fetcher.post(
        END_POINTS.ADMIN.SETTINGS.GET_CONNECTORS_LIST,
        { connection_id: "" }
      );
      if (Response.status == 200) {
        setConnectors({
          isLoading: false,
          data: Response.data,
          filterData: Response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getConfigureDb = async (id: string) => {
    try {
      const body = {
        ...getValues(),
        database_service_provider_id: id,
        intend: "get",
      };
      const Response = await fetcher.post(
        END_POINTS.ADMIN.SETTINGS.CONFIGURE_DB,
        body
      );
      if (Response.status == 200) {
        Response.data
          .filter((item: any) => item.database_service_provider_id == id)
          .forEach((item: any) => {
            for (let key in item) {
              setValue(key.toString() as any, item[key]);
            }
          });
        handleOpen();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSendTestEmail = async () => {
    try {
      setIsLoading(true);
      const Response = await fetcher.post(
        END_POINTS.ADMIN.SETTINGS.SEND_TEST_EMAIL,
        { receiver_email: getValues("username") }
      );
      if (Response.status == 200) {
        showToast.success(Response.data.status);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async () => {
    try {
      const body = {
        database_service_provider_id: getValues("database_service_provider_id"),
        id: getValues("conn_id"),
        server: getValues("server"),
        port: getValues("port"),
        database: getValues("database"),
        is_encrypt: getValues("is_encrypt"),
        username: getValues("username"),
        password: getValues("password"),
        query_timeout: getValues("query_timeout"),
        intend: "set",
      };
      const Response = await fetcher.post(
        END_POINTS.ADMIN.SETTINGS.CONFIGURE_DB,
        body
      );
      if (Response.status == 200) {
        showToast.success(Response.data.details);
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RoleBasedGaurd roles={["Admin", "SuperAdmin"]}>
      <Typography>Data Connectors</Typography>
      <TextField
        autoComplete="off"
        placeholder="Search Data Connectors"
        fullWidth
        size="medium"
        sx={{ my: 2 }}
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 19L14.657 14.657M14.657 14.657C15.3999 13.9142 15.9892 13.0322 16.3913 12.0616C16.7933 11.091 17.0002 10.0507 17.0002 9.00011C17.0002 7.94952 16.7933 6.90922 16.3913 5.9386C15.9892 4.96798 15.3999 4.08606 14.657 3.34318C13.9142 2.6003 13.0322 2.01102 12.0616 1.60897C11.091 1.20693 10.0507 1 9.00011 1C7.94952 1 6.90922 1.20693 5.9386 1.60897C4.96798 2.01102 4.08606 2.6003 3.34318 3.34318C1.84287 4.84349 1 6.87835 1 9.00011C1 11.1219 1.84287 13.1567 3.34318 14.657C4.84349 16.1574 6.87835 17.0002 9.00011 17.0002C11.1219 17.0002 13.1567 16.1574 14.657 14.657Z"
                  stroke="#C7C7C7"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </InputAdornment>
          ),
        }}
      />
      <Stack flexDirection={"row"} gap={2} flexWrap={"wrap"}>
        {connectors.filterData.map((item) => {
          return (
            <Card
              sx={{
                p: 2,
                boxShadow: "none",
                position: "relative",
                width: 200,
                height: 220,
              }}
              onClick={() => getConfigureDb(item.database_service_provider_id)}
            >
              <Checkbox
                icon={<RadioButtonUnchecked />}
                checkedIcon={<CheckCircle />}
                checked={!!item.is_default}
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  zIndex: 1,
                }}
              />

              <Box
                sx={{
                  height: 160,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "clip",
                }}
              >
                <img
                  src={`data:image/png;base64,${item.database_icon}`}
                  style={{ objectFit: "cover", height: "90%" }}
                />
              </Box>
              <Typography textAlign={"center"} mt={1}>
                {item.database_service_provider_name}
              </Typography>
            </Card>
          );
        })}
      </Stack>
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
            alignItems={"start"}
          >
            <Box>
              <Typography>Configure Connector</Typography>
              <Stack flexDirection={"row"} gap={2} mt={2} alignItems={"center"}>
                <img
                  src={`data:image/png;base64,${getValues("database_icon")}`}
                  height={50}
                  style={{ borderRadius: "50%" }}
                />
                <Typography variant="subtitle1">
                  {getValues("database_service_provider_name")}
                </Typography>
              </Stack>
            </Box>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <FormProvider methods={methods}>
            <Grid container sx={{ alignItems: "center" }}>
              <Grid item xs={4}>
                Server
              </Grid>
              <Grid item xs={8}>
                <RHFTextField name="server" />
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
                Database
              </Grid>
              <Grid item xs={8}>
                <RHFTextField name="database" />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!watch("is_encrypt")}
                      onClick={() =>
                        setValue(
                          "is_encrypt",
                          getValues("is_encrypt") == 0 ? 1 : 0
                        )
                      }
                      color={"primary"}
                      sx={{ py: 0 }}
                    />
                  }
                  label="Encrypt"
                />
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
            <Grid container sx={{ alignItems: "center" }}>
              <Grid item xs={4}>
                Query timeout
              </Grid>
              <Grid item xs={8}>
                <RHFTextField type="number" name="Query_Timeout" />
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Stack
              flexDirection={"row"}
              justifyContent={"space-between"}
              gap={2}
            >
              <LoadingButton
                variant="contained"
                color="secondary"
                disabled={
                  isSubmitting ||
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watch("username"))
                }
                loading={isLoading}
                onClick={onSendTestEmail}
              >
                Send Test Email
              </LoadingButton>
              <Stack flexDirection={"row"} gap={2}>
                <LoadingButton
                  variant="contained"
                  disabled={isSubmitting || isLoading}
                  onClick={handleClose}
                >
                  Cancel
                </LoadingButton>
                <LoadingButton
                  variant="contained"
                  disabled={isLoading}
                  loading={isSubmitting}
                  onClick={onSubmit}
                >
                  Save
                </LoadingButton>
              </Stack>
            </Stack>
          </FormProvider>
        </Box>
      </Modal>
    </RoleBasedGaurd>
  );
}
