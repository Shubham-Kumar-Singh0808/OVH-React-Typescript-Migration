import React, { useEffect, useState } from 'react'
import HiveReportOptions from './HiveReportOptions'
import EmployeeHiveActivityReport from './EmployeeHiveActivityReport'
import ManagerHiveActivityReport from './ManagerHiveActivityReport'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'
import hiveActivityReportApi from '../../../middleware/api/TimeAndAttendance/HiveActivityReport/hiveActivityReportApi'
import { downloadFile } from '../../../utils/helper'

const HiveActivityReport = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [startDate, setStartDate] = useState<Date>()
  const [filterByDate, setFilterByDate] = useState<Date>()

  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const selectedDate = useTypedSelector(
    reduxServices.hiveActivityReport.selectors.selectedDate,
  )
  const selectedView = useTypedSelector(
    reduxServices.hiveActivityReport.selectors.selectedView,
  )
  const isLoading = useTypedSelector(
    reduxServices.hiveActivityReport.selectors.isLoading,
  )
  const listSize = useTypedSelector(
    reduxServices.hiveActivityReport.selectors.managerReportSize,
  )

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  const dateToUse = filterByDate
    ? filterByDate?.getMonth() + '/' + filterByDate.getFullYear()
    : selectedDate

  useEffect(() => {
    if (selectedView === 'Me') {
      dispatch(
        reduxServices.hiveActivityReport.getEmployeeHiveActivityReport({
          date: dateToUse,
        }),
      )
    } else if (selectedView === 'All') {
      dispatch(
        reduxServices.hiveActivityReport.getManagerHiveActivityReport({
          startIndex: pageSize * (currentPage - 1),
          date: dateToUse,
          endIndex: pageSize * currentPage,
        }),
      )
    }
  }, [
    selectedDate,
    selectedView,
    currentPage,
    pageSize,
    filterByDate,
    dispatch,
  ])

  const handleSearchHiveActivityReport = (searchValue: string) => {
    dispatch(
      reduxServices.hiveActivityReport.getSearchHiveActivityReport({
        endIndex: pageSize * currentPage,
        date: dateToUse,
        loggedInEmployeeId: Number(employeeId),
        searchText: searchValue,
        startIndex: pageSize * (currentPage - 1),
      }),
    )
  }

  const handleExportHiveActivityReport = async () => {
    const hiveActivityReportDownload =
      await hiveActivityReportApi.exportHiveActivityReport(dateToUse)
    downloadFile(hiveActivityReportDownload, 'HiveReport.csv')
  }

  const viewButtonHandler = () => {
    setFilterByDate(startDate)
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Hive Activity Report"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <HiveReportOptions
          startDate={startDate}
          setStartDate={setStartDate}
          viewButtonHandler={viewButtonHandler}
          filterByDate={filterByDate}
          handleExportHiveActivityReport={handleExportHiveActivityReport}
          handleSearchHiveActivityReport={handleSearchHiveActivityReport}
        />
        {selectedView === 'Me' && isLoading === ApiLoadingState.succeeded && (
          <EmployeeHiveActivityReport />
        )}
        {selectedView === 'All' && isLoading === ApiLoadingState.succeeded && (
          <ManagerHiveActivityReport
            paginationRange={paginationRange}
            setPageSize={setPageSize}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        )}
      </OCard>
    </>
  )
}

export default HiveActivityReport
