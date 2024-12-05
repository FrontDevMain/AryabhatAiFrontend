import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import google from "../../assets/login/google.svg.svg";
import fb from "../../assets/login/fb.svg.svg";
import { LoadingButton } from "@mui/lab";
import fetcher from "src/api/fetcher";
import { useAuthContext } from "src/auth/useAuthContext";
import { END_POINTS } from "src/api/EndPoints";
import { PATH_AUTH } from "src/routes/path";

type FormValuesProps = {
  email: string;
  password: string;
};

const IconStyle = {
  height: 50,
  cursor: "pointer",
};

function AuthLoginForm() {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email or mobile number is required"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    email: "",
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

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const body = new URLSearchParams();
      body.append("username", data.email);
      body.append("password", data.password);
      const Response = await fetcher.post(END_POINTS.AUTH.LOGIN, body);
      if (Response.status == 200) {
        localStorage.setItem("auth", Response.data.access_token);
        login();
      }
    } catch (err) {
      if (err.status == 400) {
        navigate(PATH_AUTH.signupDetails);
      }
      console.log(err);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h3" textAlign={"center"} mb={3}>
        Login
      </Typography>
      <Stack gap={2}>
        <Stack>
          <Typography variant="body2" color="text.secondary">
            Email
          </Typography>
          <RHFTextField name="email" />
        </Stack>

        <Stack>
          <Typography variant="body2" color="text.secondary">
            Password
          </Typography>
          <RHFTextField
            name="password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Icon
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Stack>

      <Stack alignItems="flex-end" sx={{ my: 2 }}>
        <Link
          variant="body2"
          color="primary"
          underline="none"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/forgot-password")}
        >
          Forgot password
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="medium"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>

      <Typography textAlign={"center"} my={2}>
        If you don’t have an account?
        <Link
          variant="body2"
          color="primary"
          underline="none"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/signup")}
        >
          Signup
        </Link>
      </Typography>

      <Divider>Or continue with</Divider>
      <Stack my={1} flexDirection={"row"} gap={1} justifyContent={"center"}>
        <img src={google} alt="login with google" style={IconStyle} />
        <img src={fb} alt="login with facebook" style={IconStyle} />
      </Stack>
    </FormProvider>
  );
}

export default AuthLoginForm;
