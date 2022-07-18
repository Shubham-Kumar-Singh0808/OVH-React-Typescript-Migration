import '@testing-library/jest-dom'
// eslint-disable-next-line import/named
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import AddNewEmployee from '.'
import stateStore from '../../../../stateStore'
import { render, screen, waitFor, fireEvent } from '../../../../test/testUtils'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

const clearBtnId = 'clear-new-employee'
const userInputId = 'user-input'
let history: any

describe('Add New Employee Testing', () => {
  beforeEach(() => {
    history = createMemoryHistory()

    render(
      <Router history={history}>
        <ReduxProvider reduxStore={stateStore}>
          <AddNewEmployee />
        </ReduxProvider>
      </Router>,
    )
  })

  test('should be able to render Add Family button', () => {
    expect(screen.getByTestId('add-new-employee')).toBeInTheDocument()
  })

  test('should be able to render Clear button', () => {
    expect(screen.getByTestId(clearBtnId)).toBeInTheDocument()
  })

  test('should render 2 input components', () => {
    expect(screen.getByPlaceholderText('User Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
  })

  test('should stay disable add button when input is empty', () => {
    expect(screen.getByTestId('add-new-employee')).toBeDisabled()
  })

  test('should enable clear button when input is not empty', () => {
    userEvent.type(screen.getByTestId(userInputId), 'test input..')
    expect(screen.getByTestId(clearBtnId)).not.toBeDisabled()
  })

  test('should be able to click clear button when input is not empty', () => {
    const clearBtn = screen.getByTestId(clearBtnId)

    userEvent.type(screen.getByTestId(userInputId), 'test input..')
    expect(screen.getByTestId(clearBtnId)).not.toBeDisabled()
    fireEvent.click(clearBtn)

    expect(screen.getByTestId(userInputId)).toHaveValue('')
  })

  test('should redirect to /employeeList after back button click', async () => {
    const backBtn = screen.getAllByTestId('back-btn')
    userEvent.click(backBtn[0])

    await waitFor(() => {
      expect(history.location.pathname).toBe('/employeeList')
    })
  })
})
