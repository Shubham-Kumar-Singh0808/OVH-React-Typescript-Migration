import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import EmployeeReviewTable from './EmployeeReviewTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import { mockReviewDetails } from '../../../test/data/employeeReviewsData'

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(
      screen.queryByText(mockReviewDetails[i].employeeName),
    ).toBeInTheDocument()
  }
}

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

describe('Employee Reviews Table Component Testing', () => {
  test('should render Reviews Table table component without crashing', async () => {
    render(<EmployeeReviewTable />, {
      preloadedState: {
        employeeReviews: {
          employeeReviews: mockReviewDetails,
        },
      },
    })

    expectPageSizeToBeRendered(20)

    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
      expect(mockSetPageSize).toHaveBeenCalledTimes(0)
      expect(mockSetCurrentPage).toHaveBeenCalledTimes(0)
    })
  })
})
