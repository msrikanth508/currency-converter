import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitForElement,
} from "@testing-library/react";
import AppHeader from "../AppHeader";

jest.mock("../Pockets", () => () => <div>Pocket Modal</div>);

describe("AppHeader component", () => {
  it("should app name", () => {
    render(<AppHeader pockets={[]} />);
    expect(screen.getByText("Currency Converter")).toBeInTheDocument();
  });

  it("should open pockets Modal when clicks on btn", () => {
    const { container } = render(<AppHeader pockets={[]} />);

    expect(container.querySelector("svg")).toBeInTheDocument();
    fireEvent.click(container.querySelector("svg"));
    waitForElement(() => screen.getByText("Pocket Modal"));
    expect(screen.getByText("Pocket Modal")).toBeInTheDocument();
  });
});
