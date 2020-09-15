import fakeData from "../data";

export default {
  pockets: {
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
  },
  exchangeRates: fakeData,
};
