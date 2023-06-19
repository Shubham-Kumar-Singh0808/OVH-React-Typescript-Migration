import React from 'react'
import RequestDiscussionTimeline from './RequestDiscussionTimeline'
import { cleanup, render, screen } from '../../../../../test/testUtils'
import { mockReviewComments } from '../../../../../test/data/myReviewData'
import { generateMyReviewTestId } from '../../MyReviewHelpers'

describe('Request Discussion Timeline', () => {
  describe('intial render', () => {
    beforeEach(() => {
      render(<RequestDiscussionTimeline />, {
        preloadedState: {
          myReview: {
            reviewComments: mockReviewComments,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('data is visible', () => {
      expect(
        screen.getByTestId(generateMyReviewTestId('discussionTimeline')),
      ).toBeVisible()
      expect(
        screen.getAllByTestId(generateMyReviewTestId('timelineCard')),
      ).toHaveLength(mockReviewComments.size)
    })
  })
})
