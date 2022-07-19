import { CButton, CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { EmployeeShiftDetails } from '../../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/ShiftConfiguration/shiftConfigurationTypes'
import { SelectShiftProps } from '../../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { showIsRequired } from '../../../../../../utils/helper'

const Shift = ({
  dynamicFormLabelProps,
  list,
  setValue,
  setToggleShift,
  isRequired,
  value,
  toggleValue,
  isAddDisable,
}: SelectShiftProps): JSX.Element => {
  const initShift = {} as EmployeeShiftDetails
  const [defaultValue, setDefaultValue] = useState(initShift)
  const onHandleSelectManager = (e: { target: { value: string } }) => {
    const name = e.target.value
    const shift = list.find((schedule) => schedule.name === name)

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

  useEffect(() => {
    if (value != null && Object.keys(value).length !== 0) {
      const shift = list.find((schedule) => schedule.name === value)
      const selectedShift = {
        id: shift?.id,
        name: shift?.name,
        startTimeHour: shift?.startTimeHour,
        startTimeMinutes: shift?.startTimeMinutes,
        endTimeHour: shift?.endTimeHour,
        endTimeMinutes: shift?.endTimeMinutes,
        graceTime: shift?.graceTime,
      } as EmployeeShiftDetails
      setDefaultValue(selectedShift)
    } else {
      setDefaultValue(initShift)
    }
  }, [value])

  const selectedValue = value == null ? '' : value
  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          data-tesId="shiftLabel"
          {...dynamicFormLabelProps(
            'shift',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Shift:
          {isRequired && <span className={showIsRequired(value)}>*</span>}
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            id="shift"
            size="sm"
            data-testid="formShift"
            aria-label="shift"
            name="shift"
            value={selectedValue}
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
        {!isAddDisable ? (
          <>
            <CCol sm={1}>
              <CButton
                data-testId="shiftButton"
                color="info"
                className="btn-ovh me-1"
                onClick={() => setToggleShift(!toggleValue)}
              >
                <i className="fa fa-plus me-1"></i>Add
              </CButton>
            </CCol>
            {defaultValue.name && (
              <div className="shift-info">
                In Time : {defaultValue.startTimeHour}:
                {defaultValue.startTimeMinutes}
                <br></br>
                Out Time : {defaultValue.endTimeHour}:
                {defaultValue.endTimeMinutes}
              </div>
            )}
          </>
        ) : (
          <CCol sm={3}>
            In Time : {defaultValue.startTimeHour}:
            {defaultValue.startTimeMinutes}
            <br></br>
            Out Time : {defaultValue.endTimeHour}:{defaultValue.endTimeMinutes}
          </CCol>
        )}
      </CRow>
    </>
  )
}

export default Shift
