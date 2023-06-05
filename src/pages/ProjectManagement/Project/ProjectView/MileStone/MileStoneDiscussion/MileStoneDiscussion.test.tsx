import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import MileStoneDiscussion from './MileStoneDiscussion'
import { render, screen } from '../../../../../../test/testUtils'
import { ApiLoadingState } from '../../../../../../middleware/api/apiList'
import { mockGetMilestone } from '../../../../../../test/data/projectMilestoneData'

describe('MileStoneDiscussionTimeLine Component Testing', () => {
  describe('should render MileStoneDiscussionTimeLine Component without data', () => {
    beforeEach(() => {
      render(<MileStoneDiscussion />, {
        preloadedState: {
          projectMileStone: {
            getMilestone: mockGetMilestone,
            isLoading: ApiLoadingState.succeeded,
          },
        },
      })
    })
    screen.debug()
    // test('should render with data ', () => {
    //   expect(screen.getByText('testing')).toBeInTheDocument()
    //   expect(screen.getByText('04/04/2023')).toBeInTheDocument()
    // })

    test('should enter the discussion input ', () => {
      const subject = screen.getByTestId('notes-link')
      userEvent.type(subject, 'testing')
      expect(subject).toHaveValue('testing')
    })
  })
})
