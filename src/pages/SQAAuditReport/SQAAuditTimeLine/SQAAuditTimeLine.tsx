import { CBadge, CFormLabel } from '@coreui/react-pro'
import React from 'react'
import parse from 'html-react-parser'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const SQAAuditTimeLine = (): JSX.Element => {
  const sqaAuditReportTimeLine = useTypedSelector(
    reduxServices.sqaAuditReport.selectors.sqaAuditReportTimeLine,
  )

  const isPersistValue = (persistType: string) => {
    if (persistType === 'Updated') {
      return (
        <CBadge className="rounded-pill" color="info" data-testid="update-btn">
          Updated
        </CBadge>
      )
    } else if (persistType === 'Created') {
      return (
        <CBadge
          className="rounded-pill"
          color="success"
          data-testid="created-btn"
        >
          Created
        </CBadge>
      )
    } else if (persistType === 'UPDATED') {
      return (
        <CBadge
          className="rounded-pill"
          color="info"
          data-testid="sqa-update-btn"
        >
          Updated
        </CBadge>
      )
    } else if (persistType === 'REJECTED') {
      return (
        <CBadge className="rounded-pill" color="danger">
          Rejected
        </CBadge>
      )
    } else {
      return ''
    }
  }
  const isSQAAuditPrevValue = (oldValue: string): JSX.Element => {
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
      <div className="sh-timeline-container">
        {sqaAuditReportTimeLine.length > 0 &&
          sqaAuditReportTimeLine?.map((auditHistory, index) => {
            const projectType =
              auditHistory?.projectType === 'true' ? 'Development' : 'Support'
            const oldSQAProjectType =
              auditHistory?.oldProjectType === 'true'
                ? 'Development'
                : 'Support'
            const oldFilterProjectType =
              auditHistory.oldProjectType === null
                ? ''
                : isSQAAuditPrevValue(oldSQAProjectType)
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
                      {auditHistory.auditType ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Audit Type:
                            </CFormLabel>
                            {isSQAAuditPrevValue(auditHistory.oldAuditType)}
                            &nbsp;
                            {auditHistory.auditType}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {projectType || auditHistory.oldProjectType !== null ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Project Type:
                            </CFormLabel>
                            {oldFilterProjectType}
                            &nbsp;
                            {projectType}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}

                      {auditHistory.projectName ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Project Name:
                            </CFormLabel>
                            {isSQAAuditPrevValue(auditHistory.oldProjectName)}
                            &nbsp;
                            {auditHistory.projectName}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {auditHistory.projectManager ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Project Manager:
                            </CFormLabel>
                            {isSQAAuditPrevValue(
                              auditHistory.oldProjectManager,
                            )}
                            &nbsp;
                            {auditHistory.projectManager}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {auditHistory.auditDate ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Audit Date:
                            </CFormLabel>
                            {isSQAAuditPrevValue(auditHistory.oldAuditDate)}
                            &nbsp;
                            {auditHistory.auditDate}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {auditHistory.startTime && auditHistory.endTime ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Audit Time:
                            </CFormLabel>
                            {isSQAAuditPrevValue(auditHistory.oldStartTime)}
                            &nbsp;
                            {auditHistory.startTime} - {auditHistory.endTime}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {auditHistory.auditors ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Auditors:
                            </CFormLabel>
                            {isSQAAuditPrevValue(auditHistory.oldAuditors)}
                            &nbsp;
                            {auditHistory.auditors}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {auditHistory.auditees ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Auditees:
                            </CFormLabel>
                            {isSQAAuditPrevValue(auditHistory.oldAuditees)}
                            &nbsp;
                            {auditHistory.auditees}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {auditHistory.auditStatus ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Audit Status:
                            </CFormLabel>
                            {isSQAAuditPrevValue(auditHistory.oldAuditStatus)}
                            &nbsp;
                            {auditHistory.auditStatus}
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

export default SQAAuditTimeLine
