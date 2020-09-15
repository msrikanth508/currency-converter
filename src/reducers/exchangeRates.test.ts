import reducer from "./exchangeRates";
import * as types from "../constants";
import testData from "../tests/store";

describe("exchangeRates reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it("should update state", () => {
    expect(
      reducer([], {
        type: types.UPDATE_RATES,
        value: testData.exchangeRates,
      })
    ).toMatchObject(testData.exchangeRates);
  });
});
