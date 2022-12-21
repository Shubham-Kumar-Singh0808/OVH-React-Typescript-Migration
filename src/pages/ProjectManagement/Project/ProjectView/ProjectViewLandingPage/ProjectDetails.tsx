import React from 'react'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../../stateStore'

const ProjectDetails = (): JSX.Element => {
  const getProjectDetail = useTypedSelector(
    reduxServices.projectViewDetails.selectors.projectDetail,
  )
  return (
    <>
      <div className="col-sm-3">
        <h3>JXT - UI integration</h3>
      </div>
      <div className="col-sm-3">
        <dl>
          <dt>Start Date</dt>
          <dd>{getProjectDetail.startdate}</dd>
        </dl>
        <dl>
          <dt>End Date</dt>
          <dd>{getProjectDetail.enddate}</dd>
        </dl>
        <dl>
          <dt>Status</dt>
          <dd>{getProjectDetail.status}</dd>
        </dl>
        <dl>
          <dt>customer contact Name</dt>
          <dd>{getProjectDetail.projectContactPerson}</dd>
        </dl>
        <dl>
          <dt>Platform</dt>
          <dd>{getProjectDetail.platform}</dd>
        </dl>
      </div>
      <div className="col-sm-3">
        <dl>
          <dt>Project Manager</dt>
          <dd>{getProjectDetail.managerName}</dd>
        </dl>
        <dl>
          <dt>Pricing Model</dt>
          <dd>{getProjectDetail.type}</dd>
        </dl>
        <dl>
          <dt>Client</dt>
          <dd>{getProjectDetail.client}</dd>
        </dl>
        <dl>
          <dt>Billing Contact Name</dt>
          <dd>{getProjectDetail.projectContactPerson}</dd>
        </dl>
        <dl>
          <dt>Billing Contact Email</dt>
          <dd>{getProjectDetail.billingContactPersonEmail}</dd>
        </dl>
        <dl>
          <dt>Domain</dt>
          <dd>{getProjectDetail.domain}</dd>
        </dl>
      </div>
    </>
  )
}

export default ProjectDetails
