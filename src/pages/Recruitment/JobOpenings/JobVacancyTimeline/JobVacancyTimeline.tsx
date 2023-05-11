import React from 'react'
import { CRow, CCol, CButton, CFormLabel, CBadge } from '@coreui/react-pro'
import parse from 'html-react-parser'
import OCard from '../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const JobVacancyTimeline = ({
  setToggle,
}: {
  setToggle: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const auditList = useTypedSelector(
    reduxServices.jobVacancies.selectors.auditList,
  )
  console.log(auditList)
  const isPersistValue = (persistType: string) => {
    if (persistType === 'UPDATED') {
      return (
        <CBadge className="rounded-pill" color="info" data-testid="update-btn">
          Updated
        </CBadge>
      )
    } else if (persistType === 'CREATED') {
      return (
        <CBadge
          className="rounded-pill"
          color="success"
          data-testid="created-btn"
        >
          Created
        </CBadge>
      )
    } else {
      return ''
    }
  }
  const isJobAuditPrevValue = (oldValue: string | null): JSX.Element => {
    return oldValue ? (
      <>
        &nbsp;Changed from&nbsp;{parse(oldValue)}&nbsp;
        <strong>to</strong>
      </>
    ) : (
      <></>
    )
  }
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Job Vacancy History Details"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="back-button"
              onClick={() => setToggle('')}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <div className="sh-timeline-container">
          {auditList.length > 0 &&
            auditList?.map((auditHistory, index) => {
              const status = auditHistory?.status === 'true' ? 'Open' : 'Close'
              const oldStatus =
                auditHistory?.oldStatus === 'true' ? 'Open' : 'Close'
              const oldFilterStatus =
                auditHistory.oldStatus === null
                  ? ''
                  : isJobAuditPrevValue(oldStatus)
              return (
                <div key={index} className="sh-timeline-card">
                  <div
                    className="sh-timeline-timestamp"
                    data-testid="sh-time-stamp"
                  >
                    {auditHistory?.modifiedDate}
                  </div>
                  <div className="sh-timeline-content">
                    <div
                      className="sh-timeline-header mb-4 clearfix"
                      data-testid="sh-modifiedBy"
                    >
                      <h4 className="sh-timeline-title">
                        {auditHistory?.modifiedBy} -
                      </h4>
                      <span className="sh-timeline-status">
                        {isPersistValue(auditHistory?.persistType)}
                      </span>
                    </div>
                    <div className="sh-timeline-body">
                      <div className="sh-timeline-item mb-1">
                        {auditHistory.jobCode ? (
                          <>
                            <div className="mb-1">
                              <CFormLabel className="col-form-label p-0">
                                JobCode:
                              </CFormLabel>
                              {isJobAuditPrevValue(auditHistory.oldjobCode)}
                              &nbsp;
                              {auditHistory.jobCode}
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                        {auditHistory.positionVacant ? (
                          <>
                            <div className="mb-1">
                              <CFormLabel className="col-form-label p-0">
                                JobTitle:
                              </CFormLabel>
                              {isJobAuditPrevValue(
                                auditHistory.oldpositionVacant,
                              )}
                              &nbsp;
                              {auditHistory.positionVacant}
                            </div>
                          </>
                        ) : (
                          <></>
                        )}

                        {auditHistory.minimumExperience ? (
                          <>
                            <div className="mb-1">
                              <CFormLabel className="col-form-label p-0">
                                Experience:
                              </CFormLabel>
                              {isJobAuditPrevValue(
                                auditHistory.oldminimumExperience,
                              )}
                              &nbsp;
                              {auditHistory.minimumExperience}
                            </div>
                          </>
                        ) : (
                          <></>
                        )}

                        {auditHistory.description ? (
                          <>
                            <div className="mb-1">
                              <CFormLabel className="col-form-label p-0">
                                Job description:
                              </CFormLabel>
                              {isJobAuditPrevValue(auditHistory.olddescription)}
                              &nbsp;
                              {auditHistory.description}
                            </div>
                          </>
                        ) : (
                          <></>
                        )}

                        {auditHistory.expiryDate ? (
                          <>
                            <div className="mb-1">
                              <CFormLabel className="col-form-label p-0">
                                Expire Date:
                              </CFormLabel>
                              {isJobAuditPrevValue(auditHistory.oldexpiryDate)}
                              &nbsp;
                              {auditHistory.expiryDate}
                            </div>
                          </>
                        ) : (
                          <></>
                        )}

                        {auditHistory.noOfRequirements ? (
                          <>
                            <div className="mb-1">
                              <CFormLabel className="col-form-label p-0">
                                No.of Openings:
                              </CFormLabel>
                              {isJobAuditPrevValue(
                                auditHistory.oldnoOfRequirements,
                              )}
                              &nbsp;
                              {auditHistory.noOfRequirements}
                            </div>
                          </>
                        ) : (
                          <></>
                        )}

                        {status || auditHistory.oldStatus !== null ? (
                          <>
                            <div className="mb-1">
                              <CFormLabel className="col-form-label p-0">
                                Project Type:
                              </CFormLabel>
                              {oldFilterStatus}
                              &nbsp;
                              {status}
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
      </OCard>
    </>
  )
}

export default JobVacancyTimeline
