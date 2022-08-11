import '@testing-library/jest-dom'

import React from 'react'
import EmployeeLeaves from './EmployeeLeaves'
import { render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockEmployeeList } from '../../../test/data/employeeListData'
import {
  mockEmployeesLeaves,
  mockSearchEmployeesLeaves,
} from '../../../test/data/leaveApprovalsData'

describe('Employee Leaves Component Testing', () => {
  test('should render employee leaves component without crashing', () => {
    render(<EmployeeLeaves isViewBtnClick={false} />, {
      preloadedState: {
        leaveApprovals: {
          isLoading: ApiLoadingState.succeeded,
          getEmployees: mockEmployeeList,
          employeeLeaves: mockEmployeesLeaves,
          searchEmployeeLeaves: mockSearchEmployeesLeaves,
          filterOptions: {
            isViewBtnClick: false,
            selectStatus: 'PendingApproval',
            selectMember: null,
            filterByFromDate: '25/7/2022',
            filterByToDate: '24/8/2022',
          },
        },
      },
    })
  })
  // expect(screen.getByText('Name')).toBeInTheDocument()
})
