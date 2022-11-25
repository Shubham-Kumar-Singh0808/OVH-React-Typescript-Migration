import React from 'react'
import { CForm, CRow, CFormLabel, CCol } from '@coreui/react-pro'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const ClearenceCertificateDetailsForm = (): JSX.Element => {
  const managerClearenceDetails = useTypedSelector(
    reduxServices.resignationList.selectors.managerClearenceDetails,
  )
  console.log(managerClearenceDetails)
  const due = managerClearenceDetails[0]?.isDue ? 'Due' : 'No Due'
  return (
    <>
      <CForm>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-4 col-form-label text-end p-1">
            Employee ID:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{managerClearenceDetails[0]?.employeeId}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-4 col-form-label text-end p-1">
            Employee Name:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{managerClearenceDetails[0]?.employeeName}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-4 col-form-label text-end p-1">
            Submitted Employee Id:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">
              {managerClearenceDetails[0]?.seperationEmpId}
            </p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-4 col-form-label text-end p-1">
            Submitted Employee Name:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">
              {managerClearenceDetails[0]?.seperationEmpName}
            </p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-4 col-form-label text-end p-1">
            Due:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{due}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-4 col-form-label text-end p-1">
            Comments:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{managerClearenceDetails[0]?.comments}</p>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default ClearenceCertificateDetailsForm
