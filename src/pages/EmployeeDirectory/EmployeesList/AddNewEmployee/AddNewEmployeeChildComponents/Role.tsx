import { CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'

import { DynamicFormLabelProps } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import React from 'react'

const Role = ({
  dynamicFormLabelProps,
}: DynamicFormLabelProps): JSX.Element => {
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
            <option value="Accounts">Accounts</option>
            <option value="Marketing">Marketing</option>
            <option value="Networking">Networking</option>
          </CFormSelect>
        </CCol>
      </CRow>
    </>
  )
}

export default Role
