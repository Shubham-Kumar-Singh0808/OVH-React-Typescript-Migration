import React, { useEffect, useState } from 'react'
import TicketConfigurationOptions from './TicketConfigurationOptions'
import SubCategoryListTable from './SubCategoryListTable'
import TicketHistoryDetails from './TicketHistory/TicketHistoryDetails'
import AddNewSubCategory from './AddSubCategory/AddNewSubCategory'
import CategoryList from './CategoryList/CategoryList'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'

const TicketConfiguration = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const [filterByDepartment, setFilterByDepartment] = useState<
    number | string
  >()
  const [filterByCategory, setFilterByCategory] = useState<number | string>()
  const [filterBySubCategory, setFilterBySubCategory] = useState<
    number | string
  >()
  const [isTableView, setIsTableView] = useState(false)

  const subCategoryListSize = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.listSize,
  )

  const isLoading = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.isLoading,
  )

  const toggle = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.toggle,
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
            departmentId: (filterByDepartment as string) ?? '',
            categoryId: (filterByCategory as string) ?? '',
            subCategoryId: (filterBySubCategory as string) ?? '',
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
      {toggle === '' && (
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
              setIsTableView={setIsTableView}
            />
            {isLoading !== ApiLoadingState.loading ? (
              <SubCategoryListTable
                paginationRange={paginationRange}
                setPageSize={setPageSize}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                pageSize={pageSize}
                filterByDepartment={filterByDepartment as string}
                filterByCategory={filterByCategory as string}
                filterBySubCategory={filterBySubCategory as string}
                isTableView={isTableView}
              />
            ) : (
              <OLoadingSpinner type={LoadingType.PAGE} />
            )}
          </OCard>
        </>
      )}
      {toggle === 'ticketHistory' && <TicketHistoryDetails />}
      {toggle === 'addSubCategory' && <AddNewSubCategory />}
      {toggle === 'addCategory' && <CategoryList />}
    </>
  )
}

export default TicketConfiguration
