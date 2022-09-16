import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CTooltip,
  CButton,
  CRow,
  CCol,
} from '@coreui/react-pro'
import React from 'react'

const EventTypeListTable = () => {
  return (
    <>
      <CTable striped responsive className="mt-5">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">EventType</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody></CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <p>
            <strong>Total Records:</strong>
          </p>
        </CCol>
      </CRow>
    </>
  )
}

export default EventTypeListTable
