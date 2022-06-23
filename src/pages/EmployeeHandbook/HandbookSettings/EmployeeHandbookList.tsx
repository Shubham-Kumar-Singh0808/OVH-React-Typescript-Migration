import { CCol, CRow, CSpinner } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

import { ApiLoadingState } from '../../../middleware/api/apiList'
import EmployeeHandbookTable from './EmployeeHandbookTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'

const EmployeeHandbookList = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const listSize = useTypedSelector(
    reduxServices.employeeHandbookSettings.selectors.listSize,
  )
  const isLoading = useTypedSelector(
    reduxServices.employeeHandbookSettings.selectors.isLoading,
  )

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  useEffect(() => {
    dispatch(
      reduxServices.employeeHandbookSettings.getEmployeeHandbooks({
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
      }),
    )
  }, [currentPage, dispatch, pageSize])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Handbook Settings "
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        {isLoading !== ApiLoadingState.loading ? (
          <>
            <EmployeeHandbookTable
              paginationRange={paginationRange}
              setPageSize={setPageSize}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              pageSize={pageSize}
            />
          </>
        ) : (
          <CCol>
            <CRow>
              <CSpinner />
            </CRow>
          </CCol>
        )}
      </OCard>
    </>
  )
}

export default EmployeeHandbookList
