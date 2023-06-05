import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import EmployeeListTable from './EmployeeListTable'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'
import { Employee } from '../../../types/EmployeeDirectory/EmployeesList/employeeListTypes'
import { mockEmployeeList } from '../../../test/data/employeeListData'

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(screen.getByText(mockEmployeeList[i].fullName)).toBeInTheDocument()
  }
}

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

const history = createMemoryHistory()
describe('Employee List Table Component Testing', () => {
  beforeEach(() => {
    render(
      <Router history={history}>
        <EmployeeListTable
          setCurrentPage={mockSetCurrentPage}
          setPageSize={mockSetPageSize}
          currentPage={1}
          pageSize={20}
          paginationRange={[1, 2, 3]}
        />
      </Router>,
      {
        preloadedState: {
          employeeList: {
            employees: mockEmployeeList as Employee[],
            listSize: 183,
          },
        },
      },
    )
  })
  test('should render EmployeeList Table component without crashing', async () => {
    expectPageSizeToBeRendered(20)

    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
      expect(mockSetPageSize).toHaveBeenCalledTimes(1)
      expect(mockSetCurrentPage).toHaveBeenCalledTimes(1)
    })
  })

  test('should redirect to My Profile Page', () => {
    const linkElement = screen.getByTestId('employee-profile-link2')
    fireEvent.click(linkElement)

    expect(history.location.pathname).toBe('/employeeProfile/1004')
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

    expect(screen.getAllByTestId('no-action-header')[0]).toBeInTheDocument()
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

    const actionCell = screen.getAllByTestId('action-cell')

    expect(actionCell[0]).toBeInTheDocument()
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

    const actionCell = screen.getAllByTestId('no-action-cell')
    expect(actionCell[0]).toBeInTheDocument()
  })
})
