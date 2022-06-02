import { CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'

import { DynamicFormLabelProps } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import React from 'react'

const Shift = ({
  dynamicFormLabelProps,
}: DynamicFormLabelProps): JSX.Element => {
  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          {...dynamicFormLabelProps(
            'shift',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Shift:
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
            id="shift"
            size="sm"
            aria-label="shift"
            name="shift"
            value=""
          >
            <option value={''}>Select Shift</option>
            <option value="Accounts">Accounts</option>
            <option value="Marketing">Marketing</option>
            <option value="Networking">Networking</option>
          </CFormSelect>
        </CCol>
      </CRow>
    </>
  )
}

export default Shift
