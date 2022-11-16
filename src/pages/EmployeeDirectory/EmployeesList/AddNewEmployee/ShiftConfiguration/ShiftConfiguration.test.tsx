import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import ShiftConfiguration from './ShiftConfiguration'
import { render, screen } from '../../../../../test/testUtils'
import { mockUserAccessToFeaturesData } from '../../../../../test/data/userAccessToFeaturesData'
import { mockEmployeeShifts } from '../../../../../test/data/employeeShiftsData'

describe('Shift Configuration Component Testing', () => {
  beforeEach(() => {
    render(<ShiftConfiguration setToggleShift={jest.fn()} />, {
      preloadedState: {
        shiftConfiguration: {
          employeeShifts: mockEmployeeShifts,
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  test('should render shift configuration component', () => {
    expect(screen.getByPlaceholderText('Shift Name')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
  })
  test('should create employee shift upon add button click', () => {
    userEvent.type(screen.getByPlaceholderText('Shift Name'), 'Canada Shift')
    userEvent.type(screen.getByTestId('sh-startTimeHour'), '45')
    userEvent.type(screen.getByTestId('sh-startTimeMinutes'), '45')
    userEvent.type(screen.getByTestId('sh-endTimeHour'), '2')
    userEvent.type(screen.getByTestId('sh-endTimeMinutes'), '99')
    userEvent.type(screen.getByPlaceholderText('In Minutes'), '30')
    userEvent.click(screen.getByText('Add'))
  })
})
