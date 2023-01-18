import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EmployeeLeaveRequests from './EmployeeLeaveRequests'
import { cleanup, render, screen, waitFor } from '../../../test/testUtils'
import { mockEmployeesLeaves } from '../../../test/data/leaveApprovalsData'

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(
      screen.queryAllByText(
        mockEmployeesLeaves.allEmpLeavesList[i].numberOfDays,
      )[0],
    ).toBeInTheDocument()
  }
}

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <EmployeeLeaveRequests
      setCurrentPage={mockSetCurrentPage}
      setPageSize={mockSetPageSize}
      currentPage={1}
      pageSize={20}
      paginationRange={[1, 2, 3]}
    />
  </div>
)

describe('Employee Leave Requests Component Testing without data', () => {
  beforeEach(() => {
    render(toRender)
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
      render(toRender, {
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
      })
    })
    afterEach(cleanup)
    screen.debug()
    test('upon approve button click it should render approve modal', () => {
      const approveBtnElement = screen.getAllByTestId('approve-btn')
      userEvent.click(approveBtnElement[0])
      expect(approveBtnElement[0]).toBeInTheDocument()
    })

    test('upon reject button click it should render reject modal', async () => {
      const rejectBtnElement = screen.getAllByTestId('reject-btn')
      expect(rejectBtnElement[0]).toBeInTheDocument()
      userEvent.click(rejectBtnElement[0])
      await waitFor(() => {
        const rejectModalConfirmBtn = screen.getByRole('button', {
          name: 'Yes',
        })
        userEvent.click(rejectModalConfirmBtn)
        expect(rejectModalConfirmBtn).toBeInTheDocument()
      })
    })

    test('should able to render comments modal upon employee comments link', () => {
      const employeeCommentLink = screen.getAllByTestId('employee-comment-Link')
      expect(employeeCommentLink[0]).toBeInTheDocument()
      userEvent.click(employeeCommentLink[0])
      expect(screen.getAllByText('sick')[0]).toBeInTheDocument()
    })

    test('should render employee leave requests component with data without crashing', async () => {
      expectPageSizeToBeRendered(20)
      await waitFor(() => {
        userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
        expect(mockSetPageSize).toHaveBeenCalledTimes(1)
        expect(mockSetCurrentPage).toHaveBeenCalledTimes(1)
      })
    })
  })
})
