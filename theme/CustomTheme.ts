import { createTheme } from "@mui/material";

const primaryColor = "#0072E5";
const secondaryColor = "#C70011";
const disabledColor = "#ccc";

const fontFamily = "Enriqueta";

export const CustomTheme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      dark: "#003A75",
      light: "#3399FF",
    },
    secondary: { main: secondaryColor, dark: "#570007", light: "#FF505F" },
  },
  typography: {
    fontFamily: fontFamily,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
        size: "medium",
      },
      styleOverrides: {
        root: {
          fontFamily: fontFamily,
          padding: "5px 10px",
          fontSize: "12px",
          fontWeight: 600,
          alignItems: "center",
          textTransform: "uppercase",
        }, 
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "filled",
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          border: "1px solid #ccd825",
          borderRadius: "4px",
          color: primaryColor,
          margin: "5px 0px",
          fontFamily: fontFamily,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: fontFamily,
        },
      },
    },
  },
});
