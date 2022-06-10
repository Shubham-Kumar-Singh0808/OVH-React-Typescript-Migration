import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCardHeader,
  CCardBody,
  CBadge,
  CRow,
  CCol,
} from '@coreui/react-pro'
import React, { useEffect, useMemo } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { currentPageData } from '../../../utils/paginationUtils'
import { usePagination } from '../../../middleware/hooks/usePagination'
const EmployeeReviews = (): JSX.Element => {
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const getReviewDetails = useTypedSelector(
    reduxServices.reviewInformation.selectors.reviewsDetails,
  )

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(
      reduxServices.reviewInformation.getEmployeeReviewDetails(employeeId),
    )
  }, [dispatch, employeeId])

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(getReviewDetails.length, 20)

  useEffect(() => {
    setPageSize(20)
  }, [getReviewDetails, setPageSize, setCurrentPage])

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
    () => currentPageData(getReviewDetails, currentPage, pageSize),
    [getReviewDetails, currentPage, pageSize],
  )

  return (
    <>
      <CCardHeader>
        <h4 className="h4">Review List</h4>
      </CCardHeader>
      <br></br>
      <CCardBody className="ps-0 pe-0">
        {getReviewDetails.length ? (
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
                  <CTableHeaderCell scope="col">
                    Emp Avg Rating
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Managers Avg Rating
                  </CTableHeaderCell>
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
            &nbsp;&nbsp;
            <CRow>
              <CCol xs={4}>
                <p>
                  <strong>Total Records: {getReviewDetails.length}</strong>
                </p>
              </CCol>
              <CCol xs={3}>
                {getReviewDetails.length > 20 && (
                  <OPageSizeSelect
                    handlePageSizeSelectChange={handlePageSizeSelectChange}
                  />
                )}
              </CCol>
              {getReviewDetails.length > 20 && (
                <CCol
                  xs={5}
                  className="d-grid gap-2 d-md-flex justify-content-md-end"
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
        ) : (
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
                  <CTableHeaderCell scope="col">
                    Emp Avg Rating
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Managers Avg Rating
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
            </CTable>
            &nbsp;&nbsp;
            <CCol xs={4}>
              <p>
                <strong>No Records Found... </strong>
              </p>
            </CCol>
          </>
        )}
      </CCardBody>
    </>
  )
}
export default EmployeeReviews
