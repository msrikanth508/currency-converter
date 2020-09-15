import React from "react";
import { render, screen } from "@testing-library/react";
import Alert from "../Alert";

describe("Alert component", () => {
  it("should show alert with message", () => {
    render(<Alert message="Alert msg" />);
    expect(screen.getByText("Alert msg")).toBeInTheDocument();
  });
});
