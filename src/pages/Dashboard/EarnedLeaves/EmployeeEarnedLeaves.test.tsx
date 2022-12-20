import '@testing-library/jest-dom'
import React from 'react'
import EmployeeEarnedLeaves from './EmployeeEarnedLeaves'
import { render, screen } from '../../../test/testUtils'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'
import { mockLeaveSummary } from '../../../test/data/earnedLeavesData'

describe('Earned Leaves Component Testing', () => {
  beforeEach(() => {
    render(<EmployeeEarnedLeaves />, {
      preloadedState: {
        earnedLeaves: {
          financialYear: 2022,
          leaveSummary: mockLeaveSummary,
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
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
