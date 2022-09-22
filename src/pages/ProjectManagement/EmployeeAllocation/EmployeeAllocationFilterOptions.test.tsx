import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import EmployeeAllocationFilterOptions from './EmployeeAllocationFilterOptions'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'
import { mockEmployeeAllocationReport } from '../../../test/data/employeeAllocationReportData'
import { mockAllTechnology } from '../../../test/data/certificateTypeData'

const mockSetSelect = jest.fn()
const mockSetTicketApprovalParams = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <EmployeeAllocationFilterOptions
      Select={'Custom'}
      setSelect={mockSetSelect}
    />
  </div>
)
describe('Employee Allocation Filter Options Component Testing', () => {
  beforeEach(() => {
    render(toRender)
  })
  test('should render select date filter', () => {
    const selectDate = screen.findByTestId('form-select1')
    expect(selectDate).toBeTruthy()
  })
  test('should render Employee Billing Status filter', () => {
    const billingStatus = screen.findByTestId('form-select2')
    expect(billingStatus).toBeTruthy()
  })
  test('should render Allocation Status filter', () => {
    const allocationStatus = screen.findByTestId('form-select3')
    expect(allocationStatus).toBeTruthy()
  })
  test('should render date option select field', () => {
    const dateOptionSelect = screen.findByTestId('date-picker')
    expect(dateOptionSelect).toBeTruthy()
  })
  test('should render tracker select field', () => {
    const trackerSelect = screen.findByTestId('technology-select1')
    expect(trackerSelect).toBeTruthy()
  })
})

describe('Employee allocation Filter Options Component Testing with data', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        employeeAllocationReport: {
          employeeAllocationReportType: mockEmployeeAllocationReport,
          getAllTechnologies: mockAllTechnology,
        },
      },
    })
  })
  screen.debug()
  test('should able to select values for options for respective select element', async () => {
    const ticketStatus = screen.getByTestId('form-select1')
    userEvent.selectOptions(ticketStatus, ['Custom'])
    expect(ticketStatus).toHaveValue('Custom')

    const approvalStatus = screen.getByTestId('form-select2')
    userEvent.selectOptions(approvalStatus, ['Billable'])
    expect(ticketStatus).toHaveValue('Custom')

    const categoryName = screen.getByTestId('form-select3')
    userEvent.selectOptions(categoryName, ['Allocated'])
    expect(categoryName).toHaveValue('true')

    const technology = screen.getByTestId('technology-select1')
    userEvent.selectOptions(technology, [''])
    expect(technology).toHaveValue('')

    const datePickers = screen.getAllByPlaceholderText('dd/mm/yy')
    fireEvent.click(datePickers[0])

    await waitFor(() =>
      fireEvent.change(datePickers[0], {
        target: { value: '29 Oct, 2019' },
      }),
    )
    fireEvent.click(datePickers[1])
    await waitFor(() =>
      fireEvent.change(datePickers[1], {
        target: { value: '10 Jan, 2022' },
      }),
    )
    expect(datePickers[0]).toHaveValue('10/29/2019')
    expect(datePickers[1]).toHaveValue('1/10/2022')
    const viewBtnElement = screen.getByRole('button', { name: 'View' })
    userEvent.click(viewBtnElement)
    expect(mockSetTicketApprovalParams).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByTestId('clear-btn'))
    userEvent.selectOptions(approvalStatus, ['All'])
    userEvent.selectOptions(ticketStatus, ['Custom'])
    userEvent.selectOptions(categoryName, ['true'])
    expect(datePickers[0]).toHaveValue('')
    expect(datePickers[1]).toHaveValue('')
  })
  test('should render ticket approval search filter options component with out crashing', () => {
    const searchInput = screen.getByTestId('search-input')
    userEvent.type(searchInput, 'vinesh')
    expect(searchInput).toHaveValue('vinesh')
    expect(searchInput).toBeInTheDocument()
  })
})
