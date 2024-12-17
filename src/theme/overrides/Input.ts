import { alpha, Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function Input(theme: Theme) {
  return {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: "clip",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha(theme.palette.grey[500], 0.32),
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderWidth: 1,
              borderColor: theme.palette.primary.main,
            },
          },
          "&.Mui-disabled": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.action.disabledBackground,
            },
          },
        },
      },
    },
  };
}
