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
}: SelectProps): JSX.Element => {
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
            'technology',
            'col-sm-3 col-form-label text-end',
          )}
        >
          {name}:<span className={showIsRequired(value)}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            id={name}
            size="sm"
            aria-label={name}
            name={name}
            value={value}
            onChange={onChangeHandler}
          >
            <option value={''}>{label}</option>
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
      </CRow>
    </>
  )
}

export default OSelect
