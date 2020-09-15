import React from "react";
import Box from "@material-ui/core/Box";
import { useSelector, useDispatch } from "react-redux";

import ConverterActions from "../../components/Exchange/ConverterActions";
import CurrencyExchangeCard from "../../components/Exchange/CurrencyExchangeCard";
import { fetchExchangeRates } from "../../api";
import currency from "../../utils/currency";
import { enoughFunds } from "../../utils/formatter";
import {
  UPDATE_EXCHANGE,
  UPDATE_RATES,
  EXCHANGE_CURRENCY,
} from "../../constants";
import { StateShape, PocketType } from "../../types";
import Alert from "../../components/Alert";
import AppHeader from "../../components/AppHeader";
import Loader from "../../components/loader";
import Error from "../../components/Errorboundary/ErrorComponent";

export default function Exchange() {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = React.useState(false);
  const [isFetchError, setFetchError] = React.useState(false);
  const {
    data: pockets,
    exchange,
    currencySymbolsMapping,
    transactions,
  } = useSelector((state: StateShape) => state.pockets);
  const { rates, base } = useSelector(
    (state: StateShape) => state.exchangeRates
  );
  const { activePocketIndex, passivePocketIndex } = exchange;

  /**
   * Handle pocket slider change
   * @param pocketType
   */
  const handlePocketChange = (pocketType: PocketType) => (index: number) => {
    const { id: pocketId, value: totalFunds } = pockets[index];
    const formattedValue = Number(exchange.fromValue);

    if (pocketType === "active") {
      if (exchange.fromValue) {
        const toId = exchange.toId;
        const isError = !enoughFunds(exchange.fromValue, totalFunds);
        const exchangeValue = currency.convert(formattedValue, {
          from: pocketId,
          to: toId,
        });

        dispatch({
          type: UPDATE_EXCHANGE,
          value: {
            fromId: pocketId,
            activePocketIndex: index,
            isError,
            toValue: String(exchangeValue),
          },
        });
      } else {
        dispatch({
          type: UPDATE_EXCHANGE,
          value: {
            fromId: pocketId,
            activePocketIndex: index,
          },
        });
      }
    } else {
      if (exchange.fromValue) {
        const exchangeValue = currency.convert(formattedValue, {
          from: exchange.fromId,
          to: pocketId,
        });
        dispatch({
          type: UPDATE_EXCHANGE,
          value: {
            toId: pocketId,
            toValue: String(exchangeValue),
            passivePocketIndex: index,
          },
        });
      } else {
        dispatch({
          type: UPDATE_EXCHANGE,
          value: {
            toId: pocketId,
            passivePocketIndex: index,
          },
        });
      }
    }
  };

  /**
   * Handle Input type
   * @param pocketType
   */
  const handleInputChange = (pocketType: PocketType) => (value: string) => {
    const fromId = exchange.fromId;
    const toId = exchange.toId;

    if (value.length) {
      const formattedValue = Number(value);
      let isError = false;
      let fromValue;
      let toValue;
      const fromPocket = pockets[exchange.activePocketIndex];

      // calculate how much funds should be deducted from active panel
      if (pocketType === "passive") {
        fromValue = currency.convert(formattedValue, {
          from: toId,
          to: fromId,
        });
        isError = !enoughFunds(fromValue, fromPocket.value);
        toValue = value;
        fromValue = String(fromValue);
      } else {
        toValue = String(
          currency.convert(formattedValue, {
            from: fromId,
            to: toId,
          })
        );
        isError = !enoughFunds(formattedValue, fromPocket.value);
        fromValue = value;
      }

      dispatch({
        type: UPDATE_EXCHANGE,
        value: {
          fromValue,
          toValue,
          isError,
        },
      });
    } else {
      dispatch({
        type: UPDATE_EXCHANGE,
        value: {
          fromValue: "",
          toValue: "",
          isError: false,
        },
      });
    }
  };
  /**
   * Handle exchange action
   */
  const handleExchange = () => {
    if (
      exchange.fromValue &&
      exchange.fromValue.length &&
      Number(exchange.fromValue) > 0
    ) {
      dispatch({ type: EXCHANGE_CURRENCY });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  };

  /**
   * Reset input field
   */
  const handleReset = () => {
    dispatch({
      type: UPDATE_EXCHANGE,
      value: {
        ...exchange,
        fromValue: "",
        toValue: "",
        isError: false,
      },
    });
  };

  async function fetchData() {
    try {
      const { fromValue, toValue, fromId, toId } = exchange;
      setFetchError(false);
      const data = await fetchExchangeRates();
      // set exchange rates
      currency.updateSettings(data);

      // update exchange rates
      dispatch({ type: UPDATE_RATES, value: data });

      // update active rate
      if (fromValue) {
        const exchangeValue = currency.convert(Number(fromValue), {
          from: fromId,
          to: toId,
        });

        if (Number(toValue) !== exchangeValue) {
          dispatch({
            type: UPDATE_EXCHANGE,
            value: {
              toValue: exchangeValue,
            },
          });
        }
      }
    } catch (e) {
      setFetchError(true);
    }
  }

  React.useEffect(() => {
    // fetch exchange rates
    if (typeof rates === "undefined") {
      fetchData();
    }

    // fetch exchanegs rates for every 10s
    const intervalId = window.setInterval(fetchData, 10000);
    return () => {
      window.clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rates]);

  if (isFetchError) {
    return <Error />;
  }

  if (!rates) {
    return <Loader />;
  }

  return (
    <>
      <AppHeader pockets={pockets} transactions={transactions} />
      <ConverterActions
        exchange={exchange}
        currencySymbolsMapping={currencySymbolsMapping}
        onExchangeClicked={handleExchange}
        onReset={handleReset}
      />
      <Box pb={2} bgcolor={"primary.main"}>
        {/** active pocket slider */}
        <CurrencyExchangeCard
          isActive
          initialSlide={activePocketIndex}
          afterChange={handlePocketChange("active")}
          pockets={pockets}
          onInputChange={handleInputChange("active")}
          exchange={exchange}
          activePocketIndex={activePocketIndex}
          passivePocketIndex={passivePocketIndex}
        />
        {/** passive pocket slider */}
        <CurrencyExchangeCard
          isActive={false}
          initialSlide={passivePocketIndex}
          afterChange={handlePocketChange("passive")}
          pockets={pockets}
          onInputChange={handleInputChange("passive")}
          exchange={exchange}
          activePocketIndex={activePocketIndex}
          passivePocketIndex={passivePocketIndex}
        />
      </Box>
      {showAlert && <Alert message="Transaction has been completed" />}
    </>
  );
}
