import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CRow,
  CCol,
  CBadge,
} from '@coreui/react-pro'
import React, { useEffect, useMemo } from 'react'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { currentPageData } from '../../../utils/paginationUtils'
import { useSelectedEmployee } from '../../../middleware/hooks/useSelectedEmployee'

const EmployeeReviewTable = (): JSX.Element => {
  const [isViewingAnotherEmployee, selectedEmployeeId] = useSelectedEmployee()

  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const employeeReviews = useTypedSelector(
    reduxServices.employeeReviews.selectors.employeeReviews,
  )
  const dispatch = useAppDispatch()

  // useEffect(() => {
  //   dispatch(reduxServices.employeeReviews.getEmployeeReviews(employeeId))
  // }, [dispatch, employeeId])

  useEffect(() => {
    dispatch(
      reduxServices.employeeReviews.getEmployeeReviews(
        isViewingAnotherEmployee ? String(selectedEmployeeId) : employeeId,
      ),
    )
  }, [dispatch, employeeId, isViewingAnotherEmployee, selectedEmployeeId])

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(employeeReviews.length, 20)

  useEffect(() => {
    setPageSize(20)
  }, [employeeReviews, setPageSize, setCurrentPage])

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const currentPageItems = useMemo(
    () => currentPageData(employeeReviews, currentPage, pageSize),
    [employeeReviews, currentPage, pageSize],
  )

  return (
    <>
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">Employee Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Manager Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Department</CTableHeaderCell>
            <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
            <CTableHeaderCell scope="col">Month</CTableHeaderCell>
            <CTableHeaderCell scope="col">Emp Avg Rating</CTableHeaderCell>
            <CTableHeaderCell scope="col">Managers Avg Rating</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentPageItems.map((review, index) => {
            return (
              <CTableRow key={index}>
                <CTableDataCell scope="row">
                  {getItemNumber(index)}
                </CTableDataCell>
                <CTableDataCell scope="row">{review.id}</CTableDataCell>
                <CTableDataCell scope="row">
                  {review.employeeName}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {review.manager1Name}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {review.empDepartmentName}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {review.empDesignationName}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {review.cycleStartDate}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {review.empAvgRating}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {review.overallAvgRating || 'N/A'}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  <CBadge color="success"> {review.formStatus}</CBadge>
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4} className="mt-3">
          <strong>
            {employeeReviews?.length
              ? `Total Records: ${employeeReviews.length}`
              : `No Records Found`}
          </strong>
        </CCol>
        <CCol xs={3}>
          {employeeReviews.length > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSizeSelectChange}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {employeeReviews.length > 20 && (
          <CCol
            xs={5}
            className="d-grid gap-1 d-md-flex justify-content-md-end"
          >
            <OPagination
              currentPage={currentPage}
              pageSetter={setCurrentPage}
              paginationRange={paginationRange}
            />
          </CCol>
        )}
      </CRow>
    </>
  )
}
export default EmployeeReviewTable
