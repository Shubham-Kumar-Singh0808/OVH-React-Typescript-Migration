import { CCol, CFormInput, CFormLabel, CRow } from '@coreui/react-pro'
import React from 'react'
import { InputField } from '../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { isEmail, showIsRequired } from '../../utils/helper'

const OInputField = ({
  dynamicFormLabelProps,
  onChangeHandler,
  onBlurHandler,
  value,
  type: inputType,
  isRequired,
  label,
  name,
  placeholder,
}: InputField): JSX.Element => {
  const isInvalid = isEmail(value)
  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeHandler == null) return

    onChangeHandler(e.target.value)
  }

  const handleOnBlurInput = () => {
    if (onBlurHandler == null) return

    onBlurHandler(value)
  }

  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          data-testid={name}
          {...dynamicFormLabelProps(name, 'col-sm-3 col-form-label text-end')}
        >
          {label} :
          {isRequired && <span className={showIsRequired(value)}>*</span>}
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            id={name}
            data-testid={name}
            size="sm"
            type={inputType == null ? 'text' : inputType}
            name={name}
            placeholder={placeholder}
            value={value}
            onBlur={handleOnBlurInput}
            onChange={handleOnChangeInput}
            autoComplete={'off'}
          />
          {inputType === 'email' && isInvalid ? (
            <span style={{ color: 'red' }}>Enter a valid Email address</span>
          ) : null}
        </CCol>
      </CRow>
    </>
  )
}

export default OInputField
