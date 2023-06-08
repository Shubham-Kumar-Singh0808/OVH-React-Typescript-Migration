import React from 'react'
import { CBadge, CFormLabel } from '@coreui/react-pro'
import InterviewDetailsRatingForm from './InterviewDetailsRatingForm'
import RatingStarValue from './RatingStarValue'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const IntervieweeDetailsTimeline = (): JSX.Element => {
  const timeLineListSelector = useTypedSelector(
    reduxServices.intervieweeDetails.selectors.TimeLineListSelector,
  )

  return (
    <>
      <div className="sh-timeline-container">
        {timeLineListSelector?.cycleDTOs?.length > 0 &&
          timeLineListSelector?.cycleDTOs?.map((item) => {
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
                <div className="sh-timeline-container">
                  {timeLineListSelector?.cycleDTOs?.map((item, index) => (
                    <div
                      key={index}
                      className="sh-timeline-card"
                      data-testid="recruitHistory-timelineCard"
                    >
                      <div className="sh-timeline-timestamp">
                        {item?.interviewDate}
                        <div className="timeline-time">
                          {item?.interviewTime}
                        </div>
                      </div>

                      <div className="sh-timeline-content">
                        <div className="sh-timeline-header mb-4 clearfix d-flex flex-row flex-wrap">
                          <div>
                            <CBadge
                              color="success"
                              textColor="white"
                              className="me-2 p-1 px-2"
                            >
                              {timeLineListSelector.cycleDTOs.length - index}
                            </CBadge>
                          </div>
                          <div>
                            <h4
                              className="sh-timeline-title text-decoration-hover"
                              data-testid={`recruitHis-interviewer-${index}`}
                              style={{
                                fontWeight: 400,
                                cursor: 'pointer',
                              }}
                            >
                              {item?.interviewers} -
                            </h4>
                          </div>
                          <div>
                            <RatingStarValue rating={item.rating} />
                          </div>
                        </div>
                        <div className="sh-timeline-body">
                          <>
                            {result}
                            {item.proactiveComments != null ? (
                              <div className="mb-1">
                                <CFormLabel className="col-form-label p-0">
                                  <blockquote className="interview-blockquote bq-open">
                                    Proactive :
                                  </blockquote>
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
                                  <blockquote className="interview-blockquote bq-open">
                                    Communication :
                                  </blockquote>
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
                                  <blockquote className="interview-blockquote bq-open">
                                    Excellence :
                                  </blockquote>
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
                                  <blockquote className="interview-blockquote bq-open">
                                    Other Comments :
                                  </blockquote>
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
                  ))}
                </div>
              </>
            )
          })}
      </div>
    </>
  )
}

export default IntervieweeDetailsTimeline
