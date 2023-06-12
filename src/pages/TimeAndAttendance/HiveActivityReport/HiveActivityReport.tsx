import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import HiveReportOptions from './HiveReportOptions'
import EmployeeHiveActivityReport from './EmployeeHiveActivityReport'
import ManagerHiveActivityReport from './ManagerHiveActivityReport'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'
import hiveActivityReportApi from '../../../middleware/api/TimeAndAttendance/HiveActivityReport/hiveActivityReportApi'
import { currentMonthDate, downloadFile } from '../../../utils/helper'

const HiveActivityReport = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [startDate, setStartDate] = useState<Date>()
  const [filterByDate, setFilterByDate] = useState<Date>()
  const [isViewClicked, setIsViewClicked] = useState(false)

  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const selectedDate = useTypedSelector(
    reduxServices.hiveActivityReport.selectors.selectedDate,
  )
  const selectedView = useTypedSelector(
    reduxServices.hiveActivityReport.selectors.selectedView,
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

  const setMonthToDisplay = useCallback(
    (dateValue: string) => {
      const monthToDisplay =
        dateValue === currentMonthDate
          ? moment().format('MMMM-YYYY')
          : moment().subtract(1, 'months').format('MMMM-YYYY')

      dispatch(
        reduxServices.hiveActivityReport.actions.setMonthDisplay(
          monthToDisplay,
        ),
      )
    },
    [dateToUse],
  )

  useEffect(() => {
    if (selectedDate) {
      setMonthToDisplay(selectedDate)
    }
  }, [selectedDate, setMonthToDisplay])

  useEffect(() => {
    if (isViewClicked) {
      setFilterByDate(startDate)
      setMonthToDisplay(moment(startDate).format('MM/yyyy'))
      dispatch(reduxServices.hiveActivityReport.actions.setSelectedDate(''))
      dispatch(
        reduxServices.hiveActivityReport.actions.setMonthDisplay(
          moment(startDate).format('MMMM-YYYY'),
        ),
      )
    }

    setIsViewClicked(false)
  }, [isViewClicked, setMonthToDisplay])

  const viewButtonHandler = () => {
    setIsViewClicked(true)
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
        {selectedView === 'Me' && <EmployeeHiveActivityReport />}
        {selectedView === 'All' && (
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
