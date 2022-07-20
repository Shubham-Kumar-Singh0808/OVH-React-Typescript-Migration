/* eslint-disable sonarjs/no-duplicate-string */
import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import EmployeeDesignationReportTable from './EmployeeDesignationReportTable'
import { render, screen, waitFor } from '../../../../test/testUtils'
import { EmployeeDesignation } from '../../../../types/EmployeeDirectory/EmployeeReport/EmployeeDesignationReport/employeeDesignationReportTypes'
import {
  mockDesignation,
  mockEmpDesignationReport,
} from '../../../../test/data/employeeDesignationReportData'

const mockSetDesignation = jest.fn()
const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(
      screen.getByText(mockEmpDesignationReport[i].fullName),
    ).toBeInTheDocument()
  }
}

describe('Employee Designation Report Table Component Testing', () => {
  describe('Filter Options without value', () => {
    beforeEach(() => {
      render(
        <EmployeeDesignationReportTable
          designation={''}
          setDesignation={jest.fn()}
          paginationRange={[1, 2, 3]}
          currentPage={1}
          setCurrentPage={mockSetCurrentPage}
          pageSize={1}
          setPageSize={mockSetPageSize}
        />,
      )
    })

    test('should render labels', () => {
      expect(screen.getByText('Designation:')).toBeInTheDocument()
    })
    test('should render designation dropdown', () => {
      const designationDropdown = screen.findByTestId('designationFilter')
      expect(designationDropdown).toBeTruthy()
    })
    test('should render back button', () => {
      const backBtn = screen.findByTestId('backBtn')
      expect(backBtn).toBeTruthy()
    })
    test('should render back button', () => {
      const exportBtn = screen.findByTestId('exportBtn')
      expect(exportBtn).toBeTruthy()
    })
  })

  describe('Filter Options component with value', () => {
    test('should render designatioon field without crashing', async () => {
      render(
        <EmployeeDesignationReportTable
          designation={'Software Engineer'}
          setDesignation={mockSetDesignation}
          paginationRange={[1, 2, 3]}
          currentPage={1}
          setCurrentPage={mockSetCurrentPage}
          pageSize={1}
          setPageSize={mockSetPageSize}
        />,
        {
          preloadedState: {
            employeeDesignationReports: {
              isLoading: false,
              getAllDesignation: mockDesignation,
              selectedDesignation: 'Software Engineer',
              empDesignation: mockEmpDesignationReport as EmployeeDesignation[],
              listSize: 33,
            },
          },
        },
      )

      const designationDropdown = screen.getByTestId('designationSelect')
      userEvent.selectOptions(designationDropdown, ['Software Engineer'])
      expect(mockSetDesignation).toBeCalledWith('Software Engineer')

      await waitFor(() => {
        userEvent.selectOptions(screen.getByTestId('paginationTestID'), ['40'])
        expect(screen.getByText('Raju Sriramoju')).toBeInTheDocument()
        expect(designationDropdown).toBeInTheDocument()

        expectPageSizeToBeRendered(1)
        expect(mockSetPageSize).toHaveBeenCalledTimes(1)
        expect(mockSetCurrentPage).toHaveBeenCalledTimes(1)
      })
    })

    const history = createMemoryHistory()
    test('should render back button', async () => {
      render(
        <Router history={history}>
          <EmployeeDesignationReportTable
            designation={''}
            setDesignation={mockSetDesignation}
            paginationRange={[1, 2, 3]}
            currentPage={1}
            setCurrentPage={mockSetCurrentPage}
            pageSize={1}
            setPageSize={mockSetPageSize}
          />
          ,
        </Router>,
      )

      userEvent.click(screen.getByTestId('backButton'))

      await waitFor(() => {
        expect(history.location.pathname).toBe('/')
      })
    })
  })
})
