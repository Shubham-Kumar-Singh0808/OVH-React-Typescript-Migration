import React from 'react'
import '@testing-library/jest-dom'
import SearchEmployeeLeaveRequests from './SearchEmployeeLeaveRequests'
import { cleanup, render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockEmployeesLeaves,
  mockSearchEmployeesLeaves,
} from '../../../test/data/leaveApprovalsData'

describe('Search Employee Leave Requests Component Testing without data', () => {
  beforeEach(() => {
    render(<SearchEmployeeLeaveRequests />)
  })
  afterEach(cleanup)
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
      render(<SearchEmployeeLeaveRequests />, {
        preloadedState: {
          leaveApprovals: {
            isLoading: ApiLoadingState.succeeded,
            // employeeLeaves: mockEmployeesLeaves,
            searchEmployeeLeaves: mockSearchEmployeesLeaves,
            filterOptions: {
              isViewBtnClick: true,
              selectStatus: null,
              selectMember: null,
              filterByFromDate: '25/7/2022',
              filterByToDate: '24/8/2022',
            },
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()
    test('should not render the loading spinner when search leaves are not empty', () => {
      expect(screen.findByTestId('search-leave-loader')).toMatchObject({})
    })
    test('should', () => {
      expect(screen.getByText('Sai Banothu')).toBeInTheDocument()
    })
  })
})
