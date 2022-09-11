import React, { useEffect } from 'react'
import ProbationaryListTable from './ProbationaryListTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { usePagination } from '../../../middleware/hooks/usePagination'

const ProbationaryList = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const employeesProbationListSize = useTypedSelector(
    reduxServices.employeeProbationPeriod.selectors.listSize,
  )
  const isProbationListLoading = useTypedSelector(
    reduxServices.employeeProbationPeriod.selectors.isLoading,
  )
  const employeeID = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(employeesProbationListSize, 20)

  useEffect(() => {
    dispatch(
      reduxServices.employeeProbationPeriod.getEmployeesUnderProbationPeriod({
        employeeId: Number(employeeID),
        startIndex: 0,
        endIndex: 20,
      }),
    )
  }, [dispatch])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Upcoming Probationary End Dates"
        CFooterClassName="d-none"
      >
        {isProbationListLoading !== ApiLoadingState.loading ? (
          <>
            <ProbationaryListTable
              paginationRange={paginationRange}
              setPageSize={setPageSize}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              pageSize={pageSize}
            />
          </>
        ) : (
          <></>
        )}
      </OCard>
    </>
  )
}

export default ProbationaryList
