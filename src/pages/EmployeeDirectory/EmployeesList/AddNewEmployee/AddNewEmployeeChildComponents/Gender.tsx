import { CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'

import { DynamicFormLabelProps } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import React from 'react'

const Gender = ({
  dynamicFormLabelProps,
}: DynamicFormLabelProps): JSX.Element => {
  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          {...dynamicFormLabelProps(
            'gender',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Gender
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
            id="gender"
            size="sm"
            aria-label="gender"
            name="gender"
            value=""
          >
            <option value={''}>Select Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </CFormSelect>
        </CCol>
      </CRow>
    </>
  )
}

export default Gender
