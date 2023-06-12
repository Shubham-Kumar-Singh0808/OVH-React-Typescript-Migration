import { CRow, CCol, CFormCheck, CButton, CFormLabel } from '@coreui/react-pro'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { useParams } from 'react-router-dom'
import { TextWhite, TextDanger } from '../../../../../constant/ClassName'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'

const ProjectHiveActivityReportOptions = ({
  startDate,
  setStartDate,
  viewButtonHandler: timeLineViewButtonHandler,
}: {
  startDate: Date | undefined
  setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  viewButtonHandler: () => void
}): JSX.Element => {
  const [isProjectDatePickerVisible, setIsProjectDatePickerVisible] =
    useState(false)
  const [filterByDate, setFilterByDate] = useState<Date>()
  const [isProjectViewClicked, setIsProjectViewClicked] = useState(false)
  const projectCurrentMonthDate = moment()
    .subtract(1, 'months')
    .format('M/YYYY')
  const previousMonthDate = moment().subtract(2, 'months').format('M/YYYY')
  const selectedDate = useTypedSelector(
    reduxServices.hiveActivityReport.selectors.selectedDate,
  )
  const projectMonthDisplay = useTypedSelector(
    reduxServices.hiveActivityReport.selectors.monthDisplay,
  )

  const currentDate = moment().subtract(1, 'month')
  const monthDisplay = currentDate.format('MMMM-YYYY')

  const dispatch = useAppDispatch()
  const { projectId } = useParams<{ projectId: string }>()
  const dateToUse = filterByDate
    ? filterByDate?.getMonth() + '/' + filterByDate.getFullYear()
    : selectedDate

  const handleSelectMonthRadio = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.value === 'currentMonth') {
      setIsProjectDatePickerVisible(false)
      dispatch(
        reduxServices.hiveActivityReport.actions.setSelectedDate(
          projectCurrentMonthDate,
        ),
      )
      dispatch(
        reduxServices.projectTimeSheet.getProjectTimeSheet({
          hiveDate: dateToUse,
          projectId,
        }),
      )
      setStartDate(undefined)
    } else if (event.target.value === 'previousMonth') {
      setIsProjectDatePickerVisible(false)
      dispatch(
        reduxServices.hiveActivityReport.actions.setSelectedDate(
          previousMonthDate,
        ),
      )
      dispatch(
        reduxServices.projectTimeSheet.getProjectTimeSheet({
          hiveDate: dateToUse,
          projectId,
        }),
      )
      setStartDate(undefined)
    } else if (event.target.value === 'otherMonth') {
      dispatch(
        reduxServices.projectTimeSheet.getProjectTimeSheet({
          hiveDate: dateToUse,
          projectId,
        }),
      )
      setIsProjectDatePickerVisible(true)
    }
  }

  const clearBtnHandler = () => {
    setStartDate(undefined)
    dispatch(
      reduxServices.projectTimeSheet.getProjectTimeSheet({
        hiveDate: dateToUse,
        projectId,
      }),
    )
  }

  const setProjectMonthToDisplay = useCallback(
    (dateValue: string) => {
      const projectMonthToDisplay =
        dateValue === projectCurrentMonthDate
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
    if (isProjectViewClicked) {
      setFilterByDate(startDate)
      setProjectMonthToDisplay(moment(startDate).format('MM/yyyy'))
      dispatch(reduxServices.hiveActivityReport.actions.setSelectedDate(''))
      dispatch(
        reduxServices.hiveActivityReport.actions.setMonthDisplay(
          moment(startDate).format('MMMM-YYYY'),
        ),
      )
    }

    setIsProjectViewClicked(false)
  }, [isProjectViewClicked, setProjectMonthToDisplay])
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <div className="mb-3">
            <div className="d-inline">
              <CFormCheck
                type="radio"
                name="selectMonth"
                id="currentMonth"
                label="Current Month"
                value="currentMonth"
                inline
                defaultChecked={selectedDate === projectCurrentMonthDate}
                onChange={handleSelectMonthRadio}
              />
              <CFormCheck
                type="radio"
                name="selectMonth"
                id="previousMonth"
                label="Previous Month"
                value="previousMonth"
                inline
                defaultChecked={selectedDate === previousMonthDate}
                onChange={handleSelectMonthRadio}
              />
              <CFormCheck
                type="radio"
                name="selectMonth"
                id="otherMonth"
                label="Other"
                value="otherMonth"
                inline
                defaultChecked={
                  selectedDate !== projectCurrentMonthDate &&
                  selectedDate !== previousMonthDate
                }
                onChange={handleSelectMonthRadio}
              />
            </div>
          </div>
        </CCol>
      </CRow>
      {isProjectDatePickerVisible && (
        <>
          <CRow className="mt-2">
            <CCol sm={3} md={1} className="text-end">
              <CFormLabel className="mt-2 text-decoration-none">
                Month:
                <span className={startDate ? TextWhite : TextDanger}>*</span>
              </CFormLabel>
            </CCol>
            <CCol sm={2} className="text-end pe-2 ms-3 sh-date-picker-column">
              <ReactDatePicker
                autoComplete="off"
                id="employeeRealBirthday"
                data-testid="sh-date-picker"
                className="form-control form-control-sm sh-date-picker"
                maxDate={new Date()}
                showMonthYearPicker
                placeholderText="mm/yyyy"
                dateFormat="MM/yyyy"
                name="selectMonth"
                selected={startDate}
                onChange={(date: Date) => {
                  setStartDate(date)
                }}
              />
            </CCol>
            <CCol sm={6}>
              <CRow className="align-items-center">
                <CCol sm={4} md={5}>
                  <CRow className="ms-3">
                    <CCol sm={12}>
                      <CButton
                        color="info btn-ovh me-1"
                        disabled={!startDate}
                        onClick={timeLineViewButtonHandler}
                      >
                        <i className="fa fa-search-plus me-1"></i>
                        View
                      </CButton>
                      &nbsp;&nbsp;
                      <CButton
                        color="info btn-ovh me-0"
                        disabled={!startDate}
                        onClick={clearBtnHandler}
                      >
                        <i className="fa fa-refresh me-1"></i>
                        Clear
                      </CButton>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </>
      )}
      {selectedDate === previousMonthDate ? (
        <CRow className="mt-4">
          <CCol sm={8}>
            <h5 className="sh-summary-text">
              Hive Activity Summary for {monthDisplay}
            </h5>
          </CCol>
        </CRow>
      ) : (
        <CRow className="mt-4">
          <CCol sm={8}>
            <h5 className="sh-summary-text">
              Hive Activity Summary for {projectMonthDisplay}
            </h5>
          </CCol>
        </CRow>
      )}
    </>
  )
}

export default ProjectHiveActivityReportOptions
