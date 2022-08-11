import '@testing-library/jest-dom'

import React from 'react'
import moment from 'moment'
import LeaveApprovals from './LeaveApprovals'
import { render, screen } from '../../../test/testUtils'
import {
  mockEmployeesLeaves,
  mockSearchEmployeesLeaves,
} from '../../../test/data/leaveApprovalsData'
import { mockEmployeeList } from '../../../test/data/employeeListData'

const commonFormatDate = 'l'
const currentYear = new Date().getFullYear()
const previousMonthResult = new Date(
  Number(currentYear),
  Number(new Date().getMonth() - 1),
  Number(25),
)
const currentMonthResult = new Date(
  Number(currentYear),
  Number(new Date().getMonth()),
  Number(24),
)
describe('Leave Approvals Component Testing', () => {
  render(<LeaveApprovals />, {
    preloadedState: {
      leaveApprovals: {
        getEmployees: mockEmployeeList,
        employeeLeaves: mockEmployeesLeaves,
        searchEmployeeLeaves: mockSearchEmployeesLeaves,
        filterOptions: {
          isViewBtnClick: false,
          selectStatus: 'PendingApproval',
          selectMember: null,
          filterByFromDate:
            moment(previousMonthResult).format(commonFormatDate),
          filterByToDate: moment(currentMonthResult).format(commonFormatDate),
        },
      },
    },
  })
  screen.debug()
  test('should render leave approvals component with out crashing', () => {
    expect(screen.getByText('Leave Approvals')).toBeInTheDocument()
  })
})
