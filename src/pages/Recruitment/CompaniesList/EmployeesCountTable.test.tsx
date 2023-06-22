import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import EmployeesCountTable from './EmployeesCountTable'
import { render, screen, waitFor } from '../../../test/testUtils'

const mockSetData = jest.fn()

describe('EmployeesCountTable List without data', () => {
  beforeEach(() => {
    render(
      <EmployeesCountTable
        paginationRange={[]}
        currentPage={0}
        setCurrentPage={mockSetData}
        pageSize={0}
        setPageSize={mockSetData}
      />,
    )
  })
  test('should render first page data only', () => {
    waitFor(() => {
      userEvent.click(screen.getByText('Next >', { exact: true }))

      expect(screen.getByText('« First')).not.toHaveAttribute('disabled')
      expect(screen.getByText('< Prev')).not.toHaveAttribute('disabled')
    })
  })

  test('should disable first and prev in pagination if first page', () => {
    waitFor(() => {
      expect(screen.getByText('« First')).toHaveAttribute('disabled')
      expect(screen.getByText('< Prev')).toHaveAttribute('disabled')
      expect(screen.getByText('Next >')).not.toHaveAttribute('disabled')
      expect(screen.getByText('Last »')).not.toHaveAttribute('disabled')
    })
  })
})
