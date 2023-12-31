/* eslint-disable import/export */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// @ts-nocheck
// Todo: remove eslint disable and fix error

import { Provider } from 'react-redux'
import React from 'react'
import { Router } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { createMemoryHistory } from 'history'
import { render as rtlRender } from '@testing-library/react'
import { allReducers } from '../stateStore'

const render = (
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: allReducers, preloadedState }),
    ...renderOptions
  } = {},
) => {
  const Wrapper = ({ children }) => {
    const history = createMemoryHistory()
    return (
      <Router history={history}>
        <Provider store={store}>{children}</Provider>
      </Router>
    )
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'
export { render }
