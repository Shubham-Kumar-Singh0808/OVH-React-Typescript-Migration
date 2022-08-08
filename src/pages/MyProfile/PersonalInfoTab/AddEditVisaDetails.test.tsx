/* eslint-disable import/named */
// Todd: remove eslint and fix error
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import userEvent from '@testing-library/user-event'
import AddEditVisaDetails from './AddEditVisaDetails'
import stateStore from '../../../stateStore'

const deviceLocale: string =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>
const mockUseDispatchValue = 1984
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockImplementation(() => {
    return mockUseDispatchValue
  }),
}))
describe('Add New Visa member Testing', () => {
  beforeEach(() => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddEditVisaDetails
          headerTitle={''}
          confirmButtonText={''}
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
  })

  test('should render datepicker fields and label', () => {
    const dateOfIssued = screen.findByTestId('dateOfIssuedInput')
    expect(dateOfIssued).toBeTruthy()
    const dateOfExpiry = screen.findByTestId('dateOfExiryInput')
    expect(dateOfExpiry).toBeTruthy()

    const dateInput = screen.getAllByPlaceholderText('dd/mm/yyyy')
    userEvent.type(
      dateInput[0],
      new Date('12/20/2021').toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    )
    userEvent.type(
      dateInput[1],
      new Date('12/21/2022').toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    )
  })
})
