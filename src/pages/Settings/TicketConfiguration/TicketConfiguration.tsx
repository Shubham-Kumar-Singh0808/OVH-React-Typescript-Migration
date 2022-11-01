import React, { useEffect } from 'react'
import TicketConfigurationOptions from './TicketConfigurationOptions'
import SubCategoryListTable from './SubCategoryListTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const TicketConfiguration = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const subCategoryListSize = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.listSize,
  )
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(subCategoryListSize, 20)

  useEffect(() => {
    dispatch(
      reduxServices.ticketConfiguration.getTicketConfigurationSubCategoryList({
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
        departmentId: 0,
      }),
    )
  }, [currentPage, dispatch, pageSize])
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Sub-Category List"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <TicketConfigurationOptions />
        <SubCategoryListTable
          paginationRange={paginationRange}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </OCard>
    </>
  )
}

export default TicketConfiguration
