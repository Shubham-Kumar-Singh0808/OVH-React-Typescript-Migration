import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import AttendanceReport from './AttendanceReport'
import { render, screen, waitFor } from '../../../test/testUtils'
import {
  mockAttendanceReport,
  mockDays,
} from '../../../test/data/attendanceReportData'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'
import { mockEmployeeShifts } from '../../../test/data/employeeShiftsData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <AttendanceReport />
  </div>
)
describe('Attendance Report Component Testing', () => {
  test('should render attendance report component with out crashing', () => {
    render(toRender)
    expect(screen.getByText('Attendance Report')).toBeInTheDocument()
  })

  test('should render click to export biometric attendance after selection of with Biometric option', () => {
    render(toRender, {
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

  test('upon shift selection the shift time should display on screen', () => {
    render(toRender, {
      preloadedState: {
        employeeAttendanceReport: {
          size: 214,
          days: mockDays,
          employeeAttendanceReport: mockAttendanceReport,
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
        shiftConfiguration: {
          employeeShifts: mockEmployeeShifts,
        },
      },
    })
    mockEmployeeShifts.forEach(async (currentShift) => {
      userEvent.selectOptions(screen.getByTestId('shift-select'), [
        `${currentShift.id}`,
      ])
      await waitFor(() => {
        expect(
          screen.getAllByText(currentShift.startTimeHour),
        ).toBeInTheDocument()
      })
    })
  })
})
