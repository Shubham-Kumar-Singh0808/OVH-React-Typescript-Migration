import React from 'react'
import { CTableDataCell } from '@coreui/react-pro'
import { useTypedSelector } from '../../../../../../../stateStore'
import {
  ProcessSubHeadDTO,
  ProjectTailoringStatusEnum,
} from '../../../../../../../types/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringTypes'
import { sqaFeatureId } from '../../ProjectTailoringHelpers'

// this component is used to render the readonly data submitted by the managers to the different screends

const SubProcessManagerTailorReadonly = ({
  subProcess,
}: {
  subProcess: ProcessSubHeadDTO
}) => {
  const tailorStatus = useTypedSelector(
    (state) => state.projectTailoring.tailorStatus,
  )
  const sqaUserAccessAndFeatures = useTypedSelector(
    (state) =>
      state.userAccessToFeatures.userAccessToFeatures.filter(
        (feature) => feature.featureId === sqaFeatureId,
      )[0],
  )
  return (
    <>
      {tailorStatus === ProjectTailoringStatusEnum.submitted && (
        // manager has submitted the form and has readonly access until sqa responds
        <>
          <CTableDataCell>{subProcess.specificToProject}</CTableDataCell>
          <CTableDataCell>
            {subProcess.comments ? subProcess.comments : 'N/A'}
          </CTableDataCell>
        </>
      )}
      {(tailorStatus === ProjectTailoringStatusEnum.approved ||
        tailorStatus === ProjectTailoringStatusEnum.rejected) &&
        sqaUserAccessAndFeatures.viewaccess && (
          // this is for sqa view only.
          <>
            <CTableDataCell>{subProcess.specificToProject}</CTableDataCell>
            <CTableDataCell>
              {subProcess.comments ? subProcess.comments : 'N/A'}
            </CTableDataCell>
          </>
        )}
    </>
  )
}

export default SubProcessManagerTailorReadonly
