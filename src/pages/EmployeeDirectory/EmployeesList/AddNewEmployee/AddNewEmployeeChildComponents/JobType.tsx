import { CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'

import { DynamicFormLabelProps } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import React from 'react'

const JobType = ({
  dynamicFormLabelProps,
}: DynamicFormLabelProps): JSX.Element => {
  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          {...dynamicFormLabelProps(
            'jobtype',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Job Type:
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
            id="jobtype"
            size="sm"
            aria-label="jobtype"
            name="jobtype"
            value=""
          >
            <option value={''}>Select Job Type</option>
            <option value="Accounts">Accounts</option>
            <option value="Marketing">Marketing</option>
            <option value="Networking">Networking</option>
          </CFormSelect>
        </CCol>
      </CRow>
    </>
  )
}

export default JobType
