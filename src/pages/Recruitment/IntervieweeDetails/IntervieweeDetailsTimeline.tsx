import React, { useState } from 'react'
import { CFormLabel } from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import RatingStar from './RatingStar'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const IntervieweeDetailsTimeline = () => {
  const timeLineListSelector = useTypedSelector(
    reduxServices.intervieweeDetails.selectors.TimeLineListSelector,
  )
  const scheduleInterviewData = useTypedSelector(
    reduxServices.intervieweeDetails.selectors.scheduleInterviewData,
  )

  const [rating, setRating] = useState(0)

  const handleRatingClick = (index: number) => {
    setRating(index + 1)
  }

  const renderStars = () => {
    const stars = []
    for (let i = 0; i < rating; i++) {
      const starClass = i < rating ? 'filled' : ''
      stars.push(
        <li
          key={i}
          className={`${starClass}`}
          onClick={() => handleRatingClick(i)}
        >
          ★
        </li>,
      )
    }
    console.log(stars + 'stars')

    return stars
  }

  return (
    <>
      <div className="sh-timeline-container">
        {timeLineListSelector?.cycleDTOs?.length > 0 &&
          timeLineListSelector?.cycleDTOs?.map((item, index) => {
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
                      <CFormLabel className="col-form-label p-0">
                        {item.interviewRound}
                      </CFormLabel>
                      <Link to={''}>
                        <h4 className="sh-timeline-title">
                          {item.interviewers} -{' '}
                          <li
                            key={index}
                            onClick={() => handleRatingClick(index)}
                            value={item.rating as string}
                          >
                            ★
                          </li>
                          {renderStars()}
                          <RatingStar /> RATING star
                          <CFormLabel className="col-form-label p-0">
                            {scheduleInterviewData.interviewRound}
                          </CFormLabel>
                        </h4>
                      </Link>
                    </div>
                    <div className="sh-timeline-body">
                      <div className="sh-timeline-item mb-1"></div>
                      <>
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
