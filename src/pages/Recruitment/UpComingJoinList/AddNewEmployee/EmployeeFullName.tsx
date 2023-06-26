import { CCol, CFormInput, CFormLabel, CRow } from '@coreui/react-pro'
import React from 'react'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import { FullNameChangeHandlerProp } from '../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { showIsRequired } from '../../../../utils/helper'
import { EmployeeFullNameChangeHandlerProp } from '../../../../types/Recruitment/UpComingJoinList/UpComingJoinListTypes'

const EmployeeFullName = ({
  dynamicFormLabelProps,
  firstNameChangeHandler,
  lastNameChangeHandler,
  middleNameChangeHandler,
  firstNameValue,
  lastNameValue,
  middleNameValue,
  setUserEmployeeName,
}: EmployeeFullNameChangeHandlerProp): JSX.Element => {
  const isFullNameRequired =
    showIsRequired(firstNameValue?.replace(/^\s*/, '')) === TextDanger ||
    showIsRequired(lastNameValue?.replace(/^\s*/, '')) === TextDanger
  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          data-testid="fullnameLabel"
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
                id="firstname"
                size="sm"
                type="text"
                name="firstname"
                data-testid="firstnameform"
                placeholder="First Name"
                className="capetalized"
                value={firstNameValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                  setUserEmployeeName(e.target.value)
                }
              />
            </CCol>
            <CCol sm={3}>
              <CFormInput
                size="sm"
                type="text"
                name="middlename"
                placeholder="Middle Name"
                data-testid="middlenameform"
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
                data-testid="lastnameform"
                className="capetalized"
                value={lastNameValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                  setUserEmployeeName(e.target.value)
                }
              />
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </>
  )
}

export default EmployeeFullName
