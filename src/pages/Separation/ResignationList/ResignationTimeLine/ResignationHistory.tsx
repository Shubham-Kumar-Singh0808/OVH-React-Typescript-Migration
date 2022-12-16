import React from 'react'
import { CRow, CCol, CButton } from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import ResignationTimeLine from './ResignationTimeLine'
import OCard from '../../../../components/ReusableComponent/OCard'
import { useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import OLoadingSpinner from '../../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../../types/Components/loadingScreenTypes'

const ResignationHistory = (): JSX.Element => {
  const isLoading = useTypedSelector(
    reduxServices.resignationList.selectors.isLoading,
  )

  const getAllResignationHistory = useTypedSelector(
    reduxServices.resignationList.selectors.resignationTimeLine,
  )

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccessEditTimeLine = userAccessToFeatures?.find(
    (feature) => feature.name === 'Separation',
  )
  console.log(userAccessEditTimeLine)
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Timeline"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            {getAllResignationHistory.status === 'Relieved' ? (
              ''
            ) : (
              <CButton color="info" className="btn-ovh me-1">
                <i className="fa fa-arrow-left  me-1"></i>Edit
              </CButton>
            )}
            <Link to={`/resignationList`}>
              <CButton color="info" className="btn-ovh me-1">
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </Link>
          </CCol>
        </CRow>
        {isLoading !== ApiLoadingState.loading ? (
          <>
            <ResignationTimeLine />
          </>
        ) : (
          <OLoadingSpinner type={LoadingType.PAGE} />
        )}
      </OCard>
    </>
  )
}

export default ResignationHistory
