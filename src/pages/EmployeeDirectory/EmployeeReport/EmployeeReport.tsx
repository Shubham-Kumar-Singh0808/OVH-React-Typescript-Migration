import React, { useState, useEffect } from 'react'
import FilterOptions from './FilterOptions'
import EmployeeReportTable from './EmployeeReportTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'

const EmployeeReport = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const [category, setCategory] = useState<string>('')
  const [country, setCountry] = useState<string>()
  const [searchInput, setSearchInput] = useState<string>('')

  const isLoading = useTypedSelector(
    reduxServices.employeeReports.selectors.isLoading,
  )
  const listSize = useTypedSelector(
    reduxServices.employeeReports.selectors.listSize,
  )
  const selectedEmploymentStatus = useTypedSelector(
    reduxServices.employeeReports.selectors.selectedEmploymentStatus,
  )
  const searchEmployee = useTypedSelector(
    reduxServices.employeeReports.selectors.searchEmployee,
  )

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  useEffect(() => {
    dispatch(reduxServices.employeeReports.getCountries())
  }, [dispatch])

  useEffect(() => {
    dispatch(
      reduxServices.employeeReports.getEmployeeReport({
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
        selectionStatus: selectedEmploymentStatus,
        selectedCategory: category,
        searchEmployee,
        country,
      }),
    )
  }, [
    currentPage,
    dispatch,
    pageSize,
    selectedEmploymentStatus,
    category,
    searchEmployee,
    country,
  ])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Employee Report"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        {isLoading !== ApiLoadingState.loading ? (
          <>
            <FilterOptions
              category={category}
              setCategory={setCategory}
              country={country}
              setCountry={setCountry}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              setCurrentPage={setCurrentPage}
              pageSize={pageSize}
              currentPage={currentPage}
              setPageSize={setPageSize}
            />
            <EmployeeReportTable
              paginationRange={paginationRange}
              setPageSize={setPageSize}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              pageSize={pageSize}
            />
          </>
        ) : (
          <>
            <OLoadingSpinner type={LoadingType.PAGE} />
          </>
        )}
      </OCard>
    </>
  )
}
export default EmployeeReport
