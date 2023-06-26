import React, { useEffect, useState } from 'react'
import UserRolesSelect from './UserRolesSelect'
import UserRolesAddDelete from './UserRolesAddDelete'
import UserFeaturesTable from './UserFeaturesTable'
import { initialUserRole } from './UserRolesConfigurationsHelpers'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OCard from '../../../components/ReusableComponent/OCard'
import { IncomingUserRole } from '../../../types/Settings/UserRolesConfiguration/UserRolesConfigurationTypes'
import { mapFeaturesToSubFeaturesRoleConfiguration } from '../../../utils/rolesAndPermissionsUtils'
import OModal from '../../../components/ReusableComponent/OModal'

const UserRolesConfiguration = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [selectedRole, setSelectedRole] =
    useState<IncomingUserRole>(initialUserRole)
  const featuresUnderRole = useTypedSelector(
    (state) => state.userRolesConfiguration.featuresUnderRole,
  )
  const subFeatures = useTypedSelector(
    (state) => state.userRolesConfiguration.subFeatures,
  )
  const configurationModal = useTypedSelector(
    (state) => state.userRolesConfiguration.configurationModal,
  )
  useEffect(() => {
    dispatch(reduxServices.userRolesConfigurations.getUserRolesThunk())
    dispatch(reduxServices.userRolesConfigurations.getUserRoleSubFeatureThunk())
  }, [])

  useEffect(() => {
    // whenever the featuresUnderRole changes, we have to map the features again
    dispatch(
      reduxServices.userRolesConfigurations.actions.setMappedFeatures(
        mapFeaturesToSubFeaturesRoleConfiguration(
          featuresUnderRole,
          subFeatures,
        ),
      ),
    )
  }, [featuresUnderRole])

  useEffect(() => {
    // if selected default value, the table must disappear
    if (selectedRole.roleId === initialUserRole.roleId) {
      dispatch(
        reduxServices.userRolesConfigurations.actions.setMappedFeatures([]),
      )
    }
  }, [selectedRole])

  const closeModalHandler = (value: boolean) => {
    dispatch(
      reduxServices.userRolesConfigurations.actions.setDisplayConfigurationModal(
        value,
      ),
    )
  }

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="Roles and Permissions"
      CFooterClassName="d-none"
    >
      <UserRolesSelect
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />
      <UserRolesAddDelete
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />
      <UserFeaturesTable />
      <OModal
        visible={configurationModal?.displayModal}
        setVisible={closeModalHandler}
        modalSize={configurationModal?.modalSize}
        modalHeaderClass={configurationModal?.modalHeaderClass}
        modalFooterClass={configurationModal?.modalFooterClass}
        confirmButtonAction={configurationModal?.confirmButtonAction}
        confirmButtonText={configurationModal?.confirmButtonText}
        cancelButtonText={configurationModal?.cancelButtonText}
        isConfirmButtonDisabled={configurationModal?.isConfirmButtonDisabled}
      >
        {configurationModal.description}
      </OModal>
    </OCard>
  )
}

export default UserRolesConfiguration
