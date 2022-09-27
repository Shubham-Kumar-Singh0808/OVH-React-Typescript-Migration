import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import ReportOptions from './ReportOptions'
import EmployeeTimeInOfficeReport from './EmployeeTimeInOfficeReport'
import ManagerTimeInOfficeReport from './ManagerTimeInOfficeReport'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { currentMonthDate } from '../../../utils/helper'

const TimeInOfficeReport = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [searchValue, setSearchValue] = useState<string>('')
  const [startDate, setStartDate] = useState<Date>()
  const [isViewClicked, setIsViewClicked] = useState(false)

  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const selectedDate = useTypedSelector(
    reduxServices.timeInOfficeReport.selectors.selectedDate,
  )
  const selectedView = useTypedSelector(
    reduxServices.timeInOfficeReport.selectors.selectedView,
  )
  const isLoading = useTypedSelector(
    reduxServices.timeInOfficeReport.selectors.isLoading,
  )
  const listSize = useTypedSelector(
    reduxServices.timeInOfficeReport.selectors.managerReportSize,
  )

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  const fetchDataHandler = useCallback(
    (dateToUse: string) => {
      if (selectedView === 'Me') {
        dispatch(
          reduxServices.timeInOfficeReport.getTimeInOfficeEmployeeReport({
            date: dateToUse,
            loggedInEmployeeId: Number(employeeId),
          }),
        )
      } else if (selectedView === 'All') {
        dispatch(
          reduxServices.timeInOfficeReport.getTimeInOfficeManagerReport({
            date: dateToUse,
            loggedInEmployeeId: Number(employeeId),
            startIndex: pageSize * (currentPage - 1),
            endIndex: pageSize * currentPage,
            search: searchValue,
          }),
        )
      }

      const monthToDisplay =
        dateToUse === currentMonthDate
          ? moment().format('MMMM-YYYY')
          : moment().subtract(1, 'months').format('MMMM-YYYY')

      dispatch(
        reduxServices.timeInOfficeReport.actions.setMonthDisplay(
          monthToDisplay,
        ),
      )
    },
    [employeeId, pageSize, currentPage, searchValue, dispatch],
  )

  useEffect(() => {
    if (selectedDate) {
      fetchDataHandler(selectedDate)
    }
  }, [selectedDate, fetchDataHandler])

  useEffect(() => {
    if (isViewClicked) {
      fetchDataHandler(moment(startDate).format('MM/yyyy'))
      dispatch(reduxServices.timeInOfficeReport.actions.setSelectedDate(''))
      dispatch(
        reduxServices.timeInOfficeReport.actions.setMonthDisplay(
          moment(startDate).format('MMMM-YYYY'),
        ),
      )
    }

    setIsViewClicked(false)
  }, [isViewClicked, fetchDataHandler])

  const viewButtonHandler = () => {
    setIsViewClicked(true)
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper time-in-office-report-card"
        title="Time in Office Report"
        CFooterClassName="d-none"
      >
        <ReportOptions
          setSearchValue={setSearchValue}
          startDate={startDate}
          setStartDate={setStartDate}
          viewButtonHandler={viewButtonHandler}
        />
        {selectedView === 'Me' && isLoading === ApiLoadingState.succeeded && (
          <EmployeeTimeInOfficeReport />
        )}
        {selectedView === 'All' && isLoading === ApiLoadingState.succeeded && (
          <ManagerTimeInOfficeReport
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

export default TimeInOfficeReport
