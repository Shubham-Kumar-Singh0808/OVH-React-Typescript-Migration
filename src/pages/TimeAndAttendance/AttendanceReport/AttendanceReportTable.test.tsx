import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import AttendanceReportTable from './AttendanceReportTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import {
  mockAttendanceReport,
  mockDays,
} from '../../../test/data/attendanceReportData'

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(
      screen.getByText(mockAttendanceReport[i].fullName),
    ).toBeInTheDocument()
  }
}

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

describe('Attendance Report Table Component Testing', () => {
  test('should render AttendanceReport Table component with out crashing', async () => {
    render(
      <AttendanceReportTable
        setPageSize={mockSetPageSize}
        setCurrentPage={mockSetCurrentPage}
        currentPage={1}
        pageSize={20}
        paginationRange={[1, 2, 3]}
        isBiometric={'WithoutBiometric'}
      />,
      {
        preloadedState: {
          employeeAttendanceReport: {
            size: 214,
            days: mockDays,
            employeeAttendanceReport: mockAttendanceReport,
          },
        },
      },
    )
    mockAttendanceReport.forEach((currentReport) =>
      expect(screen.getByText(currentReport.fullName)).toBeInTheDocument(),
    )

    expectPageSizeToBeRendered(20)
    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])

      expect(mockSetPageSize).toHaveBeenCalledTimes(1)
      expect(mockSetCurrentPage).toHaveBeenCalledTimes(1)
    })
  })
})
