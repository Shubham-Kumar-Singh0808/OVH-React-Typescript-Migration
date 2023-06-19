import '@testing-library/jest-dom'
import React from 'react'
import ReviewListTable from './ReviewListTable'
import { cleanup, render, screen } from '../../../test/testUtils'

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()
describe('Review List Table Component Testing without data', () => {
  beforeEach(() => {
    render(
      <ReviewListTable
        paginationRange={[1, 2, 3]}
        currentPage={1}
        setCurrentPage={mockSetCurrentPage}
        pageSize={20}
        setPageSize={mockSetPageSize}
        isTableView={true}
      />,
    )
  })
  afterEach(cleanup)
  test('should render the "Review List" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'ID' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Employee Name' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Manager Name' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Department' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Designation' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Month' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Emp Avg Rating' }),
    ).toBeTruthy()
  })
})
