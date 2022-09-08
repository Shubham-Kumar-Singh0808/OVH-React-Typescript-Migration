import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import TicketReportFilterOptions from './TicketReportFilterOptions'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'
import {
  mockDepartmentNameData,
  mockTicketReportData,
} from '../../../test/data/ticketReportsData'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const mockSetSelectDate = jest.fn()
const mockSetFromDate = jest.fn()
const mockSetToDate = jest.fn()
const mockSelectDepartment = jest.fn()

const departmentSelection = 'dept-select1'

describe('Ticket Reports Filter Options Component Testing', () => {
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
  test('should render date option select field', () => {
    const dateOptionSelect = screen.findByTestId('ticket-selectDate')
    expect(dateOptionSelect).toBeTruthy()
  })
  test('should render department select field', () => {
    const departmentSelect = screen.findByTestId(departmentSelection)
    expect(departmentSelect).toBeTruthy()
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
describe('Ticket Approvals Filter Options Component Testing with data', () => {
  beforeEach(() => {
    render(
      <TicketReportFilterOptions
        selectDate={'Custom'}
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
            departmentNameList: mockDepartmentNameData,
          },
        },
      },
    )
  })
  screen.debug()
  test('should select dropdown value', () => {
    const LeaveTypeSelectListSelector = screen.getByTestId(departmentSelection)
    userEvent.selectOptions(LeaveTypeSelectListSelector, ['Networking'])
    expect(LeaveTypeSelectListSelector).toHaveValue('')
  })
  test('should select Date dropdown value', async () => {
    const dateOption = screen.getByTestId('ticket-selectDate')
    userEvent.selectOptions(dateOption, ['Custom'])
    await waitFor(() => {
      expect(dateOption).toHaveValue('Custom')
    })
  })
  test('should render data upon view button click', async () => {
    const viewButtonElement = screen.getByRole('button', { name: 'View' })
    const fromDatePickerElement = screen.getAllByPlaceholderText('dd/mm/yy')
    fireEvent.click(fromDatePickerElement[0])

    await waitFor(() =>
      fireEvent.change(fromDatePickerElement[0], {
        target: { value: '29 Oct, 2015' },
      }),
    )
    fireEvent.click(fromDatePickerElement[1])
    await waitFor(() =>
      fireEvent.change(fromDatePickerElement[1], {
        target: { value: '10 Feb, 2022' },
      }),
    )
    userEvent.click(viewButtonElement)
    expect(fromDatePickerElement[0]).toHaveValue('')
    expect(fromDatePickerElement[1]).toHaveValue('')
    expect(fromDatePickerElement[1]).toBeInTheDocument()
  })
  test('should clear data upon clear button click', () => {
    const clearButtonElement = screen.getByRole('button', { name: 'Clear' })
    userEvent.click(clearButtonElement)
    const departmentName = screen.getByTestId(departmentSelection)
    const DateElement = screen.getByTestId(departmentSelection)
    expect(departmentName).toHaveValue('')
    expect(DateElement).toHaveValue('')
  })
})
