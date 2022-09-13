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
      <CTable striped>
        <CTableHead>
          <CTableRow>
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
          <CTableRow>
            <CTableHeaderCell scope="row">Total Earned Leaves</CTableHeaderCell>
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
          <CTableRow>
            <CTableHeaderCell scope="row">LOP</CTableHeaderCell>
            <CTableDataCell>0</CTableDataCell>
            <CTableDataCell>
              {employeeLeaveSummary.allLOPTakenLeaves}
            </CTableDataCell>
            <CTableDataCell>
              {employeeLeaveSummary.allScheduledLeaves}
            </CTableDataCell>
            <CTableDataCell>
              {employeeLeaveSummary.allLOPPendingLeaves}
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
