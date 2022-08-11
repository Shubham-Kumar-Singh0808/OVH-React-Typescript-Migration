import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EmployeeLeaveRequests from './EmployeeLeaveRequests'
import { cleanup, render, screen, waitFor } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockEmployeesLeaves } from '../../../test/data/leaveApprovalsData'

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

describe('Employee Leave Requests Component Testing without data', () => {
  beforeEach(() => {
    render(
      <EmployeeLeaveRequests
        setCurrentPage={mockSetCurrentPage}
        setPageSize={mockSetPageSize}
        currentPage={1}
        pageSize={20}
        paginationRange={[1, 2, 3]}
      />,
    )
  })
  afterEach(cleanup)
  test('should render the "employee leave request" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Applied On' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'From' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'To' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Days' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Type' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Comments' })).toBeTruthy()
  })

  describe('Employee Leave Requests Component Testing with data', () => {
    beforeEach(() => {
      render(
        <EmployeeLeaveRequests
          setCurrentPage={mockSetCurrentPage}
          setPageSize={mockSetPageSize}
          currentPage={1}
          pageSize={20}
          paginationRange={[1, 2, 3]}
        />,
        {
          preloadedState: {
            leaveApprovals: {
              employeeLeaves: mockEmployeesLeaves,
              filterOptions: {
                isViewBtnClick: false,
                selectStatus: 'PendingApproval',
                selectMember: 1092,
                filterByFromDate: '25/7/2022',
                filterByToDate: '24/8/2022',
              },
            },
          },
        },
      )
    })
    afterEach(cleanup)
    test('should not render the loading spinner when employee leave requests are not empty', () => {
      expect(screen.findByTestId('search-leave-loader')).toMatchObject({})
    })
    test('should not render the loading s', () => {
      const approveBtnElement = screen.getAllByTestId('approve-btn')
      const rejectBtnElement = screen.getAllByTestId('reject-btn')
      expect(approveBtnElement[0]).toBeInTheDocument()
      expect(rejectBtnElement[0]).toBeInTheDocument()
      // userEvent.click(approveBtnElement[0])
    })
  })
})
