import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import ProjectViewTabs from './ProjectViewTabs'
import { render, screen } from '../../../../../test/testUtils'
import { mockProjectViewDetails } from '../../../../../test/data/projectMilestoneData'

describe('ProjectViewTabs Component Testing', () => {
  test('should render ProjectViewTabs component with out crashing', () => {
    render(<ProjectViewTabs />, {
      preloadedState: {
        authentication: {
          authenticatedUser: { role: 'admin' },
        },
        projectViewDetails: {
          projectDetail: mockProjectViewDetails,
        },
      },
    })

    expect(screen.getByText('People')).toBeInTheDocument()
    expect(screen.getByText('Change Request')).toBeInTheDocument()
    expect(screen.getByText('Invoices')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    userEvent.click(screen.getAllByTestId('navLink-test')[2])
  })
})
