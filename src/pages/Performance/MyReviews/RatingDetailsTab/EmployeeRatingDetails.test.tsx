import '@testing-library/jest-dom'
import React from 'react'
import EmployeeRatingDetails from './EmployeeRatingDetails'
import { render, screen } from '../../../../test/testUtils'
import { mockReviewPageData } from '../../../../test/data/myReviewData'

describe('Ticket Configuration Component Testing', () => {
  beforeEach(() => {
    render(<EmployeeRatingDetails />, {
      preloadedState: {
        myReview: {
          pageDetails: mockReviewPageData,
        },
      },
    })
  })
  test('should render Rating Details Tab without crashing', () => {
    expect(screen.getByText('Performance Reviews')).toBeInTheDocument()
    expect(screen.getByText('Monthly Review')).toBeInTheDocument()
    expect(screen.getByText('Annual Review')).toBeInTheDocument()
  })
  test('should render the "Performance Review" table ', () => {
    const table = screen.getAllByRole('table')
    expect(table[0]).toBeTruthy()
  })
  test('should render link attribute that navigates to hive.raybiztech.com upon clicking the link', () => {
    const linkEl = screen.getByRole('link', {
      name: 'https://hive.raybiztech.com/documents/785',
    })
    expect(linkEl.getAttribute('href')).toBe(
      'https://hive.raybiztech.com/documents/785',
    )
  })
})
