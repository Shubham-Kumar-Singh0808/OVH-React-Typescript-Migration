import { CButton, CCol, CRow } from '@coreui/react-pro'
import React from 'react'
import { AddBackButtonsProps } from '../../types/MyProfile/QualificationsTab/EmployeeQualifications/employeeQualificationTypes'

const OAddButton = ({ addButtonHandler }: AddBackButtonsProps): JSX.Element => {
  return (
    <>
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <CButton color="info btn-ovh me-1" onClick={addButtonHandler}>
            <i className="fa fa-plus me-1"></i>Add
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}
export default OAddButton
