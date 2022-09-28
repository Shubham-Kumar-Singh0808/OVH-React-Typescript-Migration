import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import EmployeeHandbook from './EmployeeHandbook'
import { render, screen, waitFor } from '../../test/testUtils'

describe('Employee Handbook Component Testing', () => {
  const history = createMemoryHistory()
  beforeEach(() => {
    render(
      <Router history={history}>
        <EmployeeHandbook />,
      </Router>,
      {
        preloadedState: {
          authentication: {
            authenticatedUser: {
              employeeName: 'admin',
              employeeId: '1983',
              userName: 'admin',
              role: 'admin' || 'HR Manager' || 'HR',
              tenantKey: 'abc',
              token: 'test',
              designation: 'developer',
            },
          },
        },
      },
    )
  })
  test('should render `Employee Handbook` component without crashing', () => {
    expect(screen.getByText('Employee Handbook')).toBeInTheDocument()
  })
  test('should redirect to /Handbook Settings when user clicks on handbooksettings from HolidaysList Page', async () => {
    userEvent.click(screen.getByRole('button', { name: 'Handbook Settings' }))
    await waitFor(() => {
      // check if a redirect happens after clicking HandbookSettings
      expect(history.location.pathname).toBe('/handbooksettings')
    })
  })
})
