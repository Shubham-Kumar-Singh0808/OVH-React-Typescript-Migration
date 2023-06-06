import React from 'react'
import { CBadge, CFormLabel } from '@coreui/react-pro'
import parse from 'html-react-parser'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const EmployeePipTimelineOptions = (): JSX.Element => {
  const employeePIPTimeline = useTypedSelector(
    reduxServices.pipList.selectors.employeePIPTimeline,
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
    } else {
      return ''
    }
  }

  const isTicketPrevValue = (oldValue: string | null): JSX.Element => {
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
      {' '}
      <div className="sh-timeline-container">
        {employeePIPTimeline.map((pipDetails, index) => {
          const condition = pipDetails.pipflag === 'true' ? 'In PIP' : ''
          return (
            <div key={index} className="sh-timeline-card">
              <div
                className="sh-timeline-timestamp"
                data-testid="sh-time-stamp"
              >
                {pipDetails.modifiedDate}
              </div>
              <div className="sh-timeline-content">
                <div
                  className="sh-timeline-header mb-4 clearfix"
                  data-testid="sh-modifiedBy"
                >
                  <h4 className="sh-timeline-title">
                    {pipDetails.modifiedBy} -
                  </h4>
                  <span className="sh-timeline-status">
                    {isPersistValue(pipDetails.persistType)}
                  </span>
                </div>
                <div className="sh-timeline-body">
                  <div className="sh-timeline-item mb-1"></div>
                  {pipDetails.pipflag ? (
                    <>
                      <div className="mb-1">
                        <CFormLabel className="col-form-label p-0">
                          PIP Status
                        </CFormLabel>
                        &nbsp;
                        {condition}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {pipDetails.rating ? (
                    <>
                      <div className="mb-1">
                        <CFormLabel className="col-form-label p-0">
                          Rating
                        </CFormLabel>
                        {isTicketPrevValue(pipDetails.oldRating)}
                        &nbsp;
                        {pipDetails.rating}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {pipDetails.remarks ? (
                    <>
                      <div className="mb-1">
                        <CFormLabel className="col-form-label p-0">
                          Reason for PIP
                        </CFormLabel>
                        {isTicketPrevValue(pipDetails.oldRemarks)}
                        &nbsp;
                        <span className="descriptionField">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: pipDetails.remarks,
                            }}
                          />
                        </span>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {pipDetails.improvement ? (
                    <>
                      <div className="mb-1">
                        <CFormLabel className="col-form-label p-0">
                          Improvement Plan
                        </CFormLabel>
                        {isTicketPrevValue(pipDetails.oldImprovement)}
                        &nbsp;
                        <span className="descriptionField">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: pipDetails.improvement,
                            }}
                          />
                        </span>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {pipDetails.startDate ? (
                    <>
                      <div className="mb-1">
                        <CFormLabel className="col-form-label p-0">
                          Start Date
                        </CFormLabel>
                        {isTicketPrevValue(pipDetails.oldStartDate)}
                        &nbsp;
                        {pipDetails.startDate}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {pipDetails.endDate ? (
                    <>
                      <div className="mb-1">
                        <CFormLabel className="col-form-label p-0">
                          End Date
                        </CFormLabel>
                        {isTicketPrevValue(pipDetails.oldEndDate)}
                        &nbsp;
                        {pipDetails.endDate}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {pipDetails.extendDate ? (
                    <>
                      <div className="mb-1">
                        <CFormLabel className="col-form-label p-0">
                          Extended Date
                        </CFormLabel>
                        {isTicketPrevValue(pipDetails.oldExtendDate)}
                        &nbsp;
                        {pipDetails.extendDate}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default EmployeePipTimelineOptions
