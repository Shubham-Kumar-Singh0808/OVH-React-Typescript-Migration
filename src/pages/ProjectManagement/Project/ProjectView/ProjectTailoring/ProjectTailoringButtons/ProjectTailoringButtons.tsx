import React from 'react'
import SQAButtons from './SQAButtons'
import InitialManagerButtons from './InitialManagerButtons'
import ManagerUpdateButton from './ManagerUpdateButton'
import { useAppDispatch, useTypedSelector } from '../../../../../../stateStore'
import {
  OutgoingSaveProjectTailoringDocument,
  OutgoingSaveProjectTailoringDocumentInitial,
  ProjectTailoringStatusEnum,
} from '../../../../../../types/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringTypes'
import { reduxServices } from '../../../../../../reducers/reduxServices'
import OToast from '../../../../../../components/ReusableComponent/OToast'
import { managerFeatureId, sqaFeatureId } from '../ProjectTailoringHelpers'

const ProjectTailoringButtons = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const managerUserAccessToFeatures = useTypedSelector(
    (state) =>
      state.userAccessToFeatures.userAccessToFeatures.filter(
        (feature) => feature.featureId === managerFeatureId,
      )[0],
  )
  const sqaUserAccessToFeatures = useTypedSelector(
    (state) =>
      state.userAccessToFeatures.userAccessToFeatures.filter(
        (feature) => feature.featureId === sqaFeatureId,
      )[0],
  )

  const tailorStatus = useTypedSelector(
    (state) => state.projectTailoring.tailorStatus,
  )
  // this is used for buttons - submit, update button for managers, approve, reject button for sqa managers
  const submitDocumentHandler = async (
    finalData:
      | OutgoingSaveProjectTailoringDocumentInitial
      | OutgoingSaveProjectTailoringDocument,
  ) => {
    const result = await dispatch(
      reduxServices.projectTailoring.saveProjectTailoringDocument(finalData),
    )
    if (
      reduxServices.projectTailoring.saveProjectTailoringDocument.fulfilled.match(
        result,
      )
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastMessage={`Project Tailoring ${finalData.tailoringStatus} Successfully`}
            toastColor="success"
          />,
        ),
      )
    }
  }

  return (
    <>
      {(tailorStatus === ProjectTailoringStatusEnum.submitted ||
        tailorStatus === ProjectTailoringStatusEnum.updated) &&
        // manager has submitted document, and the sqa can see the approve, reject buttons
        sqaUserAccessToFeatures.viewaccess && (
          <SQAButtons submitDocumentHandler={submitDocumentHandler} />
        )}

      {(tailorStatus === ProjectTailoringStatusEnum.initial ||
        tailorStatus === ProjectTailoringStatusEnum.saveForManager) &&
        //save and submit buttons displayed to manager only when he/she is submitting for first time
        managerUserAccessToFeatures?.createaccess && (
          <InitialManagerButtons
            submitDocumentHandler={submitDocumentHandler}
          />
        )}

      {tailorStatus ===
        // sqa has approved/rejected document and manager can update it thereafter
        (ProjectTailoringStatusEnum.approved ||
          ProjectTailoringStatusEnum.rejected) &&
        managerUserAccessToFeatures.updateaccess && (
          <ManagerUpdateButton submitDocumentHandler={submitDocumentHandler} />
        )}

      {/* {tailorStatus === ProjectTailoringStatusEnum.updated} */}
    </>
  )
}

export default ProjectTailoringButtons
