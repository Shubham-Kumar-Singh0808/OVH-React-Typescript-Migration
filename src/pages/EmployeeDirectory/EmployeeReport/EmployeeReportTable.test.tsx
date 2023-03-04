import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import EmployeeReportTable from './EmployeeReportTable'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'
import { EmployeeReport } from '../../../types/EmployeeDirectory/EmployeeReport/employeeReportTypes'
import { mockEmployeeReport } from '../../../test/data/employeeReportData'

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(screen.getByText(mockEmployeeReport[i].fullName)).toBeInTheDocument()
  }
}

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()
const history = createMemoryHistory()
describe('Employee Report Table Component Testing', () => {
  beforeEach(() => {
    render(
      <Router history={history}>
        <EmployeeReportTable
          paginationRange={[1, 2, 3]}
          currentPage={1}
          setCurrentPage={mockSetCurrentPage}
          pageSize={1}
          setPageSize={mockSetPageSize}
        />
      </Router>,
      {
        preloadedState: {
          employeeReports: {
            employees: mockEmployeeReport as EmployeeReport[],
            listSize: 100,
          },
        },
      },
    )
  })
  test('should render employee report table component without crashing', async () => {
    expectPageSizeToBeRendered(1)

    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])

      expect(mockSetPageSize).toHaveBeenCalledTimes(1)
      expect(mockSetCurrentPage).toHaveBeenCalledTimes(1)
    })
  })
  test('should redirect to My Profile Page', () => {
    const linkElement = screen.getByTestId('employee-profile-link1')
    fireEvent.click(linkElement)

    expect(history.location.pathname).toBe('/employeeProfile/1002')
  })
})
