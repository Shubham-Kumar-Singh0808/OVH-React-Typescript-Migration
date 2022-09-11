import '@testing-library/jest-dom'
import React from 'react'
import ListOfHolidays from './ListOfHolidays'
import { render, screen } from '../../../../test/testUtils'
import { mockLoggedInEmployeeData } from '../../../../test/data/myProfileData'

describe('List Of Holidays Component Testing', () => {
  render(<ListOfHolidays />, {
    preloadedState: {
      getLoggedInEmployeeData: {
        generalInformation: mockLoggedInEmployeeData,
      },
      authentication: {
        authenticatedUser: {
          employeeName: 'admin',
          employeeId: '1983',
          userName: 'admin',
          role: 'admin',
          tenantKey: 'abc',
          token: 'test',
          designation: 'developer',
        },
      },
    },
  })
  screen.debug()
  test('should render HolidaysList Page without crashing', () => {
    expect(screen.getByText('List of Holidays')).toBeInTheDocument()
  })
})
