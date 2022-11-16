import { CBadge, CFormLabel } from '@coreui/react-pro'
import React from 'react'
import parse from 'html-react-parser'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const TicketHistoryTimeLine = (): JSX.Element => {
  const ticketHistory = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.ticketHistory,
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
        <CBadge
          className="rounded-pill"
          color="info"
          data-testid="th-update-btn"
        >
          Updated
        </CBadge>
      )
    } else if (persistType === 'CREATED') {
      return (
        <CBadge
          className="rounded-pill"
          color="success"
          data-testid="th-created-btn"
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
        {ticketHistory?.list?.map((ticketDetails, index) => {
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
                    {ticketDetails.subCategoryName ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Sub-Category Name
                          </CFormLabel>
                          {isTicketPrevValue(
                            ticketDetails.oldticketsSubCategoryName,
                          )}
                          &nbsp;
                          {ticketDetails.subCategoryName}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {ticketDetails.estimatedTime ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Estimated Time
                          </CFormLabel>
                          {isTicketPrevValue(ticketDetails.oldestimatedTime)}
                          &nbsp;
                          {ticketDetails.estimatedTime}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {ticketDetails.workFlow ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Work Flow
                          </CFormLabel>
                          {isTicketPrevValue(ticketDetails.oldworkFlow)}
                          &nbsp;
                          {ticketDetails.workFlow}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {ticketDetails.levelOfHierarchy ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Hierarchy Level
                          </CFormLabel>
                          {isTicketPrevValue(
                            ticketDetails?.oldlevelOfHierarchy,
                          )}
                          &nbsp;
                          {ticketDetails.levelOfHierarchy}
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
