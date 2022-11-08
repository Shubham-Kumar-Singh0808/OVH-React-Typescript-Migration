import '@testing-library/jest-dom'
import React from 'react'
import EmployeeEarnedLeaves from './EmployeeEarnedLeaves'
import { render, screen } from '../../../test/testUtils'
import { mockLeaveSummary } from '../../../test/data/leaveSummaryData'

describe('Earned Leaves Component Testing', () => {
  beforeEach(() => {
    render(<EmployeeEarnedLeaves />, {
      preloadedState: {
        earnedLeaves: {
          financialYear: 2022,
        },
        employeeLeaveSummary: {
          employeeLeaveSummary: mockLeaveSummary,
        },
      },
    })
  })
  test('should render `Earned Leaves` title', () => {
    expect(screen.getByText('Earned Leaves')).toBeInTheDocument()
  })
  test('should render `Financial Year`...', () => {
    expect(screen.getByText('2022')).toBeInTheDocument()
  })
  test('should render Employee `Approved Leaves and Remaining Leaves`...', () => {
    expect(screen.getByText('10 / 5')).toBeInTheDocument()
  })
})
