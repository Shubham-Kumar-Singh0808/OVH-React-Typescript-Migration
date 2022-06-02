import { CCol, CFormInput, CFormLabel, CRow } from '@coreui/react-pro'

import { DynamicFormLabelProps } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import React from 'react'

const ReportingManager = ({
  dynamicFormLabelProps,
}: DynamicFormLabelProps): JSX.Element => {
  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          {...dynamicFormLabelProps(
            'reportingmanager',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Reporting Manager:
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
            id="reportingmanager"
            size="sm"
            type="text"
            name="reportingmanager"
            placeholder="Reporting Manager"
            value=""
          />
        </CCol>
      </CRow>
    </>
  )
}

export default ReportingManager
