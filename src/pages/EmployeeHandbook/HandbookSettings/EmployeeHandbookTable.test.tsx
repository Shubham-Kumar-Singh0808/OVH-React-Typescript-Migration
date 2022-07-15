import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import EmployeeHandbookTable from './EmployeeHandbookTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import { mockEmployeeHandbookList } from '../../../test/data/employeeHandbookSettingsData'

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(
      screen.getByText(mockEmployeeHandbookList[i].displayOrder),
    ).toBeInTheDocument()
  }
}

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

describe('Employee Handbook Settings', () => {
  beforeEach(() => {
    render(
      <EmployeeHandbookTable
        setCurrentPage={mockSetCurrentPage}
        setPageSize={mockSetPageSize}
        currentPage={1}
        pageSize={20}
        paginationRange={[1, 2, 3]}
      />,
      {
        preloadedState: {
          employeeHandbookSettings: {
            employeeHandbooks: mockEmployeeHandbookList,
          },
        },
      },
    )
  })
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Title' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Page Name' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Display Order' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Country' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeTruthy()
  })
  test('should render correct number of page records', () => {
    // 21 including the heading
    expect(screen.queryAllByRole('row')).toHaveLength(44)
  })
})
describe('Employee Handbook List Table Component Testing', () => {
  test('should render no data to display if table is empty', async () => {
    render(
      <EmployeeHandbookTable
        setCurrentPage={mockSetCurrentPage}
        setPageSize={mockSetPageSize}
        currentPage={1}
        pageSize={20}
        paginationRange={[1, 2, 3]}
      />,
    )
    await waitFor(() => {
      expect(screen.queryByText('No data to display')).toBeInTheDocument()
    })
  })
  test('should render Handbook Settings Table component with out crashing', async () => {
    render(
      <EmployeeHandbookTable
        setCurrentPage={mockSetCurrentPage}
        setPageSize={mockSetPageSize}
        currentPage={1}
        pageSize={20}
        paginationRange={[1, 2, 3]}
      />,
      {
        preloadedState: {
          employeeHandbookSettings: {
            employeeHandbooks: mockEmployeeHandbookList,
            listSize: 45,
          },
        },
      },
    )
    mockEmployeeHandbookList.forEach((handbook) =>
      expect(screen.getAllByText(handbook.displayOrder)).toBeInTheDocument(),
    )

    expectPageSizeToBeRendered(20)
    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])

      expect(mockSetPageSize).toHaveBeenCalledTimes(1)
      expect(mockSetCurrentPage).toHaveBeenCalledTimes(1)
    })
  })
})
