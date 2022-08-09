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
import React from 'react'
import OCard from '../../../components/ReusableComponent/OCard'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { EmployeeLeaveReportTableProps } from '../../../types/Leaves/LeaveReports/leaveReportTypes'

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

  const listSize = useTypedSelector(
    reduxServices.leaveReport.selectors.listSize,
  )

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="All Employees Leave Summary"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <>
          {getLeaveReports.list.length ? (
            <>
              <CTable striped align="middle">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Carry Forwarded (Days)</CTableHeaderCell>
                    <CTableHeaderCell>Credited (Days)</CTableHeaderCell>
                    <CTableHeaderCell>Casual Applied (Days)</CTableHeaderCell>
                    <CTableHeaderCell>LOP Applied (Days)</CTableHeaderCell>
                    <CTableHeaderCell>PAID Applied (Days)</CTableHeaderCell>
                    <CTableHeaderCell>Leaves Remaining (Days)</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {getLeaveReports.list.map((leave, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableDataCell>{leave.employeeDTO.id}</CTableDataCell>
                        <CTableDataCell>
                          {leave.employeeDTO.fullName}
                        </CTableDataCell>
                        <CTableDataCell>
                          {leave.carryForwardedLeaves}
                        </CTableDataCell>
                        <CTableDataCell>
                          {leave.allCreditedLeaves}
                        </CTableDataCell>
                        <CTableDataCell>
                          {leave.allScheduledLeaves}
                        </CTableDataCell>
                        <CTableDataCell>
                          {leave.allLOPTakenLeaves}
                        </CTableDataCell>
                        <CTableDataCell>
                          {leave.allAvailableLeaves}
                        </CTableDataCell>
                        <CTableDataCell>
                          {leave.calculatedCreditedLeaves}
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
                </CTableBody>
              </CTable>
              <CRow>
                <CCol xs={4}>
                  <p>
                    <strong>Total Records: {listSize}</strong>
                  </p>
                </CCol>
                <CCol xs={3}>
                  {listSize > 20 && (
                    <OPageSizeSelect
                      handlePageSizeSelectChange={handlePageSizeSelectChange}
                      options={[20, 40, 60, 80]}
                      selectedPageSize={pageSize}
                    />
                  )}
                </CCol>
                {listSize > 20 && (
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
            </>
          ) : (
            <CCol>
              <CRow className="category-no-data">
                <h4 className="text-center">No data to display</h4>
              </CRow>
            </CCol>
          )}
        </>
      </OCard>
    </>
  )
}
export default LeaveReportTable
