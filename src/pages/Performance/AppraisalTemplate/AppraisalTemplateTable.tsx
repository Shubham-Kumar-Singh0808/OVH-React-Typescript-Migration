import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
} from '@coreui/react-pro'
import React from 'react'

const AppraisalTemplateTable = (): JSX.Element => {
  return (
    <>
      <CTable striped responsive className="mt-5 align-middle alignment">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Appraisal Title</CTableHeaderCell>
            <CTableHeaderCell scope="col">Department</CTableHeaderCell>
            <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
            <CTableHeaderCell scope="col" className="text-center">
              Action
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
      </CTable>
    </>
  )
}

export default AppraisalTemplateTable
