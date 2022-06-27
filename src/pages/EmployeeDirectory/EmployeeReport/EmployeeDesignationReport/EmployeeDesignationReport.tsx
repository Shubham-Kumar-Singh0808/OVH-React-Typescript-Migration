import React, { useState, useEffect } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { reduxServices } from '../../../../reducers/reduxServices'
import { usePagination } from '../../../../middleware/hooks/usePagination'
import { CCol, CRow, CSpinner } from '@coreui/react-pro'

/** components */
import OCard from '../../../../components/ReusableComponent/OCard'
import DesignationReportFilter from './DesignationReportFilter'
import EmployeeDesignationReportTable from './EmployeeDesignationReportTable'

const EmployeeDesignationReport = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const isLoading = useTypedSelector(
    reduxServices.employeeDesignationReports.selectors.isLoading,
  )
  const listSize = useTypedSelector(
    reduxServices.employeeDesignationReports.selectors.listSize,
  )

  // const selectedDesignation = useTypedSelector(
  //   reduxServices.employeeDesignationReports.selectors.selectedDesignation,
  // )

  const [designation, setDesignation] = useState<string>('')

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  useEffect(() => {
    dispatch(reduxServices.employeeDesignationReports.getDesignations())
  }, [dispatch])

  useEffect(() => {
    if (designation) {
      dispatch(
        reduxServices.employeeDesignationReports.actions.changeSelectedDesignation(
          designation,
        ),
      )
    }
  }, [dispatch, designation])

  useEffect(() => {
    if (designation) {
      dispatch(
        reduxServices.employeeDesignationReports.getEmployeeDesignationReport({
          startIndex: pageSize * (currentPage - 1),
          endIndex: pageSize * currentPage,
          selectedDesignation: designation,
        }),
      )
    }
  }, [currentPage, dispatch, pageSize, designation])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Employee Designation List Report"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        {isLoading !== ApiLoadingState.loading ? (
          <>
            <DesignationReportFilter
              designation={designation}
              setDesignation={setDesignation}
            />
            <EmployeeDesignationReportTable
              paginationRange={paginationRange}
              setPageSize={setPageSize}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              pageSize={pageSize}
            />
          </>
        ) : (
          <CCol>
            <CRow className="category-loading-spinner">
              <CSpinner />
            </CRow>
          </CCol>
        )}
      </OCard>
    </>
  )
}

export default EmployeeDesignationReport
