import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import AttendanceReportTable from './AttendanceReportTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import { mockEmployeeList } from '../../../test/data/employeeListData'

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(screen.getByText(mockEmployeeList[i].fullName)).toBeInTheDocument()
  }
}

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

describe('Employee List Table Component Testing', () => {
  test('should render Personal info tab component with out crashing', async () => {
    render(
      <AttendanceReportTable
        paginationRange={[1, 2, 3, 4]}
        setPageSize={mockSetPageSize}
        setCurrentPage={mockSetCurrentPage}
        currentPage={1}
        pageSize={20}
        isBiometric={'WithoutBiometric'}
      />,
      {
        preloadedState: {
          employeeAttendanceReport: {
            size: 0,
            days: [],
            employeeAttendanceReport: [],
          },
        },
      },
    )

    expectPageSizeToBeRendered(20)

    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])

      //   const pageSizeSelect = screen.getByRole('option', {
      //     name: '40',
      //   }) as HTMLOptionElement
      //   expect(pageSizeSelect.selected).toBe(true)

      expect(mockSetPageSize).toHaveBeenCalledTimes(1)
      expect(mockSetCurrentPage).toHaveBeenCalledTimes(1)
    })
  })
})
