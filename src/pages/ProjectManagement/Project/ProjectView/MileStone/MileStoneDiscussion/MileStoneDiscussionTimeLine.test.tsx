import React from 'react'
import '@testing-library/jest-dom'
import MileStoneDiscussionTimeLine from './MileStoneDiscussionTimeLine'
import { render, screen } from '../../../../../../test/testUtils'
import { ApiLoadingState } from '../../../../../../middleware/api/apiList'
import { mockMilestoneNewsFeed } from '../../../../../../test/data/projectMilestoneData'

describe('MileStoneDiscussionTimeLine Component Testing', () => {
  describe('should render MileStoneDiscussionTimeLine Component without data', () => {
    beforeEach(() => {
      render(<MileStoneDiscussionTimeLine />, {
        preloadedState: {
          projectMileStone: {
            milestoneNewsFeed: mockMilestoneNewsFeed,
            isLoading: ApiLoadingState.succeeded,
          },
        },
      })
    })
    screen.debug()
    test('should render ', () => {
      mockMilestoneNewsFeed?.forEach((childFeature) => {
        const timeStamp = screen.getAllByTestId('sh-time-stamp')
        expect(screen.getByText(childFeature.postDate)).toBeInTheDocument()
        expect(timeStamp).toBeTruthy()
      })
    })
    test('should render with data ', () => {
      const timeStamp = screen.getAllByTestId('sh-time-stamp')
      expect(timeStamp).toBeTruthy()
      expect(screen.getByText('05-Jun-2023 03:46 PM')).toBeInTheDocument()
      expect(screen.getByText('test')).toBeInTheDocument()
    })
  })
})
