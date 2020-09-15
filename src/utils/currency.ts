import { twoDecimalNumber } from "./formatter";

type CurrenyTypes = {
  rates: Record<string, number>;
  base: string;
};

type OptionTypes = {
  to: string;
  from: string;
};

/**
 * Currency exchange helper
 */
class Currency {
  rates: Record<string, number>;
  base: string;
  constructor(options?: CurrenyTypes) {
    this.rates = options ? options.rates : {};
    this.base = options ? options.base : "";
  }
  /**
   * exchange funds
   * @param val
   * @param options
   */
  convert(val: number, options: OptionTypes) {
    if (Object.keys(this.rates).length === 0 || !options) {
      return val;
    }

    if (
      typeof this.rates[options.to] === "undefined" ||
      typeof this.rates[options.from] === "undefined"
    ) {
      return val;
    }
    return twoDecimalNumber(val * this.getRate(options.to, options.from));
  }
  /**
   * update exchange rates
   * @param options
   */
  updateSettings(options: CurrenyTypes) {
    this.rates = options.rates || {};
    this.base = options.base || "";
  }
  /**
   * get exchange rates
   * @param to
   * @param from
   */
  getRate(to: string, from: string) {
    if (
      typeof this.rates[to] === "undefined" ||
      typeof this.rates[from] === "undefined"
    ) {
      throw new Error("no exchange rates");
    }
    if (from === this.base) {
      return this.rates[to];
    }
    if (to === this.base) {
      return 1 / this.rates[from];
    }

    return this.rates[to] * (1 / this.rates[from]);
  }
}

export default new Currency();
