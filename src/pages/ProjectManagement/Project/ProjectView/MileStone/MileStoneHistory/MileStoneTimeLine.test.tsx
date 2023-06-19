import React from 'react'
import '@testing-library/jest-dom'
import MileStoneTimeLine from './MileStoneTimeLine'
import { render, screen } from '../../../../../../test/testUtils'
import { ApiLoadingState } from '../../../../../../middleware/api/apiList'
import { mockMilestoneAudit } from '../../../../../../test/data/projectMilestoneData'

describe('MileStoneTimeLine Component Testing', () => {
  describe('should render MileStoneTimeLine Component without data', () => {
    beforeEach(() => {
      render(<MileStoneTimeLine />, {
        preloadedState: {
          projectMileStone: {
            mileStoneHistory: mockMilestoneAudit,
            isLoading: ApiLoadingState.succeeded,
          },
        },
      })
    })
    screen.debug()
    test('should render ', () => {
      mockMilestoneAudit?.forEach((childFeature) => {
        const timeStamp = screen.getAllByTestId('sh-time-stamp')
        expect(screen.getByText(childFeature.modifiedDate)).toBeInTheDocument()
        expect(timeStamp).toBeTruthy()
      })
    })
    test('should render with data ', () => {
      expect(screen.getByText('28-Apr-2023 03:43 PM')).toBeInTheDocument()
      expect(screen.getByText('Title')).toBeInTheDocument()
    })
    test('should render updated button with data ', () => {
      const createdElement = screen.getAllByTestId('update-btn')
      expect(createdElement[0]).toBeInTheDocument()
    })
  })
})
