import { CButton, CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { EmployeeShiftDetails } from '../../../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/ShiftConfiguration/shiftConfigurationTypes'
import { SelectShiftProps } from '../../../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { showIsRequired } from '../../../../../../../utils/helper'
import { useTypedSelector } from '../../../../../../../stateStore'
import { reduxServices } from '../../../../../../../reducers/reduxServices'

const Shift = ({
  dynamicFormLabelProps,
  list,
  setValue,
  setToggleShift,
  value,
  toggleValue,
  isAddDisable,
}: SelectShiftProps): JSX.Element => {
  const initShift = {} as EmployeeShiftDetails
  const [val, setVal] = useState(initShift)
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
    if (value != null) {
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
      setVal(selectedShift)
    }
  }, [value])

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
          <span className={showIsRequired(value)}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            id="shift"
            size="sm"
            aria-label="shift"
            name="shift"
            value={val.name}
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
          <CCol sm={3}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              onClick={() => setToggleShift(!toggleValue)}
            >
              <i className="fa fa-plus me-1"></i>Add
            </CButton>
          </CCol>
        ) : (
          <CCol sm={3}>
            In Time : {val.startTimeHour}:{val.startTimeMinutes}
            <br></br>
            Out Time : {val.endTimeHour}:{val.endTimeMinutes}
          </CCol>
        )}
      </CRow>
    </>
  )
}

export default Shift
