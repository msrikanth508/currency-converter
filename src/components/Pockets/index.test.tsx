import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitForElement,
} from "@testing-library/react";
import PocketsModal from "../Pockets";

const defaultProps = {
  pockets: [
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
  handleClose: () => {},
};

describe("PocketsModal component", () => {
  it("should show modal title", () => {
    render(<PocketsModal {...defaultProps} />);
    expect(screen.getByText("Pockets")).toBeInTheDocument();
  });

  it("should show pocket details", () => {
    render(<PocketsModal {...defaultProps} />);
    expect(screen.getByText(defaultProps.pockets[0].name)).toBeInTheDocument();
    expect(screen.getByText("$5,700.00")).toBeInTheDocument();
  });

  it("should call modal close callback fn", () => {
    const mockFn = jest.fn();

    render(<PocketsModal {...defaultProps} handleClose={mockFn} />);
    expect(screen.getByText("close")).toBeInTheDocument();
    fireEvent.click(screen.getByText("close"));
    expect(mockFn).toBeCalled();
  });
});
