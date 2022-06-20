import { CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'
import React, { useState } from 'react'

import { EmployeeGenderProps } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'

const Gender = ({
  dynamicFormLabelProps,
  setEmployeeGender,
  employeeGender,
}: EmployeeGenderProps): JSX.Element => {
  const onEmployeeChangeHandler = (e: { target: { value: string } }) => {
    setEmployeeGender(e.target.value)
  }

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
            onChange={onEmployeeChangeHandler}
            value={employeeGender}
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
