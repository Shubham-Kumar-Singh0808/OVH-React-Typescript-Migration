import { CCol, CFormInput, CFormLabel, CRow } from '@coreui/react-pro'

import OToast from '../../../../../components/ReusableComponent/OToast'
import React from 'react'
import { UsernameEmailChangeHandlerProp } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'

const UserNameEmail = ({
  dynamicFormLabelProps,
  usernameChangeHandler,
  onAllowedUserChangeHandler,
  username,
  isUserAllowed,
}: UsernameEmailChangeHandlerProp): JSX.Element => {
  const handleUserEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    usernameChangeHandler(e.target.value)
  }

  const handleOnBlurInput = () => {
    onAllowedUserChangeHandler(username)
  }

  console.log('isUserAllowed', isUserAllowed)
  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          {...dynamicFormLabelProps(
            'username',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Username
          {/* <span
            className={userName.length ? 'text-white' : 'text-danger'}
          ></span> */}
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            id="username"
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
          Email
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
          <CFormInput
            id="email"
            size="sm"
            type="text"
            name="email"
            placeholder="Email"
            value={username}
            disabled
          />
          <strong>@aibridgeml.com</strong>
        </CCol>
      </CRow>
    </>
  )
}

export default UserNameEmail
