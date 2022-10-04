import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const LeaveSummaryTable = (): JSX.Element => {
  const employeeLeaveSummary = useTypedSelector(
    reduxServices.employeeLeaveSummary.selectors.employeeLeaveSummary,
  )
  return (
    <>
      <CTable striped responsive className="align-middle">
        <CTableHead>
          <CTableRow className="text-center">
            <CTableHeaderCell scope="col">Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Credited</CTableHeaderCell>
            <CTableHeaderCell scope="col">approved</CTableHeaderCell>
            <CTableHeaderCell scope="col">Scheduled</CTableHeaderCell>
            <CTableHeaderCell scope="col">Pending</CTableHeaderCell>
            <CTableHeaderCell scope="col">
              Cancel After Approval
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">Remaining</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow className="text-center">
            <CTableDataCell scope="row">Total Earned Leaves</CTableDataCell>
            <CTableDataCell>
              {employeeLeaveSummary?.allCreditedLeaves}
            </CTableDataCell>
            <CTableDataCell>
              {employeeLeaveSummary?.allTakenLeaves}
            </CTableDataCell>
            <CTableDataCell>
              {employeeLeaveSummary?.allScheduledLeaves}
            </CTableDataCell>
            <CTableDataCell>
              {employeeLeaveSummary?.allPendingLeaves}
            </CTableDataCell>
            <CTableDataCell>
              {employeeLeaveSummary?.allCancelAfterApprovalLeaves}
            </CTableDataCell>
            <CTableDataCell>
              {employeeLeaveSummary?.allAvailableLeaves}
            </CTableDataCell>
          </CTableRow>
          <CTableRow className="text-center">
            <CTableDataCell scope="row">LOP</CTableDataCell>
            <CTableDataCell>0</CTableDataCell>
            <CTableDataCell>
              {employeeLeaveSummary?.allLOPTakenLeaves}
            </CTableDataCell>
            <CTableDataCell>
              {employeeLeaveSummary?.allScheduledLeaves}
            </CTableDataCell>
            <CTableDataCell>
              {employeeLeaveSummary?.allLOPPendingLeaves}
            </CTableDataCell>
            <CTableDataCell>0</CTableDataCell>
            <CTableDataCell>0</CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </>
  )
}

export default LeaveSummaryTable
