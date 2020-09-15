export type CurrencyShape = "GBP" | "EUR" | "USD";

export type PocketShape = {
  value: number;
  id: CurrencyShape;
  name: CurrencyShape;
};
export type PocketType = "active" | "passive";

export type CurrencySymbols = "£" | "€" | "$";

export type PocketsShape = Array<PocketShape>;

export type ExchangeRatesShape = {
  base: string;
  rates: Record<string, number>;
};

export type TransactionsShape = {
  date: string;
  message: string;
};
export type ExchangeShape = {
  fromId: CurrencyShape;
  toId: CurrencyShape;
  fromValue: string;
  toValue: string;
  isError: boolean;
  activePocketIndex: number;
  passivePocketIndex: number;
};

export type PocketStateShape = {
  data: Array<PocketShape>;
  exchange: ExchangeShape;
  currencySymbolsMapping: {
    GBP: CurrencySymbols;
    EUR: CurrencySymbols;
    USD: CurrencySymbols;
  };
  transactions: Array<TransactionsShape>;
};

export type StateShape = {
  pockets: PocketStateShape;
  exchangeRates: ExchangeRatesShape;
};
