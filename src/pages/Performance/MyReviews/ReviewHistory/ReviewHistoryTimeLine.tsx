import { CFormLabel } from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const ReviewHistoryTimeLine = (): JSX.Element => {
  const reviewComments = useTypedSelector(
    reduxServices.myReview.selectors.reviewComments,
  )

  const reviewStatus = (status: string): string => {
    if (status === 'OPENFORDISCUSSION') {
      return (status = 'Needs Discussion')
    } else if (status === 'PENDINGAGREEMENT')
      return (status = 'Needs Acknowledgement')
    return ''
  }
  return (
    <>
      <div className="sh-timeline-container">
        {reviewComments?.map((comment, index) => {
          return (
            <div key={index} className="sh-timeline-card">
              <div
                className="sh-timeline-timestamp"
                data-testid="sh-time-stamp"
              >
                {comment.createdDate}
              </div>
              <div className="sh-timeline-content">
                <div
                  className="sh-timeline-header mb-4 clearfix"
                  data-testid="sh-modifiedBy"
                >
                  <h4 className="sh-timeline-title">{comment.employeeName}</h4>
                </div>
                <div className="sh-timeline-body">
                  <div className="sh-timeline-item mb-1">
                    {comment.status ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Status:
                          </CFormLabel>
                          {reviewStatus(comment.status)}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {comment.comments ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Comments:
                          </CFormLabel>
                          {comment.comments}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
export default ReviewHistoryTimeLine
