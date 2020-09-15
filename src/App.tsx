import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import "./App.css";
import ExchangeView from "./containers/Exchange";
import ErrorBoundary from "../src/components/Errorboundary";

const useStyles = makeStyles(() => ({
  root: {
    padding: 0,
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#4791db",
      main: "#1976d2",
      dark: "#115293",
      contrastText: "#fff",
    },
  },
});

export default function App() {
  const classes = useStyles();

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" className={classes.root}>
          <CssBaseline />
          <ExchangeView />
        </Container>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
