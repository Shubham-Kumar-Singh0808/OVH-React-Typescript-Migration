/* eslint-disable import/named */
import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import EditEmployee from '.'
import stateStore from '../../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => {
  const history = createMemoryHistory()
  return (
    <Router history={history}>
      <Provider store={reduxStore}>{children}</Provider>
    </Router>
  )
}

describe('Add New Employee Testing', () => {
  test('should render add new employee form without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EditEmployee />
      </ReduxProvider>,
    )
    expect(screen.getByText('Edit Employee')).toBeInTheDocument()
  })
})
