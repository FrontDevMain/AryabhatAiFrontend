import { Icon } from "@iconify/react";
import {
  BorderRight,
  DeleteForever,
  DeleteOutline,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Collapse,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Modal,
  Stack,
  styled,
  Switch,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Plus } from "src/assets/icons/Plus";
import { RootState } from "src/redux/reducers";

//form
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import { LoadingButton } from "@mui/lab";
import { useAuthContext } from "src/auth/useAuthContext";
import fetcher from "src/api/fetcher";
import { END_POINTS } from "src/api/EndPoints";
import { fetchLlmSuccess } from "src/redux/actions/llm/LlmActions";
import { useDispatch } from "react-redux";
import RoleBasedGaurd from "src/auth/RoleBasedGaurd";
import ConfirmationModal from "src/components/CustomComponents/ConfirmationModal";
import { showToast } from "src/utils/Toast";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", md: 700 },
  bgcolor: "background.default",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

type FormValuesProps = {
  apiKey: string;
  proxyAddress: string;
  providerName: string;
  modelName: string;
  is_enabled: boolean;
};

export default function LLM() {
  const theme = useTheme();
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const [open, setOpen] = useState<number | null>();
  const { LLM } = useSelector((state: RootState) => state.llm);
  const [isShowKey, setIsShowKey] = useState<string | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [temp, setTemp] = useState("");

  //modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const LoginSchema = Yup.object().shape({
    apiKey: Yup.string().required("api key is required"),
    proxyAddress: Yup.string().required("Proxy Address is required"),
    providerName: Yup.string().required("Provider Name is required"),
    modelName: Yup.string().required("Model Name is required"),
    is_enabled: Yup.boolean(),
  });

  const defaultValues = {
    apiKey: "",
    proxyAddress: "",
    providerName: "",
    modelName: "",
    is_enabled: true,
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
    formState: { errors, isSubmitting, isValid },
  } = methods;

  const [openConfirm, setOpenConfirm] = useState(false);
  const handleOpenConfirm = () => setOpenConfirm(true);
  const handleCloseConfirm = () => setOpenConfirm(false);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const body = {
        provider_name: data.providerName,
        model_name: data.modelName,
        user_id: user.user_id,
        apikey: data.apiKey,
        api_proxy_address: data.proxyAddress,
        is_enabled: data.is_enabled,
        created_at: new Date().toISOString(),
      };
      const Response = await fetcher.post(
        END_POINTS.ADMIN.LLM.CREATE_LLM,
        body
      );
      if (Response.status == 200) {
        dispatch(fetchLlmSuccess([...LLM, Response.data]));
        handleCloseModal();
        reset(defaultValues);
      }
    } catch (err) {
      console.log(err?.message);
    }
  };

  const handleSwitchProvider = async (providerId: string, status: boolean) => {
    try {
      setIsLoading(true);
      const body = {
        provider_id: providerId,
        is_enabled: !status,
      };
      const Response = await fetcher.put(
        END_POINTS.ADMIN.LLM.UPDATE_STATUS,
        body
      );

      if (Response.status == 200) {
        dispatch(
          fetchLlmSuccess(
            LLM.map((item) =>
              item.provider_id == providerId
                ? { ...item, is_enabled: !status }
                : item
            )
          )
        );
      }
    } catch (err) {
      console.log(err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteLlm = async (id: string) => {
    try {
      setIsLoading(true);
      const Response = await fetcher.delete(
        END_POINTS.ADMIN.LLM.DELETE_MODEL(id)
      );
      if (Response.status == 200) {
        dispatch(fetchLlmSuccess(LLM.filter((item) => item.model_id !== id)));
        handleCloseConfirm();
        showToast.success(Response.data.detail);
      }
    } catch (err) {
      console.log(err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const checkConnectivity = async (apikey: string, modelId: string) => {
    try {
      setIsLoading(true);
      const body = {
        api_key: apikey,
        model: modelId,
        temperature: +temp,
      };
      const Response = await fetcher.post(
        END_POINTS.ADMIN.LLM.CONNECTIVITY_CHECK,
        body
      );
      if (Response.status == 200) {
        showToast.success(Response.data.detail);
      }
    } catch (err) {
      console.log(err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RoleBasedGaurd roles={["Admin", "SuperAdmin"]}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={2}
      >
        <Typography variant="h5">LLM List</Typography>
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <Button
            variant="contained"
            sx={{ borderRadius: 12 }}
            onClick={handleOpenModal}
          >
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
                onClick={() =>
                  handleSwitchProvider(item.provider_id, item.is_enabled)
                }
                label=""
              />
            </ListItem>
            <Collapse
              in={open == index}
              timeout="auto"
              unmountOnExit
              sx={{ px: 2 }}
            >
              <RowType
                title="API Key"
                subTitle="Please enter your OpenAI API Key"
              >
                <TextField
                  fullWidth
                  size="small"
                  type={
                    isShowKey == `${item.apikey}_${index}` ? "text" : "password"
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
              </RowType>

              <RowType
                title="API Proxy Address"
                subTitle="  Must include http(s):// in addition to the default address"
              >
                {" "}
                <TextField
                  fullWidth
                  size="small"
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
                              isShowKey == `${item.api_proxy_address}_${index}`
                                ? null
                                : `${item.api_proxy_address}_${index}`
                            )
                          }
                          edge="end"
                        >
                          <Icon
                            icon={
                              isShowKey == `${item.api_proxy_address}_${index}`
                                ? "eva:eye-fill"
                                : "eva:eye-off-fill"
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </RowType>

              <RowType
                title="Mode List"
                subTitle="Select the models to display in the session. The selected
                    models will be displayed in the model list."
              >
                <Chip
                  label={item.model_name}
                  variant="outlined"
                  deleteIcon={
                    <DeleteForever
                      sx={{
                        fill: theme.palette.primary.main,
                        "& :hover": {
                          fill: theme.palette.error.main,
                        },
                      }}
                    />
                  }
                  onDelete={handleOpenConfirm}
                />
              </RowType>
              <ConfirmationModal
                open={openConfirm}
                handleClose={handleCloseConfirm}
                onConfirm={() => deleteLlm(item.model_id)}
                loading={isLoading}
                title={"Delete Confirmation"}
                content={
                  "If you delete the model, Provider will be deleted. Are you sure you want to delete the Model ?"
                }
              />

              <RowType
                title="Connectivity Check"
                subTitle="Test if the API Key and proxy address are filled in
                    correctly"
              >
                <TextField
                  fullWidth
                  size="small"
                  label="Tempreture"
                  value={temp}
                  onChange={(e) =>
                    +e.target.value <= 1 && setTemp(e.target.value)
                  }
                  inputProps={{ maxLength: 3 }}
                  type={"text"}
                  helperText={"You can provide temperature in range of 0 to 1."}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <LoadingButton
                          variant="contained"
                          onClick={() =>
                            checkConnectivity(item.apikey, item.model_id)
                          }
                          sx={{ right: -13 }}
                        >
                          Test{" "}
                        </LoadingButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </RowType>
            </Collapse>
          </List>
        );
      })}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            backgroundColor: (theme) => theme.palette.background.neutral,
          }}
        >
          <Typography textAlign={"center"} variant="h4" mb={2}>
            Create LLM Model
          </Typography>
          <FormProvider methods={methods}>
            <Stack gap={2}>
              <RHFTextField name="apiKey" label="API Key" />
              <RHFTextField name="proxyAddress" label="Proxy Address" />
              <RHFTextField name="providerName" label="Provider Name" />
              <RHFTextField name="modelName" label="Model Name" />
              <FormControlLabel
                control={
                  <Android12Switch
                    checked={watch("is_enabled")}
                    onClick={() =>
                      setValue("is_enabled", !getValues("is_enabled"))
                    }
                  />
                }
                label="Enable/Disabled"
                sx={{ alignSelf: "end" }}
              />
            </Stack>
          </FormProvider>
          <Stack direction={"row"} gap={2} mt={3}>
            <Button
              variant="outlined"
              fullWidth
              disabled={isSubmitting}
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              fullWidth
              loading={isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </LoadingButton>
          </Stack>
        </Box>
      </Modal>
    </RoleBasedGaurd>
  );
}

function RowType({ title, subTitle, children }: any) {
  return (
    <>
      <Grid container spacing={3} mt={1}>
        <Grid item xs={4}>
          <Typography>{title}</Typography>
          <Typography variant="body2" color="text.disabled">
            {subTitle}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          {children}
        </Grid>
      </Grid>
      <Divider sx={{ my: 3 }} />
    </>
  );
}
