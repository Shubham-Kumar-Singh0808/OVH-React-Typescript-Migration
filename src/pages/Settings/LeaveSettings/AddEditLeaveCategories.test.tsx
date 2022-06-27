import '@testing-library/jest-dom'

import { getByLabelText, render, screen, waitFor } from '@testing-library/react'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import stateStore from '../../../stateStore'
import userEvent from '@testing-library/user-event'
import AddEditLeaveCategories from './AddEditLeaveCategories'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

const expectComponentToBeRendered = () => {
  expect(screen.getByText('Name Of Leave Category:')).toBeInTheDocument()
  expect(screen.getByText('Category:')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
  expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
}

describe('Add New Leave Category Testing', () => {
  test('should render add new Leave category form without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddEditLeaveCategories
          confirmButtonText={''}
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    expectComponentToBeRendered()
  })

  test('should find add and clear buttons in the form', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddEditLeaveCategories
          confirmButtonText={''}
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
  })

  test('should enabled add  button when input is not empty', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddEditLeaveCategories
          confirmButtonText={''}
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    userEvent.selectOptions(screen.getByTestId('form-select'), ['EARNED'])
    await waitFor(() => {
      userEvent.type(screen.getByRole('textbox'), 'testing')
      expect(screen.getByRole('button', { name: /Add/i })).toBeEnabled()
    })
  })

  test('should correctly set default option', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddEditLeaveCategories
          confirmButtonText={''}
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    expect(screen.getByRole('option', { name: 'Leave Name' }).selected).toBe(
      true,
    )
  })
  test('should display the correct number of options, including default option', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddEditLeaveCategories
          confirmButtonText={''}
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    //including heading
    expect(screen.getAllByRole('option').length).toBe(3)
  })
})
