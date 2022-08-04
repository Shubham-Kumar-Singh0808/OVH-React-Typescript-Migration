import { CCol, CFormInput, CFormLabel, CRow } from '@coreui/react-pro'
import React from 'react'
import { InputField } from '../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { showIsRequired } from '../../utils/helper'

const OInputField = ({
  dynamicFormLabelProps,
  onChangeHandler,
  onBlurHandler,
  value,
  isRequired,
  label,
  name,
  placeholder,
}: InputField): JSX.Element => {
  const handleUserEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeHandler(e.target.value)
  }

  const handleOnBlurInput = () => {
    onBlurHandler(value)
  }

  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          {...dynamicFormLabelProps(name, 'col-sm-3 col-form-label text-end')}
        >
          {label}:
          {isRequired && <span className={showIsRequired(value)}>*</span>}
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            id={name}
            data-testid={name}
            size="sm"
            type="text"
            name={name}
            placeholder={placeholder}
            value={value}
            onBlur={handleOnBlurInput}
            onChange={handleUserEmail}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default OInputField
