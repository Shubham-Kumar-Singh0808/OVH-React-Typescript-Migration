import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import EmployeeListTable from './EmployeeListTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import { Employee } from '../../../types/EmployeeDirectory/EmployeesList/employeeListTypes'
import { mockEmployeeList } from '../../../test/data/employeeListData'

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(screen.getByText(mockEmployeeList[i].fullName)).toBeInTheDocument()
  }
}

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

describe('Employee List Table Component Testing', () => {
  test('should render Personal info tab component with out crashing', async () => {
    render(
      <EmployeeListTable
        setCurrentPage={mockSetCurrentPage}
        setPageSize={mockSetPageSize}
        currentPage={1}
        pageSize={20}
        paginationRange={[1, 2, 3]}
      />,
      {
        preloadedState: {
          employeeList: {
            employees: mockEmployeeList as Employee[],
            listSize: 183,
          },
        },
      },
    )

    expectPageSizeToBeRendered(20)

    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])

      //   const pageSizeSelect = screen.getByRole('option', {
      //     name: '40',
      //   }) as HTMLOptionElement
      //   expect(pageSizeSelect.selected).toBe(true)

      expect(mockSetPageSize).toHaveBeenCalledTimes(1)
      expect(mockSetCurrentPage).toHaveBeenCalledTimes(1)
    })
  })

  test('should be able to see table action header if updateaccess is true', () => {
    render(
      <EmployeeListTable
        setCurrentPage={mockSetCurrentPage}
        setPageSize={mockSetPageSize}
        currentPage={1}
        pageSize={20}
        paginationRange={[1, 2, 3]}
        updateaccess={true}
      />,
      {
        preloadedState: {
          employeeList: {
            employees: mockEmployeeList as Employee[],
            listSize: 183,
          },
        },
      },
    )

    expect(screen.getByTestId('action-header')).toBeInTheDocument()
  })

  test('should not be able to see table action header if updateaccess is false', () => {
    render(
      <EmployeeListTable
        setCurrentPage={mockSetCurrentPage}
        setPageSize={mockSetPageSize}
        currentPage={1}
        pageSize={20}
        paginationRange={[1, 2, 3]}
        updateaccess={false}
      />,
      {
        preloadedState: {
          employeeList: {
            employees: mockEmployeeList as Employee[],
            listSize: 183,
          },
        },
      },
    )

    expect(screen.getByTestId('no-action-header')).toBeInTheDocument()
  })

  test('should be able to see table action cell if updateaccess is true', () => {
    render(
      <EmployeeListTable
        setCurrentPage={mockSetCurrentPage}
        setPageSize={mockSetPageSize}
        currentPage={1}
        pageSize={20}
        paginationRange={[1, 2, 3]}
        updateaccess={true}
      />,
      {
        preloadedState: {
          employeeList: {
            employees: mockEmployeeList as Employee[],
            listSize: 183,
          },
        },
      },
    )

    expect(screen.getAllByTestId('action-cell')).toBeInTheDocument()
  })

  test('should not be able to see table action cell if updateaccess is false', () => {
    render(
      <EmployeeListTable
        setCurrentPage={mockSetCurrentPage}
        setPageSize={mockSetPageSize}
        currentPage={1}
        pageSize={20}
        paginationRange={[1, 2, 3]}
        updateaccess={false}
      />,
      {
        preloadedState: {
          employeeList: {
            employees: mockEmployeeList as Employee[],
            listSize: 183,
          },
        },
      },
    )

    expect(screen.getAllByTestId('no-action-cell')).toBeInTheDocument()
  })
})
