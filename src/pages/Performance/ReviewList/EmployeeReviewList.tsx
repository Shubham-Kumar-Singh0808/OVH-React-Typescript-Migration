import React, { useEffect, useState } from 'react'
import { CCol, CRow } from '@coreui/react-pro'
import ReviewListTable from './ReviewListTable'
import ReviewListFilterOptions from './ReviewListFilterOptions'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { ReviewListData } from '../../../types/Performance/ReviewList/reviewListTypes'

const EmployeeReviewList = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const reviewListSize = useTypedSelector(
    reduxServices.reviewList.selectors.listSize,
  )
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const initialReviewList: ReviewListData = {
    appraisalFormStatus: '',
    cycleId: 0,
    departmentName: '',
    designationName: '',
    empStatus: '',
    employeeID: employeeId,
    endIndex: 20,
    fromDate: '',
    ratings: [],
    role: '',
    searchString: '',
    startIndex: 0,
    toDate: '',
  }
  const [selectCycleId, setSelectCycleId] = useState<number>()
  const [filterByDepartment, setFilterByDepartment] = useState<string>()
  const [filterByDesignation, setFilterByDesignation] = useState<string>()
  const [isTableView, setIsTableView] = useState(false)
  const [reviewListParams, setReviewListParams] = useState(initialReviewList)

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(reviewListSize, 20)

  useEffect(() => {
    dispatch(reduxServices.reviewList.getEmployeeDepartments())
    dispatch(reduxServices.reviewList.getAppraisalCycles())
    dispatch(
      reduxServices.reviewList.getReviewList({
        ...reviewListParams,
        employeeID: String(employeeId),
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
      }),
    )
  }, [dispatch])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Review List"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <ReviewListFilterOptions
          setFilterByDepartment={setFilterByDepartment}
          setFilterByDesignation={setFilterByDesignation}
          setIsTableView={setIsTableView}
          selectCycleId={selectCycleId as number}
          setSelectCycleId={setSelectCycleId}
          initialReviewList={initialReviewList}
          setReviewListParams={setReviewListParams}
        />
        <CRow className="mt-4 mb-4">
          <CCol>
            <ReviewListTable
              filterByDepartment={filterByDepartment as string}
              filterByDesignation={filterByDesignation as string}
              isTableView={isTableView}
              paginationRange={paginationRange}
              setPageSize={setPageSize}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              pageSize={pageSize}
            />
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default EmployeeReviewList
