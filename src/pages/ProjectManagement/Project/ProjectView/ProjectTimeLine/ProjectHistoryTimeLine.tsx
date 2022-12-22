import { CBadge, CFormLabel } from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../../stateStore'

const ProjectHistoryTimeLine = (): JSX.Element => {
  const projectHistoryDetails = useTypedSelector(
    reduxServices.projectTimeLine.selectors.projectHistory,
  )

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
    } else if (persistType === 'CANCELLED') {
      return (
        <CBadge className="rounded-pill" color="warning">
          Cancelled
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
  return (
    <>
      <div className="sh-timeline-container">
        {projectHistoryDetails.map((history, index) => {
          const projectBillable = history.billable ? 'Yes' : 'No'
          const projectOldBillable = history.oldBillable ? 'Yes' : 'No'
          return (
            <div key={index} className="sh-timeline-card">
              <div
                className="sh-timeline-timestamp"
                data-testid="sh-time-stamp"
              >
                {history.modifiedDate}
              </div>
              <div className="sh-timeline-content">
                <div
                  className="sh-timeline-header mb-4 clearfix"
                  data-testid="sh-modifiedBy"
                >
                  <h4 className="sh-timeline-title">{history.modifiedBy} -</h4>
                  <span className="sh-timeline-status">
                    {isPersistValue(history.persistType)}
                  </span>
                </div>
                <div className="sh-timeline-body">
                  <div className="sh-timeline-item mb-1">
                    <>
                      {history.additionalInfo ? (
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Employee Name
                          </CFormLabel>
                          &nbsp;
                          {history.additionalInfo}
                        </div>
                      ) : (
                        ''
                      )}
                      {history.allocation ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Allocation(%)
                            </CFormLabel>
                            {history.oldAllocation ? (
                              <>
                                &nbsp;Changed from {history.oldAllocation}
                                <strong> to</strong>
                              </>
                            ) : (
                              <></>
                            )}
                            &nbsp;
                            {history.allocation}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}

                      {projectBillable ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Billable
                            </CFormLabel>
                            {projectOldBillable ? (
                              <>
                                &nbsp;Changed from
                                {projectOldBillable}
                                <strong> to</strong>
                              </>
                            ) : (
                              <></>
                            )}
                            &nbsp;
                            {projectBillable}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}

                      {history.status ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Current Status
                            </CFormLabel>
                            {history.oldStatus ? (
                              <>
                                &nbsp;Changed from {history.oldStatus}
                                <strong> to</strong>
                              </>
                            ) : (
                              <></>
                            )}
                            &nbsp;
                            {history.status}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}

                      {history.startdate ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Allocation Start Date
                            </CFormLabel>
                            {history.oldStartDate ? (
                              <>
                                &nbsp;Changed from {history.oldStartDate}
                                <strong> to</strong>
                              </>
                            ) : (
                              <></>
                            )}
                            &nbsp;
                            {history.startdate}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}

                      {history.enddate ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Allocation End Date
                            </CFormLabel>
                            {history.oldEndDate ? (
                              <>
                                &nbsp;Changed from {history.oldEndDate}
                                <strong> to</strong>
                              </>
                            ) : (
                              <></>
                            )}
                            &nbsp;
                            {history.enddate}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}

                      {history.projectName ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Project Name
                            </CFormLabel>
                            {history.oldProjectName ? (
                              <>
                                &nbsp;Changed from {history.oldProjectName}
                                <strong> to</strong>
                              </>
                            ) : (
                              <></>
                            )}
                            &nbsp;
                            {history.projectName}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}

                      {history.client ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Client
                            </CFormLabel>
                            {history.oldProjectName ? (
                              <>
                                &nbsp;Changed from {history.oldProjectName}
                                <strong> to</strong>
                              </>
                            ) : (
                              <></>
                            )}
                            &nbsp;
                            {history.client}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}

                      {history.status ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Status
                            </CFormLabel>
                            {history.oldStatus ? (
                              <>
                                &nbsp;Changed from {history.oldStatus}
                                <strong> to</strong>
                              </>
                            ) : (
                              <></>
                            )}
                            &nbsp;
                            {history.status}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}

                      {history.type ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Pricing Model
                            </CFormLabel>
                            {history.oldType ? (
                              <>
                                &nbsp;Changed from {history.oldType}
                                <strong> to</strong>
                              </>
                            ) : (
                              <></>
                            )}
                            &nbsp;
                            {history.type}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
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

export default ProjectHistoryTimeLine
