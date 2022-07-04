/* eslint-disable import/named */
import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import userEvent from '@testing-library/user-event'
import AddNewEmployee from '.'
import stateStore from '../../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

const expectComponentToBeRendered = () => {
  expect(screen.getByRole('button')).toBeInTheDocument()
  expect(screen.getByRole('button')).toBeDisabled()
}

describe('Add New Employee Testing', () => {
  test('should render add new employee form without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewEmployee />
      </ReduxProvider>,
    )
    screen.debug()
  })

  test('should be able to render Add Family button', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewEmployee />
      </ReduxProvider>,
    )
    expect(screen.getByTestId('add-new-employee')).toBeInTheDocument()
  })

  test('should be able to render Clear button', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewEmployee />
      </ReduxProvider>,
    )
    expect(screen.getByTestId('clear-new-employee')).toBeInTheDocument()
  })

  test('should render 2 input components', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewEmployee />
      </ReduxProvider>,
    )
    expect(screen.getByPlaceholderText('User Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
  })

  test('should stay disable add button when input is empty', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewEmployee />
      </ReduxProvider>,
    )
    expectComponentToBeRendered()
    expect(screen.getByTestId('add-new-employee')).toBeDisabled()
  })

  test('should enable clear button when input is not empty', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewEmployee />
      </ReduxProvider>,
    )

    expectComponentToBeRendered()

    userEvent.type(screen.getByRole('textbox'), 'test input..')
    expect(screen.getByTestId('clear-new-employee')).not.toBeDisabled()
  })
})
