import '@testing-library/jest-dom'

import React from 'react'
import EmployeeLeaves from './EmployeeLeaves'
import { render, screen, waitFor } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockEmployeeList } from '../../../test/data/employeeListData'
import {
  mockEmployeesLeaves,
  mockSearchEmployeesLeaves,
} from '../../../test/data/leaveApprovalsData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <EmployeeLeaves isViewBtnClick={false} />
  </div>
)

describe('Employee Leaves Component Testing', () => {
  test('should render employee leaves component without crashing', () => {
    render(toRender, {
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
  mockEmployeesLeaves.employeeSummary.forEach(async (summaryItem) => {
    await waitFor(async () => {
      expect(await screen.findByText(summaryItem.empName)).toHaveTextContent(
        summaryItem.empName,
      )
    })
  })
})
