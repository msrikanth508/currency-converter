import reducer from "./pockets";
import * as types from "../constants";
import testData from "../tests/store";

describe("Pockets reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(testData.pockets);
  });

  it("should update exchange object", () => {
    expect(
      reducer([], {
        type: types.UPDATE_EXCHANGE,
        value: {
          fromId: "EUR",
          toId: "USD",
        },
      }).exchange
    ).toMatchObject({
      fromId: "EUR",
      toId: "USD",
    });
  });

  it("should update pocket funds", () => {
    const state = reducer(
      {
        ...testData.pockets,
        exchange: {
          ...testData.pockets.exchange,
          fromId: "EUR",
          fromValue: "100",
          toValue: "500",
          toId: "USD",
        },
      },
      {
        type: types.EXCHANGE_CURRENCY,
      }
    );

    expect(state.data).toMatchObject([
      {
        value: 1500,
        id: "GBP",
        name: "GBP",
      },
      {
        value: 2200,
        id: "EUR",
        name: "EUR",
      },
      {
        value: 6200,
        name: "USD",
        id: "USD",
      },
    ]);

    expect(state.transactions).toHaveLength(2);
  });

  it("should handle same pocket transaction", () => {
    const state = reducer(
      {
        ...testData.pockets,
        exchange: {
          ...testData.pockets.exchange,
          fromId: "EUR",
          fromValue: "100",
          toValue: "500",
          toId: "EUR",
        },
      },
      {
        type: types.EXCHANGE_CURRENCY,
      }
    );

    expect(state.data).toMatchObject([
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
    ]);
    expect(state.transactions).toHaveLength(2);
  });
});
