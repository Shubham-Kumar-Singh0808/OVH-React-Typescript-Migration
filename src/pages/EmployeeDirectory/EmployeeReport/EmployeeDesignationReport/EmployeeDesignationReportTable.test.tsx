import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import EmployeeDesignationReportTable from './EmployeeDesignationReportTable'

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

describe('Employee Designation Report Table Component Testing', () => {
  test('should render employee designation report table component without crashing', () => {
    render(
      <EmployeeDesignationReportTable
        paginationRange={[1, 2, 3]}
        currentPage={1}
        setCurrentPage={mockSetCurrentPage}
        pageSize={1}
        setPageSize={mockSetPageSize}
      />,
    )
  })
})
