import React from 'react'
import { CButton } from '@coreui/react-pro'
import { useParams } from 'react-router-dom'
import {
  OutgoingSaveProjectTailoringDocument,
  OutgoingSaveProjectTailoringDocumentInitial,
  ProjectTailoringStatusEnum,
} from '../../../../../../types/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringTypes'
import { useAppDispatch, useTypedSelector } from '../../../../../../stateStore'
import { reduxServices } from '../../../../../../reducers/reduxServices'
import OToast from '../../../../../../components/ReusableComponent/OToast'
import { getSaveProjectTailoringDocumentInitialManagerFinalData } from '../ProjectTailoringHelpers'

/*
  When the data is being filled for the first time by the manager the following buttons are rendered
*/

const InitialManagerButtons = ({
  submitDocumentHandler,
}: {
  submitDocumentHandler: (
    finalData:
      | OutgoingSaveProjectTailoringDocumentInitial
      | OutgoingSaveProjectTailoringDocument,
  ) => Promise<void>
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const defaultProjectTailoringDocument = useTypedSelector(
    (state) => state.projectTailoring.defaultProjectTailoringDocument,
  )
  const isManagerSubmitButtonEnabled = useTypedSelector(
    (state) => state.projectTailoring.isManagerSubmitButtonEnabled,
  )
  const tailorStatus = useTypedSelector(
    (state) => state.projectTailoring.tailorStatus,
  )
  const { projectId } = useParams<{ projectId: string }>()

  const renderSaveToast = () => {
    dispatch(
      reduxServices.app.actions.addToast(
        <OToast
          toastColor="success"
          toastMessage={`Project Tailoring Saved Successfully`}
        />,
      ),
    )
    dispatch(
      reduxServices.projectTailoring.getProjectTailoringDocument(projectId),
    )
  }

  const saveButtonHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const finalData = getSaveProjectTailoringDocumentInitialManagerFinalData(
      defaultProjectTailoringDocument,
      projectId,
      ProjectTailoringStatusEnum.saveForManager,
    )
    if (tailorStatus === ProjectTailoringStatusEnum.saveForManager) {
      // if manager is saving an already saved document, then we have to use different api for that
      const savedFinalData: OutgoingSaveProjectTailoringDocument = {
        ...finalData,
        id: +projectId,
        rejectComments: null,
      }
      submitDocumentHandler(savedFinalData)
      return
    }
    const result = await dispatch(
      reduxServices.projectTailoring.saveProjectTailoringDocumentForManager(
        finalData,
      ),
    )
    if (
      reduxServices.projectTailoring.saveProjectTailoringDocumentForManager.fulfilled.match(
        result,
      )
    ) {
      renderSaveToast()
    }
  }

  const submitButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const finalData = getSaveProjectTailoringDocumentInitialManagerFinalData(
      defaultProjectTailoringDocument,
      projectId,
      ProjectTailoringStatusEnum.submitted,
    )
    submitDocumentHandler(finalData)
  }

  return (
    <>
      <CButton
        color="success"
        className="btn-ovh me-2"
        data-testid="saveBtn-manager"
        onClick={saveButtonHandler}
      >
        Save
      </CButton>
      <CButton
        color="success"
        className="btn-ovh"
        onClick={submitButtonHandler}
        data-testid="submitBtn-manager"
        disabled={!isManagerSubmitButtonEnabled}
      >
        Submit
      </CButton>
    </>
  )
}

export default InitialManagerButtons
