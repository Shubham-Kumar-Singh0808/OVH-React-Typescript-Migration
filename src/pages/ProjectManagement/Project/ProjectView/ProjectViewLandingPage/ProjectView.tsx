import React, { useEffect } from 'react'
import { CCol, CRow } from '@coreui/react-pro'
import { useParams } from 'react-router-dom'
import ProjectDetails from './ProjectDetails'
import ProjectViewTabs from './ProjectViewTabs'
import OCard from '../../../../../components/ReusableComponent/OCard'
import OLoadingSpinner from '../../../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import { LoadingType } from '../../../../../types/Components/loadingScreenTypes'

const ProjectView = (): JSX.Element => {
  const isLoading = useTypedSelector(
    reduxServices.projectViewDetails.selectors.isLoading,
  )
  const { projectId } = useParams<{ projectId: string }>()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.projectViewDetails.getProjectDetails(projectId))
    dispatch(reduxServices.projectViewDetails.getProject(projectId))
  }, [])
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Project Details"
        CBodyClassName="ps-0 pe-0 row"
        CFooterClassName="d-none"
      >
        {isLoading !== ApiLoadingState.loading ? (
          <>
            <ProjectDetails />
            <div className="mt-5">
              <ProjectViewTabs />
            </div>
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

export default ProjectView
