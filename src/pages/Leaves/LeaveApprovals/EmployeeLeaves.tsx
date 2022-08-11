import {
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
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

  const isLoading = useTypedSelector(
    reduxServices.leaveApprovals.selectors.isLoading,
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
          {isLoading !== ApiLoadingState.loading &&
          (leaveSummary?.length || employeeSummary?.length) ? (
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
            // <OLoadingSpinner type={LoadingType.PAGE} />
            <CSpinner />
          )}
        </CTable>
      </CRow>
    </>
  )
}

export default EmployeeLeaves
