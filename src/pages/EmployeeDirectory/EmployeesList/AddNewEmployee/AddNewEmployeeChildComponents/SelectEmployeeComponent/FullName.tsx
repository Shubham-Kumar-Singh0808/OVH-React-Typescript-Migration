import { CCol, CFormInput, CFormLabel, CRow } from '@coreui/react-pro'
import React from 'react'
import { FullNameChangeHandlerProp } from '../../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { showIsRequired } from '../../../../../../utils/helper'
import { TextDanger, TextWhite } from '../../../../../../constant/ClassName'

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
    showIsRequired(firstNameValue) === TextDanger ||
    showIsRequired(lastNameValue) === TextDanger ||
    showIsRequired(middleNameValue) === TextDanger
  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          data-testId="fullnameLabel"
          {...dynamicFormLabelProps(
            'fullname:',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Full Name:
          <span className={isFullNameRequired ? TextDanger : TextWhite}>*</span>
        </CFormLabel>
        <CCol sm={9}>
          <CRow>
            <CCol sm={3}>
              <CFormInput
                id="fullname"
                size="sm"
                type="text"
                name="firstname"
                data-testId="firstnameform"
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
                data-testId="middlenameform"
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
                data-testId="lastnameform"
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
