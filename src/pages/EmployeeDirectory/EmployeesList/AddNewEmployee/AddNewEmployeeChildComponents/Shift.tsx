import { CButton, CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'
import React, { useState } from 'react'

import { EmployeeShiftProps } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'

const Shift = ({
  dynamicFormLabelProps,
  employeeShifts,
  shiftName,
  setShiftName,
  setToggleShift,
}: EmployeeShiftProps): JSX.Element => {
  // const toggleShiftHandler = () => {
  //   setToggleShift(!toggleShift)
  // }
  const shiftHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShiftName(e.target.value)
    const employeeShiftsFilter = employeeShifts.filter(
      (curItem) => curItem.name === e.target.value,
    )
  }
  return (
    <>
      <CRow className="mb-3 align-items-center">
        <CFormLabel
          {...dynamicFormLabelProps(
            'shift',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Shift:
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
            id="shift"
            size="sm"
            aria-label="shift"
            name="shift"
            value={shiftName}
            onChange={shiftHandler}
          >
            <option value={''}>Select Shift</option>
            {employeeShifts?.map((curItem) => (
              <option key={curItem.name} value={curItem.name}>
                {curItem.name}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol sm={3}>
          <CButton
            color="info"
            className="btn-ovh me-1"
            onClick={() => setToggleShift(false)}
          >
            <i className="fa fa-plus  me-1"></i>Add
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}

export default Shift
