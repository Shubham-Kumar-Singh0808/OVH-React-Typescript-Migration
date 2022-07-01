import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/named
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import EmployeeLeaveCalender from './EmployeeLeaveCalender'
import stateStore from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>
const expectComponentToBeRendered = () => {
  expect(screen.getByText('Leave Cycle Month:')).toBeInTheDocument()
  expect(screen.getByText('Probation Period (Months):')).toBeInTheDocument()
  expect(screen.getByText('Max Leaves Earned (Days):')).toBeInTheDocument()
  expect(screen.getByText('Payroll Cutoff Date (Day):')).toBeInTheDocument()
  expect(screen.getByText('Number of Leaves/Year :')).toBeInTheDocument()
  expect(screen.getByText('Maximum Accrual/Year:')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled()
  expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
}
describe('Leave Calender Testing', () => {
  test('should render Save and Cancel button as disabled initially', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeLeaveCalender />
      </ReduxProvider>,
    )
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })

  it('should display the correct number of options', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeLeaveCalender />
      </ReduxProvider>,
    )
    expect(screen.getAllByRole('option').length).toBe(44)
  })

  test('should render add new Leave calender form without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeLeaveCalender />
      </ReduxProvider>,
    )
    expectComponentToBeRendered()
  })

  test('should render Add Leave Calendar Settings Component without crashing', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeLeaveCalender />
      </ReduxProvider>,
    )
    await stateStore.dispatch(
      reduxServices.employeeLeaveSettings.getEmployeeLeaveCalenderSettings(),
    )
  })
})
