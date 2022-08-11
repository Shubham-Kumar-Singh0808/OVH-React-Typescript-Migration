import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import moment from 'moment'
import LeaveApprovalFilterOptions from './LeaveApprovalFilterOptions'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'
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

describe('Leave Approval Filter Options Component Testing', () => {
  beforeEach(() => {
    render(
      <LeaveApprovalFilterOptions
        previousMonthResult={new Date('25/07/2022')}
        currentMonthResult={new Date('24/08/2022')}
      />,
    )
  })
  test('should render labels', () => {
    expect(screen.getByText('From Date:')).toBeInTheDocument()
    expect(screen.getByText('To Date:')).toBeInTheDocument()
    expect(screen.getByText('Team Member:')).toBeInTheDocument()
    expect(screen.getByText('Status:')).toBeInTheDocument()
    expect(screen.getByTestId('sh-view-button')).toBeInTheDocument()
    expect(screen.getByTestId('sh-clear-button')).toBeInTheDocument()
  })
  test('should render from date picker', () => {
    const fromDatePicker = screen.findByTestId('leaveApprovalFromDate')
    expect(fromDatePicker).toBeTruthy()
  })
  test('should render to date picker', () => {
    const toDatePicker = screen.findByTestId('leaveApprovalToDate')
    expect(toDatePicker).toBeTruthy()
  })

  describe('should render scheduled candidates filter options Component with data', () => {
    beforeEach(() => {
      render(
        <LeaveApprovalFilterOptions
          previousMonthResult={previousMonthResult}
          currentMonthResult={currentMonthResult}
        />,
        {
          preloadedState: {
            leaveApprovals: {
              getEmployees: mockEmployeeList,
              filterOptions: {
                isViewBtnClick: false,
                selectStatus: 'PendingApproval',
                selectMember: null,
                filterByFromDate:
                  moment(previousMonthResult).format(commonFormatDate),
                filterByToDate:
                  moment(currentMonthResult).format(commonFormatDate),
              },
            },
          },
        },
      )
    })

    screen.debug()
    test('should clear data upon clear button click', async () => {
      const fromDatePickerElement =
        screen.getAllByPlaceholderText('Select Start Date')
      const toDatePickerElement =
        screen.getAllByPlaceholderText('Select End Date')
      const clearButtonElement = screen.getAllByTestId('sh-clear-button')
      const viewButtonElement = screen.getAllByTestId('sh-view-button')
      const selectStatusElement = screen.getAllByTestId('leaveApprovalStatus')

      fireEvent.click(fromDatePickerElement[0])

      await waitFor(() =>
        fireEvent.change(fromDatePickerElement[0], {
          target: { value: '29 Oct, 2015' },
        }),
      )
      fireEvent.click(toDatePickerElement[0])
      await waitFor(() =>
        fireEvent.change(toDatePickerElement[0], {
          target: { value: '10 Feb, 2022' },
        }),
      )

      userEvent.selectOptions(selectStatusElement[0], ['Approved'])

      expect(fromDatePickerElement[0]).toHaveValue('10/29/2015')
      expect(toDatePickerElement[0]).toHaveValue('2/10/2022')
      userEvent.click(viewButtonElement[0])
      userEvent.click(clearButtonElement[0])
      expect(selectStatusElement[0]).toHaveValue('PendingApproval')
    })
  })
})
