import { CRow, CFormLabel, CCol, CFormSelect } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import {
  initialUserRole,
  getUserRolesConfigTestId,
} from './UserRolesConfigurationsHelpers'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { IncomingUserRole } from '../../../types/Settings/UserRolesConfiguration/UserRolesConfigurationTypes'
import { reduxServices } from '../../../reducers/reduxServices'

const UserRolesSelect = ({
  selectedRole,
  setSelectedRole,
}: {
  selectedRole: IncomingUserRole
  setSelectedRole: React.Dispatch<React.SetStateAction<IncomingUserRole>>
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const userRoles = useTypedSelector(
    (state) => state.userRolesConfiguration.roles,
  )

  const roleChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoleObject: IncomingUserRole = {
      roleId: +e.target.value,
      name: e.target.options[e.target.selectedIndex].text,
      features: null,
    }
    setSelectedRole(selectedRoleObject)
    // role name and role id is used in other parts of user roles. storing in redux for easy access
    dispatch(
      reduxServices.userRolesConfigurations.actions.setSelectedRole(
        selectedRoleObject,
      ),
    )
  }

  useEffect(() => {
    // whenever a role except default is selected api is called
    if (selectedRole.roleId !== initialUserRole.roleId) {
      dispatch(
        reduxServices.userRolesConfigurations.getFeaturesUnderRoleThunk(
          selectedRole.roleId.toString(),
        ),
      )
    }
  }, [selectedRole])

  return (
    <CRow className="mt-4 mb-4">
      <CFormLabel className="col-sm-3 col-form-label text-end">
        Role:
      </CFormLabel>
      <CCol sm={3}>
        <CFormSelect
          data-testid={getUserRolesConfigTestId('roleSelect')}
          value={selectedRole.roleId.toString()}
          onChange={roleChangeHandler}
        >
          <option
            value={initialUserRole.roleId.toString()}
            data-testid={getUserRolesConfigTestId('roleOptions')}
          >
            {initialUserRole.name}
          </option>
          {userRoles?.map((role, index) => (
            <option
              key={index}
              value={role.roleId}
              data-testid={getUserRolesConfigTestId('roleOptions')}
            >
              {role.name}
            </option>
          ))}
        </CFormSelect>
      </CCol>
    </CRow>
  )
}

export default UserRolesSelect
