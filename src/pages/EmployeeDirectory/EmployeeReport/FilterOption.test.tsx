import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import FilterOptions from './FilterOptions'
import { render, screen, waitFor } from '../../../test/testUtils'
import { EmploymentStatus } from '../../../types/EmployeeDirectory/EmployeeReport/employeeReportTypes'
import { mockCountries } from '../../../test/data/employeeReportData'

const mockSetCategory = jest.fn()
const mockSetCountry = jest.fn()
const mockSetSearchInput = jest.fn()

describe('Fitler Options Component Testing', () => {
  describe('Filter Options component without value', () => {
    beforeEach(() => {
      render(
        <FilterOptions
          category={''}
          setCategory={mockSetCategory}
          country={''}
          setCountry={mockSetCountry}
          searchInput={''}
          setSearchInput={mockSetSearchInput}
          setCurrentPage={mockSetSearchInput}
          pageSize={0}
          currentPage={0}
          setPageSize={mockSetSearchInput}
        />,
      )
    })

    test('should render labels', () => {
      expect(screen.getByText('Select:')).toBeInTheDocument()
      expect(screen.getByText('Country:')).toBeInTheDocument()
      expect(screen.getByText('Employee Designation info')).toBeInTheDocument()
    })
    test('should render active status filter', () => {
      const activeStatus = screen.findByTestId('activeFilterStatus')
      expect(activeStatus).toBeTruthy()
    })
    test('should render inactive status filter', () => {
      const inactiveStatus = screen.findByTestId('inactiveFilterStatus')
      expect(inactiveStatus).toBeTruthy()
    })
    test('should render category filter', () => {
      const categoryFilter = screen.findByTestId('categoryFilter')
      expect(categoryFilter).toBeTruthy()
    })
    test('should render country filter', () => {
      const countryFilter = screen.findByTestId('countryFilter')
      expect(countryFilter).toBeTruthy()
    })
    test('should render designation button', () => {
      const designationLink = screen.findByTestId('designationLinkButton')
      expect(designationLink).toBeTruthy()
    })
    test('should render search input field', () => {
      const searchComponent = screen.getByTestId('searchField')
      expect(searchComponent).toBeTruthy()
      const searchInput = screen.findByTestId('searchInput')
      expect(searchInput).toBeTruthy()
    })
    test('should render search button', () => {
      const searchBtn = screen.findByTestId('search-btn1')
      expect(searchBtn).toBeTruthy()
    })
  })

  describe('Filter Options component with value', () => {
    beforeEach(() => {
      render(
        <FilterOptions
          category={''}
          setCategory={mockSetCategory}
          country={''}
          setCountry={mockSetCountry}
          searchInput={'test'}
          setSearchInput={mockSetSearchInput}
          setCurrentPage={mockSetSearchInput}
          pageSize={0}
          currentPage={0}
          setPageSize={mockSetSearchInput}
        />,
      )
    })

    test('should render fields', async () => {
      const activeRadio = screen.getByRole('radio', {
        name: EmploymentStatus.active,
      }) as HTMLInputElement

      expect(activeRadio.checked).toEqual(true)

      const inactiveRadio = screen.getByRole('radio', {
        name: 'Inactive',
      }) as HTMLInputElement

      const categoryDropdown = screen.getByTestId('form-select1')
      userEvent.selectOptions(categoryDropdown, ['Home'])
      expect(categoryDropdown).toBeInTheDocument()

      const searchInput = screen.getByTestId('searchInput')
      expect(searchInput).toBeInTheDocument()
      userEvent.type(searchInput, 'test')
      expect(searchInput).toHaveValue('test')
      const searchBtn = screen.getByTestId('search-btn1')
      expect(searchBtn).toBeInTheDocument()

      await waitFor(() => {
        userEvent.click(inactiveRadio)
        expect(activeRadio.checked).toEqual(false)
        expect(inactiveRadio.checked).toEqual(true)
        expect(mockSetCategory).toBeCalledWith('Home')
      })
    })
  })

  describe('Country Field', () => {
    test('should render country field without crashing', () => {
      render(
        <FilterOptions
          category={''}
          setCategory={mockSetCategory}
          country={'1'}
          setCountry={mockSetCountry}
          searchInput={''}
          setSearchInput={mockSetSearchInput}
          setCurrentPage={mockSetSearchInput}
          pageSize={0}
          currentPage={0}
          setPageSize={mockSetSearchInput}
        />,
        {
          preloadedState: {
            employeeReports: {
              country: mockCountries,
            },
          },
        },
      )

      const countryDropdown = screen.getByTestId('form-select2')
      userEvent.selectOptions(countryDropdown, ['1'])
      expect(mockSetCountry).toBeCalledWith('1')
      expect(countryDropdown).toBeInTheDocument()
    })
  })
})
