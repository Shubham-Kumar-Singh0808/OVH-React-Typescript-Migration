import React from 'react'
import { CCardBody, CRow, CCol, CButton, CBadge } from '@coreui/react-pro'
import { IncomingRecruitmentHistory } from '../../../types/MyProfile/RecruitmentHistory/RecruitmentHistoryTypes'
import ORatingStar from '../../../components/ReusableComponent/ORatingStar'

const RecruitmentHistoryTimeline = ({
  timelineData,
  resumeButtonHandler,
}: {
  timelineData: IncomingRecruitmentHistory
  resumeButtonHandler: (e: React.MouseEvent<HTMLButtonElement>) => void
}) => {
  return (
    <>
      {timelineData?.cycleDTOs?.length > 0 ? (
        <CCardBody className="mt-3">
          <CRow>
            <CCol sm={2} className="text-end" style={{ color: '#3f8bd1' }}>
              Resume:
            </CCol>
            <CCol sm={2}>
              <CButton
                size="sm"
                color="info"
                style={{
                  color: 'white',
                  padding: '0',
                }}
                disabled={timelineData.resumePath === null}
                onClick={resumeButtonHandler}
                data-testid="recruitHis-prevBtn"
              >
                PREVIEW
              </CButton>
            </CCol>
          </CRow>

          <div className="sh-timeline-container">
            {
              // this is rendering the timeline
              timelineData?.cycleDTOs?.map((cycle, cycleIndex) => (
                <div
                  key={cycleIndex}
                  className="sh-timeline-card"
                  data-testid="recruitHistory-timelineCard"
                >
                  <div className="sh-timeline-timestamp">
                    {cycle?.interviewDate}
                    <p>{cycle?.interviewTime}</p>
                  </div>

                  <div className="sh-timeline-content">
                    <div className="sh-timeline-header mb-4 clearfix d-flex flex-row flex-wrap">
                      <div>
                        <CBadge
                          color="success"
                          textColor="white"
                          className="me-2 p-1 px-2"
                        >
                          {timelineData.cycleDTOs.length - cycleIndex}
                        </CBadge>
                      </div>
                      <div>
                        <h4
                          className="sh-timeline-title text-decoration-hover"
                          data-testid={`recruitHis-interviewer-${cycleIndex}`}
                          style={{
                            fontWeight: 400,
                            cursor: 'pointer',
                          }}
                        >
                          {cycle?.interviewers} -
                        </h4>
                      </div>
                      <div>
                        <ORatingStar rating={cycle.rating} />
                      </div>
                    </div>
                    <div className="sh-timeline-body">
                      <blockquote
                        style={{
                          fontSize: '12px',
                          maxWidth: '1000px',
                          wordWrap: 'break-word',
                          padding: '10px 20px',
                          margin: '0 0 20px',
                          borderLeft: '5px solid #eee',
                        }}
                        className="ng-binding bq-open"
                        data-testid={`recruitHis-interviewComm-${cycleIndex}`}
                      >
                        {cycle?.interviewComments}
                      </blockquote>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </CCardBody>
      ) : (
        <p style={{ fontWeight: 'bold' }} className="mt-2">
          No Records Found...
        </p>
      )}
    </>
  )
}

export default RecruitmentHistoryTimeline