import { currencyFormatter, twoDecimalNumber, enoughFunds } from "./formatter";

describe("Formatter", () => {
  it("should convert number into Intl format", () => {
    expect(currencyFormatter(1000, "USD")).toBe("$1,000.00");
    expect(currencyFormatter(1000, "EUR")).toBe("€1,000.00");
    expect(currencyFormatter(1000, "GBP")).toBe("£1,000.00");
  });

  it("should convert number into two decimals", () => {
    expect(twoDecimalNumber(10)).toBe(10.0);
    expect(twoDecimalNumber(10.236)).toBe(10.24);
    expect(twoDecimalNumber(1000.986)).toBe(1000.99);
  });

  it("should return true when funds available", () => {
    expect(enoughFunds(100, 1500)).toBeTruthy();
    expect(enoughFunds("100", 1500)).toBeTruthy();
    expect(enoughFunds(100, 100)).toBeTruthy();
    expect(enoughFunds(100, 10)).toBeFalsy();
    expect(enoughFunds(100, 0)).toBeFalsy();
  });
});
