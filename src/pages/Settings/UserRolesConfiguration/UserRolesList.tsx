import { CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'

import React from 'react'
import { selectedRoleType } from '../../../types/Settings/UserRolesConfiguration/userRolesAndPermissionsTypes'
import { useTypedSelector } from '../../../stateStore'

interface UserRolesListPropsTypes {
  selectedRole: selectedRoleType
  setSelectedRole: (role: selectedRoleType) => void
}
const UserRolesList: React.FC<UserRolesListPropsTypes> = ({
  selectedRole,
  setSelectedRole,
}: UserRolesListPropsTypes): JSX.Element => {
  const userRoles = useTypedSelector(
    (state) => state.userRolesAndPermissions.roles,
  )

  const handleRoleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole({
      roleId: e.target.value,
      roleName: e.target.options[e.target.selectedIndex].text,
    })
  }

  return (
    <>
      <CRow className="mt-4 mb-4">
        <CFormLabel className="col-sm-3 col-form-label text-end">
          Role:
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            data-testid="form-select"
            aria-label="Default select example"
            value={selectedRole.roleId}
            onChange={handleRoleSelectChange}
          >
            <option value={''}>Select role</option>
            {userRoles?.map((role, index) => (
              <option key={index} value={role.roleId}>
                {role.name}
              </option>
            ))}
          </CFormSelect>
        </CCol>
      </CRow>
    </>
  )
}
export default UserRolesList
