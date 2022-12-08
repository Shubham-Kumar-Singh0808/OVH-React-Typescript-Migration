import { CBadge } from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const ProjectRequestTimeLine = (): JSX.Element => {
  const projectCreationRequestHistory = useTypedSelector(
    reduxServices.projectCreationRequest.selectors.projectHistoryDetails,
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
          CREATED
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
        {projectCreationRequestHistory?.map((projectHistory, index) => {
          return (
            <div key={index} className="sh-timeline-card">
              <div
                className="sh-timeline-timestamp"
                data-testid="sh-time-stamp"
              >
                {projectHistory.modifiedDate}
              </div>
              <div className="sh-timeline-content">
                <div
                  className="sh-timeline-header mb-4 clearfix"
                  data-testid="sh-modifiedBy"
                >
                  <h4 className="sh-timeline-title">
                    {projectHistory.employeeName} -
                  </h4>
                  <span className="sh-timeline-status">
                    {isPersistValue(projectHistory.persistType)}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default ProjectRequestTimeLine
