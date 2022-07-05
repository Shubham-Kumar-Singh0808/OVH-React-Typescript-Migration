import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import ManagerTimeInOfficeReport from './ManagerTimeInOfficeReport'
import { render, screen, waitFor } from '../../../test/testUtils'
import { mockManagerReport } from '../../../test/data/timeInOfficeEmployeeManagerReportData'

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(
      screen.getByText(mockManagerReport.list[i].empName),
    ).toBeInTheDocument()
  }
}

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

describe('Manager Time Report Table Component Testing', () => {
  test('should render manager time in office report without crashing', async () => {
    render(
      <ManagerTimeInOfficeReport
        setCurrentPage={mockSetCurrentPage}
        setPageSize={mockSetPageSize}
        currentPage={1}
        pageSize={20}
        paginationRange={[1, 2, 3]}
      />,
      {
        preloadedState: {
          timeInOfficeReport: {
            timeInOfficeManagerReport: mockManagerReport,
            listSize: 183,
          },
        },
      },
    )

    expectPageSizeToBeRendered(20)

    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])

      expect(mockSetPageSize).toHaveBeenCalledTimes(1)
      expect(mockSetCurrentPage).toHaveBeenCalledTimes(1)
    })
  })
})
