import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import TicketReportFilterOptions from './TicketReportFilterOptions'
import { render, screen } from '../../../test/testUtils'
import {
  mockDepartmentNameData,
  mockTicketReportData,
} from '../../../test/data/ticketReportsData'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const mockSetSelectDate = jest.fn()
const mockSetFromDate = jest.fn()
const mockSetToDate = jest.fn()
const mockSelectDepartment = jest.fn()
const selectDate = 'Current Month'
describe('Ticket Report Component Testing', () => {
  describe('without data', () => {
    beforeEach(() => {
      render(
        <TicketReportFilterOptions
          selectDate={''}
          fromDate={''}
          toDate={''}
          selectDepartment={''}
          setSelectDate={mockSetSelectDate}
          setFromDate={mockSetFromDate}
          setToDate={mockSetToDate}
          setSelectDepartment={mockSelectDepartment}
        />,
      )
    })
    test('should be able to render Ticket Report without crashing', () => {
      screen.debug()
    })

    test('should select Date dropdown value', () => {
      const LeaveTypeSelectListSelector = screen.getByTestId('form-select3')
      userEvent.selectOptions(LeaveTypeSelectListSelector, [selectDate])
      expect(LeaveTypeSelectListSelector).toHaveValue(selectDate)
    })
    test('should render clear button', () => {
      const clearButton = screen.getByTestId('clear-btn')
      expect(clearButton).toBeEnabled()
    })
    test('should render date picker', () => {
      const dateInput = screen.findByTestId('ticketReportFromDate')
      expect(dateInput).toBeTruthy()
    })
  })
})
describe('Ticket Details component with data', () => {
  beforeEach(() => {
    render(
      <TicketReportFilterOptions
        selectDate={''}
        fromDate={''}
        toDate={''}
        selectDepartment={''}
        setSelectDate={mockSetSelectDate}
        setFromDate={mockSetFromDate}
        setToDate={mockSetToDate}
        setSelectDepartment={mockSelectDepartment}
      />,
      {
        preloadedState: {
          ticketReport: {
            departmentNameList: mockDepartmentNameData,
          },
        },
      },
    )
  })

  test('should select dropdown value', () => {
    const LeaveTypeSelectListSelector = screen.getByTestId('form-select1')
    userEvent.selectOptions(LeaveTypeSelectListSelector, ['Networking'])
    expect(LeaveTypeSelectListSelector).toHaveValue('')
  })
})

describe('Ticket Report component with data', () => {
  beforeEach(() => {
    render(
      <TicketReportFilterOptions
        selectDate={''}
        fromDate={''}
        toDate={''}
        selectDepartment={''}
        setSelectDate={mockSetSelectDate}
        setFromDate={mockSetFromDate}
        setToDate={mockSetToDate}
        setSelectDepartment={mockSelectDepartment}
      />,
      {
        preloadedState: {
          ticketReport: {
            isLoading: ApiLoadingState.succeeded,
            ticketsReportList: mockTicketReportData,
          },
        },
      },
    )
  })
  test('should clear data upon clear button click', () => {
    const clearButtonElement = screen.getByRole('button', { name: 'Clear' })
    userEvent.click(clearButtonElement)
    const departmentName = screen.getByTestId('form-select1')
    const DateElement = screen.getByTestId('form-select3')
    expect(departmentName).toHaveValue('')
    expect(DateElement).toHaveValue('Current Month')
  })
})
