import '@testing-library/jest-dom'

import React from 'react'
import LeaveApprovals from './LeaveApprovals'
import { render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'

describe('Leave Approvals Component Testing', () => {
  test('should render leave approvals component with out crashing', () => {
    render(<LeaveApprovals />, {
      preloadedState: {
        leaveApprovals: {
          isLoading: ApiLoadingState.succeeded,
        },
      },
    })
    expect(screen.getByText('Leave Approvals')).toBeInTheDocument()
  })
})
