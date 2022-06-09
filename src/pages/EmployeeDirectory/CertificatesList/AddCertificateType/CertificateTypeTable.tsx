import {
  CButton,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'

const CertificateTypeTable = (): JSX.Element => {
  return (
    <>
      <CTable striped responsive>
        <CTableHead>
          <CTableRow className="align-items-start">
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Technology</CTableHeaderCell>
            <CTableHeaderCell scope="col">Certificate</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableHeaderCell scope="row">1</CTableHeaderCell>
            <CTableDataCell>SQA</CTableDataCell>
            <CTableDataCell>SQA management</CTableDataCell>
            <CTableDataCell>
              <CButton color="danger" size="sm">
                <CIcon className="text-white" icon={cilTrash} />
              </CButton>
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
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

export default CertificateTypeTable
