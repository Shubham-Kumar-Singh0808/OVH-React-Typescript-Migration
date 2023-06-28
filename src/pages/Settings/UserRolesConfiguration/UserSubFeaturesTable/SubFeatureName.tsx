import React from 'react'
import { CTableDataCell, CLink } from '@coreui/react-pro'
import {
  MappedSubFeatureToFeatureItem,
  UserRoleConfigurationModal,
} from '../../../../types/Settings/UserRolesConfiguration/UserRolesConfigurationTypes'
import ChildFeaturesTableModal from '../UserRolesModals/ChildFeaturesTableModal'
import { useAppDispatch } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import {
  getUserRolesConfigTestId,
  initialUserRoleConfigurationModal,
} from '../UserRolesConfigurationsHelpers'

// this component renders the sub feature name of every feature after checking
//if it has child features or not

const SubFeatureName = ({
  subFeatureItem,
}: {
  subFeatureItem: MappedSubFeatureToFeatureItem
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const nameClickHandler = () => {
    const modalObject: UserRoleConfigurationModal = {
      ...initialUserRoleConfigurationModal,
      displayModal: true,
      description: (
        <ChildFeaturesTableModal childFeatures={subFeatureItem.childFeatures} />
      ),
      modalFooterClass: 'd-none',
      confirmButtonAction: undefined,
    }
    dispatch(
      reduxServices.userRolesConfigurations.actions.setConfigurationModal(
        modalObject,
      ),
    )
  }

  return (
    <>
      {subFeatureItem.childFeatures &&
      subFeatureItem.childFeatures.length > 0 ? (
        <CTableDataCell>
          <CLink
            className="cursor-pointer text-decoration-none text-primary"
            onClick={nameClickHandler}
            data-testid={getUserRolesConfigTestId(
              `subFeatureName-${subFeatureItem.featureId}`,
            )}
          >
            {subFeatureItem.name}
          </CLink>
        </CTableDataCell>
      ) : (
        <CTableDataCell>{subFeatureItem.name}</CTableDataCell>
      )}
    </>
  )
}

export default SubFeatureName
