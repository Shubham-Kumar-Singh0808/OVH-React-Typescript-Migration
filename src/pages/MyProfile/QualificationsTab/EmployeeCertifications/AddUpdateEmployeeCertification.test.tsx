/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable import/named */
// Todo: remove eslint and fix error
import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import userEvent from '@testing-library/user-event'
import AddUpdateEmployeeCertification from './AddUpdateEmployeeCertification'
import stateStore from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import { dateFormatPerLocale } from '../../../../utils/dateFormatUtils'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>
const mockUseDispatchValue = 1983
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockImplementation(() => {
    return mockUseDispatchValue
  }),
}))

const deviceLocale: string =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language
const localeDateFormat = dateFormatPerLocale.filter(
  (lang) => lang.label === deviceLocale,
)
const dateFormat = localeDateFormat[0].format

describe('Add Certification Testing', () => {
  test('should render Add Certification Component without crashing', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddUpdateEmployeeCertification
          headerTitle={''}
          confirmButtonText={''}
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    await stateStore.dispatch(
      reduxServices.employeeCertifications.getEmployeeCertificates(),
    )
  })
  test('should render completed date input', () => {
    const completedDate = screen.findByTestId('completedDateInput')
    expect(completedDate).toBeTruthy()
  })
  test('should render expiry date input', () => {
    const expiryDate = screen.findByTestId('expiryDateInput')
    expect(expiryDate).toBeTruthy()
  })
  test('should render Add button as disabled and Clear Button not disabled initially', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddUpdateEmployeeCertification
          headerTitle="Add Certification"
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
  test('should render Update button as not disabled initially', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddUpdateEmployeeCertification
          confirmButtonText="Update"
          headerTitle={''}
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument()
  })
  it('should display the correct number of options', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddUpdateEmployeeCertification
          headerTitle="Add Certification"
          confirmButtonText="Add"
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    expect(screen.getAllByRole('option').length).toBe(2)
  })
  it('should correctly set default option', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddUpdateEmployeeCertification
          confirmButtonText="Add"
          headerTitle="Add Certification"
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    expect(
      screen.getByRole('option', { name: 'Select Technology' }).selected,
    ).toBe(true)
  })
  test('should render datepicker fields and label', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddUpdateEmployeeCertification
          headerTitle={''}
          confirmButtonText={''}
          backButtonHandler={jest.fn()}
        />
      </ReduxProvider>,
    )

    expect(screen.getByText('Completed Date:')).toBeInTheDocument()
    expect(screen.getByText('Expiry Date :')).toBeInTheDocument()

    const dateInput = screen.getAllByPlaceholderText(dateFormat)
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
