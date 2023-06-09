import React from 'react'
import { CTableHeaderCell } from '@coreui/react-pro'
import { useTypedSelector } from '../../../../../../../stateStore'
import { ProjectTailoringStatusEnum } from '../../../../../../../types/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringTypes'
import { managerFeatureId, sqaFeatureId } from '../../ProjectTailoringHelpers'

const TailoringJustificationColumns = (): JSX.Element => {
  const tailorStatus = useTypedSelector(
    (state) => state.projectTailoring.tailorStatus,
  )
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

  return (
    <>
      {managerUserAccessToFeatures?.updateaccess &&
        !sqaUserAccessToFeatures?.viewaccess && (
          // for manager this is shown compulsorly
          <>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Tailoring Needed(Y/N)
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Justification
            </CTableHeaderCell>
          </>
        )}
      {managerUserAccessToFeatures?.updateaccess &&
        sqaUserAccessToFeatures?.viewaccess && (
          // for admin this is shown compulsorly
          <>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Tailoring Needed(Y/N)
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Justification
            </CTableHeaderCell>
          </>
        )}
      {!managerUserAccessToFeatures?.updateaccess &&
        sqaUserAccessToFeatures?.viewaccess &&
        (tailorStatus === ProjectTailoringStatusEnum.approved ||
          tailorStatus === ProjectTailoringStatusEnum.updated ||
          tailorStatus === ProjectTailoringStatusEnum.submitted ||
          tailorStatus === ProjectTailoringStatusEnum.rejected) && (
          // for sqa only
          <>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Tailoring Needed(Y/N)
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Justification
            </CTableHeaderCell>
          </>
        )}
    </>
  )
}

export default TailoringJustificationColumns
