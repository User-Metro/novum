import { createTheme, ThemeProvider } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: React.CSSProperties["color"];
    };
  }

  interface Palette {
    neutral: Palette["primary"];
  }

  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
    red: PaletteOptions["primary"];
  }

  interface PaletteColor {
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }

  interface ThemeOptions {
    status: {
      danger: React.CSSProperties["color"];
    };
  }
}
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
    red: true;
  }
}

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#2A2D82",
    },
    neutral: {
      main: "#000000",
      contrastText: "#000000",
    },
    red: {
      main: "#FF5151",
      contrastText: "white",
    },
  },
});

export const CustomThemeProvider = ({ children }: { children: any }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
