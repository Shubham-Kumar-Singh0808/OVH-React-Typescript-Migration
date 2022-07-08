import {
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React from 'react'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { ManagerHiveActivityReportProps } from '../../../types/TimeAndAttendance/HiveActivityReport/hiveActivityReportTypes'

const ManagerHiveActivityReport = (
  props: ManagerHiveActivityReportProps,
): JSX.Element => {
  const managerHiveActivityReport = useTypedSelector(
    reduxServices.hiveActivityReport.selectors.managerHiveActivityReport,
  )
  const listSize = useTypedSelector(
    reduxServices.hiveActivityReport.selectors.managerReportSize,
  )

  const {
    paginationRange,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
  } = props

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  return (
    <>
      {managerHiveActivityReport.list.length ? (
        <>
          <CTable striped className="time-in-office-table">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                {managerHiveActivityReport.list[0].activityTimes.map(
                  (currentActivity, activityIndex) => {
                    return (
                      <CTableHeaderCell
                        className="text-center"
                        key={activityIndex}
                        scope="col"
                      >
                        {currentActivity.dayofMonth}
                      </CTableHeaderCell>
                    )
                  },
                )}
                <CTableHeaderCell className="text-center" scope="col">
                  Total
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {managerHiveActivityReport.list.map(
                (employeeRecord, employeeRecordIndex) => {
                  return (
                    <CTableRow key={employeeRecordIndex}>
                      <CTableDataCell>{employeeRecord.id}</CTableDataCell>
                      <CTableDataCell>{`${employeeRecord.firstName} ${employeeRecord.lastName}`}</CTableDataCell>
                      {employeeRecord.activityTimes.map((value, index) => {
                        return (
                          <CTableDataCell className="text-center" key={index}>
                            {value.hours}
                          </CTableDataCell>
                        )
                      })}
                      <CTableDataCell className="text-center">
                        {employeeRecord.totalHiveTime}
                      </CTableDataCell>
                    </CTableRow>
                  )
                },
              )}
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
                  options={[20, 40, 60, 80, 100]}
                  selectedPageSize={pageSize}
                />
              )}
            </CCol>
            {listSize > 20 && (
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
        </>
      ) : (
        <CCol>
          <CRow className="category-no-data">
            <h4 className="text-center">No Records Found...</h4>
          </CRow>
        </CCol>
      )}
    </>
  )
}

export default ManagerHiveActivityReport
