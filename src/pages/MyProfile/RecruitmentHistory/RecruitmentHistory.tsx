import {
  CCardHeader,
  CCardBody,
  CBadge,
  CRow,
  CCol,
  CButton,
} from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { useSelectedEmployee } from '../../../middleware/hooks/useSelectedEmployee'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import ORatingStar from '../../../components/ReusableComponent/ORatingStar'

const RecruitmentHistory = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [isViewingAnotherEmployee, selectedEmployeeId] = useSelectedEmployee()

  const recruitmentHistoryData = useTypedSelector(
    (state) => state.recruitmentHistory.recruitmentHistoryData,
  )
  const isLoading = useTypedSelector(
    (state) => state.recruitmentHistory.isLoading,
  )

  useEffect(() => {
    if (isViewingAnotherEmployee && selectedEmployeeId) {
      dispatch(
        reduxServices.recruitmentHistory.getEmployeeHistoryThunk(
          +selectedEmployeeId,
        ),
      )
    }
  }, [selectedEmployeeId])

  const resumeButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const resumePath = recruitmentHistoryData.resumePath
      ? recruitmentHistoryData.resumePath
      : undefined
    window.open(`https://ovh2.raybiztech.com/documents/${resumePath}`, '_blank')
  }

  return (
    <>
      {isLoading === ApiLoadingState.succeeded ? (
        <>
          <CCardHeader>
            <h4 className="h4">History</h4>
          </CCardHeader>
          {recruitmentHistoryData?.cycleDTOs?.length > 0 ? (
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
                    disabled={recruitmentHistoryData.resumePath === null}
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
                  recruitmentHistoryData?.cycleDTOs?.map(
                    (cycle, cycleIndex) => (
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
                                {recruitmentHistoryData.cycleDTOs.length -
                                  cycleIndex}
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
                    ),
                  )
                }
              </div>
            </CCardBody>
          ) : (
            <p style={{ fontWeight: 'bold' }} className="mt-2">
              No Records Found...
            </p>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default RecruitmentHistory
