import React from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import currency from "../../utils/currency";
import { ExchangeShape, StateShape } from "../../types";

const useStyles = makeStyles((theme) => ({
  root: {},
  whiteColor: {
    color: "#fff",
  },
}));

type Props = {
  exchange: ExchangeShape;
  currencySymbolsMapping: Record<string, string>;
  onExchangeClicked: () => void;
  onReset: () => void;
};

export default function ConverterActions({
  exchange,
  currencySymbolsMapping,
  onExchangeClicked,
  onReset,
}: Props) {
  const { fromId, toId } = exchange;

  const classes = useStyles();
  useSelector((state: StateShape) => state.exchangeRates);

  return (
    <Box bgcolor="primary.light" color="primary.contrastText" px={2} py={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        lineHeight={1.5}
        className={classes.root}
      >
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={onReset}
        >
          Reset
        </Button>
        {exchange.fromId && (
          <Typography variant="h6" className={classes.whiteColor}>
            {currencySymbolsMapping[fromId]}1 = {currencySymbolsMapping[toId]}
            {currency.convert(1, {
              from: fromId,
              to: toId,
            })}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={onExchangeClicked}
        >
          Exchange
        </Button>
      </Box>
    </Box>
  );
}
