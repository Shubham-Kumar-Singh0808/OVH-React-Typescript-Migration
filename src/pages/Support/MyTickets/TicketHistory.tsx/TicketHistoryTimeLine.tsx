import { CBadge, CFormLabel } from '@coreui/react-pro'
import React from 'react'
import { useLocation } from 'react-router-dom'
import parse from 'html-react-parser'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const TicketHistoryTimeLine = (): JSX.Element => {
  const location = useLocation()

  const ticketHistory = useTypedSelector(
    reduxServices.tickets.selectors.ticketHistory,
  )
  const isTicketPrevValue = (oldValue: string): JSX.Element => {
    return oldValue ? (
      <>
        &nbsp;Changed from&nbsp;{parse(oldValue)}&nbsp;
        <strong>to</strong>
      </>
    ) : (
      <></>
    )
  }
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
                    {isPersistValue(ticketDetails.persistType)}
                  </span>
                </div>
                <div className="sh-timeline-body">
                  <div className="sh-timeline-item mb-1">
                    {ticketDetails.tracker &&
                    location.pathname !== '/ticketApprovals' ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Tracker Type
                          </CFormLabel>
                          {isTicketPrevValue(
                            ticketDetails.oldtracker as string,
                          )}
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
                          {isTicketPrevValue(
                            ticketDetails.oldsubject as string,
                          )}
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
                          {isTicketPrevValue(
                            ticketDetails.olddescription as string,
                          )}
                          &nbsp;
                          <span className="descriptionField">
                            {parse(ticketDetails.description)}
                          </span>
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
                          {isTicketPrevValue(ticketDetails.oldstatus as string)}
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
                          {isTicketPrevValue(
                            ticketDetails.oldstartDate as string,
                          )}
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
                          {isTicketPrevValue(
                            ticketDetails.oldpriority as string,
                          )}
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
                          {isTicketPrevValue(
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
                          {isTicketPrevValue(
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
                          {isTicketPrevValue(
                            ticketDetails.oldpercentageDone as string,
                          )}
                          &nbsp;
                          {ticketDetails.percentageDone} %
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
                          {isTicketPrevValue(
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
                          {isTicketPrevValue(
                            ticketDetails.oldactualTime as string,
                          )}
                          &nbsp; {ticketDetails.actualTime} Hours
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {ticketDetails.assignee ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Assignee
                          </CFormLabel>
                          {isTicketPrevValue(
                            ticketDetails.oldassignee as string,
                          )}
                          &nbsp; {ticketDetails.assignee}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {ticketDetails.approvedByManager ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Need Approval From
                          </CFormLabel>
                          {isTicketPrevValue(
                            ticketDetails.oldapprovedByManager as string,
                          )}
                          &nbsp; {ticketDetails.approvedByManager}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {ticketDetails.endDate ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            End Date
                          </CFormLabel>
                          {isTicketPrevValue(
                            ticketDetails.oldendDate as string,
                          )}
                          &nbsp; {ticketDetails.endDate}
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
