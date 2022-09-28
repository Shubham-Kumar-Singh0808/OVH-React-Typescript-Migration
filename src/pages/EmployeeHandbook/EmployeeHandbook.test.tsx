import '@testing-library/jest-dom'
import React from 'react'
import EmployeeHandbook from './EmployeeHandbook'
import { render, screen } from '../../test/testUtils'

describe('Employee Handbook Component Testing', () => {
  test('should render Employee Handbook Tab component with out crashing', () => {
    render(<EmployeeHandbook />, {
      preloadedState: {
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

    expect(screen.getByText('Employee Handbook')).toBeInTheDocument()
  })
})
