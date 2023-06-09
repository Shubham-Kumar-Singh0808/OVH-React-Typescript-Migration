import React from 'react'
import '@testing-library/jest-dom'
import ProjectRequestViewDetails from './ProjectRequestViewDetails'
import { render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockProjectRequest } from '../../../../test/data/projectCreationRequestData'

describe('ProjectRequestViewDetails Component Testing', () => {
  describe('should render ProjectRequestViewDetails Component without data', () => {
    beforeEach(() => {
      render(<ProjectRequestViewDetails />, {
        preloadedState: {
          projectCreationRequest: {
            getProjectRequest: mockProjectRequest,
            isLoading: ApiLoadingState.succeeded,
          },
        },
      })
    })
    screen.debug()
    test('should render with data ', () => {
      expect(screen.getByText('Skill assessment app')).toBeInTheDocument()
      expect(screen.getByText('Development')).toBeInTheDocument()
      expect(screen.getByText('Approved')).toBeInTheDocument()
    })
  })
})
