import './styles/application.styl'

import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { createHistory } from 'history'
import { syncReduxAndRouter } from 'redux-simple-router'

import createStore from './redux/store'
import createRoutes from './routes'

const store = createStore()
const history = createHistory()
const routes = createRoutes(store)
syncReduxAndRouter(history, store)

render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app')
)
