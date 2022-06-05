import '@testing-library/jest-dom'

import { render, screen, waitFor } from '@testing-library/react'

import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import ShiftConfiguration from './ShiftConfiguration'
import { mockEmployeeShifts } from '../../../../../test/data/employeeShiftsData'
import stateStore from '../../../../../stateStore'
import userEvent from '@testing-library/user-event'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('Shift Configuration Component Testing', () => {
  test('should render shift configuration component', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <ShiftConfiguration />
      </ReduxProvider>,
    )
    expect(screen.getByPlaceholderText('Shift Name')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
  })
  test('should create employee shift upon add button click', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <ShiftConfiguration />
      </ReduxProvider>,
    )
    const buttonElement = screen.getByText('Add')
    const shiftNameInputElement = screen.getByPlaceholderText('Shift Name')
    const startTimeHoursInputElement = screen.getByTestId('sh-startTimeHour')
    const startTimeMinutesInputElement = screen.getByTestId(
      'sh-startTimeMinutes',
    )
    const endTimeHoursInputElement = screen.getByTestId('sh-endTimeHour')
    const endTimeMinutesInputElement = screen.getByTestId('sh-endTimeMinutes')
    const graceTimeInputElement = screen.getByPlaceholderText('In Minutes')
    userEvent.type(shiftNameInputElement, 'Canada Shift')
    userEvent.type(startTimeHoursInputElement, '45')
    userEvent.type(startTimeMinutesInputElement, '45')
    userEvent.type(endTimeHoursInputElement, '2')
    userEvent.type(endTimeMinutesInputElement, '99')
    userEvent.type(graceTimeInputElement, '30')
    userEvent.click(buttonElement)
    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(
        mockEmployeeShifts.length + 1,
      )
    })
  })
})
