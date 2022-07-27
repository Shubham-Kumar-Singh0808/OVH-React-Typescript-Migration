import { CCol, CFormInput, CFormLabel, CRow } from '@coreui/react-pro'
import React from 'react'
import { UsernameEmailChangeHandlerProp } from '../../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { showIsRequired } from '../../../../../../utils/helper'

const UserNameEmail = ({
  dynamicFormLabelProps,
  usernameChangeHandler,
  onAllowedUserChangeHandler,
  username,
}: UsernameEmailChangeHandlerProp): JSX.Element => {
  const handleUserEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    usernameChangeHandler(e.target.value)
  }

  const handleOnBlurInput = () => {
    onAllowedUserChangeHandler(username)
  }

  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          {...dynamicFormLabelProps(
            'username',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Username:
          <span className={showIsRequired(username)}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            id="username"
            data-testid="user-input"
            size="sm"
            type="text"
            name="username"
            placeholder="User Name"
            value={username}
            onBlur={handleOnBlurInput}
            onChange={handleUserEmail}
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CFormLabel
          {...dynamicFormLabelProps(
            'email',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Email:
          <span className={showIsRequired(username)}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            id="email"
            data-testid="user-email-input"
            size="sm"
            type="text"
            name="email"
            placeholder="Email"
            value={username}
            disabled
          />
          <strong>@raybiztech.com</strong>
        </CCol>
      </CRow>
    </>
  )
}

export default UserNameEmail
