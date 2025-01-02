import { Button, FormHelperText, Link, Stack, Typography } from "@mui/material";
//form
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, { RHFCodes } from "../../components/hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PATH_AUTH } from "src/routes/path";
import useCountdown from "src/components/hooks/useCountdown";
import fetcher from "src/api/fetcher";
import { END_POINTS } from "src/api/EndPoints";
import { showToast } from "src/utils/Toast";

type FormValuesProps = {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6: string;
};

function VerifyForgotPasswordOtp() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { timeLeft, start, resetTimer } = useCountdown(60);

  const LoginSchema = Yup.object().shape({
    code1: Yup.string().required(),
    code2: Yup.string().required(),
    code3: Yup.string().required(),
    code4: Yup.string().required(),
    code5: Yup.string().required(),
    code6: Yup.string().required(),
  });

  const defaultValues = {
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: "",
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (!state?.email) navigate(PATH_AUTH.login);
    else start();
  }, []);

  const resendOtp = async () => {
    reset(defaultValues);
    try {
      const body = new URLSearchParams();
      body.append("email", state?.email);
      const Response = await fetcher.put(END_POINTS.AUTH.RESEND_OTP, body);
      if (Response.status == 200) {
        resetTimer();
        start();
        showToast.success(Response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const body = {
        email: state?.email,
        otp: `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`,
      };
      const Response = await fetcher.post(END_POINTS.AUTH.OTP_VALIDATION, body);
      if (Response.status == 200) {
        navigate(PATH_AUTH.newPassword, { state: state });
        showToast.success(Response.data.message);
      }
    } catch (err) {
      reset(defaultValues);
      console.log(err);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h3" textAlign={"center"}>
        Verification
      </Typography>
      <Typography
        color="text.disabled"
        textAlign={"center"}
        sx={{ width: "80%", margin: "auto" }}
      >
        Enter your 6 digit code that you received on your email.
      </Typography>
      <Stack gap={2} mt={4}>
        <Stack>
          <RHFCodes
            keyName="code"
            inputs={["code1", "code2", "code3", "code4", "code5", "code6"]}
          />

          {(!!errors.code1 ||
            !!errors.code2 ||
            !!errors.code3 ||
            !!errors.code4 ||
            !!errors.code5 ||
            !!errors.code6) && (
            <FormHelperText error sx={{ px: 2 }}>
              Code is required
            </FormHelperText>
          )}
        </Stack>

        <Button fullWidth size="medium" type="submit" variant="contained">
          Continue
        </Button>
        {timeLeft > 0 ? (
          <Typography textAlign={"center"} color="error.main">
            Resend OTP in 00:{timeLeft.toString().padStart(2, "00")} sec
          </Typography>
        ) : (
          <Typography textAlign={"center"} my={2}>
            If you didn't receive a code ?{" "}
            <Link
              variant="body2"
              color="primary"
              underline="none"
              sx={{ cursor: "pointer" }}
              onClick={resendOtp}
            >
              Resend
            </Link>
          </Typography>
        )}
      </Stack>
    </FormProvider>
  );
}

export default VerifyForgotPasswordOtp;
