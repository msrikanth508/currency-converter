import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ConverterActions from "./ConverterActions";
import { createStore } from "redux";
import { Provider } from "react-redux";
import storeData from "../../tests/store";
import currency from "../../utils/currency";

const defaultProps = {
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
  },
  onExchangeClicked: () => {},
  onReset: () => {},
};
const store = createStore(() => ({
  pockets: () => storeData.pockets,
  exchangeRates: () => storeData.exchangeRates,
}));

function getUI(props = defaultProps) {
  return render(
    <Provider store={store}>
      <ConverterActions {...props} />
    </Provider>
  );
}
describe("ConverterActions component", () => {
  beforeAll(() => {
    currency.updateSettings(storeData.exchangeRates);
  });
  it("should show buttons", () => {
    getUI();
    expect(screen.getByText("Reset")).toBeInTheDocument();
    expect(screen.getByText("Exchange")).toBeInTheDocument();
  });

  it("should show same exchange value when both the pockets same", () => {
    getUI({
      ...defaultProps,
      exchange: {
        ...defaultProps.exchange,
        fromId: "GBP",
        toId: "GBP",
      },
    });
    expect(screen.getByText("Exchange")).toBeInTheDocument();
    expect(screen.getByText("£1 = £1")).toBeInTheDocument();
  });

  it("should show exchange value", () => {
    getUI();
    expect(screen.getByText("£1 = €1.08")).toBeInTheDocument();
  });

  it("should call reset  callback fn", () => {
    const mockFn = jest.fn();
    getUI({
      ...defaultProps,
      onReset: mockFn,
    });
    expect(screen.getByText("Reset")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Reset"));
    expect(mockFn).toBeCalled();
  });

  it("should call exchange callback fn", () => {
    const mockFn = jest.fn();
    getUI({
      ...defaultProps,
      onExchangeClicked: mockFn,
    });
    expect(screen.getByText("Exchange")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Exchange"));
    expect(mockFn).toBeCalled();
  });
});
