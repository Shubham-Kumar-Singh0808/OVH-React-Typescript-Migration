import React from 'react'
import { IncomingSeparationComments } from '../../../types/MyProfile/Separation/separationTypes'

const MyProfileSeparationTimeline = ({
  separationComments,
}: {
  separationComments: IncomingSeparationComments[]
}): JSX.Element => {
  return (
    <>
      <div className="sh-timeline-container">
        {
          // this is rendering the timeline
          separationComments?.map((comment, commentIndex) => (
            <div
              key={commentIndex}
              className="sh-timeline-card"
              data-testid="recruitHistory-timelineCard"
            >
              <div className="sh-timeline-timestamp">
                {comment?.createdDate}
              </div>

              <div className="sh-timeline-content">
                <div className="sh-timeline-header mb-4 clearfix d-flex flex-row flex-wrap">
                  <div>
                    <h4
                      className="sh-timeline-title"
                      data-testid={`recruitHis-interviewer-${commentIndex}`}
                    >
                      {comment?.employeeName}
                    </h4>
                  </div>
                </div>
                <div className="sh-timeline-body">
                  <div className="d-flex flex-row flex-wrap align-items-center">
                    <label style={{ fontWeight: 'bold' }}>Status: </label>
                    <div style={{ marginLeft: '0.2rem' }}>
                      {comment?.status}
                    </div>
                  </div>
                  {comment?.comments && (
                    <div className="d-flex flex-row flex-wrap align-items-center">
                      <label style={{ fontWeight: 'bold' }}>Comments: </label>
                      <div style={{ marginLeft: '0.2rem' }}>
                        {comment?.comments}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default MyProfileSeparationTimeline
