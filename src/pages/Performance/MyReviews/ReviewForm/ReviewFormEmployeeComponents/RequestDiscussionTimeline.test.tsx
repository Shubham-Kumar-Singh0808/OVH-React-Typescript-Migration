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

    test('manager changes are visibile', () => {
      const indexVal = 0
      const managerCommentsDTO = mockReviewComments.list[indexVal].kpiReviewDtos
      managerCommentsDTO.forEach((dtoComment) => {
        expect(
          screen.getByTestId(
            generateMyReviewTestId(`dtoName-${dtoComment.kpiName}`),
          ),
        ).toHaveTextContent(dtoComment.kpiName ? dtoComment.kpiName : 'N/A')
        expect(
          screen.getByTestId(
            generateMyReviewTestId(
              `dtoCommentsDiv-${indexVal}-${dtoComment.oldValue}`,
            ),
          ),
        ).toHaveTextContent(
          `changed from ${dtoComment.oldValue} to ${dtoComment.newValue}`,
        )
      })
    })
  })
})
