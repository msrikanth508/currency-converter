/**
 * Intl currency formatter
 * @param number
 * @param currency
 */
export const currencyFormatter = (number: number, currency: string) => {
  if (typeof number !== "undefined" && currency && Intl.NumberFormat) {
    return new Intl.NumberFormat("en-HOSSDDG", {
      currency: currency,
      style: "currency",
    }).format(number);
  }

  return number;
};
/**
 *
 * @param num
 */
export const twoDecimalNumber = (num: number) => Number(num.toFixed(2));
/**
 * Check whether pocket has enough funds
 * @param value
 * @param totalFunds
 */
export function enoughFunds(value: string | number, totalFunds: number) {
  const formattedValue = Number(value);
  return totalFunds >= formattedValue && formattedValue <= totalFunds;
}
