import React, { useEffect } from 'react'
import SQAAuditReportTable from './SQAAuditReportTable'
import { usePagination } from '../../middleware/hooks/usePagination'
import { reduxServices } from '../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../stateStore'

const SQAAuditReportFilterOptions = (): JSX.Element => {
  const sqaAuditReportListSize = useTypedSelector(
    reduxServices.sqaAuditReport.selectors.sqaAuditReportListSize,
  )
  const dispatch = useAppDispatch()
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(sqaAuditReportListSize, 20)

  useEffect(() => {
    dispatch(
      reduxServices.sqaAuditReport.getSQAAuditReport({
        endIndex: pageSize * currentPage,
        multiSearch: '',
        startIndex: pageSize * (currentPage - 1),
        SQAAuditSelectionDate: '',
        auditRescheduleStatus: '',
        auditStatus: '',
        from: '',
        to: '',
      }),
    )
  }, [dispatch, pageSize, currentPage])
  return (
    <>
      <SQAAuditReportTable
        paginationRange={paginationRange}
        setPageSize={setPageSize}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        pageSize={pageSize}
      />
    </>
  )
}

export default SQAAuditReportFilterOptions
