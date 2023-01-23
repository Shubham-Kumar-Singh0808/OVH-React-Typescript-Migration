import React from 'react'
import { CRow, CCol, CButton } from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import MileStoneTimeLine from './MileStoneTimeLine'
import OCard from '../../../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../../../stateStore'
import OLoadingSpinner from '../../../../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../../../../types/Components/loadingScreenTypes'
import { ApiLoadingState } from '../../../../../../middleware/api/apiList'

const MileStoneHistory = (): JSX.Element => {
  const getProjectDetail = useTypedSelector(
    reduxServices.projectViewDetails.selectors.projectDetail,
  )
  const isLoading = useTypedSelector(
    reduxServices.projectMileStone.selectors.isLoading,
  )

  return (
    <>
      {isLoading !== ApiLoadingState.loading ? (
        <>
          <OCard
            className="mb-4 myprofile-wrapper"
            title="Milestone History Details"
            CBodyClassName="ps-0 pe-0"
            CFooterClassName="d-none"
          >
            <CRow className="justify-content-end">
              <CCol className="text-end" md={4}>
                <Link to={`/viewProject/${getProjectDetail.id}`}>
                  <CButton
                    color="info"
                    className="btn-ovh me-1"
                    data-testid="back-btn"
                  >
                    <i className="fa fa-arrow-left  me-1"></i>Back
                  </CButton>
                </Link>
              </CCol>
            </CRow>
            <CRow className="col-xs-12 mt10">
              <div className="panel-body">
                <p className="ng-binding">
                  <span className="text-info">Project Name:</span>
                  {getProjectDetail.projectName}
                </p>
                <p className="ng-binding">
                  <span className="text-info">Project Manager:</span>
                  {getProjectDetail.managerName}
                </p>
                <p className="ng-binding">
                  <span className="text-info">Project Status:</span>
                  {getProjectDetail.status}
                </p>
                <p className="ng-binding">
                  <span className="text-info">Milestone Name:</span>
                  {/* {getProjectDetail.tit} */}
                </p>
              </div>
            </CRow>
            <MileStoneTimeLine />
          </OCard>
        </>
      ) : (
        <CCol>
          <CRow className="category-loading-spinner">
            <OLoadingSpinner type={LoadingType.PAGE} />
          </CRow>
        </CCol>
      )}
    </>
  )
}

export default MileStoneHistory
