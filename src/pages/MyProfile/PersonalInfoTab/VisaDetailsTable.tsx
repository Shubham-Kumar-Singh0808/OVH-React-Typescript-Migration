/* eslint-disable prettier/prettier */
import React from 'react'
import {
    CButton,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react-pro'
const VisaDetailsTable = (): JSX.Element  => {
  return (
    <>
    <CTable striped>
    <CTableHead>
    <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Country</CTableHeaderCell>
            <CTableHeaderCell scope="col">Visa Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date of Issue</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date of Expire</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow>
        <CTableHeaderCell scope="row">1</CTableHeaderCell>
        <CTableDataCell>AUSTRALIA</CTableDataCell>
        <CTableDataCell>Permanent Resident</CTableDataCell>
        <CTableDataCell>30/03/2022</CTableDataCell>
        <CTableDataCell>06/05/2022</CTableDataCell>  
        <CTableDataCell scope="row">
        <CButton
        color="info"
        className="btn-ovh me-2"
                      
        >
        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
        </CButton>
        <CButton
        color="danger"
        className="btn-ovh me-2"                      
        >
        <i className="fa fa-trash-o" aria-hidden="true"></i>
        </CButton>
        </CTableDataCell>
     
      </CTableRow>         
    </CTableBody>
  </CTable>
  </>
  )
}
export default VisaDetailsTable