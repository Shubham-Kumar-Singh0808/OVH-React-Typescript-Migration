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
        {timeLineListSelector?.cycleDTOs?.map((data, index) => {
          const result =
            data.rating === null &&
            data.proactiveComments === null &&
            data.excellenceComments === null &&
            data.communicationComments === null &&
            data.interviewComments === null ? (
              <InterviewDetailsRatingForm />
            ) : (
              ''
            )
          return (
            <div
              key={index}
              className="sh-timeline-card"
              data-testid="recruitHistory-timelineCard"
            >
              <div className="sh-timeline-timestamp">
                {data?.interviewDate}
                <div className="timeline-time">{data?.interviewTime}</div>
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
                      {data?.interviewers} -
                    </h4>
                  </div>
                  <div>
                    <RatingStarValue rating={data.rating} />
                  </div>
                </div>
                <div className="sh-timeline-body">
                  <>
                    {result}
                    {data.proactiveComments != null ? (
                      <div className="mb-1">
                        <CFormLabel className="col-form-label p-0">
                          <blockquote className="interview-blockquote bq-open">
                            Proactive :
                          </blockquote>
                        </CFormLabel>
                        &nbsp;
                        {data.proactiveComments}
                      </div>
                    ) : (
                      <></>
                    )}
                    {data.communicationComments != null ? (
                      <div className="mb-1">
                        <CFormLabel className="col-form-label p-0">
                          <blockquote className="interview-blockquote bq-open">
                            Communication :
                          </blockquote>
                        </CFormLabel>
                        &nbsp;
                        {data.communicationComments}
                      </div>
                    ) : (
                      <></>
                    )}
                    {data.excellenceComments != null ? (
                      <div className="mb-1">
                        <CFormLabel className="col-form-label p-0">
                          <blockquote className="interview-blockquote bq-open">
                            Excellence :
                          </blockquote>
                        </CFormLabel>
                        &nbsp;
                        {data.excellenceComments}
                      </div>
                    ) : (
                      <></>
                    )}
                    {data.interviewComments != null ? (
                      <div className="mb-1">
                        <CFormLabel className="col-form-label p-0">
                          <blockquote className="interview-blockquote bq-open">
                            Other Comments :
                          </blockquote>
                        </CFormLabel>
                        &nbsp;
                        {data.interviewComments}
                      </div>
                    ) : (
                      <></>
                    )}
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
