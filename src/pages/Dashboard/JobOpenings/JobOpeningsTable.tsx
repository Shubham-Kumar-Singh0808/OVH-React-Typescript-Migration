import React from 'react'
import {
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'

const JobOpeningsTable = (): JSX.Element => {
  return (
    <>
      <CTable className="mt-4" striped align="middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Job Code</CTableHeaderCell>
            <CTableHeaderCell scope="col">Job Title</CTableHeaderCell>
            <CTableHeaderCell scope="col">Experience</CTableHeaderCell>
            <CTableHeaderCell scope="col">Job Description</CTableHeaderCell>
            <CTableHeaderCell scope="col">Position open date</CTableHeaderCell>
            <CTableHeaderCell scope="col">
              Position expiry date
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">No.of Vacancies</CTableHeaderCell>
            <CTableHeaderCell scope="col">Positions Closed</CTableHeaderCell>
            <CTableHeaderCell scope="col">Positions Vacant</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
      </CTable>
    </>
  )
}

export default JobOpeningsTable
