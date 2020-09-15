import currency from "./currency";
import fakeData from "../data";

describe("Currency", () => {
  it("should return same number when exchange rates are not available", () => {
    expect(currency.convert(1, undefined)).toBe(1);
  });

  it("should exchange currency", () => {
    currency.updateSettings(fakeData);

    expect(
      currency.convert(1, {
        from: "EUR",
        to: "USD",
      })
    ).toBe(1.18);
    expect(
      currency.convert(1, {
        from: "EUR",
        to: "GBP",
      })
    ).toBe(0.93);

    expect(
      currency.convert(1, {
        from: "EUR",
        to: "EUR",
      })
    ).toBe(1);

    expect(
      currency.convert(1, {
        from: "USD",
        to: "EUR",
      })
    ).toBe(0.84);

    expect(
      currency.convert(1, {
        from: "USD",
        to: "GBP",
      })
    ).toBe(0.78);
    expect(
      currency.convert(1, {
        from: "USD",
        to: "USD",
      })
    ).toBe(1);

    expect(
      currency.convert(1, {
        from: "GBP",
        to: "EUR",
      })
    ).toBe(1.08);

    expect(
      currency.convert(1, {
        from: "GBP",
        to: "USD",
      })
    ).toBe(1.28);
    expect(
      currency.convert(1, {
        from: "GBP",
        to: "GBP",
      })
    ).toBe(1);

    expect(
      currency.convert(1, {
        from: "from",
        to: "to",
      })
    ).toBe(1);
  });
});
