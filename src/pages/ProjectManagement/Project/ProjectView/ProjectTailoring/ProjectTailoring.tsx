import React, { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { CCol, CRow } from '@coreui/react-pro'
import ProcessTailorTable from './ProcessTailorTable/ProcessTailorTable'
import ProjectTailoringButtons from './ProjectTailoringButtons/ProjectTailoringButtons'
import {
  checkManagerSubmitButtonEnabled,
  checkSQAApprovedButtonEnabled,
  checkSQARejectedButtonEnabled,
  getEnumValueForTailorStatus,
} from './ProjectTailoringHelpers'
import OCard from '../../../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import { reduxServices } from '../../../../../reducers/reduxServices'
import OLoadingSpinner from '../../../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../../../types/Components/loadingScreenTypes'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import {
  ProcessHeadDTO,
  ProjectTailoringStatusEnum,
} from '../../../../../types/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringTypes'
import OToast from '../../../../../components/ReusableComponent/OToast'

/*
  this component follows top-down data approach. Intially the data is stored in the redux store.
  Any changes made by the user to the data is sent to the redux store. Thereafter, The updated data
  refills the components. 
*/

const ProjectTailoring = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { projectId } = useParams<{ projectId: string }>()
  const isLoading = useTypedSelector(
    (state) => state.projectTailoring.isLoading,
  )
  const projectTailoringState = useTypedSelector(
    (state) => state.projectTailoring,
  )
  const defaultProjectTailoringDocData = useTypedSelector(
    (state) => state.projectTailoring.defaultProjectTailoringDocument,
  )
  const apiError = useTypedSelector((state) => state.projectTailoring.error)

  useEffect(() => {
    dispatch(
      reduxServices.projectTailoring.getDefaultProjectTailoringDocument('view'),
    )
    dispatch(
      reduxServices.projectTailoring.getProjectTailoringDocument(projectId),
    )
  }, [])

  console.log(useTypedSelector((state) => state.projectTailoring))

  const displayedData: ProcessHeadDTO[] = useMemo(() => {
    //this means that the document has not been initially submitted by the manager
    if (typeof projectTailoringState.projectTailoringDocument === 'string') {
      dispatch(
        reduxServices.projectTailoring.actions.setFormStatus(
          ProjectTailoringStatusEnum.initial,
        ),
      )
      return projectTailoringState.defaultProjectTailoringDocument
    }
    const tailorStatusEnum = getEnumValueForTailorStatus(
      projectTailoringState.projectTailoringDocument?.tailoringStatus,
    )
    dispatch(
      reduxServices.projectTailoring.actions.setFormStatus(tailorStatusEnum),
    )
    console.log('done')
    return projectTailoringState.projectTailoringDocument?.processHeaddto
  }, [projectTailoringState, defaultProjectTailoringDocData])

  useEffect(() => {
    dispatch(
      reduxServices.projectTailoring.actions.setManagerSubmitButton(
        checkManagerSubmitButtonEnabled(displayedData),
      ),
    )
    dispatch(
      reduxServices.projectTailoring.actions.setManagerUpdateButton(
        checkManagerSubmitButtonEnabled(displayedData),
      ),
    )
    dispatch(
      reduxServices.projectTailoring.actions.setSQAApproveButton(
        checkSQAApprovedButtonEnabled(displayedData),
      ),
    )
    dispatch(
      reduxServices.projectTailoring.actions.setSQARejectButton(
        checkSQARejectedButtonEnabled(displayedData),
      ),
    )
  }, [displayedData])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Tailoring for Project Document"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        {apiError === null ? (
          <>
            <ProcessTailorTable displayedData={displayedData} />
            <CRow>
              <CCol className="col-md-3 offset-md-4">
                <ProjectTailoringButtons />
              </CCol>
            </CRow>
          </>
        ) : (
          <OLoadingSpinner type={LoadingType.COMPONENT} />
        )}
      </OCard>
    </>
  )
}

export default ProjectTailoring
