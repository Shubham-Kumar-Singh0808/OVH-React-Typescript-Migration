import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import LeaveReportFilterOption from './LeaveReportFilterOption'
import { fireEvent, render, screen } from '../../../test/testUtils'
import {
  mockCreditYearData,
  mockLeaveReportData,
} from '../../../test/data/LeaveReportData'

const mockSetSelectYear = jest.fn()
const mockHandleExportTicketApprovalList = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <LeaveReportFilterOption
      selectYear={''}
      setSelectYear={mockSetSelectYear}
    />
    ,
  </div>
)
const result = mockCreditYearData
  ?.filter((value) => value.yearOfEra.value <= 2022)
  .map((val2) => val2.yearOfEra.value)
const uniqueValue = Array.from(new Set(result))

describe('LeaveReportFilter Options Component Testing', () => {
  describe('Filter Options component without value', () => {
    beforeEach(() => {
      render(toRender)
    })

    test('should render labels', () => {
      expect(screen.getByText('Select Year:')).toBeInTheDocument()
    })
    test('should render Select year filter', () => {
      const selectYearFilter = screen.findByTestId('leave-form-select2')
      expect(selectYearFilter).toBeTruthy()
    })

    test('should render search input field', () => {
      const searchComponent = screen.getByTestId('searchField')
      expect(searchComponent).toBeTruthy()
      const searchInput = screen.findByTestId('searchInput')
      expect(searchInput).toBeTruthy()
    })
    test('multi search button should enable only if we enter the value', () => {
      expect(screen.getByTestId('search-btn1')).not.toBeEnabled()
      userEvent.type(screen.getByPlaceholderText('Search Employees'), 'Java')
      expect(screen.getByTestId('search-btn1')).toBeEnabled()
    })
    test('should able to click "click to to export" button', () => {
      const exportBtn = screen.getByRole('button', { name: 'Click to Export' })
      userEvent.click(exportBtn)
      expect(mockHandleExportTicketApprovalList).toHaveBeenCalledTimes(0)
    })
  })
})

describe('Ticket Report Filter Option Component Testing', () => {
  beforeEach(() => {
    render(
      <LeaveReportFilterOption
        selectYear={''}
        setSelectYear={mockSetSelectYear}
      />,
      {
        preloadedState: {
          leaveReport: {
            selectFinancialYear: mockCreditYearData,
            leaveSummaries: mockLeaveReportData,
          },
        },
      },
    )
  })
  test('should render Leave Summary Component without crashing', () => {
    uniqueValue.forEach((childFeature) => {
      const timeStamp = screen.getByTestId('leave-form-select2')
      expect(timeStamp).toHaveLength(0)
    })
  })

  test('should render search input mouse enter key', () => {
    const searchField = screen.getByTestId('searchInput')
    userEvent.type(searchField, 'testing')
    fireEvent.keyDown(searchField, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    })
    expect(searchField).toHaveValue('testing')
  })
})
