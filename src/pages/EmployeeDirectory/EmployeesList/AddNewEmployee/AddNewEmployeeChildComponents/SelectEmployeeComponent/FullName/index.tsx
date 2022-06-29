import { CCol, CFormInput, CFormLabel, CRow } from '@coreui/react-pro'

import { FullNameChangeHandlerProp } from '../../../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import React from 'react'
import { showIsRequired } from '../../../../../../../utils/helper'

const FullName = ({
  dynamicFormLabelProps,
  firstNameChangeHandler,
  lastNameChangeHandler,
  middleNameChangeHandler,
  firstNameValue,
  lastNameValue,
  middleNameValue,
}: FullNameChangeHandlerProp): JSX.Element => {
  const isFullNameRequired =
    showIsRequired(firstNameValue) === 'text-danger' ||
    showIsRequired(lastNameValue) === 'text-danger' ||
    showIsRequired(middleNameValue) === 'text-danger'
  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          {...dynamicFormLabelProps(
            'fullname:',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Full Name:
          <span className={isFullNameRequired ? 'text-danger' : 'text-white'}>
            *
          </span>
        </CFormLabel>
        <CCol sm={9}>
          <CRow>
            <CCol sm={3}>
              <CFormInput
                id="fullname"
                size="sm"
                type="text"
                name="firstname"
                placeholder="First Name"
                className="capetalized"
                value={firstNameValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                  firstNameChangeHandler(e.target.value)
                }
              />
            </CCol>
            <CCol sm={3}>
              <CFormInput
                size="sm"
                type="text"
                name="middlename"
                placeholder="Middle Name"
                className="capetalized"
                value={middleNameValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                  middleNameChangeHandler(e.target.value)
                }
              />
            </CCol>
            <CCol sm={3}>
              <CFormInput
                size="sm"
                type="text"
                name="lastname"
                placeholder="Last Name"
                className="capetalized"
                value={lastNameValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                  lastNameChangeHandler(e.target.value)
                }
              />
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </>
  )
}

export default FullName
