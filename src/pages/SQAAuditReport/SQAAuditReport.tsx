import React from 'react'
import OCard from '../../components/ReusableComponent/OCard'
import { usePagination } from '../../middleware/hooks/usePagination'
import { reduxServices } from '../../reducers/reduxServices'
import { useTypedSelector } from '../../stateStore'

const SQAAuditReport = (): JSX.Element => {
  const auditlistSize = useTypedSelector(
    reduxServices.tickets.selectors.allTicketsListSize,
  )
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="SQA Audit Report"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      ></OCard>
    </>
  )
}

export default SQAAuditReport
