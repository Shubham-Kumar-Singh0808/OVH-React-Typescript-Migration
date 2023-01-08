import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CButton,
  CCol,
  CRow,
} from '@coreui/react-pro'
import React from 'react'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ReviewListTableProps } from '../../../types/Performance/ReviewList/reviewListTypes'

const ReviewListTable = (props: ReviewListTableProps): JSX.Element => {
  const dispatch = useAppDispatch()

  const appraisalReviews = useTypedSelector(
    reduxServices.reviewList.selectors.appraisalReviews,
  )

  const reviewListSize = useTypedSelector(
    reduxServices.reviewList.selectors.listSize,
  )
  console.log(appraisalReviews)

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

  const paginationComponent =
    appraisalReviews?.size > 0 ? (
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

  return (
    <>
      {props.isTableView && (
        <>
          <CTable striped responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Employee Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Manager Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Department</CTableHeaderCell>
                <CTableHeaderCell scope="col">Department</CTableHeaderCell>
                <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
                <CTableHeaderCell scope="col">Month</CTableHeaderCell>
                <CTableHeaderCell scope="col">Emp Avg Rating</CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  {"Manager's Avg Rating"}
                </CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            {appraisalReviews?.size > 0 && (
              <CTableBody>
                {appraisalReviews &&
                  appraisalReviews.list?.map((review, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                        <CTableHeaderCell>{review.empId}</CTableHeaderCell>
                        <CTableHeaderCell>
                          {review.employeeName}
                        </CTableHeaderCell>
                        <CTableHeaderCell>
                          {review.manager1Name}
                        </CTableHeaderCell>
                        <CTableHeaderCell>
                          {review.empDepartmentName}
                        </CTableHeaderCell>
                        <CTableHeaderCell>
                          {review.empDesignationName}
                        </CTableHeaderCell>
                        <CTableHeaderCell>
                          {review.cycleStartDate}
                        </CTableHeaderCell>
                        <CTableHeaderCell>
                          {review.empAvgRating}
                        </CTableHeaderCell>

                        <CTableHeaderCell>
                          {Number.isNaN(review.overallAvgRating) && 'N/A'}
                        </CTableHeaderCell>

                        <CTableHeaderCell>{review.formStatus}</CTableHeaderCell>
                        <CTableHeaderCell>
                          <CButton
                            className="btn-ovh me-1 sh-eye-btn-color btn-sm btn-ovh-employee-list cursor-pointer"
                            data-testid={`view-reviewForm-btn${index}`}
                          >
                            <i className="fa fa-eye" aria-hidden="true"></i>
                          </CButton>
                        </CTableHeaderCell>
                      </CTableRow>
                    )
                  })}
              </CTableBody>
            )}
          </CTable>
        </>
      )}
      {paginationComponent}
    </>
  )
}

export default ReviewListTable
