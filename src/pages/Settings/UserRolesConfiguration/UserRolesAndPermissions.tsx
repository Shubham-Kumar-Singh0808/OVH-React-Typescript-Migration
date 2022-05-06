import React, { useEffect, useState } from 'react'
import {
  doFetchUserRoleSubFeatures,
  doFetchUserRoles,
} from '../../../reducers/Settings/UserRolesConfiguration/userRolesAndPermissionsSlice'

import AddDeleteRoleButtons from './AddDeleteRoleButtons'
import OCard from '../../../components/ReusableComponent/OCard'
import { SelectedRole } from '../../../types/Settings/UserRolesConfiguration/userRolesAndPermissionsTypes'
import UserRoleFeaturesExpandableTable from './UserRoleFeaturesExpandableTable'
import UserRolesList from './UserRolesList'
import { useAppDispatch } from '../../../stateStore'

const initialSelectedState = {} as SelectedRole
const UserRolesAndPermission: React.FC = (): JSX.Element => {
  const [selectedRole, setSelectedRole] = useState(initialSelectedState)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(doFetchUserRoles())
    dispatch(doFetchUserRoleSubFeatures())
  }, [dispatch])

  return (
    <>
      <OCard
        className="mb-4"
        title="Roles and Permissions"
        CFooterClassName="d-none"
      >
        <UserRolesList
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
        <AddDeleteRoleButtons
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
        <UserRoleFeaturesExpandableTable selectedRoleId={selectedRole.roleId} />
      </OCard>
    </>
  )
}

export default UserRolesAndPermission
