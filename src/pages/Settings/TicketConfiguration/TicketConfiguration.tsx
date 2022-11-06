import React, { useEffect, useState } from 'react'
import TicketConfigurationOptions from './TicketConfigurationOptions'
import SubCategoryListTable from './SubCategoryListTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'

const TicketConfiguration = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const [filterByDepartment, setFilterByDepartment] = useState<number>()
  const [filterByCategory, setFilterByCategory] = useState<number>()
  const [filterBySubCategory, setFilterBySubCategory] = useState<number>()

  const subCategoryListSize = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.listSize,
  )

  const isLoading = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.isLoading,
  )

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(subCategoryListSize, 20)

  useEffect(() => {
    if (filterByDepartment) {
      dispatch(
        reduxServices.ticketConfiguration.getTicketConfigurationSubCategoryList(
          {
            startIndex: pageSize * (currentPage - 1),
            endIndex: pageSize * currentPage,
            departmentId: filterByDepartment as number,
            categoryId: filterByCategory as number,
            subCategoryId: filterBySubCategory as number,
          },
        ),
      )
    }
  }, [
    currentPage,
    pageSize,
    filterByDepartment,
    filterByCategory,
    filterBySubCategory,
  ])
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Sub-Category List"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <TicketConfigurationOptions
          setFilterByDepartment={setFilterByDepartment}
          setFilterByCategory={setFilterByCategory}
          setFilterBySubCategory={setFilterBySubCategory}
        />
        {isLoading !== ApiLoadingState.loading ? (
          <SubCategoryListTable
            paginationRange={paginationRange}
            setPageSize={setPageSize}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        ) : (
          <OLoadingSpinner type={LoadingType.PAGE} />
        )}
      </OCard>
    </>
  )
}

export default TicketConfiguration
