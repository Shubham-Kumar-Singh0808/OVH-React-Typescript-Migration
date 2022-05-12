import { CBadge, CFormLabel } from '@coreui/react-pro'

import React from 'react'

const ProfileHistoryTimeLine = (): JSX.Element => {
  return (
    <>
      <div className="sh-timeline-container">
        <div className="sh-timeline-card">
          <div className="sh-timeline-timestamp">09-Apr-2022 10:16:48 AM</div>
          <div className="sh-timeline-content">
            <div className="sh-timeline-header mb-4 clearfix">
              <h4 className="sh-timeline-title">Basheer -</h4>
              <span className="sh-timeline-status">
                <CBadge className="rounded-pill" color="success">
                  curItem.persistType
                </CBadge>
              </span>
            </div>
            <div className="sh-timeline-body">
              <p className="sh-timeline-item mb-1">
                <CFormLabel className="col-form-label p-0">
                  Person Name
                </CFormLabel>
                Basheer
              </p>
            </div>
          </div>
        </div>
        <div className="sh-timeline-card">
          <div className="sh-timeline-timestamp">09-Apr-2022 10:16:48 AM</div>
          <div className="sh-timeline-content">
            <div className="sh-timeline-header mb-4 clearfix">
              <h4 className="sh-timeline-title">Basheer -</h4>
              <span className="sh-timeline-status">
                <CBadge className="rounded-pill" color="success">
                  curItem.persistType
                </CBadge>
              </span>
            </div>
            <div className="sh-timeline-body">
              <p className="sh-timeline-item mb-1">
                <CFormLabel className="col-form-label p-0">
                  Person Name
                </CFormLabel>
                Basheer
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileHistoryTimeLine
