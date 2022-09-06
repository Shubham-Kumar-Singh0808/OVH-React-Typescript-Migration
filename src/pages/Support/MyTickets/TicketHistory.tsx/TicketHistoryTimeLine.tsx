import { CBadge, CFormLabel } from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const TicketHistoryTimeLine = (): JSX.Element => {
  const ticketHistory = useTypedSelector(
    reduxServices.myTickets.selectors.ticketHistory,
  )
  const ticketUtils = (oldValue: string): JSX.Element => {
    return oldValue ? (
      <>
        &nbsp;Changed from {oldValue}
        <strong> to</strong>
      </>
    ) : (
      <></>
    )
  }
  return (
    <>
      <div className="sh-timeline-container">
        {ticketHistory.map((ticketDetails, index) => {
          return (
            <div key={index} className="sh-timeline-card">
              <div
                className="sh-timeline-timestamp"
                data-testid="sh-time-stamp"
              >
                {ticketDetails.modifiedDate}
              </div>
              <div className="sh-timeline-content">
                <div
                  className="sh-timeline-header mb-4 clearfix"
                  data-testid="sh-modifiedBy"
                >
                  <h4 className="sh-timeline-title">
                    {ticketDetails.modifiedBy} -
                  </h4>
                  <span className="sh-timeline-status">
                    {ticketDetails.persistType === 'UPDATED' ? (
                      <>
                        <CBadge className="rounded-pill" color="info">
                          Updated
                        </CBadge>
                      </>
                    ) : (
                      <></>
                    )}
                    {ticketDetails.persistType === 'CREATED' ? (
                      <CBadge className="rounded-pill" color="success">
                        Created
                      </CBadge>
                    ) : (
                      <></>
                    )}
                    {ticketDetails.persistType === 'CANCELLED' ? (
                      <>
                        <CBadge className="rounded-pill" color="warning">
                          Cancelled
                        </CBadge>
                      </>
                    ) : (
                      <></>
                    )}
                  </span>
                </div>
                <div className="sh-timeline-body">
                  <div className="sh-timeline-item mb-1">
                    {ticketDetails.tracker ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Tracker Type
                          </CFormLabel>
                          {ticketUtils(ticketDetails.oldtracker as string)}
                          &nbsp;
                          {ticketDetails.tracker}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {ticketDetails.subject ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Subject
                          </CFormLabel>
                          {ticketUtils(ticketDetails.oldsubject as string)}
                          &nbsp;
                          {ticketDetails.subject}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {ticketDetails.description ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Description
                          </CFormLabel>
                          {ticketUtils(ticketDetails.olddescription as string)}
                          &nbsp;
                          {ticketDetails.description}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {ticketDetails.status ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Status
                          </CFormLabel>
                          {ticketUtils(ticketDetails.oldstatus as string)}
                          &nbsp;
                          {ticketDetails.status}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {ticketDetails.startDate ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Start Date
                          </CFormLabel>
                          {ticketUtils(ticketDetails.oldstartDate as string)}
                          &nbsp;
                          {ticketDetails.startDate}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {ticketDetails.priority ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Priority
                          </CFormLabel>
                          {ticketUtils(ticketDetails.oldpriority as string)}
                          &nbsp;
                          {ticketDetails.priority}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {ticketDetails.accessStartDate ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Access Start Date
                          </CFormLabel>
                          {ticketUtils(
                            ticketDetails.oldAccessStartDate as string,
                          )}
                          &nbsp;
                          {ticketDetails.accessStartDate}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {ticketDetails.accessEndDate ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Access End Date
                          </CFormLabel>
                          {ticketUtils(
                            ticketDetails.oldAccessEndDate as string,
                          )}
                          &nbsp;
                          {ticketDetails.accessEndDate}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {ticketDetails.percentageDone ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Percentage
                          </CFormLabel>
                          {ticketUtils(
                            ticketDetails.oldpercentageDone as string,
                          )}
                          &nbsp;
                          {ticketDetails.percentageDone}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {ticketDetails.approvalStatus ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Permission Status
                          </CFormLabel>
                          {ticketUtils(
                            ticketDetails.oldapprovalStatus as string,
                          )}
                          &nbsp;
                          {ticketDetails.approvalStatus}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {ticketDetails.actualTime ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Spent Time
                          </CFormLabel>
                          {ticketUtils(ticketDetails.oldactualTime as string)}
                          &nbsp;
                          {ticketDetails.actualTime}
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
export default TicketHistoryTimeLine
