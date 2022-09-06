import { CBadge, CFormLabel } from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const TicketHistoryTimeLine = (): JSX.Element => {
  const ticketHistory = useTypedSelector(
    reduxServices.myTickets.selectors.ticketHistory,
  )
  return (
    <>
      <div className="sh-timeline-container">
        {ticketHistory.map((ticketDetails, index) => {
          const tracker = ticketDetails.oldtracker ? (
            <>
              &nbsp;Changed from {ticketDetails.oldtracker}
              <strong> to</strong>
            </>
          ) : (
            <></>
          )
          const ticketSubject = ticketDetails.oldsubject ? (
            <>
              &nbsp;Changed from {ticketDetails.oldsubject}
              <strong> to</strong>
            </>
          ) : (
            <></>
          )
          const ticketStatus = ticketDetails.oldstatus ? (
            <>
              &nbsp;Changed from {ticketDetails.oldstatus}
              <strong> to</strong>
            </>
          ) : (
            <></>
          )
          const ticketStartDate = ticketDetails.oldstartDate ? (
            <>
              &nbsp;Changed from {ticketDetails.oldstartDate}
              <strong> to</strong>
            </>
          ) : (
            <></>
          )
          const ticketPriority = ticketDetails.oldpriority ? (
            <>
              &nbsp;Changed from {ticketDetails.oldpriority}
              <strong> to</strong>
            </>
          ) : (
            <></>
          )
          const ticketPercentage = ticketDetails.oldpercentageDone ? (
            <>
              &nbsp;Changed from
              {ticketDetails.oldpercentageDone}
              <strong> to</strong>
            </>
          ) : (
            <></>
          )
          const ticketApproval = ticketDetails.oldapprovalStatus ? (
            <>
              &nbsp;Changed from {ticketDetails.oldapprovalStatus}
              <strong> to</strong>
            </>
          ) : (
            <></>
          )

          const ticketActualTime = ticketDetails.oldactualTime ? (
            <>
              &nbsp;Changed from {ticketDetails.oldactualTime}
              <strong> to</strong>
            </>
          ) : (
            <></>
          )
          const ticketDiscription = ticketDetails.olddescription ? (
            <>
              &nbsp;Changed from {ticketDetails.olddescription}
              <strong> to</strong>
            </>
          ) : (
            <></>
          )
          const ticketAccessStartDate = ticketDetails.oldAccessStartDate ? (
            <>
              &nbsp;Changed from {ticketDetails.oldAccessStartDate}
              <strong> to</strong>
            </>
          ) : (
            <></>
          )
          const ticketAccessEndDate = ticketDetails.oldAccessEndDate ? (
            <>
              &nbsp;Changed from {ticketDetails.oldAccessEndDate}
              <strong> to</strong>
            </>
          ) : (
            <></>
          )
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
                          {tracker}
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
                          {ticketSubject}
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
                          {ticketDiscription}
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
                          {ticketStatus}
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
                          {ticketStartDate}
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
                          {ticketPriority}
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
                          {ticketAccessStartDate}
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
                          {ticketAccessEndDate}
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
                          {ticketPercentage}
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
                          {ticketApproval}
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
                          {ticketActualTime}
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
