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
          {/* will be rendered only once when the user has no auth information */}
          { store.getState().auth.status === "AUTH_ANONYMOUS" ? <WelcomeModal /> : null }
          <Page />
        </div>
      </Provider>
    );
  }
}