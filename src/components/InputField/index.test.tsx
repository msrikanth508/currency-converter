import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "../InputField";

const defaultProps = {
  onChange: () => {},
  exchange: {
    fromId: "GBP",
    fromValue: "",
    toId: "EUR",
    toValue: "",
    isError: false,
  },
};

function getUI(props = defaultProps) {
  return render(<InputField {...props} />);
}
describe("InputField component", () => {
  it("should call onChange event when input is valid - test1", () => {
    const onChangeMock = jest.fn();

    const { container } = getUI({
      ...defaultProps,
      onChange: onChangeMock,
    });
    const input = container.querySelector("input");

    fireEvent.change(input, {
      target: { value: "100" },
    });
    expect(onChangeMock).toBeCalledWith("100");
  });

  it("should call onChange event when input is valid - test2", () => {
    const onChangeMock = jest.fn();

    const { container } = getUI({
      ...defaultProps,
      onChange: onChangeMock,
    });
    const input = container.querySelector("input");

    fireEvent.change(input, {
      target: { value: "100." },
    });
    expect(onChangeMock).toBeCalledWith("100.");
  });
  it("should call onChange event when input is valid - test3", () => {
    const onChangeMock = jest.fn();

    const { container } = getUI({
      ...defaultProps,
      onChange: onChangeMock,
    });
    const input = container.querySelector("input");

    fireEvent.change(input, {
      target: { value: "100.05" },
    });
    expect(onChangeMock).toBeCalledWith("100.05");
  });
  it("should not call onChange event when input has more than two digits after dot", () => {
    const onChangeMock = jest.fn();

    const { container } = getUI({
      ...defaultProps,
      onChange: onChangeMock,
    });
    const input = container.querySelector("input");

    fireEvent.change(input, {
      target: { value: "100.005" },
    });
    expect(onChangeMock).toBeCalledTimes(0);
  });

  it("should not call onChange event when input has chars", () => {
    const onChangeMock = jest.fn();

    const { container } = getUI({
      ...defaultProps,
      onChange: onChangeMock,
    });
    const input = container.querySelector("input");

    fireEvent.change(input, {
      target: { value: "abcd" },
    });
    expect(onChangeMock).toBeCalledTimes(0);
  });

  it("should not call onChange event when input has special chars", () => {
    const onChangeMock = jest.fn();

    const { container } = getUI({
      ...defaultProps,
      onChange: onChangeMock,
    });
    const input = container.querySelector("input");

    fireEvent.change(input, {
      target: { value: "$%&*" },
    });
    expect(onChangeMock).toBeCalledTimes(0);
  });

  it("should  call onChange event when input has only dot", () => {
    const onChangeMock = jest.fn();

    const { container } = getUI({
      ...defaultProps,
      onChange: onChangeMock,
    });
    const input = container.querySelector("input");

    fireEvent.change(input, {
      target: { value: "." },
    });
    expect(onChangeMock).toBeCalledWith("0.");
  });
});
