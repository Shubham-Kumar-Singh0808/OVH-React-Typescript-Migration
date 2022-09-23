import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import LeaveReportTable from './LeaveReportTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import { mockLeaveReportData } from '../../../test/data/LeaveReportData'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(
      screen.queryByText(mockLeaveReportData.list[i].employeeDTO.fullName),
    ).toBeInTheDocument()
  }
}

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()
const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <LeaveReportTable
      setCurrentPage={mockSetCurrentPage}
      setPageSize={mockSetPageSize}
      currentPage={1}
      pageSize={20}
      paginationRange={[1, 2, 3]}
    />
    ,
  </div>
)

describe('Leave Report Component Testing', () => {
  test('should render Leave Report Table component with out crashing', async () => {
    render(toRender, {
      preloadedState: {
        leaveReport: {
          isLoading: ApiLoadingState.succeeded,
          leaveSummaries: mockLeaveReportData,
          listSize: mockLeaveReportData.size,
        },
      },
    })

    expectPageSizeToBeRendered(20)
    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
      expect(mockSetPageSize).toHaveBeenCalledTimes(1)
      expect(mockSetCurrentPage).toHaveBeenCalledTimes(1)
    })
  })
})
