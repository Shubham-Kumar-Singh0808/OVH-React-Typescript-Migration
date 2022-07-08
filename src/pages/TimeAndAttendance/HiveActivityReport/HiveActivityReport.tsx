import React, { useEffect, useState } from 'react'
import moment from 'moment'
import HiveReportOptions from './HiveReportOptions'
import EmployeeHiveActivityReport from './EmployeeHiveActivityReport'
import ManagerHiveActivityReport from './ManagerHiveActivityReport'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'

const HiveActivityReport = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [searchValue, setSearchValue] = useState<string>('')
  const [startDate, setStartDate] = useState<Date>()
  const [isViewClicked, setIsViewClicked] = useState(false)

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

  useEffect(() => {
    const dateToUse =
      startDate && isViewClicked
        ? moment(startDate).format('MM/yyyy')
        : selectedDate

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
    searchValue,
    isViewClicked,
    dispatch,
  ])

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
          setSearchValue={setSearchValue}
          startDate={startDate}
          setStartDate={setStartDate}
          viewButtonHandler={viewButtonHandler}
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
