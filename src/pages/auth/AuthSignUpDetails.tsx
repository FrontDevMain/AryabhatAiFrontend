import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from "../../components/hook-form";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import fetcher from "src/api/fetcher";
import { END_POINTS } from "src/api/EndPoints";
import { PATH_AUTH } from "src/routes/path";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

type FormValuesProps = {
  username: string;
  fName: string;
  lName: string;
  gender: string;
  dob: Date | null;
  city: string;
  state: string;
  country: string;
  phone_no: string;
  profile_picture: null | any;
};

function AuthSignUpDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, "Username must be at least 4 characters long")
      .required("Username is required"),

    fName: Yup.string()
      .matches(/^[A-Za-z]+$/, "First Name must only contain alphabets")
      .required("First Name is required"),

    lName: Yup.string().matches(
      /^[A-Za-z]+$/,
      "Last Name must only contain alphabets"
    ),

    gender: Yup.string()
      .oneOf(
        ["male", "female", "other"],
        "Gender must be either male, female, or other"
      )
      .required("Gender is required"),

    dob: Yup.date()
      .nullable()
      .typeError("Date of Birth must be a valid date")
      .max(new Date(), "Date of Birth cannot be in the future")
      .required("Date of Birth is required"),

    city: Yup.string().required("City is required"),

    state: Yup.string().required("State is required"),

    country: Yup.string().required("Country is required"),

    phone_no: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),

    profile_picture: Yup.mixed()
      .nullable()
      .test(
        "fileType",
        "Profile picture must be a valid file",
        (value) => value === null || typeof value === "object"
      ),
  });

  const defaultValues = {
    username: "",
    fName: "",
    lName: "",
    gender: "",
    dob: null,
    city: "",
    state: "",
    country: "",
    phone_no: "",
    profile_picture: null,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (!state?.email) navigate(PATH_AUTH.login);
  }, []);

  const onSubmit = async (data: FormValuesProps) => {
    const DateFormated = dayjs(
      new Date(data.dob || "").toLocaleDateString()
    ).format("YYYY-MM-DD");
    try {
      const body = new FormData();
      body.append("useremail", state?.email);
      body.append("username", data.username);
      body.append("firstname", data.fName);
      body.append("lastname", data.lName);
      body.append("gender", data.gender);
      body.append("dob", DateFormated);
      body.append("city", data.city);
      body.append("state", data.state);
      body.append("country", data.country);
      body.append("phone_no", data.phone_no);
      data.profile_picture &&
        body.append("profile_picture", data.profile_picture);
      const Response = await fetcher.post(END_POINTS.AUTH.REGISTER, body);
      if (Response.status == 200) {
        localStorage.setItem("auth", Response.data.access_token);
        navigate(PATH_AUTH.login);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h3" textAlign={"center"} mb={3}>
        Signup
      </Typography>
      <Stack gap={2}>
        <Stack>
          <Typography variant="body2" color="text.secondary">
            Username
          </Typography>
          <RHFTextField name="username" />
        </Stack>
        <Stack direction={"row"} gap={2}>
          <Stack width={"100%"}>
            <Typography variant="body2" color="text.secondary">
              First Name
            </Typography>
            <RHFTextField name="fName" />
          </Stack>
          <Stack width={"100%"}>
            <Typography variant="body2" color="text.secondary">
              Last Name
            </Typography>
            <RHFTextField name="lName" />
          </Stack>
        </Stack>
        <Stack>
          <Typography variant="body2" color="text.secondary">
            Gender
          </Typography>
          <RHFSelect
            name="gender"
            SelectProps={{
              native: false,
            }}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </RHFSelect>
        </Stack>
        <Stack>
          <Typography variant="body2" color="text.secondary">
            Date of Birth
          </Typography>{" "}
          <RHFDatePicker name="dob" />
        </Stack>

        <Stack direction={"row"} gap={2}>
          <Stack width={"100%"}>
            <Typography variant="body2" color="text.secondary">
              City
            </Typography>
            <RHFTextField name="city" />
          </Stack>
          <Stack width={"100%"}>
            <Typography variant="body2" color="text.secondary">
              State
            </Typography>
            <RHFTextField name="state" />
          </Stack>
        </Stack>
        <Stack direction={"row"} gap={2}>
          <Stack width={"100%"}>
            <Typography variant="body2" color="text.secondary">
              Country
            </Typography>
            <RHFTextField name="country" />
          </Stack>
          <Stack width={"100%"}>
            <Typography variant="body2" color="text.secondary">
              phone
            </Typography>
            <RHFTextField name="phone_no" />
          </Stack>
        </Stack>
        <Stack width={"100%"}>
          <Typography variant="body2" color="text.secondary">
            Profile Picture
          </Typography>
          <input
            type="file"
            onChange={(e: any) =>
              setValue("profile_picture", e.target.files[0])
            }
            accept=".png, .jpeg, .avif"
          />
        </Stack>

        <LoadingButton
          fullWidth
          size="medium"
          type="submit"
          variant="contained"
        >
          Continue
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

export default AuthSignUpDetails;
