import { CRow, CCol, CButton } from '@coreui/react-pro'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import AddMilestoneForm from './AddMilestoneForm'
import OCard from '../../../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../../../stateStore'

const AddMilestone = (): JSX.Element => {
  const getProjectDetail = useTypedSelector(
    reduxServices.projectViewDetails.selectors.projectDetail,
  )

  const history = useHistory()

  const backButtonHandler = () => {
    history.goBack()
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Project Details"
        CBodyClassName="ps-0 pe-0 row"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end ">
          <CCol md={4} className="text-end position-absolute pe-0">
            <CButton
              color="info"
              className="btn-ovh me-1 add-project-back-btn"
              data-testid="toggle-back-button"
              onClick={backButtonHandler}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <div className="col-sm-3 project-view-text-header">
          <h3>{getProjectDetail.projectName}</h3>
        </div>
        <div className="col-sm-2">
          <dl>
            <dt>Start Date</dt>
            <dd ng-bind="ProjectData.startdate" className="ng-binding">
              {getProjectDetail.startdate}
            </dd>
          </dl>
        </div>
        <div className="col-sm-2 ng-scope" ng-if="ProjectData.enddate!=''">
          <dl className="">
            <dt>End Date</dt>
            <dd ng-bind="ProjectData.enddate" className="ng-binding">
              {getProjectDetail.enddate}
            </dd>
          </dl>
        </div>
        <div className="col-md-2">
          <dl className="">
            <dt>Project Manager</dt>
            <dd ng-bind="ProjectData.managerName" className="ng-binding">
              {getProjectDetail.managerName}
            </dd>
          </dl>
        </div>
        <div className="col-md-2">
          <dl className="">
            <dt>Project Type</dt>
            <dd ng-bind="ProjectData.type" className="ng-binding">
              {getProjectDetail.type}
            </dd>
          </dl>
        </div>
        <AddMilestoneForm />
      </OCard>
    </>
  )
}

export default AddMilestone
