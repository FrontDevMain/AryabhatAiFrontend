import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import { Button, InputAdornment, useTheme } from "@mui/material";

type FormValuesProps = {
  search: string;
};

function SearchBar() {
  const theme = useTheme();
  const LoginSchema = Yup.object().shape({
    search: Yup.string(),
  });

  const defaultValues = {
    search: "",
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

  const onSubmit = (data: FormValuesProps) => {
    console.log(data);
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField
        name="password"
        placeholder="Message Gen Ai"
        size="medium"
        sx={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          left: 0,
          overflow: "clip",
        }}
        focused
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                variant="contained"
                size="large"
                sx={{ p: 2, right: -12 }}
              >
                Send{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  style={{ marginLeft: 10 }}
                >
                  <path
                    fill="none"
                    stroke={theme.palette.background.default}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="m6 12l-3 9l18-9L3 3zm0 0h6"
                  ></path>
                </svg>
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </FormProvider>
  );
}

export default SearchBar;
