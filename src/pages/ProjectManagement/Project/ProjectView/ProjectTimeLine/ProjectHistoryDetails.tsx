import { CCol, CRow } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProjectHistoryTimeLine from './ProjectHistoryTimeLine'
import OCard from '../../../../../components/ReusableComponent/OCard'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import OLoadingSpinner from '../../../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../../../types/Components/loadingScreenTypes'

const ProjectHistoryDetails = (): JSX.Element => {
  const { projectId } = useParams<{ projectId: string }>()
  const isLoading = useTypedSelector(
    reduxServices.projectTimeLine.selectors.isLoading,
  )

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.projectTimeLine.projectHistoryDetails(projectId))
  }, [])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Project History Details"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        {isLoading !== ApiLoadingState.loading ? (
          <>
            <ProjectHistoryTimeLine />
          </>
        ) : (
          <CCol>
            <CRow className="category-loading-spinner">
              <OLoadingSpinner type={LoadingType.PAGE} />
            </CRow>
          </CCol>
        )}
      </OCard>
    </>
  )
}

export default ProjectHistoryDetails
