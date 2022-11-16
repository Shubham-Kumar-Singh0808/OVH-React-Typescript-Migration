import {
  CCol,
  CLink,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import HiveActivityDetailsTable from './HiveActivityDetailsTable'
import OModal from '../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { ManagerHiveActivityReportProps } from '../../../types/TimeAndAttendance/HiveActivityReport/hiveActivityReportTypes'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const ManagerHiveActivityReport = (
  props: ManagerHiveActivityReportProps,
): JSX.Element => {
  const [hiveReportModalVisibility, setHiveReportModalVisibility] =
    useState<boolean>(false)

  const managerHiveActivityReport = useTypedSelector(
    reduxServices.hiveActivityReport.selectors.managerHiveActivityReport,
  )
  const ManagerReportListSize = useTypedSelector(
    reduxServices.hiveActivityReport.selectors.managerReportSize,
  )

  const isLoading = useTypedSelector(
    reduxServices.hiveActivityReport.selectors.isLoading,
  )

  const {
    paginationRange,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
  } = props

  const handleHiveActivityPageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const handleShowModal = () => {
    setHiveReportModalVisibility(true)
  }

  const tableHeaderCellPropsDays = {
    width: '3%',
    scope: 'col',
    className: 'text-center',
  }
  const tableHeaderCellPropsName = {
    width: '8%',
    scope: 'col',
  }
  const tableHeaderCellPropsID = {
    width: '4%',
    scope: 'col',
  }

  return (
    <>
      <>
        <CTable
          striped
          responsive
          className="time-in-office-table align-middle"
        >
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell {...tableHeaderCellPropsName}>
                ID
              </CTableHeaderCell>
              <CTableHeaderCell {...tableHeaderCellPropsID}>
                Name
              </CTableHeaderCell>
              {Array.from({ length: 31 }, (_, index) => {
                return (
                  <React.Fragment key={index}>
                    <CTableHeaderCell {...tableHeaderCellPropsDays}>
                      {index + 1}
                    </CTableHeaderCell>
                  </React.Fragment>
                )
              })}
              <CTableHeaderCell className="text-center" scope="col">
                Total
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          {isLoading !== ApiLoadingState.loading ? (
            <CTableBody>
              {managerHiveActivityReport.list?.map(
                (employeeRecord, employeeRecordIndex) => {
                  const sortedActivityTimes = employeeRecord.activityTimes
                    ?.slice()
                    .sort(
                      (activityItem1, activityItem2) =>
                        activityItem1.dayofMonth - activityItem2.dayofMonth,
                    )
                  return (
                    <CTableRow key={employeeRecordIndex}>
                      <CTableDataCell>{employeeRecord.id}</CTableDataCell>
                      <CTableDataCell>{`${employeeRecord.firstName} ${employeeRecord.lastName}`}</CTableDataCell>
                      {sortedActivityTimes.map((value, index) => {
                        return (
                          <React.Fragment key={index}>
                            {value.hours === '-' ? (
                              <CTableDataCell className="text-center cursor-pointer sh-hive-activity-data-cell">
                                {value.hours}
                              </CTableDataCell>
                            ) : (
                              <CTableDataCell className="text-center">
                                <CLink
                                  className="cursor-pointer sh-hive-activity-link"
                                  onClick={() => {
                                    handleShowModal()
                                  }}
                                >
                                  {value.hours}
                                </CLink>
                              </CTableDataCell>
                            )}
                          </React.Fragment>
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
          ) : (
            <OLoadingSpinner type={LoadingType.PAGE} />
          )}
        </CTable>
        {isLoading !== ApiLoadingState.loading && (
          <CRow>
            <CCol xs={4}>
              <p>
                <strong>
                  {managerHiveActivityReport.list?.length
                    ? `Total Records: ${ManagerReportListSize}`
                    : `No Records found...`}
                </strong>
              </p>
            </CCol>
            <CCol xs={3}>
              {ManagerReportListSize > 20 && (
                <OPageSizeSelect
                  handlePageSizeSelectChange={
                    handleHiveActivityPageSizeSelectChange
                  }
                  options={[20, 40, 60, 80, 100]}
                  selectedPageSize={pageSize}
                />
              )}
            </CCol>
            {ManagerReportListSize > 20 && (
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
        )}
      </>
      <OModal
        modalSize="lg"
        alignment="center"
        visible={hiveReportModalVisibility}
        setVisible={setHiveReportModalVisibility}
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
      >
        <HiveActivityDetailsTable />
      </OModal>
    </>
  )
}

export default ManagerHiveActivityReport
