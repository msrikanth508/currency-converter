import React from "react";
import Snackbar from "@material-ui/core/Snackbar";

export default function Alert({ message }: { message: string }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open
      message={message}
    />
  );
}
