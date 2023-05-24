import React from 'react'
import { CTableDataCell } from '@coreui/react-pro'
import { useTypedSelector } from '../../../../../../../stateStore'
import {
  ProcessSubHeadDTO,
  ProjectTailoringStatusEnum,
  TailoringRequiredSelectOptions,
} from '../../../../../../../types/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringTypes'
import { processedString, sqaFeatureId } from '../../ProjectTailoringHelpers'

// this component is used to render the readonly data submitted by the managers to the different screends

const SubProcessManagerTailorReadonly = ({
  subProcess,
}: {
  subProcess: ProcessSubHeadDTO
}): JSX.Element => {
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
      {(tailorStatus === ProjectTailoringStatusEnum.submitted ||
        tailorStatus === ProjectTailoringStatusEnum.updated) && (
        // manager has submitted the form and has readonly access until sqa responds
        <>
          <CTableDataCell>
            {subProcess.specificToProject ===
              TailoringRequiredSelectOptions.WaivedOff.toString() ||
            subProcess.specificToProject ===
              TailoringRequiredSelectOptions.Yes.toString() ? (
              <span
                style={{
                  backgroundColor: 'green',
                  color: 'white',
                  paddingRight: '0.2rem',
                  paddingLeft: '0.2rem',
                }}
              >
                {subProcess.specificToProject}
              </span>
            ) : (
              subProcess.specificToProject
            )}
          </CTableDataCell>
          <CTableDataCell>
            {processedString(subProcess.comments)}
          </CTableDataCell>
        </>
      )}
      {(tailorStatus === ProjectTailoringStatusEnum.approved ||
        tailorStatus === ProjectTailoringStatusEnum.rejected) &&
        sqaUserAccessAndFeatures.viewaccess && (
          // this is for sqa view only.
          <>
            <CTableDataCell>
              {subProcess.specificToProject ===
                TailoringRequiredSelectOptions.WaivedOff ||
              subProcess.specificToProject ===
                TailoringRequiredSelectOptions.Yes ? (
                <span
                  style={{
                    backgroundColor: 'green',
                    color: 'white',
                    paddingRight: '0.2rem',
                    paddingLeft: '0.2rem',
                  }}
                >
                  {subProcess.specificToProject}
                </span>
              ) : (
                subProcess.specificToProject
              )}
            </CTableDataCell>
            <CTableDataCell>
              {subProcess.comments ? subProcess.comments : 'N/A'}
            </CTableDataCell>
          </>
        )}
    </>
  )
}

export default SubProcessManagerTailorReadonly
