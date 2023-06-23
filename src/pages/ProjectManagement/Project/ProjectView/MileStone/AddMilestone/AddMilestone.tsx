import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CRow, CCol, CButton } from '@coreui/react-pro'
import AddMileStoneForm from './AddMileStoneForm'
import OCard from '../../../../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../../../../stateStore'
import { reduxServices } from '../../../../../../reducers/reduxServices'
import OLoadingSpinner from '../../../../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../../../../middleware/api/apiList'
import { LoadingType } from '../../../../../../types/Components/loadingScreenTypes'

const AddMilestone = () => {
  const dispatch = useAppDispatch()

  const getProjectDetail = useTypedSelector(
    reduxServices.projectViewDetails.selectors.projectDetail,
  )
  const isLoading = useTypedSelector(
    reduxServices.projectMileStone.selectors.isLoading,
  )

  useEffect(() => {
    dispatch(
      reduxServices.projectMileStone.getPeopleForMilestone(getProjectDetail.id),
    )
  }, [dispatch])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Add Milestone"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <Link to={`/viewProject/${getProjectDetail.id}`}>
              <CButton
                color="info"
                className="btn-ovh me-4 add-project-back-btn"
                data-testid="back-btn"
              >
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </Link>
          </CCol>
        </CRow>
        <CRow className="col-xs-12 mt10">
          <div className="panel-body">
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
          </div>
        </CRow>
        {isLoading !== ApiLoadingState.loading ? (
          <AddMileStoneForm />
        ) : (
          <OLoadingSpinner type={LoadingType.PAGE} />
        )}
      </OCard>
    </>
  )
}

export default AddMilestone
