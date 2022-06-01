import { CCol, CFormInput, CFormLabel, CRow } from '@coreui/react-pro'

import { DynamicFormLabelProps } from '../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import React from 'react'

const Experience = ({
  dynamicFormLabelProps,
}: DynamicFormLabelProps): JSX.Element => {
  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          {...dynamicFormLabelProps(
            'experience',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Experience
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
            id="experience"
            size="sm"
            type="text"
            name="experience"
            placeholder="Experience"
            value=""
          />
        </CCol>
      </CRow>
    </>
  )
}

export default Experience
