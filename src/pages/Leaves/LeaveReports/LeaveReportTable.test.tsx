import '@testing-library/jest-dom'
import React from 'react'
import LeaveReportTable from './LeaveReportTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import { mockLeaveReportData } from '../../../test/data/LeaveReportData'

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(
      screen.queryByText(mockLeaveReportData.list[0].carryForwardedLeaves),
    ).toBeInTheDocument()
  }
}

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

describe('Leave Report Component Testing', () => {
  test('should render Leave Report Table component with out crashing', async () => {
    render(
      <LeaveReportTable
        setCurrentPage={mockSetCurrentPage}
        setPageSize={mockSetPageSize}
        currentPage={1}
        pageSize={20}
        paginationRange={[1, 2, 3]}
        selectYear={''}
      />,
      {
        preloadedState: {
          leaveReport: {
            leaveSummaries: mockLeaveReportData,
          },
        },
      },
    )
    expectPageSizeToBeRendered(20)
    await waitFor(() => {
      expect(mockSetPageSize).toHaveBeenCalledTimes(0)
      expect(mockSetCurrentPage).toHaveBeenCalledTimes(0)
    })
  })
})
