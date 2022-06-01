import { CCol, CFormInput, CFormLabel, CRow } from '@coreui/react-pro'

import { DynamicFormLabelProps } from '../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import React from 'react'

const FullName = ({
  dynamicFormLabelProps,
}: DynamicFormLabelProps): JSX.Element => {
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
        <CCol sm={9}>
          <CRow>
            <CCol sm={3}>
              <CFormInput
                id="fullname"
                size="sm"
                type="text"
                name="firstname"
                placeholder="First Name"
                value=""
              />
            </CCol>
            <CCol sm={3}>
              <CFormInput
                size="sm"
                type="text"
                name="middlename"
                placeholder="Middle Name"
                value=""
              />
            </CCol>
            <CCol sm={3}>
              <CFormInput
                size="sm"
                type="text"
                name="lastname"
                placeholder="Last Name"
                value=""
              />
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </>
  )
}

export default FullName
