import React, { Component } from "react"
import { Provider } from "react-redux"
import store from "./store"

// components
import Page from "./Page"

// actions
import { listenToAuth } from "./actions/auth"
import { listenToFacecards } from './actions/facecards'
import { listenToUserscores } from './actions/userscores'

export class App extends Component {
  componentWillMount () {
    store.dispatch(listenToAuth())
    store.dispatch(listenToFacecards())
    store.dispatch(listenToUserscores())
  }

  render() {
    return (
      <Provider store={store}>
          <Page />
      </Provider>
    );
  }
}