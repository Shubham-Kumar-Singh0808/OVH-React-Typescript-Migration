import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CButton,
  CCol,
  CRow,
  CTableDataCell,
  CBadge,
  CTooltip,
} from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import React from 'react'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { ReviewListTableProps } from '../../../types/Performance/ReviewList/reviewListTypes'
import { MyReviewFormStatus } from '../../../types/Performance/MyReview/myReviewTypes'

const ReviewListTable = (props: ReviewListTableProps): JSX.Element => {
  const appraisalReviews = useTypedSelector(
    reduxServices.reviewList.selectors.appraisalReviews,
  )
  const currentListStatus = useTypedSelector(
    (state) => state.reviewList.currentListStatus,
  )
  const reviewListSize = useTypedSelector(
    reduxServices.reviewList.selectors.listSize,
  )

  const {
    paginationRange,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
  } = props

  const handleReviewListPageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const reviewStatusLabelColor = (status: string): JSX.Element => {
    if (status === MyReviewFormStatus.completed.toString()) {
      return (
        <CBadge color="success" className="review-status">
          {MyReviewFormStatus.completed}
        </CBadge>
      )
    } else if (status === MyReviewFormStatus.pendingagreement.toString()) {
      return (
        <CBadge className="discuss-btn review-status">
          {'Needs Acknowledgement'}
        </CBadge>
      )
    } else if (status === MyReviewFormStatus.submitForEmployee.toString()) {
      return (
        <CBadge color="warning" className="review-status">
          {'Review Pending'}
        </CBadge>
      )
    } else if (status === MyReviewFormStatus.closed.toString()) {
      return (
        <CBadge color="success" className="review-status">
          {'Closed'}
        </CBadge>
      )
    }
    return (
      <CBadge color="danger" className="review-status">
        {'Not-Submitted'}
      </CBadge>
    )
  }

  const paginationComponent =
    reviewListSize > 0 ? (
      <CRow className="mt-3">
        <CCol xs={4}>
          <strong>{`Total Records: ${appraisalReviews?.size} `}</strong>
        </CCol>
        <CCol xs={3}>
          {reviewListSize > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handleReviewListPageSizeSelectChange}
              options={[20, 40, 60, 80]}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {reviewListSize > 20 && (
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
    ) : (
      <CRow className="mt-3 ms-3">
        <strong>No Records Found... </strong>
      </CRow>
    )

  const getFinalRatingValue = (rating: number | string | null): string => {
    return rating ? rating.toString() : 'N/A'
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  return (
    <>
      <CTable striped responsive align="middle">
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
              {"Manager's Avg Rating"}
            </CTableHeaderCell>
            <CTableHeaderCell>Status</CTableHeaderCell>
            {currentListStatus !== 'SAVE' && (
              <CTableHeaderCell>Action</CTableHeaderCell>
            )}
          </CTableRow>
        </CTableHead>
        {appraisalReviews?.size > 0 && (
          <CTableBody>
            {appraisalReviews &&
              appraisalReviews.list?.map((review, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell> {getItemNumber(index)}</CTableDataCell>
                    <CTableDataCell>{review.empId}</CTableDataCell>
                    <CTableDataCell>{review.employeeName}</CTableDataCell>
                    <CTableDataCell>{review.manager1Name}</CTableDataCell>
                    <CTableDataCell>{review.empDepartmentName}</CTableDataCell>
                    <CTableDataCell>{review.empDesignationName}</CTableDataCell>
                    <CTableDataCell>{review.cycleStartDate}</CTableDataCell>
                    <CTableDataCell
                      data-testid={`reviewListTable-empRating-${index}`}
                    >
                      {getFinalRatingValue(review.empAvgRating)}
                    </CTableDataCell>
                    <CTableDataCell
                      data-testid={`reviewListTable-managerRating-${index}`}
                    >
                      {getFinalRatingValue(review.overallAvgRating)}
                    </CTableDataCell>
                    <CTableDataCell
                      data-testid={`reviewListTable-formStatus-${index}`}
                    >
                      {reviewStatusLabelColor(review.formStatus)}
                    </CTableDataCell>
                    {
                      //the employee has submitted the form. Only then can the manager see the form
                      currentListStatus !== 'SAVE' && (
                        <CTableDataCell>
                          <Link to={`/managerAppraisal/${review.empId}`}>
                            <CTooltip content="View">
                              <CButton
                                className="btn-ovh me-1 sh-eye-btn-color btn-sm btn-ovh-employee-list cursor-pointer"
                                data-testid={`reviewList-viewForm-${index}`}
                              >
                                <i className="fa fa-eye" aria-hidden="true"></i>
                              </CButton>
                            </CTooltip>
                          </Link>
                        </CTableDataCell>
                      )
                    }
                  </CTableRow>
                )
              })}
          </CTableBody>
        )}
      </CTable>
      {paginationComponent}
    </>
  )
}

export default ReviewListTable
