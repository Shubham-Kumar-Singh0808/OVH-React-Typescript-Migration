import { CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'

import { DynamicFormLabelProps } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import React from 'react'

const EmploymentType = ({
  dynamicFormLabelProps,
}: DynamicFormLabelProps): JSX.Element => {
  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          {...dynamicFormLabelProps(
            'employmenttype',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Employment Type:
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
          <CFormSelect
            id="employmenttype"
            size="sm"
            aria-label="employmenttype"
            name="employmenttype"
            value=""
          >
            <option value={''}>Select Type</option>
            <option value="Accounts">Accounts</option>
            <option value="Marketing">Marketing</option>
            <option value="Networking">Networking</option>
          </CFormSelect>
        </CCol>
      </CRow>
    </>
  )
}

export default EmploymentType
