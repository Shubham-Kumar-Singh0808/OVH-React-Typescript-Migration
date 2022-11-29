import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
// eslint-disable-next-line import/named
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import userEvent from '@testing-library/user-event'
import AddBankAccount from './AddBankAccount'
import stateStore from '../../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>
const expectComponentToBeRendered = () => {
  expect(screen.getByText('Bank Account Number:')).toBeInTheDocument()
  expect(screen.getByText('IFSC Code:')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
}
describe('Add Bank Account Testing', () => {
  test('should render Back button', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddBankAccount
          backButtonHandler={function (): void {
            // eslint-disable-next-line sonarjs/no-duplicate-string
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
  })
  it('should display the correct number of options', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddBankAccount
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    expect(screen.getAllByRole('option').length).toBe(1)
  })
  test('should correctly set default option', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddBankAccount
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    expect(screen.getByRole('option', { name: 'Select' }).selected).toBe(true)
  })
  test('should render add Bank Account without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddBankAccount
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    expectComponentToBeRendered()
  })

  it('should allow user to change Options', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddBankAccount
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    expect(screen.getByText('Add Bank Account Information')).toBeInTheDocument()
  })
})
