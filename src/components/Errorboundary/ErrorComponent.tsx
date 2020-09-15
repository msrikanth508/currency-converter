import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.light,
    color: "#fff",
    "& .MuiBox-root": {
      height: "70vh",
      "& svg": {
        fontSize: theme.spacing(20),
      },
    },
    "& .MuiTypography-root": {
      fontStyle: "italic",
      textAlign: "center",
      paddingTop: theme.spacing(4),
    },
  },
}));

export default function ErrorComponent() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <BeachAccessIcon />
        <Typography variant="h6">
          Something went wrong, try after some time.
        </Typography>
      </Box>
    </Container>
  );
}
