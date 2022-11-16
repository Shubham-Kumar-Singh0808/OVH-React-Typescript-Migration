import React, { useEffect } from 'react'
import LeaveApprovalFilterOptions from './LeaveApprovalFilterOptions'
import EmployeeLeaves from './EmployeeLeaves'
import EmployeeLeaveRequests from './EmployeeLeaveRequests'
import SearchEmployeeLeaveRequests from './SearchEmployeeLeaveRequests'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'

const LeaveApprovals = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const currentYear = new Date().getFullYear()
  const previousMonthResult = new Date(
    Number(currentYear),
    Number(new Date().getMonth() - 1),
    Number(25),
  )
  const currentMonthResult = new Date(
    Number(currentYear),
    Number(new Date().getMonth()),
    Number(24),
  )

  const employeesLeavesListSize = useTypedSelector(
    reduxServices.leaveApprovals.selectors.listSize,
  )

  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

  const isViewBtnClick = useTypedSelector(
    reduxServices.leaveApprovals.selectors.isViewBtnClick,
  )

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(employeesLeavesListSize, 20)

  useEffect(() => {
    dispatch(reduxServices.leaveApprovals.getEmployees(employeeId))
    dispatch(
      reduxServices.leaveApprovals.getEmployeeLeaves({
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
        managerId: Number(employeeId),
      }),
    )
  }, [pageSize, currentPage, employeeId])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Leave Approvals"
        CFooterClassName="d-none"
      >
        <LeaveApprovalFilterOptions
          previousMonthResult={previousMonthResult}
          currentMonthResult={currentMonthResult}
        />
      </OCard>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Employee Leaves"
        CFooterClassName="d-none"
      >
        <EmployeeLeaves isViewBtnClick={isViewBtnClick} />
      </OCard>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Leave Requests"
        CFooterClassName="d-none"
      >
        {isViewBtnClick ? (
          <SearchEmployeeLeaveRequests />
        ) : (
          <EmployeeLeaveRequests
            paginationRange={paginationRange}
            setPageSize={setPageSize}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        )}
      </OCard>
    </>
  )
}

export default LeaveApprovals
