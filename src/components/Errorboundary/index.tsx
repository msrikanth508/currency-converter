import React from "react";
import ErrorComponent from "./ErrorComponent";

export default class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };
  componentDidCatch() {
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) {
      return <ErrorComponent />;
    } else {
      return this.props.children;
    }
  }
}
