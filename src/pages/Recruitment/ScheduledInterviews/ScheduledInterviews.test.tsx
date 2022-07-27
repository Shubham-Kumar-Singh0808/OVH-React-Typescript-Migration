import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import ScheduledInterviews from './ScheduledInterviews'
import { render, screen, waitFor } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockAllTechnology } from '../../../test/data/certificateTypeData'

describe('Scheduled Interviews Component Testing', () => {
  test('should render scheduled interviews component with out crashing', () => {
    render(<ScheduledInterviews />)
    expect(screen.getByText('Scheduled Interviews')).toBeInTheDocument()
  })
  describe('should render scheduled interviews component with data', () => {
    beforeEach(() => {
      render(<ScheduledInterviews />, {
        preloadedState: {
          authentication: {
            authenticatedUser: {
              employeeName: 'venkata',
              employeeId: 1978,
              userName: 'venkata kolla',
              role: 'admin',
            },
          },
          getAllTechnology: {
            isLoading: ApiLoadingState.succeeded,
            technologies: mockAllTechnology,
          },
        },
      })
    })
    test('should render scheduled candidates screen upon All radio button select', async () => {
      const allRadioButton = screen.getByLabelText('All') as HTMLInputElement
      userEvent.click(allRadioButton)
      await waitFor(() => {
        expect(screen.getByText('Scheduled Candidates')).toBeInTheDocument()
      })
    })
  })
})
