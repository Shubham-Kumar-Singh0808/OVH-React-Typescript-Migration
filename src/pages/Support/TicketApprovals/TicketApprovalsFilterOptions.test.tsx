import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import TicketApprovalsFilterOptions from './TicketApprovalsFilterOptions'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'
import {
  mockAllLookUps,
  mockAllTicketApprovals,
  mockCategoryList,
  mockDepartmentNamesList,
  mockSubCategoryList,
  mockTrackerList,
} from '../../../test/data/ticketApprovalsData'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const mockSetDeptId = jest.fn()
const mockSetTicketApprovalParams = jest.fn()
const mockSetCategoryId = jest.fn()
const mockSetSubCategoryIdValue = jest.fn()
const mockHandleExportTicketApprovalList = jest.fn()

const searchInputElement = 'multi-search-input'

const mockInitialState = {
  categoryId: undefined,
  dateSelection: 'Today',
  departmentId: undefined,
  endIndex: 20,
  fromDate: '',
  multiSearch: '',
  progressStatus: 'New',
  searchByAssigneeName: false,
  searchByEmpName: false,
  startIndex: 0,
  subCategoryId: undefined,
  ticketStatus: 'Pending Approval',
  toDate: '',
  trackerID: undefined,
}

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <TicketApprovalsFilterOptions
      setTicketApprovalParams={mockSetTicketApprovalParams}
      deptId={9}
      setDeptId={mockSetDeptId}
      categoryId={5}
      setCategoryId={mockSetCategoryId}
      subCategoryIdValue={12}
      setSubCategoryIdValue={mockSetSubCategoryIdValue}
      initialState={mockInitialState}
      handleExportTicketApprovalList={mockHandleExportTicketApprovalList}
      ticketFromDate={''}
      setTicketFromDate={mockSetCategoryId}
      ticketToDate={''}
      setTicketToDate={mockSetCategoryId}
    />
  </div>
)
describe('Ticket Approvals Filter Options Component Testing', () => {
  beforeEach(() => {
    render(toRender)
  })
  test('should render ticket status filter', () => {
    const ticketStatus = screen.findByTestId('ticketStatus')
    expect(ticketStatus).toBeTruthy()
  })
  test('should render approval status filter', () => {
    const approvalStatus = screen.findByTestId('approvalStatus')
    expect(approvalStatus).toBeTruthy()
  })
  test('should render category name select filter', () => {
    const categoryNameSelect = screen.findByTestId('categoryNameSelect')
    expect(categoryNameSelect).toBeTruthy()
  })
  test('should render date option select field', () => {
    const dateOptionSelect = screen.findByTestId('dateOptionSelect')
    expect(dateOptionSelect).toBeTruthy()
  })
  test('should render tracker select field', () => {
    const trackerSelect = screen.findByTestId('trackerSelect')
    expect(trackerSelect).toBeTruthy()
  })
  test('should render search input', () => {
    const searchField = screen.findByTestId(searchInputElement)
    expect(searchField).toBeTruthy()
  })
})

describe('Ticket Approvals Filter Options Component Testing with data', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        ticketApprovals: {
          isLoading: ApiLoadingState.succeeded,
          departmentNameList: mockDepartmentNamesList,
          trackerList: mockTrackerList,
          departmentCategoryList: mockCategoryList,
          subCategoryList: mockSubCategoryList,
          ticketsForApproval: mockAllTicketApprovals,
          getAllLookUps: mockAllLookUps,
        },
        authentication: {
          authenticatedUser: {
            employeeName: 'venkata',
            employeeId: 1978,
            userName: 'venkata kolla',
            role: 'admin',
          },
        },
      },
    })
  })
  screen.debug()
  test('should able to select values for options for respective select element', async () => {
    const ticketStatus = screen.getByTestId('ticketStatus')
    userEvent.selectOptions(ticketStatus, ['All'])
    expect(ticketStatus).toHaveValue('All')

    const approvalStatus = screen.getByTestId('approvalStatus')
    userEvent.selectOptions(approvalStatus, ['All'])
    expect(ticketStatus).toHaveValue('All')

    const categoryName = screen.getByTestId('categoryNameSelect')
    userEvent.selectOptions(categoryName, ['Access'])
    expect(categoryName).toHaveValue('5')

    const dateOption = screen.getByTestId('dateOptionSelect')
    userEvent.selectOptions(dateOption, ['Custom'])
    expect(dateOption).toHaveValue('Custom')

    const trackerSelect = screen.getByTestId('trackerSelect')
    userEvent.selectOptions(trackerSelect, ['Issue'])
    expect(trackerSelect).toHaveValue('1')

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
    expect(datePickers[0]).toHaveValue('')
    expect(datePickers[1]).toHaveValue('')

    const viewBtnElement = screen.getByRole('button', { name: 'View' })
    userEvent.click(viewBtnElement)
    expect(mockSetTicketApprovalParams).toHaveBeenCalledTimes(0)
  })

  test('should enable search button upon providing search value', () => {
    const assigneeNameCheckbox = screen.getByTestId('searchByAssigneeName')
    userEvent.click(assigneeNameCheckbox)
    expect(assigneeNameCheckbox).toBeChecked()

    const employeeNameCheckbox = screen.getByTestId('searchByEmployeeName')
    userEvent.click(employeeNameCheckbox)
    expect(employeeNameCheckbox).toBeChecked()

    const searchField = screen.getByTestId(searchInputElement)
    userEvent.type(searchField, 'abc')
    expect(searchField).toHaveValue('abc')

    const searchBtn = screen.getByTestId('multi-search-btn')
    userEvent.click(searchBtn)
    expect(mockSetTicketApprovalParams).toHaveBeenCalledTimes(1)
  })

  test('should render search input', () => {
    const searchField = screen.getByTestId(searchInputElement)
    userEvent.type(searchField, 'testing')
    expect(searchField).toHaveValue('testing')
    fireEvent.keyDown(searchField, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    })
    expect(mockSetTicketApprovalParams).toHaveBeenCalledTimes(1)
  })

  test('should clear search input field elements after clean button click', () => {
    const clearBtn = screen.getByRole('button', { name: 'Clear' })
    const searchField = screen.getByTestId(searchInputElement)
    userEvent.type(searchField, 'kumar')
    userEvent.click(clearBtn)
    expect(searchField).toHaveValue('')
  })

  test('should able to click "click to to export" button', () => {
    const exportBtn = screen.getByRole('button', { name: 'Click to Export' })
    userEvent.click(exportBtn)
    expect(mockHandleExportTicketApprovalList).toHaveBeenCalledTimes(1)
  })
})
