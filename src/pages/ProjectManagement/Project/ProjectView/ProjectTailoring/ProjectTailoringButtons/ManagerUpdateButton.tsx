import { CButton } from '@coreui/react-pro'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useTypedSelector } from '../../../../../../stateStore'
import { getSaveProjectTailoringDocumentFinalData } from '../ProjectTailoringHelpers'
import {
  OutgoingSaveProjectTailoringDocument,
  ProjectTailoringStatusEnum,
} from '../../../../../../types/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringTypes'

const ManagerUpdateButton = ({
  submitDocumentHandler,
}: {
  submitDocumentHandler: (
    finalData: OutgoingSaveProjectTailoringDocument,
  ) => Promise<void>
}) => {
  const projectTailoringDocument = useTypedSelector(
    (state) => state.projectTailoring.projectTailoringDocument,
  )
  const isManagerUpdateButtonEnabled = useTypedSelector(
    (state) => state.projectTailoring.isManagerUpdateButtonEnabled,
  )
  const { projectId } = useParams<{ projectId: string }>()

  const updateButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (typeof projectTailoringDocument !== 'string') {
      const finalData = getSaveProjectTailoringDocumentFinalData(
        projectTailoringDocument.processHeaddto,
        projectId,
        ProjectTailoringStatusEnum.updated,
        projectTailoringDocument.id,
      )
      submitDocumentHandler(finalData)
    }
  }

  return (
    <>
      <CButton
        color="success"
        className="btn-ovh me-2"
        onClick={updateButtonHandler}
        data-testid="tailorManager-UpdateBtn"
        disabled={!isManagerUpdateButtonEnabled}
      >
        Update
      </CButton>
    </>
  )
}

export default ManagerUpdateButton
