import React, { useEffect } from 'react'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import { doFetchCertifications } from '../../../../reducers/MyProfile/Qualifications/qualificationSlice'
import { useTypedSelector, useAppDispatch } from '../../../../stateStore'
const CertificationsTable = (): JSX.Element => {
  const employeeCertificateData = useTypedSelector(
    (state) => state.employeeQualificationsDetails.certificationDetails,
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(doFetchCertifications())
  }, [dispatch])
  return (
    <>
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Technology</CTableHeaderCell>
            <CTableHeaderCell scope="col">Type of Certificate</CTableHeaderCell>
            <CTableHeaderCell scope="col">Certification</CTableHeaderCell>
            <CTableHeaderCell scope="col">Registration No</CTableHeaderCell>
            <CTableHeaderCell scope="col">Completed Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Expiry Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Percentage</CTableHeaderCell>
            <CTableHeaderCell scope="col">Description</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {employeeCertificateData?.map((certificateItem, index) => (
            <CTableRow key={index}>
              <CTableDataCell scope="row">{index + 1}</CTableDataCell>
              <CTableDataCell scope="row">
                {certificateItem.technology}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {certificateItem.certificateType}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {certificateItem.name}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {certificateItem.code}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {certificateItem.completedDate}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {certificateItem.expiryDate}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {certificateItem.percent}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {certificateItem.description}
              </CTableDataCell>
              <CTableDataCell scope="row">
                <CButton color="info" className="btn-ovh me-1">
                  <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                </CButton>
                <CButton color="danger" className="btn-ovh me-1">
                  <i className="fa fa-trash-o" aria-hidden="true"></i>
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <strong>
        {employeeCertificateData?.length
          ? `Total Records: ${employeeCertificateData.length}`
          : `No Records Found`}
      </strong>
    </>
  )
}

export default CertificationsTable
