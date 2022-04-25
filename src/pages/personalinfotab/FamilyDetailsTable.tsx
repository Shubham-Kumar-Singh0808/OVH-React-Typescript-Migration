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

const FamilyDetailsTable = (): JSX.Element => {
  return (
      <>
    <CTable striped>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col">#</CTableHeaderCell>
        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
        <CTableHeaderCell scope="col">Relationship</CTableHeaderCell>
        <CTableHeaderCell scope="col">Contact Number</CTableHeaderCell>
        <CTableHeaderCell scope="col">Date of Birth</CTableHeaderCell>
        <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow>
        <CTableHeaderCell scope="row">1</CTableHeaderCell>
        <CTableDataCell>Ravi</CTableDataCell>
        <CTableDataCell>Brother</CTableDataCell>
        <CTableDataCell>9987678876</CTableDataCell>
        <CTableDataCell>17/05/1996</CTableDataCell>  
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
export default FamilyDetailsTable