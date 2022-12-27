import { CBadge, CFormLabel } from '@coreui/react-pro'
import React from 'react'
import parse from 'html-react-parser'
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

  const isProjectPrevValue = (oldValue: string): JSX.Element => {
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
        {projectHistoryDetails.map((history, index) => {
          const projectCurrentStatus = history.isAllocated
            ? 'Allocated'
            : 'De-Allocated'
          const projectOldCurrentStatus = history.oldIsAllocated
            ? 'Allocated'
            : 'De-Allocated'
          const projectOldBillable = history.oldBillable ? 'Yes' : 'No'
          const projectBillable = history.billable ? 'yes' : 'No'
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
                            {isProjectPrevValue(history.oldAllocation)}
                            &nbsp;
                            {history.allocation}
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
                            {isProjectPrevValue(history.oldStatus)}
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
                            {isProjectPrevValue(history.oldStartDate)}
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
                            {isProjectPrevValue(history.oldEndDate)}
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
                            {isProjectPrevValue(history.oldProjectName)}
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
                            {isProjectPrevValue(history.oldClient)}
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
                            {isProjectPrevValue(history.oldStatus as string)}
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
                            {isProjectPrevValue(history.oldType)}
                            &nbsp;
                            {history.type}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {projectCurrentStatus ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Current Status
                            </CFormLabel>
                            {isProjectPrevValue(projectOldCurrentStatus)}
                            &nbsp;
                            {projectCurrentStatus}
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
                            {isProjectPrevValue(projectOldBillable)}
                            &nbsp;
                            {projectBillable}
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
