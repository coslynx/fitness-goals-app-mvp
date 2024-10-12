import { createTheme, ThemeOptions } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Theme configuration for Material-UI
const themeOptions: ThemeOptions = {
  palette: {
    mode: "light", // Set the color mode to light
    primary: {
      main: "#1976D2", // Primary color for buttons, links, and other primary elements
    },
    secondary: {
      main: "#FFC107", // Secondary color for accents and secondary elements
    },
    error: {
      main: red.A400, // Color for error messages and alerts
    },
    background: {
      default: "#f4f6f8", // Default background color for the application
      paper: "#ffffff", // Background color for paper-like elements (e.g., cards, dialogs)
    },
  },
  typography: {
    fontFamily: [
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif", // Define the default font family
    ],
    fontSize: 16, // Set the default font size
    h1: {
      fontSize: "3rem", // Font size for H1 heading
      fontWeight: 700,
    },
    h2: {
      fontSize: "2.5rem", // Font size for H2 heading
      fontWeight: 600,
    },
    h3: {
      fontSize: "2rem", // Font size for H3 heading
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.5rem", // Font size for H4 heading
      fontWeight: 400,
    },
    h5: {
      fontSize: "1.25rem", // Font size for H5 heading
      fontWeight: 400,
    },
    h6: {
      fontSize: "1rem", // Font size for H6 heading
      fontWeight: 400,
    },
  },
  components: {
    // Customize components if needed, e.g.,
    // MuiButton: {
    //   styleOverrides: {
    //     root: {
    //       // Customize button styles
    //     },
    //   },
    // },
  },
};

// Create the Material-UI theme using the theme options
const theme = createTheme(themeOptions);

// Export the theme to be used throughout the application
export default theme;