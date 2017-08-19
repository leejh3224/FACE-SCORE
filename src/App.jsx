import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import WelcomeModal from './components/WelcomeModal'
import Page from "./components/Page";

export class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div>
          {/* rendered only once */}
          { store.getState().auth.status === "AUTH_ANONYMOU" ? <WelcomeModal /> : null }
          <Page />
        </div>
      </Provider>
    );
  }
}