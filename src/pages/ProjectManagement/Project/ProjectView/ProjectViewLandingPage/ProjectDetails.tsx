import { CRow, CCol, CButton } from '@coreui/react-pro'
import React from 'react'
import { Link } from 'react-router-dom'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../../stateStore'

const ProjectDetails = (): JSX.Element => {
  const getProjectDetail = useTypedSelector(
    reduxServices.projectViewDetails.selectors.projectDetail,
  )
  return (
    <>
      <CRow className="justify-content-end ">
        <CCol md={4} className="text-end position-absolute pe-0">
          <Link to={`/projectreport`}>
            <CButton
              color="info"
              className="btn-ovh me-1 add-project-back-btn"
              data-testid="toggle-back-button"
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </Link>
        </CCol>
      </CRow>
      <div className="col-sm-3 project-view-text-header">
        <h3>{getProjectDetail.projectName}</h3>
      </div>
      <div className="col-sm-3">
        <dl className="mb-0">
          <dt>Start Date</dt>
          <dd>{getProjectDetail.startdate}</dd>
        </dl>
        <dl className="mb-0">
          <dt>End Date</dt>
          <dd>{getProjectDetail.enddate}</dd>
        </dl>
        <dl className="mb-0">
          <dt>Status</dt>
          <dd>{getProjectDetail.status}</dd>
        </dl>
        <dl className="mb-0">
          <dt>customer contact Name</dt>
          <dd>{getProjectDetail.projectContactPerson}</dd>
        </dl>
        <dl className="mb-0">
          <dt>Customer Email</dt>
          <dd>{getProjectDetail.projectContactEmail}</dd>
        </dl>
        <dl className="mb-0">
          <dt>Platform</dt>
          <dd>{getProjectDetail.platform}</dd>
        </dl>
      </div>
      <div className="col-sm-3">
        <dl className="mb-0">
          <dt>Project Manager</dt>
          <dd>{getProjectDetail.managerName}</dd>
        </dl>
        <dl className="mb-0">
          <dt>Pricing Model</dt>
          <dd>
            {getProjectDetail.type?.charAt(0).toUpperCase() +
              getProjectDetail.type?.slice(1).toLowerCase()}
          </dd>
        </dl>
        <dl className="mb-0">
          <dt>Client</dt>
          <dd>{getProjectDetail.client}</dd>
        </dl>
        <dl className="mb-0">
          <dt>Billing Contact Name</dt>
          <dd>{getProjectDetail.billingContactPerson}</dd>
        </dl>
        <dl className="mb-0">
          <dt>Billing Contact Email</dt>
          <dd>{getProjectDetail.billingContactPersonEmail}</dd>
        </dl>
        <dl className="mb-0">
          <dt>Domain</dt>
          <dd>{getProjectDetail.domain}</dd>
        </dl>
      </div>
    </>
  )
}

export default ProjectDetails
