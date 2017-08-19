import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import Page from "./components/Page";

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <Page />
      </Provider>
    );
  }
}