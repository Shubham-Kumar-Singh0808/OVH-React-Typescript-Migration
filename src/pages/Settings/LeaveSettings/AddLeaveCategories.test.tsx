/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable require-await */
/* eslint-disable import/named */
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import userEvent from '@testing-library/user-event'
import AddLeaveCategories from './AddLeaveCategories'
import stateStore from '../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>
const expectComponentToBeRendered = () => {
  expect(screen.getByText('Name Of Leave Category')).toBeInTheDocument()
  expect(screen.getByText('Category:')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
  expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
}
describe('Add New Leave Category Testing', () => {
  test('should render Add button as disabled and Clear Button not disabled initially', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddLeaveCategories
          confirmButtonText="Add"
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
  })
  it('should display the correct number of options', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddLeaveCategories
          confirmButtonText="Add"
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    expect(screen.getAllByRole('option').length).toBe(3)
  })
  test('should correctly set default option', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddLeaveCategories
          confirmButtonText="Add"
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    expect(
      screen.getByRole('option', { name: 'Select Leave Type' }).selected,
    ).toBe(true)
  })
  test('should render add new Leave category form without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddLeaveCategories
          confirmButtonText="Add"
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    expectComponentToBeRendered()
  })
  test('should enabled add  button when input is not empty', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddLeaveCategories
          confirmButtonText="Add"
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    userEvent.selectOptions(screen.getByTestId('form-select'), ['LOP'])
    await waitFor(() => {
      userEvent.type(screen.getByRole('textbox'), 'testing')
      expect(screen.getByRole('button', { name: /Add/i })).toBeEnabled()
    })
  })

  it('should allow user to change Options', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddLeaveCategories
          confirmButtonText="Add"
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    userEvent.selectOptions(
      screen.getByRole('combobox'),

      screen.getByRole('option', { name: 'LOP' }),
    )
    expect(screen.getByRole('option', { name: 'LOP' }).selected).toBe(true)
  })
  test('should clear input and disable Add button after submitting and new Category Leave should be added', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddLeaveCategories
          confirmButtonText="Add"
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )

    expectComponentToBeRendered()
    userEvent.selectOptions(screen.getByTestId('form-select'), ['LOP'])
    userEvent.type(screen.getByRole('textbox'), 'testing')
    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: 'Add' }))
      expect(screen.getByRole('textbox')).toHaveValue('testing')
    })
  })

  test('should render 1 input components', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddLeaveCategories
          confirmButtonText="Add"
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    expect(screen.getByPlaceholderText('Leave Name')).toBeInTheDocument()
  })
})
