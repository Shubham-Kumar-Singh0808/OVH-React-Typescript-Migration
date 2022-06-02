import { CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'

import { EmployeeDepartmentProps } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import React from 'react'

const Department = ({
  dynamicFormLabelProps,
  departmentsList,
}: EmployeeDepartmentProps): JSX.Element => {
  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          {...dynamicFormLabelProps(
            'department',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Department
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
            id="department"
            size="sm"
            aria-label="department"
            name="department"
            value=""
          >
            <option value={''}>Select Department</option>
            {departmentsList?.map((curItem) => (
              <option key={curItem.departmentId} value={curItem.departmentName}>
                {curItem.departmentName}
              </option>
            ))}
          </CFormSelect>
        </CCol>
      </CRow>
    </>
  )
}

export default Department
