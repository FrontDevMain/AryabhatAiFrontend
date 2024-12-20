import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import { Button, InputAdornment, useTheme } from "@mui/material";
import fetcher from "src/api/fetcher";
import { END_POINTS } from "src/api/EndPoints";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/reducers";
import { useAuthContext } from "src/auth/useAuthContext";
import { LoadingButton } from "@mui/lab";
import {
  fetchChat,
  fetchChatSuccess,
  fetchQuery,
} from "src/redux/actions/chat/ChatActions";
import { useDispatch } from "react-redux";

type FormValuesProps = {
  search: string;
};

function SearchBar() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const { selectedTag } = useSelector((state: RootState) => state.tag);
  const { selectedLlm } = useSelector((state: RootState) => state.llm);
  const { CHAT } = useSelector((state: RootState) => state.chat);
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
    formState: { errors, isSubmitting, isValid },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      let body = {
        user_input: data.search,
        Model_id: selectedLlm.model_id,
        Provider_id: selectedLlm.provider_id,
        chat_id: CHAT.chat_id,
        user_id: user.user_id,
        Department_tag: selectedTag.tag_name,
      };
      dispatch(
        fetchChatSuccess({
          ...CHAT,
          messages: [
            ...CHAT.messages,
            {
              type: "user",
              is_Liked: 0,
              context: data.search,
              message_id: "0tgwsfknzcmvbpo79q235r4x",
              model_id: selectedLlm.model_id,
              provider_id: selectedLlm.provider_id,
              tag: selectedTag.tag_name,
            },
          ],
        })
      );
      reset(defaultValues);
      await dispatch(fetchQuery(body));
    } catch (error) {}
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField
        name="search"
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
              <LoadingButton
                variant="contained"
                size="large"
                disabled={!isValid || isSubmitting}
                type="submit"
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
              </LoadingButton>
            </InputAdornment>
          ),
        }}
      />
    </FormProvider>
  );
}

export default SearchBar;
