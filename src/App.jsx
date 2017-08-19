import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { listenToAuth } from "./actions/auth";
import Page from "./components/Page";

export class App extends Component {
  componentWillMount() {
    store.dispatch(listenToAuth());
  }

  render() {
    return (
      <Provider store={store}>
        <Page />
      </Provider>
    );
  }
}
