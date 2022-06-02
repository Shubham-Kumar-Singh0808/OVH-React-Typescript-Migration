import { CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'

import { DynamicFormLabelProps } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { reduxServices } from '../../../../../reducers/reduxServices'

const Role = ({
  dynamicFormLabelProps,
}: DynamicFormLabelProps): JSX.Element => {
  const userRoles = useTypedSelector(
    reduxServices.userRolesAndPermissions.selectors.userRoles,
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.userRolesAndPermissions.getUserRoles())
  }, [dispatch])
  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          {...dynamicFormLabelProps('role', 'col-sm-3 col-form-label text-end')}
        >
          Role:
          <span
          //   className={
          //     employeeBasicInformationEditData.curentLocation
          //       ? 'text-white'
          //       : 'text-danger'
          //   }
          >
            *
          </span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            id="role"
            size="sm"
            aria-label="role"
            name="role"
            value=""
          >
            <option value={''}>Select Role</option>
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

export default Role
