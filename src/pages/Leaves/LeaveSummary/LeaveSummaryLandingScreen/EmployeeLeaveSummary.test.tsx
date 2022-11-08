import '@testing-library/jest-dom'
import React from 'react'
import EmployeeLeaveSummary from './EmployeeLeaveSummary'
import { render, screen } from '../../../../test/testUtils'
import { mockLeaveSummary } from '../../../../test/data/leaveSummaryData'
import { mockLeaveHistory } from '../../../../test/data/leaveHistoryData'

// const toRender = (
//   <div>
//     <div id="backdrop-root"></div>
//     <div id="overlay-root"></div>
//     <div id="root"></div>
//     <EmployeeLeaveSummary />
//   </div>
// )

describe('Leave Summary Component Testing', () => {
  beforeEach(() => {
    render(<EmployeeLeaveSummary />, {
      preloadedState: {
        employeeLeaveSummary: {
          employeeLeaveSummary: mockLeaveSummary,
          employeeLeaveHistory: mockLeaveHistory,
        },
      },
    })
  })
  test('should render Leave Summary Component without crashing', () => {
    expect(screen.getByText('Leave Summary')).toBeInTheDocument()
  })
})
