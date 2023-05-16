import React from 'react'
import { CFormLabel } from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const IntervieweeDetailsTimeline = () => {
  const timeLineListSelector = useTypedSelector(
    reduxServices.intervieweeDetails.selectors.TimeLineListSelector,
  )

  return (
    <>
      <div className="sh-timeline-container">
        {timeLineListSelector?.cycleDTOs?.length > 0 &&
          timeLineListSelector?.cycleDTOs?.map((item, index) => {
            return (
              <div key={index} className="sh-timeline-card">
                <div
                  className="sh-timeline-timestamp"
                  data-testid="sh-time-stamp"
                >
                  {item.interviewDate} {item.interviewTime}
                </div>

                <div className="sh-timeline-content">
                  <div
                    className="sh-timeline-header mb-4 clearfix"
                    data-testid="sh-modifiedBy"
                  >
                    <CFormLabel className="col-form-label p-0">
                      {item.interviewRound}
                    </CFormLabel>
                    <Link to={''}>
                      <h4 className="sh-timeline-title">{item.updatedBy} -</h4>
                    </Link>
                  </div>
                  <div className="sh-timeline-body">
                    <div className="sh-timeline-item mb-1"></div>
                    <>
                      <div className="mb-1">
                        <CFormLabel className="col-form-label p-0">
                          <blockquote>Other Comments</blockquote>
                        </CFormLabel>
                        &nbsp;
                        {item.interviewComments}
                      </div>
                    </>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </>
  )
}

export default IntervieweeDetailsTimeline
