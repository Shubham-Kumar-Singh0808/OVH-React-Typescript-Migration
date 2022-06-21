import React, { useEffect } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { CCol, CRow, CSpinner } from '@coreui/react-pro'
import { ApiLoadingState } from '../../../middleware/api/apiList'

/** components */
import OCard from '../../../components/ReusableComponent/OCard'
import FilterOptions from './FilterOptions'
import { reduxServices } from '../../../reducers/reduxServices'

const EmployeeReport = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const isLoading = useTypedSelector(
    reduxServices.employeeReports.selectors.isLoading,
  )
  const listSize = useTypedSelector(
    reduxServices.employeeReports.selectors.listSize,
  )
  const selectedEmploymentStatus = useTypedSelector(
    reduxServices.employeeReports.selectors.selectedEmploymentStatus,
  )

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Employee Report"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        {isLoading !== ApiLoadingState.loading ? (
          <>
            <FilterOptions />
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
export default EmployeeReport
