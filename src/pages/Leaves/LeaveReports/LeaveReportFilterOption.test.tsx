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

const result = mockCreditYearData
  ?.filter((value) => value.yearOfEra.value <= 2022)
  .map((val2) => val2.yearOfEra.value)
const uniqueValue = Array.from(new Set(result))

describe('Leave Reports with data', () => {
  beforeEach(() => {
    render(
      <LeaveReportFilterOption
        selectYear={'2021'}
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
  test('should render search input field', () => {
    const searchComponent = screen.getByTestId('searchInput')
    expect(searchComponent).toBeTruthy()
    const searchInput = screen.findByTestId('searchInput')
    expect(searchInput).toBeTruthy()
  })
  test('should render export button', () => {
    const exportComponent = screen.getByTestId('leaveReportExport-btn')
    expect(exportComponent).toBeTruthy()
    expect(mockSetSelectYear).toHaveBeenCalledTimes(0)
  })
  test('multi search button ', () => {
    const searchInput = screen.getByPlaceholderText('Search Employees')
    expect(screen.getByTestId('search-btn1')).toBeDisabled()
    expect(searchInput).toBeInTheDocument()
    userEvent.type(searchInput, 'test')
    expect(searchInput).toHaveValue('test')
    const searchBtn = screen.getByTestId('search-btn1')
    userEvent.click(searchBtn)
    expect(searchBtn).toBeInTheDocument()
  })
  test('should render search input mouse enter key', () => {
    const searchField = screen.getByTestId('searchInput')
    userEvent.type(searchField, 'testing')
    expect(searchField).toHaveValue('testing')
    fireEvent.keyDown(searchField, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    })
    expect(mockSetSelectYear).toHaveBeenCalledTimes(0)
  })
  test('should render Select year filter', () => {
    const selectYearFilter = screen.findByTestId('leave-form-select2')
    expect(selectYearFilter).toBeTruthy()
  })
  test('should able to select values for options for respective select element', () => {
    uniqueValue.forEach((childFeature) => {
      const selectYear = screen.getByTestId('leave-form-select2')
      expect(selectYear).toHaveLength(0)
    })
  })
})
