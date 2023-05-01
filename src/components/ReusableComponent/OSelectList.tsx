import { CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'
import React from 'react'
import { SelectProps } from '../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { showIsRequired } from '../../utils/helper'

const OSelect = ({
  dynamicFormLabelProps,
  list,
  setValue,
  value,
  name,
  label,
  placeHolder,
  isRequired,
}: SelectProps): JSX.Element => {
  const onChangeHandler = (e: { target: { value: string } }) => {
    if (setValue == null) return
    setValue(e.target.value)
  }

  const selectedValue = value == null ? '' : value
  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          data-testId="selectLabel"
          {...dynamicFormLabelProps(
            'technology',
            'col-sm-3 col-form-label text-end',
          )}
        >
          {label} :
          {isRequired && (
            <span className={showIsRequired(selectedValue)}>*</span>
          )}
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            id={name}
            size="sm"
            aria-label={label}
            data-testid={`form${name}`}
            name={name}
            value={selectedValue}
            onChange={onChangeHandler}
          >
            <option value={''}>{placeHolder}</option>
            {list.length > 0 &&
              list?.map((item, index) => {
                const { name: optionName } = item
                return (
                  <option key={index} value={optionName}>
                    {optionName}
                  </option>
                )
              })}
          </CFormSelect>
        </CCol>
      </CRow>
    </>
  )
}

export default OSelect
