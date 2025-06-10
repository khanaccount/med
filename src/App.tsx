import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ClinicSchedule } from "./components/ClinicSchedule";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ClinicSchedule />
    </ThemeProvider>
  );
}

export default App;
