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
              {review.comments !== null && (
                <div>
                  <label>
                    <strong>Comments: &nbsp;</strong>
                  </label>
                  {review.comments}
                </div>
              )}
              {review.kpiReviewDtos?.map((kpiDTO, kpiDTOIndex) => (
                <div
                  key={kpiDTOIndex}
                  data-testid={generateMyReviewTestId(
                    `dtoCommentsDiv-${kpiDTOIndex}-${kpiDTO.oldValue}`,
                  )}
                >
                  {kpiDTO.kpiName !== null && (
                    <>
                      <label>
                        <strong
                          data-testid={generateMyReviewTestId(
                            `dtoName-${kpiDTO.kpiName}`,
                          )}
                        >
                          {kpiDTO.kpiName}{' '}
                        </strong>
                      </label>{' '}
                      changed from {kpiDTO.oldValue} <strong>to</strong>{' '}
                      {kpiDTO.newValue}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RequestDiscussionTimeline
