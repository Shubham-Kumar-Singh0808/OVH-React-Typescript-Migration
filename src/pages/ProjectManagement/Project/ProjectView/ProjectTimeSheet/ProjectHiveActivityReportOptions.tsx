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
  viewButtonHandler,
}: {
  startDate: Date | undefined
  setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  viewButtonHandler: () => void
}): JSX.Element => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)
  const [filterByDate, setFilterByDate] = useState<Date>()
  const [isViewClicked, setIsViewClicked] = useState(false)
  const currentMonthDate = moment().subtract(1, 'months').format('M/YYYY')
  const previousMonthDate = moment().subtract(2, 'months').format('M/YYYY')
  const selectedDate = useTypedSelector(
    reduxServices.hiveActivityReport.selectors.selectedDate,
  )
  const monthDisplay = useTypedSelector(
    reduxServices.hiveActivityReport.selectors.monthDisplay,
  )
  const dispatch = useAppDispatch()
  const { projectId } = useParams<{ projectId: string }>()
  const dateToUse = filterByDate
    ? filterByDate?.getMonth() + '/' + filterByDate.getFullYear()
    : selectedDate

  const handleSelectMonthRadio = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.value === 'currentMonth') {
      setIsDatePickerVisible(false)
      dispatch(
        reduxServices.hiveActivityReport.actions.setSelectedDate(
          currentMonthDate,
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
      setIsDatePickerVisible(false)
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
      setIsDatePickerVisible(true)
    }
  }

  const clearButtonHandler = () => {
    setStartDate(undefined)
    dispatch(
      reduxServices.projectTimeSheet.getProjectTimeSheet({
        hiveDate: dateToUse,
        projectId,
      }),
    )
  }

  const setMonthToDisplay = useCallback(
    (dateValue) => {
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
                defaultChecked={selectedDate === currentMonthDate}
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
                  selectedDate !== currentMonthDate &&
                  selectedDate !== previousMonthDate
                }
                onChange={handleSelectMonthRadio}
              />
            </div>
          </div>
        </CCol>
      </CRow>
      {isDatePickerVisible && (
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
                        onClick={viewButtonHandler}
                      >
                        <i className="fa fa-search-plus me-1"></i>
                        View
                      </CButton>
                      &nbsp;&nbsp;
                      <CButton
                        color="info btn-ovh me-0"
                        disabled={!startDate}
                        onClick={clearButtonHandler}
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
      <CRow className="mt-4">
        <CCol sm={8}>
          <h5 className="sh-summary-text">
            Hive Activity Summary for {monthDisplay}
          </h5>
        </CCol>
      </CRow>
    </>
  )
}

export default ProjectHiveActivityReportOptions
