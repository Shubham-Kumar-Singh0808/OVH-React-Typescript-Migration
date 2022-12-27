import '@testing-library/jest-dom'
import React from 'react'
import ProjectDetails from './ProjectDetails'
import { render, screen } from '../../../../../test/testUtils'
import { mockProjectViewDetails } from '../../../../../test/data/projectMilestoneData'

describe('ProjectDetails component with data', () => {
  beforeEach(() => {
    render(<ProjectDetails />, {
      preloadedState: {
        projectViewDetails: {
          projectDetail: mockProjectViewDetails,
        },
      },
    })
  })

  test('should render with data ', () => {
    expect(screen.getByText('JXT - UI integration')).toBeInTheDocument()
    expect(screen.getByText('29/01/2019')).toBeInTheDocument()
    expect(screen.getByText('30/06/2019')).toBeInTheDocument()
    expect(screen.getByText('JX Global')).toBeInTheDocument()
    expect(screen.getByText('RETAINER')).toBeInTheDocument()
    expect(screen.getByText('finance@jxt.com.au')).toBeInTheDocument()
  })
})
