import { CCol, CFormInput, CFormLabel, CRow } from '@coreui/react-pro'
import React, { useState } from 'react'

import { DynamicFormLabelProps } from '../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'

const UserNameEmail = ({
  dynamicFormLabelProps,
}: DynamicFormLabelProps): JSX.Element => {
  const [userEmail, setUserEmail] = useState<string>()
  const handleUserEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value)
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
          Username
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
            id="username"
            size="sm"
            type="text"
            name="username"
            placeholder="User Name"
            value={userEmail}
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
            value={userEmail}
            disabled
          />
          <strong>@aibridgeml.com</strong>
        </CCol>
      </CRow>
    </>
  )
}

export default UserNameEmail
