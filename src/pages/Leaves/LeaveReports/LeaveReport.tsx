import React, { useEffect, useState } from 'react'
import LeaveReportFilterOption from './LeaveReportFilterOption'
import LeaveReportTable from './LeaveReportTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'

const LeaveReport = (): JSX.Element => {
  const currentYear = new Date().getFullYear()
  const [selectYear, setSelectYear] = useState(String(currentYear))
  const listSize = useTypedSelector(
    reduxServices.leaveReport.selectors.listSize,
  )
  const dispatch = useAppDispatch()
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  useEffect(() => {
    if (selectYear) {
      dispatch(
        reduxServices.leaveReport.getAllEmployeesLeaveSummaries({
          financialYear: selectYear,
          startIndex: pageSize * (currentPage - 1),
          endIndex: pageSize * currentPage,
        }),
      )
    }
  }, [dispatch, selectYear, pageSize, currentPage])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Leave Reports"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <LeaveReportFilterOption
          selectYear={selectYear}
          setSelectYear={setSelectYear}
        />
      </OCard>
      <LeaveReportTable
        paginationRange={paginationRange}
        setPageSize={setPageSize}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        pageSize={pageSize}
      />
    </>
  )
}
export default LeaveReport
