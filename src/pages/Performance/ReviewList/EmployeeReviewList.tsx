import React, { useEffect, useState } from 'react'
import { CCol, CRow } from '@coreui/react-pro'
import ReviewListTable from './ReviewListTable'
import ReviewListFilterOptions from './ReviewListFilterOptions'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { usePagination } from '../../../middleware/hooks/usePagination'

const EmployeeReviewList = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [selectCycleId, setSelectCycleId] = useState<number>()
  const [filterByDepartment, setFilterByDepartment] = useState<string>()
  const [filterByDesignation, setFilterByDesignation] = useState<string>()
  const [isTableView, setIsTableView] = useState(false)

  const reviewListSize = useTypedSelector(
    reduxServices.reviewList.selectors.listSize,
  )
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(reviewListSize, 20)

  // useEffect(() => {
  //   if (filterByDepartment) {
  //     dispatch(
  //       reduxServices.reviewList.getReviewList({
  //         startIndex: pageSize * (currentPage - 1),
  //         endIndex: pageSize * currentPage,
  //         appraisalFormStatus: '',
  //         cycleId: Number(selectCycleId),
  //         departmentName: filterByDepartment,
  //         designationName: filterByDesignation as string,
  //         empStatus: '',
  //         employeeID: Number(employeeId),
  //         ratings: [],
  //         role: '',
  //         searchString: '',
  //         toDate: '',
  //       }),
  //     )
  //   }
  // }, [currentPage, pageSize, filterByDepartment, filterByDesignation])

  useEffect(() => {
    dispatch(reduxServices.reviewList.getEmployeeDepartments())
    dispatch(reduxServices.reviewList.getAppraisalCycles())
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
          setSelectCycleId={setSelectCycleId}
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
