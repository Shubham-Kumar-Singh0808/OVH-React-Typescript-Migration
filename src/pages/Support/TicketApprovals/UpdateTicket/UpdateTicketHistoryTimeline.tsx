import { CBadge, CFormLabel } from '@coreui/react-pro'
import React from 'react'
import parse from 'html-react-parser'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const UpdateTicketHistoryTimeline = (): JSX.Element => {
  const ticketHistoryDetails = useTypedSelector(
    reduxServices.updateTicket.selectors.ticketHistoryDetails,
  )
  const isTicketPrevProp = (oldProp: string): JSX.Element => {
    return oldProp ? (
      <>
        <span>&nbsp;Changed from&nbsp;{parse(oldProp)}</span>
        &nbsp;
        <strong>to</strong>
      </>
    ) : (
      <></>
    )
  }
  const isPersistProp = (type: string) => {
    if (type === 'UPDATED') {
      return (
        <CBadge className="rounded-pill" color="info" data-testid="update-btn">
          Updated
        </CBadge>
      )
    } else if (type === 'CREATED') {
      return (
        <CBadge
          className="rounded-pill"
          color="success"
          data-testid="created-btn"
        >
          Created
        </CBadge>
      )
    } else if (type === 'CANCELLED') {
      return (
        <CBadge className="rounded-pill" color="warning">
          Cancelled
        </CBadge>
      )
    } else if (type === 'REJECTED') {
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
        {ticketHistoryDetails.length > 0 &&
          ticketHistoryDetails?.map((currTicketDetail, index) => {
            return (
              <div key={index} className="sh-timeline-card">
                <div
                  className="sh-timeline-timestamp"
                  data-testid="sh-time-stamp"
                >
                  {currTicketDetail.modifiedDate}
                </div>
                <div className="sh-timeline-content">
                  <div
                    className="sh-timeline-header mb-4 clearfix"
                    data-testid="sh-modifiedBy"
                  >
                    <h4 className="sh-timeline-title">
                      {currTicketDetail.modifiedBy} -
                    </h4>
                    <span className="sh-timeline-status">
                      {isPersistProp(currTicketDetail.persistType)}
                    </span>
                  </div>
                  <div className="sh-timeline-body">
                    <div className="sh-timeline-item mb-1">
                      {currTicketDetail.tracker ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Tracker Type
                            </CFormLabel>
                            {isTicketPrevProp(
                              currTicketDetail.oldtracker as string,
                            )}
                            &nbsp;
                            {currTicketDetail.tracker}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {currTicketDetail.subject ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Subject
                            </CFormLabel>
                            {isTicketPrevProp(
                              currTicketDetail.oldsubject as string,
                            )}
                            &nbsp;
                            {currTicketDetail.subject}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {currTicketDetail.description ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Description
                            </CFormLabel>
                            <span className="descriptionField">
                              {isTicketPrevProp(
                                currTicketDetail.olddescription as string,
                              )}
                            </span>
                            &nbsp;
                            <span className="descriptionField">
                              {parse(currTicketDetail.description)}
                            </span>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {currTicketDetail.status ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Status
                            </CFormLabel>
                            {isTicketPrevProp(
                              currTicketDetail.oldstatus as string,
                            )}
                            &nbsp;
                            {currTicketDetail.status}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {currTicketDetail.startDate ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Start Date
                            </CFormLabel>
                            {isTicketPrevProp(
                              currTicketDetail.oldstartDate as string,
                            )}
                            &nbsp;
                            {currTicketDetail.startDate}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {currTicketDetail.priority ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Priority
                            </CFormLabel>
                            {isTicketPrevProp(
                              currTicketDetail.oldpriority as string,
                            )}
                            &nbsp;
                            {currTicketDetail.priority}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {currTicketDetail.accessStartDate ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Access Start Date
                            </CFormLabel>
                            {isTicketPrevProp(
                              currTicketDetail.oldAccessStartDate as string,
                            )}
                            &nbsp;
                            {currTicketDetail.accessStartDate}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {currTicketDetail.accessEndDate ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Access End Date
                            </CFormLabel>
                            {isTicketPrevProp(
                              currTicketDetail.oldAccessEndDate as string,
                            )}
                            &nbsp;
                            {currTicketDetail.accessEndDate}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {currTicketDetail.percentageDone ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Percentage
                            </CFormLabel>
                            {isTicketPrevProp(
                              currTicketDetail.oldpercentageDone as string,
                            )}
                            &nbsp;
                            {currTicketDetail.percentageDone} %
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {currTicketDetail.approvalStatus ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Permission Status
                            </CFormLabel>
                            {isTicketPrevProp(
                              currTicketDetail.oldapprovalStatus as string,
                            )}
                            &nbsp;
                            {currTicketDetail.approvalStatus}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {currTicketDetail.actualTime ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Spent Time
                            </CFormLabel>
                            {isTicketPrevProp(
                              currTicketDetail.oldactualTime as string,
                            )}
                            &nbsp; {currTicketDetail.actualTime} Hours
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {currTicketDetail.assignee ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Assignee
                            </CFormLabel>
                            {isTicketPrevProp(
                              currTicketDetail.oldassignee as string,
                            )}
                            &nbsp; {currTicketDetail.assignee}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {currTicketDetail.approvedByManager ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Need Approval From
                            </CFormLabel>
                            {isTicketPrevProp(
                              currTicketDetail.oldapprovedByManager as string,
                            )}
                            &nbsp; {currTicketDetail.approvedByManager}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {currTicketDetail.endDate ? (
                        <>
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              End Date
                            </CFormLabel>
                            {isTicketPrevProp(
                              currTicketDetail.oldendDate as string,
                            )}
                            &nbsp; {currTicketDetail.endDate}
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
export default UpdateTicketHistoryTimeline
