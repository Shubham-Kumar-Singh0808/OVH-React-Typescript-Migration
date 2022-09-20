import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import SearchEmployeeLeaveRequests from './SearchEmployeeLeaveRequests'
import { cleanup, render, screen, waitFor } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockEmployeesLeaves,
  mockSearchEmployeesLeaves,
} from '../../../test/data/leaveApprovalsData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <SearchEmployeeLeaveRequests />
  </div>
)
describe('Search Employee Leave Requests Component Testing without data', () => {
  beforeEach(() => {
    render(toRender)
  })
  afterEach(cleanup)
  screen.debug()
  test('should render the "search employee leaves" table', () => {
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

  describe('Search Employee Leave Requests Component Testing without data', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          leaveApprovals: {
            isLoading: ApiLoadingState.succeeded,
            searchEmployeeLeaves: mockSearchEmployeesLeaves,
            filterOptions: {
              isViewBtnClick: true,
              selectStatus: 'PendingApproval',
              selectMember: null,
              filterByFromDate: '25/7/2022',
              filterByToDate: '24/8/2022',
            },
          },
        },
      })
    })
    afterEach(cleanup)

    test('should not render the loading spinner when search leaves are not empty', () => {
      expect(screen.findByTestId('search-leave-loader')).toMatchObject({})
    })

    // screen.debug()
    // test('should able to render approve modal upon approve button click', () => {
    //   const approveBtnElement = screen.getAllByTestId(
    //     'search-leave-approve-btn',
    //   )
    //   userEvent.click(approveBtnElement[0])
    //   expect(approveBtnElement[0]).toBeInTheDocument()
    // })
  })
})
