import {
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCol,
} from '@coreui/react-pro'
import React, { useEffect } from 'react'
import OCard from '../../../components/ReusableComponent/OCard'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { EmployeeLeaveReportTableProps } from '../../../types/Leaves/LeaveReports/leaveReportTypes'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'

const LeaveReportTable = ({
  paginationRange,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
}: EmployeeLeaveReportTableProps): JSX.Element => {
  const getLeaveReports = useTypedSelector(
    reduxServices.leaveReport.selectors.getLeaveReport,
  )
  const isLoading = useTypedSelector(
    reduxServices.leaveReport.selectors.isLoading,
  )

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const dispatch = useAppDispatch()

  const getEmployeeLeaveCategories = useTypedSelector(
    reduxServices.employeeLeaveSettings.selectors.employeeLeaveCategories,
  )

  useEffect(() => {
    dispatch(reduxServices.employeeLeaveSettings.getEmployeeLeaveCategories())
  }, [dispatch])
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="All Employees Leave Summary"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CTable striped align="middle">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Carry Forwarded (Days)</CTableHeaderCell>
              <CTableHeaderCell>Credited (Days)</CTableHeaderCell>
              {getEmployeeLeaveCategories?.map((leave, index) => (
                <CTableHeaderCell key={index}>
                  {leave.name} Applied (Days)
                </CTableHeaderCell>
              ))}
              <CTableHeaderCell>Leaves Remaining (Days)</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody color="light">
            {isLoading !== ApiLoadingState.loading ? (
              getLeaveReports &&
              getLeaveReports?.list?.map((leave, index) => {
                const formattedValue =
                  leave.calculatedCreditedLeaves % 1 === 0
                    ? leave.calculatedCreditedLeaves?.toFixed(2)
                    : leave.calculatedCreditedLeaves?.toString()
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{leave.employeeDTO.id}</CTableDataCell>
                    <CTableDataCell>
                      {leave.employeeDTO.fullName}
                    </CTableDataCell>
                    <CTableDataCell>
                      {leave.carryForwardedLeaves}
                    </CTableDataCell>
                    <CTableDataCell>{formattedValue}</CTableDataCell>
                    {getLeaveReports?.list[0]?.leaveCategorySummaries?.map(
                      (leaveCategory) => (
                        <CTableDataCell key={index}>
                          {leaveCategory.daysPending +
                            leaveCategory.daysTaken +
                            leaveCategory.daysScheduled}{' '}
                        </CTableDataCell>
                      ),
                    )}
                    <CTableDataCell>
                      {leave.calculatedCreditedLeaves}
                    </CTableDataCell>
                  </CTableRow>
                )
              })
            ) : (
              <OLoadingSpinner type={LoadingType.PAGE} />
            )}
          </CTableBody>
        </CTable>
        {getLeaveReports.list?.length ? (
          <CRow>
            <CCol xs={4}>
              <p>
                <strong>Total Records: {getLeaveReports.size}</strong>
              </p>
            </CCol>
            <CCol xs={3}>
              {getLeaveReports.size > 20 && (
                <OPageSizeSelect
                  handlePageSizeSelectChange={handlePageSizeSelectChange}
                  options={[20, 40, 60, 80, 100]}
                  selectedPageSize={pageSize}
                />
              )}
            </CCol>
            {getLeaveReports.size > 20 && (
              <CCol
                xs={5}
                className="gap-1 d-grid d-md-flex justify-content-md-end"
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
          <CCol>
            <CRow className="mt-3 ms-3">
              <h5>No Records Found... </h5>
            </CRow>
          </CCol>
        )}
      </OCard>
    </>
  )
}
export default LeaveReportTable
