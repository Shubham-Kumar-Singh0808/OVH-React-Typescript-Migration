import { CCol, CRow } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import LeaveSummaryTable from './LeaveSummaryTable'
import EarnedLeavesApplied from './EarnedLeavesApplied'
import LeaveHistoryTable from './LeaveHistoryTable'
import OCard from '../../../../components/ReusableComponent/OCard'
import { usePagination } from '../../../../middleware/hooks/usePagination'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import OLoadingSpinner from '../../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { LoadingType } from '../../../../types/Components/loadingScreenTypes'

const EmployeeLeaveSummary = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const listSize = useTypedSelector(
    reduxServices.employeeLeaveSummary.selectors.listSize,
  )
  const isLoading = useTypedSelector(
    reduxServices.employeeLeaveSummary.selectors.isLoading,
  )
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  useEffect(() => {
    dispatch(reduxServices.employeeLeaveSummary.getEmployeeLeaveSummary())
    dispatch(
      reduxServices.employeeLeaveSummary.getEmployeeLeaveHistory({
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
      }),
    )
  }, [currentPage, dispatch, pageSize])

  return (
    <>
      {isLoading !== ApiLoadingState.loading ? (
        <>
          <CRow>
            <CCol md={9}>
              <OCard
                className="mb-4 myprofile-wrapper"
                title="Leave Summary"
                CBodyClassName="ps-0 pe-0"
                CFooterClassName="d-none"
              >
                <LeaveSummaryTable />
              </OCard>
            </CCol>
            <CCol md={3}>
              <OCard
                className="mb-4 myprofile-wrapper"
                title="Earned Leaves Applied"
                CBodyClassName="ps-0 pe-0"
                CFooterClassName="d-none"
              >
                <EarnedLeavesApplied />
              </OCard>
            </CCol>
          </CRow>
          <OCard
            className="mb-4 myprofile-wrapper"
            title="Leave History"
            CBodyClassName="ps-0 pe-0"
            CFooterClassName="d-none"
          >
            <LeaveHistoryTable
              paginationRange={paginationRange}
              setPageSize={setPageSize}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              pageSize={pageSize}
            />
          </OCard>
        </>
      ) : (
        <OLoadingSpinner type={LoadingType.PAGE} />
      )}
    </>
  )
}

export default EmployeeLeaveSummary
