import '@testing-library/jest-dom'
import React from 'react'
import EmployeeHandbook from './EmployeeHandbook'
import { render, screen } from '../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <EmployeeHandbook />
  </div>
)

describe('Employee Handbook Component Testing', () => {
  beforeEach(() => {
    render(
      toRender,

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
})
