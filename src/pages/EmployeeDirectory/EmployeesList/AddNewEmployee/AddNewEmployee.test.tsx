/* eslint-disable import/named */
import '@testing-library/jest-dom'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import AddNewEmployee from '.'
import stateStore from '../../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

const clearBtnId = 'clear-new-employee'
const userInputId = 'user-input'

describe('Add New Employee Testing', () => {
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
    expect(screen.getByTestId(clearBtnId)).toBeInTheDocument()
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

    expect(screen.getByTestId('add-new-employee')).toBeDisabled()
  })

  test('should enable clear button when input is not empty', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewEmployee />
      </ReduxProvider>,
    )

    userEvent.type(screen.getByTestId(userInputId), 'test input..')
    expect(screen.getByTestId(clearBtnId)).not.toBeDisabled()
  })

  test('should be able to click clear button when input is not empty', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewEmployee />
      </ReduxProvider>,
    )

    const clearBtn = screen.getByTestId(clearBtnId)

    userEvent.type(screen.getByTestId(userInputId), 'test input..')
    expect(screen.getByTestId(clearBtnId)).not.toBeDisabled()
    fireEvent.click(clearBtn)

    // Should be disable because no input
    expect(screen.getByTestId(userInputId)).toHaveValue('')
  })

  test('should redirect to /employeeList after back button click', async () => {
    const history = createMemoryHistory()

    render(
      <Router history={history}>
        <ReduxProvider reduxStore={stateStore}>
          <AddNewEmployee />
        </ReduxProvider>
      </Router>,
    )

    userEvent.click(screen.getByTestId('back-btn'))

    await waitFor(() => {
      expect(history.location.pathname).toBe('/employeeList')
    })
  })
})
