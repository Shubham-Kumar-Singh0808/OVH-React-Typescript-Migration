/* eslint-disable import/named */
import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
// import userEvent from '@testing-library/user-event'
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

  // test('should be able to render Clear button', () => {
  //   render(
  //     <ReduxProvider reduxStore={stateStore}>
  //       <EditEmployee />
  //     </ReduxProvider>,
  //   )
  //   expect(screen.getByTestId('clear-employee')).toBeInTheDocument()
  // })

  // test('should render 2 input components', () => {
  //   render(
  //     <ReduxProvider reduxStore={stateStore}>
  //       <EditEmployee />
  //     </ReduxProvider>,
  //   )
  //   expect(screen.getByPlaceholderText('User Name')).toBeInTheDocument()
  //   expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
  // })

  // test('should stay disable add button when input is empty', () => {
  //   render(
  //     <ReduxProvider reduxStore={stateStore}>
  //       <EditEmployee />
  //     </ReduxProvider>,
  //   )

  //   expect(screen.getByTestId('add-new-employee')).toBeDisabled()
  // })

  // test('should enable clear button when input is not empty', () => {
  //   render(
  //     <ReduxProvider reduxStore={stateStore}>
  //       <EditEmployee />
  //     </ReduxProvider>,
  //   )

  //   userEvent.type(screen.getByTestId('user-input'), 'test input..')
  //   expect(screen.getByTestId('clear-employee')).not.toBeDisabled()
  // })
})
