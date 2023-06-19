import React, { useState } from 'react'
import { CRow, CCol, CButton, CTooltip } from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import ResignationTimeLine from './ResignationTimeLine'
import OCard from '../../../../components/ReusableComponent/OCard'
import { useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import OLoadingSpinner from '../../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../../types/Components/loadingScreenTypes'
import { SeparationTimeLine } from '../../../../types/Separation/ResignationList/resignationListTypes'

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
  const [isResignationTimeLineEdit, setIsResignationTimeLineEdit] =
    useState<boolean>(false)
  const [resignationId, setResignationId] = useState(0)
  const initialResignationTimeLine = {} as SeparationTimeLine
  const [editResignationTimeLine, setEditResignationTimeLine] = useState(
    initialResignationTimeLine,
  )
  const editButtonHandler = () => {
    setEditResignationTimeLine(getAllResignationHistory)
    setIsResignationTimeLineEdit(true)
    setResignationId(getAllResignationHistory.separationId)
  }
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
            {getAllResignationHistory.status === 'Resigned' &&
            userAccessEditTimeLine?.updateaccess ? (
              <CTooltip content="Edit">
                <CButton
                  color="info"
                  className="btn-ovh me-1"
                  onClick={editButtonHandler}
                >
                  <i className="fa fa-pencil-square-o"></i>Edit
                </CButton>
              </CTooltip>
            ) : (
              ''
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
            <ResignationTimeLine
              editResignationTimeLine={editResignationTimeLine}
              setEditResignationTimeLine={setEditResignationTimeLine}
              resignationId={resignationId}
              isResignationTimeLineEdit={isResignationTimeLineEdit}
            />
          </>
        ) : (
          <OLoadingSpinner type={LoadingType.PAGE} />
        )}
      </OCard>
    </>
  )
}

export default ResignationHistory
