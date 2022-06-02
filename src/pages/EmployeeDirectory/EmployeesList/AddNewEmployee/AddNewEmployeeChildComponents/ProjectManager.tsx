import { CCol, CFormInput, CFormLabel, CRow } from '@coreui/react-pro'

import { DynamicFormLabelProps } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import React from 'react'

const ProjectManager = ({
  dynamicFormLabelProps,
}: DynamicFormLabelProps): JSX.Element => {
  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          {...dynamicFormLabelProps(
            'projectmanager',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Project Manager:
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
            id="projectmanager"
            size="sm"
            type="text"
            name="projectmanager"
            placeholder="Project Manager"
            value=""
          />
        </CCol>
      </CRow>
    </>
  )
}

export default ProjectManager
