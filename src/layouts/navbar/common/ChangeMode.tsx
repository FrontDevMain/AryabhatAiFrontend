// @mui
import { Box, IconButton, RadioGroup, Stack, Typography } from "@mui/material";
//
import { StyledCard, StyledWrap, MaskControl } from "./styles";
import LightMode from "src/assets/navbar/LightMode";
import DarkMode from "src/assets/navbar/DarkMode";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/reducers";
import { useAuthContext } from "src/auth/useAuthContext";
import fetcher from "src/api/fetcher";
import { END_POINTS } from "src/api/EndPoints";
import { useDispatch } from "react-redux";
import { fetchThemeSuccess } from "src/redux/actions/theme/ThemeActions";

// ----------------------------------------------------------------------

const OPTIONS = ["Light", "Dark"] as const;

export default function ChangeMode() {
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const { theme: themeSetting } = useSelector(
    (state: RootState) => state.theme
  );
  const [themeDefaultKeys, setThemeDefaultKeys] = useState(themeSetting);

  useEffect(() => {
    setThemeDefaultKeys(themeSetting);
  }, [themeSetting]);

  const onSubmit = async (val: string) => {
    try {
      const body = {
        ...themeDefaultKeys,
        Theme_theme: val,
        user_id: user.user_id,
        intend: "set",
      };
      const Response = await fetcher.post(
        END_POINTS.ADMIN.SETTINGS.GET_CONFIG,
        body
      );
      if (Response.status == 200) {
        dispatch(fetchThemeSuccess(body));
      }
    } catch (error) {}
  };

  if (themeSetting.Theme_Layout !== "vertical") {
    return (
      <Box
        sx={{ mx: 1, my: 3 }}
        onClick={() =>
          onSubmit(themeSetting.Theme_theme == "Light" ? "Dark" : "Light")
        }
      >
        <IconButton>
          {themeSetting.Theme_theme == "Light" ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Box>
    );
  }

  return (
    <RadioGroup
      name="themeMode"
      value={themeDefaultKeys.Theme_theme}
      onChange={(e) => onSubmit(e.target.value)}
    >
      <StyledWrap>
        {OPTIONS.map((mode) => (
          <StyledCard
            key={mode}
            selected={themeDefaultKeys.Theme_theme === mode}
          >
            <Stack flexDirection={"row"} gap={1}>
              {mode == "Light" ? <LightMode /> : <DarkMode />}
              <Typography
                sx={{
                  textTransform: "capitalize",
                  color: "text.primary",
                  fontSize: 16,
                }}
              >
                {mode}
              </Typography>
            </Stack>
            <MaskControl value={mode} />
          </StyledCard>
        ))}
      </StyledWrap>
    </RadioGroup>
  );
}
