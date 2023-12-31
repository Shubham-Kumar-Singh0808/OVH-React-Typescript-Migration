/* eslint-disable import/named */
// Todd: remove eslint and fix error
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import AddEditVisaDetails from './AddEditFamilyDetails'
import stateStore from '../../../stateStore'

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
  it('should display the correct number of options', () => {
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
    expect(screen.getAllByRole('option').length).toBe(11)
  })
  test('should render date of issued input', () => {
    const dateOfIssued = screen.findByTestId('dateOfIssuedInput')
    expect(dateOfIssued).toBeTruthy()
  })
  test('should render date of expiry input', () => {
    const dateOfExpiry = screen.findByTestId('dateOfExiryInput')
    expect(dateOfExpiry).toBeTruthy()
  })
})
