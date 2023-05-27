import React from 'react'
import { CCol, CRow, CFormLabel } from '@coreui/react-pro'
import { EditITDeclarationEmployeeDetails } from '../../../../types/Finance/ITDeclarationList/itDeclarationListTypes'

const ITEmployeeDetails = ({
  employeeInformation,
}: {
  employeeInformation: EditITDeclarationEmployeeDetails
}): JSX.Element => {
  return (
    <>
      <CCol>
        <CRow className="mt-3">
          <CFormLabel className="col-sm-6 col-md-2 col-form-label text-end">
            Employee Id:
          </CFormLabel>
          <CCol sm={3} className="mt-2" data-testid="emp-id">
            {employeeInformation?.employeeId}
          </CCol>
          <CFormLabel className="col-sm-6 col-md-2 col-form-label text-end">
            Employee Name:
          </CFormLabel>
          <CCol sm={3} className="mt-2">
            {employeeInformation?.fullName}
          </CCol>
        </CRow>
        <CRow>
          <CFormLabel className="col-sm-6 col-md-2 col-form-label text-end">
            PAN:
          </CFormLabel>
          <CCol sm={3} className="mt-2">
            {employeeInformation?.pan}
          </CCol>
          <CFormLabel className="col-sm-6 col-md-2 col-form-label text-end">
            Designation:
          </CFormLabel>
          <CCol sm={3} className="mt-2">
            {employeeInformation?.designation}
          </CCol>
        </CRow>
      </CCol>
    </>
  )
}

export default ITEmployeeDetails
