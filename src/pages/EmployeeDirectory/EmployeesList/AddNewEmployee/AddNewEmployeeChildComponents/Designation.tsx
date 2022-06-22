import { CButton, CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'

import React from 'react'
import { SelectShiftProps } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'

const Designation = ({
  dynamicFormLabelProps,
  list,
  setValue,
  setToggleShift,
  value,
  toggleValue,
}: SelectShiftProps): JSX.Element => {
  const onChangeHandler = (e: { target: { value: string } }) => {
    setValue(e.target.value)
  }

  if (!list) {
    return <></>
  }
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
            value={value}
            onChange={onChangeHandler}
          >
            <option value={''}>Select Shift</option>
            {list?.map((item, index) => {
              const { name } = item
              return (
                <option key={index} value={name}>
                  {name}
                </option>
              )
            })}
          </CFormSelect>
        </CCol>
        <CCol sm={3}>
          <CButton
            color="info"
            className="btn-ovh me-1"
            onClick={() => setToggleShift(!toggleValue)}
          >
            <i className="fa fa-plus  me-1"></i>Add
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}

export default Designation
