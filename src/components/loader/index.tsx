import React from "react";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "&.MuiBox-root": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "70vh",
      backgroundColor: theme.palette.primary.light,
      color: "#fff",
      "& .MuiSvgIcon-root": {
        fontSize: "5rem",
      },
    },
  },
}));

export default function Loader() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <AttachMoneyIcon className="rotate" />
    </Box>
  );
}
