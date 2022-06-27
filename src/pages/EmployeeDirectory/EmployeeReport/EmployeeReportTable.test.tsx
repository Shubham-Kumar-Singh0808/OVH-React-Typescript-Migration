import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '../../../test/testUtils'
import userEvent from '@testing-library/user-event'
import EmployeeReportTable from './EmployeeReportTable'
import { EmployeeReport } from '../../../types/EmployeeDirectory/EmployeeReport/employeeReportTypes'
import { mockEmployeeReport } from '../../../test/data/employeeReportData'

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(screen.getByText(mockEmployeeReport[i].fullName)).toBeInTheDocument()
  }
}

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

describe('Employee Report Table Component Testing', () => {
  test('should render employee report table component without crashing', async () => {
    render(
      <EmployeeReportTable
        paginationRange={[1, 2, 3]}
        currentPage={1}
        setCurrentPage={mockSetCurrentPage}
        pageSize={1}
        setPageSize={mockSetPageSize}
      />,
      {
        preloadedState: {
          employeeReports: {
            employees: mockEmployeeReport as EmployeeReport[],
            listSize: 100,
          },
        },
      },
    )

    expectPageSizeToBeRendered(1)

    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])

      expect(mockSetPageSize).toHaveBeenCalledTimes(1)
      expect(mockSetCurrentPage).toHaveBeenCalledTimes(1)
    })
  })
})
