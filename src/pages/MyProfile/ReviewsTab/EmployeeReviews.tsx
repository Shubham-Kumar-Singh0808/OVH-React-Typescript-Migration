import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCardHeader,
  CCardBody,
} from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
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
  console.log(getReviewDetails)
  return (
    <>
      <CCardHeader>
        <h4 className="h4">Review List</h4>
      </CCardHeader>
      <CCardBody className="ps-0 pe-0">
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
              <CTableHeaderCell scope="col">
                Managers Avg Rating
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {getReviewDetails?.map((review, index) => (
              <CTableRow key={index}>
                <CTableDataCell scope="row">{index + 1}</CTableDataCell>
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
                  {review.overallAvgRating}
                </CTableDataCell>
                <CTableDataCell className="label label-success employee_status employee-status ng-scope">
                  {review.formStatus}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
      <strong>
        {getReviewDetails?.length
          ? `Total Records: ${getReviewDetails?.length}`
          : `No Records found`}
      </strong>
    </>
  )
}
export default EmployeeReviews
