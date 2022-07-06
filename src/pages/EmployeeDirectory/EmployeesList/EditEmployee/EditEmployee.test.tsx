/* eslint-disable import/named */
import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import userEvent from '@testing-library/user-event'
import EditEmployee from '.'
import stateStore from '../../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('Add New Employee Testing', () => {
  test('should render add new employee form without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EditEmployee />
      </ReduxProvider>,
    )
    screen.debug()
  })

  test('should be able to render Add Family button', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EditEmployee />
      </ReduxProvider>,
    )
    expect(screen.getByTestId('edit-employee')).toBeInTheDocument()
  })

  test('should be able to render Clear button', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EditEmployee />
      </ReduxProvider>,
    )
    expect(screen.getByTestId('clear-employee')).toBeInTheDocument()
  })

  test('should render 2 input components', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EditEmployee />
      </ReduxProvider>,
    )
    expect(screen.getByPlaceholderText('User Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
  })

  test('should stay disable add button when input is empty', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EditEmployee />
      </ReduxProvider>,
    )

    expect(screen.getByTestId('add-new-employee')).toBeDisabled()
  })

  test('should enable clear button when input is not empty', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EditEmployee />
      </ReduxProvider>,
    )

    userEvent.type(screen.getByTestId('user-input'), 'test input..')
    expect(screen.getByTestId('clear-employee')).not.toBeDisabled()
  })
})
