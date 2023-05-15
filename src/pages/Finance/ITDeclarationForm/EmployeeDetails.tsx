import { CRow, CCol, CFormLabel } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const EmployeeDetails = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const employeeInformation = useTypedSelector(
    reduxServices.itDeclarationForm.selectors.employeeInformation,
  )
  useEffect(() => {
    dispatch(reduxServices.itDeclarationForm.getEmployeeInfo())
  }, [dispatch])

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

export default EmployeeDetails
