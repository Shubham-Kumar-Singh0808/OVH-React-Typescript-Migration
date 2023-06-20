import React from 'react'
import { useTypedSelector } from '../../../../../stateStore'
import { generateMyReviewTestId } from '../../MyReviewHelpers'

const RequestDiscussionTimeline = (): JSX.Element => {
  const reviewCommentsList = useTypedSelector(
    (state) => state.myReview.reviewComments.list,
  )
  return (
    <div
      className="mt-4 sh-timeline-container"
      data-testid={generateMyReviewTestId('discussionTimeline')}
    >
      {reviewCommentsList?.map((review, index) => (
        <div
          key={index}
          className="sh-timeline-card"
          data-testid={generateMyReviewTestId('timelineCard')}
        >
          <div className="sh-timeline-timestamp">{review.createdDate}</div>
          <div className="sh-timeline-content">
            <div className="sh-timeline-header mb-4 clearfix">
              <h4 className="sh-timeline-title">{review.employeeName}</h4>
            </div>
            <div className="sh-timeline-review">
              <div>
                <label>
                  <strong>Status: &nbsp;</strong>
                </label>
                {review.status}
              </div>
              <div>
                <label>
                  <strong>Comments: &nbsp;</strong>
                </label>
                {review.comments}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RequestDiscussionTimeline
