import React from "react";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { ExchangeShape } from "../../types";

type Props = {
  onChange: (val: string) => void;
  exchange: ExchangeShape;
  type: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.contrastText,
    "& input::before": {
      borderBottomColor: "#fff",
    },
    "& .MuiInput-underline": {
      color: "#fff",
      "&:before, &:after": {
        borderBottomColor: "#fff",
      },
      "&.Mui-error:after": {
        borderBottomColor: "red",
      },
      "&.Mui-disabled": {
        color: "#2a2a2a",
        opacity: 0.8,
      },
    },
    "& .MuiInputBase-input": {
      fontSize: theme.spacing(5),
    },
    "& .MuiFormHelperText-root": {
      fontSize: theme.spacing(2),
      color: "#fff",
      fontStyle: "italic",
    },
    "& .MuiTypography-root": {
      fontStyle: "italic",
    },
  },
  prefix: {
    fontSize: theme.spacing(5),
  },
  errorMsg: {
    paddingTop: theme.spacing(1),
  },
}));

export default function InputField({ onChange, exchange, type }: Props) {
  const ref = React.useRef(null);
  const isError = exchange.isError;
  const classes = useStyles();

  function handleChange(e: any) {
    let value = e.target.value;
    const fractionParts = value.split(".");

    if (value.length === 0) {
      onChange(value);
    } else if (value === ".") {
      value = "0.";
    }

    if (fractionParts.length > 2) {
      return;
    }

    // accepts only numbers & two digits after dot
    var regex = /^\d+(\.\d{1,2})?$/;
    if (regex.test(value) || value.endsWith(".")) {
      onChange(value);
    }
  }

  let inputVal = type === "active" ? exchange.fromValue : exchange.toValue;

  return (
    <FormControl fullWidth className={classes.root}>
      {inputVal && (
        <Typography variant="body2">
          {type === "active" ? "Send" : "Receive"}
        </Typography>
      )}
      <Input
        value={inputVal}
        onChange={handleChange}
        inputRef={ref}
        error={isError && type === "active"}
        autoComplete="off"
      />

      {isError && type === "active" && (
        <Typography variant="body2" className={classes.errorMsg}>
          Insufficient funds
        </Typography>
      )}
    </FormControl>
  );
}
