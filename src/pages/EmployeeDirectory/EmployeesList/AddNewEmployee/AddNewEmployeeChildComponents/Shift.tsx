import { CButton, CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'
import React, { useState } from 'react'

import { EmployeeShiftDetails } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/ShiftConfiguration/shiftConfigurationTypes'
import { SelectShiftProps } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'

const Shift = ({
  dynamicFormLabelProps,
  list,
  setValue,
  setToggleShift,
  value,
  toggleValue,
}: SelectShiftProps): JSX.Element => {
  // const onChangeHandler = (e: { target: { value: string } }) => {
  //   setValue(e.target.value)
  // }

  if (!list) {
    return <></>
  }

  const onHandleSelectManager = (e: { target: { value: string } }) => {
    const name = e.target.value
    const shift = list.find((value) => value.name === name)

    const selectedShift = {
      id: shift?.id,
      name: shift?.name,
      startTimeHour: shift?.startTimeHour,
      startTimeMinutes: shift?.startTimeMinutes,
      endTimeHour: shift?.endTimeHour,
      endTimeMinutes: shift?.endTimeMinutes,
      graceTime: shift?.graceTime,
    } as EmployeeShiftDetails
    setValue(selectedShift)
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
            value={value}
            onChange={onHandleSelectManager}
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

export default Shift
