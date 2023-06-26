import { CFormCheck } from '@coreui/react-pro'
import React, { useState, useEffect } from 'react'
import {
  FeatureAccessModifierEnum,
  MappedChildFeatureToSubFeatureItem,
  MappedSubFeatureToFeatureItem,
  OutgoingAssignPermissionDto,
} from '../../../../types/Settings/UserRolesConfiguration/UserRolesConfigurationTypes'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import OToast from '../../../../components/ReusableComponent/OToast'
import { getUserRolesConfigTestId } from '../UserRolesConfigurationsHelpers'

// this is a reusable component which renders the checkbox for subFeatures as well as child features

const FeatureCheck = ({
  checkedValue,
  modifierValue,
  showCheck,
  feature,
  isChild,
}: {
  checkedValue: boolean | undefined
  modifierValue: FeatureAccessModifierEnum
  showCheck: boolean
  feature: MappedSubFeatureToFeatureItem | MappedChildFeatureToSubFeatureItem
  isChild: boolean
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const selectedRole = useTypedSelector(
    (state) => state.userRolesConfiguration.selectedRole,
  )
  // storing the value of each check box in useState
  const [finalValue, setFinalValue] = useState<boolean | undefined>(
    checkedValue,
  )

  // as the role is changed, in order to update the checkboxes for different role
  useEffect(() => {
    setFinalValue(checkedValue)
  }, [checkedValue])

  const checkChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked
    const finalObject: OutgoingAssignPermissionDto = {
      type: modifierValue,
      permission: value,
      featureId: feature.featureId,
      roleId: selectedRole.roleId,
    }
    const result = await dispatch(
      reduxServices.userRolesConfigurations.updateAssignPermissionsThunk(
        finalObject,
      ),
    )
    if (
      reduxServices.userRolesConfigurations.updateAssignPermissionsThunk.fulfilled.match(
        result,
      )
    ) {
      // after api is successful, update the state value to display on the screen. Without state
      //it doesn't render until refresh (same for child features)
      setFinalValue(value)
      const assignedOrRemoved = value === true ? 'assigned' : 'removed'
      await dispatch(
        reduxServices.userRolesConfigurations.getFeaturesUnderRoleThunk(
          selectedRole.roleId.toString(),
        ),
      )
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage={`Successfully you have ${assignedOrRemoved} '${modifierValue}' permission to ${feature.name}`}
          />,
        ),
      )
      if (isChild === true) {
        dispatch(
          reduxServices.userRolesConfigurations.actions.setDisplayConfigurationModal(
            true,
          ),
        )
      }
    }
  }

  return (
    <>
      {showCheck && (
        <CFormCheck
          data-testid={getUserRolesConfigTestId(
            `checkBtn-${feature.featureId}-${modifierValue}`,
          )}
          checked={finalValue}
          onChange={checkChangeHandler}
        />
      )}
    </>
  )
}

export default FeatureCheck
