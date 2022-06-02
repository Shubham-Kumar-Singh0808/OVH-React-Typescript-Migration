import { CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'

import { DynamicFormLabelProps } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import React from 'react'

const Designation = ({
  dynamicFormLabelProps,
}: DynamicFormLabelProps): JSX.Element => {
  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          {...dynamicFormLabelProps(
            'designation',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Designation:
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
            id="designation"
            size="sm"
            aria-label="designation"
            name="designation"
            value=""
          >
            <option value={''}>Select Designation</option>
            <option value="Accounts">Accounts</option>
            <option value="Marketing">Marketing</option>
            <option value="Networking">Networking</option>
          </CFormSelect>
        </CCol>
      </CRow>
    </>
  )
}

export default Designation
