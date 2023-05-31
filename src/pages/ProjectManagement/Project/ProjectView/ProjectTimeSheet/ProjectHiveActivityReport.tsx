import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import ProjectHiveActivityReportOptions from './ProjectHiveActivityReportOptions'
import ProjectHiveActivityTable from './ProjectHiveActivityTable'
import OCard from '../../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import { currentMonthDate } from '../../../../../utils/helper'

const ProjectHiveActivityReport = (): JSX.Element => {
  const [startDate, setStartDate] = useState<Date>()
  const [isViewClicked, setIsViewClicked] = useState(false)
  const [filterByDate, setFilterByDate] = useState<Date>()
  const viewButtonHandler = () => {
    setIsViewClicked(true)
  }
  const { projectId } = useParams<{ projectId: string }>()

  const selectedDate = useTypedSelector(
    reduxServices.hiveActivityReport.selectors.selectedDate,
  )

  const dateToUse = filterByDate
    ? filterByDate?.getMonth() + '/' + filterByDate.getFullYear()
    : selectedDate

  const dispatch = useAppDispatch()
  const setProjectMonthToDisplay = useCallback(
    (dateValue) => {
      const projectMonthToDisplay =
        dateValue === currentMonthDate
          ? moment().format('MMMM-YYYY')
          : moment().subtract(1, 'months').format('MMMM-YYYY')

      dispatch(
        reduxServices.hiveActivityReport.actions.setMonthDisplay(
          projectMonthToDisplay,
        ),
      )
    },
    [dateToUse],
  )

  useEffect(() => {
    if (isViewClicked) {
      setFilterByDate(startDate)
      setProjectMonthToDisplay(moment(startDate).format('MM/yyyy'))
      dispatch(reduxServices.hiveActivityReport.actions.setSelectedDate(''))
      dispatch(
        reduxServices.hiveActivityReport.actions.setMonthDisplay(
          moment(startDate).format('MMMM-YYYY'),
        ),
      )
    }

    setIsViewClicked(false)
  }, [isViewClicked, setProjectMonthToDisplay])

  useEffect(() => {
    dispatch(
      reduxServices.projectTimeSheet.getProjectTimeSheet({
        hiveDate: dateToUse,
        projectId,
      }),
    )
  })
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Hive Activity Report"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <ProjectHiveActivityReportOptions
          startDate={startDate}
          setStartDate={setStartDate}
          viewButtonHandler={viewButtonHandler}
        />
        <ProjectHiveActivityTable />
      </OCard>
    </>
  )
}

export default ProjectHiveActivityReport
