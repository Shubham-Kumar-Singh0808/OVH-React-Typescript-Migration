import React from 'react'
import { CTableRow, CTableDataCell, CLink } from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import SubProcessManagerInput from './SubProcessTailorTableComponents/SubProcessManagerInput'
import SubProcessSQAInput from './SubProcessTailorTableComponents/SubProcessSQAInput'
import SubProcessSQAReadonly from './SubProcessTailorTableComponents/SubProcessSQAReadonly'
import SubProcessManagerTailorReadonly from './SubProcessTailorTableComponents/SubProcessManagerTailorReadonly'
import {
  ProcessSubHeadDTO,
  ProjectTailoringStatusEnum,
} from '../../../../../../types/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringTypes'
import { useTypedSelector } from '../../../../../../stateStore'
import {
  isManagerAllowedToEdit,
  managerFeatureId,
  sqaFeatureId,
} from '../ProjectTailoringHelpers'

const SubProcessTailorTableRow = ({
  subProcess,
  processHeadId,
  subProcessIndex,
}: {
  subProcess: ProcessSubHeadDTO
  processHeadId: number
  subProcessIndex: number
}): JSX.Element => {
  const tailorStatus = useTypedSelector(
    (state) => state.projectTailoring.tailorStatus,
  )
  const managerUserAccessToFeatures = useTypedSelector(
    (state) =>
      state.userAccessToFeatures.userAccessToFeatures.filter(
        (feature) => feature.featureId === managerFeatureId,
      )[0],
  )
  const sqaUserAccessAndFeatures = useTypedSelector(
    (state) =>
      state.userAccessToFeatures.userAccessToFeatures.filter(
        (feature) => feature.featureId === sqaFeatureId,
      )[0],
  )

  return (
    <CTableRow data-testid={`subProcesses-${processHeadId}`}>
      <CTableDataCell>{subProcessIndex + 1}</CTableDataCell>
      <CTableDataCell>{subProcess.processSubHeadName}</CTableDataCell>
      <CTableDataCell>
        <CLink
          className="text-decoration-hover"
          onClick={() => {
            window.open(`${subProcess.link}`, '_blank')
          }}
        >
          {subProcess.documentName}
        </CLink>
      </CTableDataCell>
      <CTableDataCell>{subProcess.responsible}</CTableDataCell>
      {/* readonly for tailoing select */}
      <SubProcessManagerTailorReadonly subProcess={subProcess} />
      {isManagerAllowedToEdit(tailorStatus) &&
        managerUserAccessToFeatures?.createaccess && (
          // once it is approved/rejected by sqa/ is initial, manager can edit it
          // updated - after approval/rejection, manager can update the document again
          <SubProcessManagerInput
            selectTailorValue={subProcess.specificToProject}
            managerComments={subProcess.comments}
            processHeadId={processHeadId}
            processSubHeadId={subProcess.processSubHeadId}
          />
        )}
      {(tailorStatus === ProjectTailoringStatusEnum.submitted ||
        tailorStatus === ProjectTailoringStatusEnum.updated) &&
        sqaUserAccessAndFeatures?.viewaccess && (
          // sqa can give their approval or rejection after submitted by manager
          <SubProcessSQAInput
            selectSQAStatus={subProcess.sqaApproval}
            sqaComments={subProcess.sqaComments}
            processHeadId={processHeadId}
            processSubHeadId={subProcess.processSubHeadId}
          />
        )}
      {tailorStatus === ProjectTailoringStatusEnum.updated &&
        managerUserAccessToFeatures.updateaccess && (
          <SubProcessSQAReadonly
            sqaApproval={subProcess.sqaApproval}
            sqaComments={subProcess.sqaComments}
            processHeadId={processHeadId}
            processSubHeadId={subProcess.processSubHeadId}
          />
        )}
      {(tailorStatus === ProjectTailoringStatusEnum.approved ||
        tailorStatus === ProjectTailoringStatusEnum.rejected) && (
        // after the document is approved/rejected, both sqa and managers have
        // readonly access until manager updates it again. Then sqa will have edit access
        <SubProcessSQAReadonly
          sqaApproval={subProcess.sqaApproval}
          sqaComments={subProcess.sqaComments}
          processHeadId={processHeadId}
          processSubHeadId={subProcess.processSubHeadId}
        />
      )}
    </CTableRow>
  )
}

export default SubProcessTailorTableRow
