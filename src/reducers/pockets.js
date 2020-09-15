import { UPDATE_EXCHANGE, EXCHANGE_CURRENCY } from "../constants";
import { twoDecimalNumber, currencyFormatter } from "../utils/formatter";

const initialState = {
  data: [
    {
      value: 1500,
      id: "GBP",
      name: "GBP",
    },
    {
      value: 2300,
      id: "EUR",
      name: "EUR",
    },
    {
      value: 5700,
      name: "USD",
      id: "USD",
    },
  ],
  currencySymbolsMapping: {
    GBP: "£",
    EUR: "€",
    USD: "$",
  },
  exchange: {
    fromId: "GBP",
    fromValue: "",
    toId: "EUR",
    toValue: "",
    isError: false,
    activePocketIndex: 0,
    passivePocketIndex: 1,
  },
  transactions: [],
};
export default function pockets(state = initialState, action) {
  switch (action.type) {
    case UPDATE_EXCHANGE: {
      return {
        ...state,
        exchange: {
          ...state.exchange,
          ...action.value,
        },
      };
    }
    case EXCHANGE_CURRENCY: {
      const { fromId, fromValue, toId, toValue } = state.exchange;
      const transactions = [];

      const data = state.data.map((pocket) => {
        if (pocket.id === fromId && pocket.id === toId) {
          transactions.push(
            {
              date: getDate(),
              message: `The amount ${currencyFormatter(
                Number(fromValue),
                pocket.id
              )} has been debited.`,
            },
            {
              date: getDate(),
              message: `The amount ${currencyFormatter(
                Number(fromValue),
                pocket.id
              )} has been credited.`,
            }
          );
        } else if (pocket.id === fromId) {
          const value = twoDecimalNumber(
            pocket.value - Number(fromValue),
            pocket.id
          );
          transactions.push({
            date: getDate(),
            message: `The amount ${currencyFormatter(
              Number(fromValue),
              pocket.id
            )} has been debited.`,
          });
          return {
            ...pocket,
            value,
          };
        } else if (pocket.id === toId) {
          const value = twoDecimalNumber(
            pocket.value + Number(toValue),
            pocket.id
          );
          transactions.push({
            date: getDate(),
            message: `The amount ${currencyFormatter(
              value,
              pocket.id
            )} has been credited.`,
          });
          return {
            ...pocket,
            value,
          };
        }
        return pocket;
      });

      return {
        ...state,
        data,
        exchange: {
          ...state.exchange,
          fromValue: "",
          toValue: "",
        },
        transactions: [].concat(transactions, state.transactions),
      };
    }

    default:
      return state;
  }
}

function getDate() {
  const date = new Date();
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}
