import { CRow, CCol, CButton, CBadge } from '@coreui/react-pro'
import React from 'react'
import OCard from '../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const EmployeePipTimeline = (): JSX.Element => {
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
      <OCard
        className="mb-4 myprofile-wrapper"
        title="PIP Details"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="toggle-back-btn"
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <div className="sh-timeline-container">
          {employeePIPTimeline.map((pipDetails, index) => {
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
                </div>
              </div>
            )
          })}
        </div>
      </OCard>
    </>
  )
}

export default EmployeePipTimeline
