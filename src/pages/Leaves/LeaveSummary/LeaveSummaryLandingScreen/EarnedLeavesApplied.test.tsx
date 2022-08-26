import '@testing-library/jest-dom'
import React from 'react'
import EarnedLeavesApplied from './EarnedLeavesApplied'
import { render, screen } from '../../../../test/testUtils'
import { mockLeaveSummary } from '../../../../test/data/leaveSummaryData'

describe('Leave Summary Component Testing', () => {
  test('should render Leave Summary Component without crashing', () => {
    render(<EarnedLeavesApplied />, {
      preloadedState: {
        employeeLeaveSummary: {
          employeeLeaveSummary: mockLeaveSummary,
        },
      },
    })
    expect(screen.getByText('Casual')).toBeInTheDocument()
    expect(screen.getByText('PAID')).toBeInTheDocument()
  })
})
