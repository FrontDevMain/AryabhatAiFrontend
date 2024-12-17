// @mui
import {
  ListItemButton,
  ListItemText,
  GlobalStyles as MUIGlobalStyles,
  styled,
} from "@mui/material";

// ----------------------------------------------------------------------

export default function GlobalStyles() {
  const inputGlobalStyles = (
    <MUIGlobalStyles
      styles={{
        "*": {
          boxSizing: "border-box",
        },
        html: {
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",
          WebkitOverflowScrolling: "touch",
        },
        body: {
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",
        },
        "#root": {
          width: "100%",
          height: "100%",
        },
        "&.css-17wxq2g-MuiInputBase-input-MuiOutlinedInput-input:-webkit-autofill":
          {
            "-webkit-box-shadow": "0 0 0 100px transparent inset",
            "-webkit-text-fill-color": "#000",
          },
        "&.css-1utieqz-MuiInputBase-input-MuiOutlinedInput-input:-webkit-autofill":
          {
            "-webkit-box-shadow": "0 0 0 100px transparent inset",
            "-webkit-text-fill-color": "#000",
          },
        input: {
          "&[type=number]": {
            MozAppearance: "textfield",
            "&::-webkit-outer-spin-button": {
              margin: 0,
              WebkitAppearance: "none",
            },
            "&::-webkit-inner-spin-button": {
              margin: 0,
              WebkitAppearance: "none",
            },
          },
        },
        img: {
          display: "block",
          maxWidth: "100%",
        },
        ul: {
          margin: 0,
          padding: 0,
        },
      }}
    />
  );

  return inputGlobalStyles;
}

export const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius, // Rounded corners
  marginBottom: theme.spacing(0.5), // Spacing between items
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  "&:hover": {
    backgroundColor: theme.palette.primary.main, // Hover background
    color: theme.palette.background.default, // Selected text color
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main, // Selected background
    color: theme.palette.background.default, // Selected text color
    "&:hover": {
      backgroundColor: theme.palette.primary.dark, // Darker on hover when selected
      color: theme.palette.background.default, // Selected text color
    },
  },
}));

export const CustomListItemText = styled(ListItemText)(({ theme }) => ({
  padding: "15px 10px",
  width: 200,
  borderRadius: 5,
  color: "text.secondary",
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.background.default,
    backgroundColor: theme.palette.secondary.light, // Selected text color
  },
}));
