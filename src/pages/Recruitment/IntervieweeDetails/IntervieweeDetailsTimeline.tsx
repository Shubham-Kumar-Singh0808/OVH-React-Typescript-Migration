import React from 'react'
import { CFormLabel, CLink } from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import InterviewDetailsRatingForm from './InterviewDetailsRatingForm'
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
            const result =
              item.rating === null &&
              item.proactiveComments === null &&
              item.excellenceComments === null &&
              item.communicationComments === null &&
              item.interviewComments === null ? (
                <InterviewDetailsRatingForm />
              ) : (
                ''
              )
            return (
              <>
                <div key={index} className="sh-timeline-card">
                  <div
                    className="sh-timeline-timestamp"
                    data-testid="sh-time-stamp"
                  >
                    {item.interviewDate}
                    <p>{item.interviewTime}</p>
                  </div>

                  <div className="sh-timeline-content">
                    <div
                      className="sh-timeline-header mb-4 clearfix"
                      data-testid="sh-modifiedBy"
                    >
                      <CLink>
                        <h4 className="sh-timeline-title">
                          {item.interviewers} -
                          <CFormLabel className="col-form-label p-0">
                            {item.interviewRound}
                          </CFormLabel>
                        </h4>
                      </CLink>
                    </div>

                    <div className="sh-timeline-body">
                      <div className="sh-timeline-item mb-1"></div>
                      <>
                        {result}
                        {item.proactiveComments != null ? (
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              <blockquote>Proactive :</blockquote>
                            </CFormLabel>
                            &nbsp;
                            {item.proactiveComments}
                          </div>
                        ) : (
                          <></>
                        )}
                        {item.communicationComments != null ? (
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              <blockquote>Communication :</blockquote>
                            </CFormLabel>
                            &nbsp;
                            {item.communicationComments}
                          </div>
                        ) : (
                          <></>
                        )}
                        {item.excellenceComments != null ? (
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              <blockquote>Excellence :</blockquote>
                            </CFormLabel>
                            &nbsp;
                            {item.excellenceComments}
                          </div>
                        ) : (
                          <></>
                        )}
                        {item.interviewComments != null ? (
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              <blockquote>Other Comments :</blockquote>
                            </CFormLabel>
                            &nbsp;
                            {item.interviewComments}
                          </div>
                        ) : (
                          <></>
                        )}
                      </>
                    </div>
                  </div>
                </div>
              </>
            )
          })}
      </div>
    </>
  )
}

export default IntervieweeDetailsTimeline
