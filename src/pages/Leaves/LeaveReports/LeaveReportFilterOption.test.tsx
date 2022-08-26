import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import LeaveReportFilterOption from './LeaveReportFilterOption'
import { render, screen } from '../../../test/testUtils'
import { mockCreditYearData } from '../../../test/data/LeaveReportData'

const mockSetSelectYear = jest.fn()

describe('LeaveReportFilter Options Component Testing', () => {
  describe('Filter Options component without value', () => {
    beforeEach(() => {
      render(
        <LeaveReportFilterOption
          selectYear={''}
          setSelectYear={mockSetSelectYear}
        />,
      )
    })

    test('should render labels', () => {
      expect(screen.getByText('Select Year:')).toBeInTheDocument()
    })
    test('should render Select year filter', () => {
      const selectYearFilter = screen.findByTestId('form-select2')
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
  })
  describe('LeaveType component with data', () => {
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
            },
          },
        },
      )
    })
    test('should select dropdown value', () => {
      const LeaveReportSelector = screen.getByTestId('form-select2')
      userEvent?.selectOptions(LeaveReportSelector, ['2022'])
      expect(LeaveReportSelector).toHaveValue('2022')
    })
  })
})
