import React from 'react'
import '@testing-library/jest-dom'
import AddMilestone from './AddMilestone'
import { render, screen } from '../../../../../../test/testUtils'
import { ApiLoadingState } from '../../../../../../middleware/api/apiList'
import { mockProjectViewDetails } from '../../../../../../test/data/projectMilestoneData'

describe('AddMilestone Component Testing', () => {
  describe('should render AddMilestone Component without data', () => {
    beforeEach(() => {
      render(<AddMilestone />, {
        preloadedState: {
          projectViewDetails: {
            projectDetail: mockProjectViewDetails,
            isLoading: ApiLoadingState.succeeded,
          },
        },
      })
    })
    screen.debug()
    test('should render AddMilestone component with out crashing', () => {
      expect(screen.getByText('Add Milestone')).toBeInTheDocument()
    })

    test('should render with data ', () => {
      expect(screen.getByText('JT - UI integration')).toBeInTheDocument()
      expect(screen.getByText('29/01/2019')).toBeInTheDocument()
      expect(screen.getByText('30/06/2019')).toBeInTheDocument()
      expect(screen.getByText('Naveen Kunchakuri')).toBeInTheDocument()
    })
  })
})
