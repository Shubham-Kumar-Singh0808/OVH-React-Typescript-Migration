import React, { useState, useEffect } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { CCol, CRow, CSpinner } from '@coreui/react-pro'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'
/** components */
import OCard from '../../../components/ReusableComponent/OCard'
import FilterOptions from './FilterOptions'
import EmployeeReportTable from './EmployeeReportTable'

const EmployeeReport = (): JSX.Element => {
  const dispatch = useAppDispatch()

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

  const [category, setCategory] = useState<string>('')

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  useEffect(() => {
    dispatch(
      reduxServices.employeeReports.getEmployeeReport({
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
        selectionStatus: selectedEmploymentStatus,
        selectedCategory: category,
        searchEmployee: searchEmployee,
      }),
    )
  }, [
    currentPage,
    dispatch,
    pageSize,
    selectedEmploymentStatus,
    category,
    searchEmployee,
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
            <FilterOptions category={category} setCategory={setCategory} />
            <EmployeeReportTable
              paginationRange={paginationRange}
              setPageSize={setPageSize}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              pageSize={pageSize}
            />
          </>
        ) : (
          <CCol>
            <CRow className="category-loading-spinner">
              <CSpinner />
            </CRow>
          </CCol>
        )}
      </OCard>
    </>
  )
}
export default EmployeeReport
