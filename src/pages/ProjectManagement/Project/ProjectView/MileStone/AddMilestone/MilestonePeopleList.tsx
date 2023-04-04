import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../../../stateStore'

const MilestonePeopleList = () => {
  const getProjectDetail = useTypedSelector(
    reduxServices.projectViewDetails.selectors.projectDetail,
  )

  return (
    <>
      <div className="table-scroll">
        <div className="table-responsive colorTable">
          WD<span style={{ color: 'red' }}>*</span> = Working Days , HD
          <span style={{ color: 'red' }}>*</span> = Holidays , TD
          <span style={{ color: 'red' }}>*</span> = Total Days , THrs
          <span style={{ color: 'red' }}>*</span> = Total Hours.
        </div>
        <CTable className="table  table-striped headings-align">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">From Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">To Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">WD</CTableHeaderCell>
              <CTableHeaderCell scope="col">HD</CTableHeaderCell>
              <CTableHeaderCell scope="col">Leaves</CTableHeaderCell>
              <CTableHeaderCell scope="col">TD</CTableHeaderCell>
              <CTableHeaderCell scope="col">Hours</CTableHeaderCell>
              <CTableHeaderCell scope="col">THrs</CTableHeaderCell>
              <CTableHeaderCell scope="col">Role</CTableHeaderCell>
              <CTableHeaderCell scope="col">Billable</CTableHeaderCell>
              <CTableHeaderCell scope="col">Comments</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell scope="row">{'1985'}</CTableDataCell>
              <CTableDataCell scope="row">{'Vinesh Merugu'}</CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </div>
    </>
  )
}

export default MilestonePeopleList
