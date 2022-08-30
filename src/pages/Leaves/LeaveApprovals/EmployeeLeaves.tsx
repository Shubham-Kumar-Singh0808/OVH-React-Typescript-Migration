import {
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { EmployeeSummary } from '../../../types/Leaves/LeaveApprovals/leaveApprovalsTypes'

const EmployeeLeaves = ({
  isViewBtnClick,
}: {
  isViewBtnClick: boolean
}): JSX.Element => {
  const [dataToUse, setDataToUse] = useState<EmployeeSummary[]>()
  const employeeSummary = useTypedSelector(
    reduxServices.leaveApprovals.selectors.employeeSummary,
  )

  const leaveSummary = useTypedSelector(
    reduxServices.leaveApprovals.selectors.leaveSummary,
  )

  useEffect(() => {
    if (isViewBtnClick) {
      setDataToUse(leaveSummary)
    } else {
      setDataToUse(employeeSummary)
    }
  }, [isViewBtnClick, leaveSummary, employeeSummary])

  return (
    <>
      <CRow>
        <CTable striped responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Credited</CTableHeaderCell>
              <CTableHeaderCell>Approved</CTableHeaderCell>
              <CTableHeaderCell>Pending</CTableHeaderCell>
              <CTableHeaderCell>Cancel After Approval</CTableHeaderCell>
              <CTableHeaderCell>Remaining</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          {leaveSummary?.length || employeeSummary?.length ? (
            <CTableBody>
              {dataToUse?.map((summaryItem, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{summaryItem.empName}</CTableDataCell>
                    <CTableDataCell>{summaryItem.totalDays}</CTableDataCell>
                    <CTableDataCell>
                      {summaryItem.approvedLeaves}
                    </CTableDataCell>
                    <CTableDataCell>{summaryItem.pendingLeaves}</CTableDataCell>
                    <CTableDataCell>
                      {summaryItem.cancelAfterApprovalLeaves}
                    </CTableDataCell>
                    <CTableDataCell>{summaryItem.remainingDays}</CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          ) : (
            <CCol>
              <CRow className="mt-3">
                <h5>No Records Found... </h5>
              </CRow>
            </CCol>
          )}
        </CTable>
      </CRow>
    </>
  )
}

export default EmployeeLeaves
