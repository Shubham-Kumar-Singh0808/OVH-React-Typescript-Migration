import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import AttendanceReport from './AttendanceReport'
import { render, screen } from '../../../test/testUtils'
import {
  mockAttendanceReport,
  mockDays,
} from '../../../test/data/attendanceReportData'

describe('Attendance Report Component Testing', () => {
  test('should render attendance report component with out crashing', () => {
    render(<AttendanceReport />)
    expect(screen.getByText('Attendance Report')).toBeInTheDocument()
  })
  test('should render click to export biometric attendance after selection of with Biometric option', () => {
    render(<AttendanceReport />, {
      preloadedState: {
        employeeAttendanceReport: {
          size: 214,
          days: mockDays,
          employeeAttendanceReport: mockAttendanceReport,
        },
        authentication: {
          authenticatedUser: {
            employeeName: 'venkata',
            employeeId: 1978,
            userName: 'venkata kolla',
            role: 'admin',
          },
        },
      },
    })
    userEvent.type(screen.getByPlaceholderText('Search Employee'), 'test')
    expect(screen.getByTestId('search-employee-btn')).toBeEnabled()
    userEvent.selectOptions(screen.getByTestId('form-select1'), 'WithBiometric')
    expect(
      screen.getByRole('button', {
        name: 'Click to Export Biometric Attendance',
      }),
    )
  })
})
