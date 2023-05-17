import React from 'react'
import ManufacturerListTable from './ManufacturerListTable'
import { render, screen } from '../../../test/testUtils'

// Mock the redux store and dependencies as needed

describe('Manufacturer Component Testing', () => {
  test('renders ManufacturerListTable component', () => {
    const paginationRange = [1, 2, 3]
    const setPageSize = jest.fn()
    const setCurrentPage = jest.fn()
    const currentPage = 1
    const pageSize = 20

    render(
      <ManufacturerListTable
        paginationRange={paginationRange}
        setPageSize={setPageSize}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        pageSize={pageSize}
      />,
    )

    expect(screen.getByText('Manufacturer Name')).toBeInTheDocument()
  })
})
