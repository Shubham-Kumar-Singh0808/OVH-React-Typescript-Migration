import {
  CRow,
  CCol,
  CFormCheck,
  CButton,
  CFormLabel,
  CFormInput,
  CInputGroup,
} from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { TextWhite, TextDanger } from '../../../constant/ClassName'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const HiveReportOptions = ({
  startDate,
  setStartDate,
  viewButtonHandler,
  filterByDate,
  handleExportHiveActivityReport,
  handleSearchHiveActivityReport,
  setPageSize,
  setCurrentPage,
}: {
  startDate: Date | undefined
  setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  viewButtonHandler: () => void
  filterByDate: Date | undefined
  handleExportHiveActivityReport: () => void
  handleSearchHiveActivityReport: (value: string) => void
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const [searchInput, setSearchInput] = useState<string>('')
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)

  const currentMonthDate = moment().subtract(1, 'months').format('M/YYYY')
  const previousMonthDate = moment().subtract(2, 'months').format('M/YYYY')

  const employeeRole = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeRole,
  )
  const selectedDate = useTypedSelector(
    reduxServices.hiveActivityReport.selectors.selectedDate,
  )
  const selectedView = useTypedSelector(
    reduxServices.hiveActivityReport.selectors.selectedView,
  )

  const monthDisplay = useTypedSelector(
    reduxServices.hiveActivityReport.selectors.monthDisplay,
  )

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
      setStartDate(undefined)
    } else if (event.target.value === 'previousMonth') {
      setIsDatePickerVisible(false)
      dispatch(
        reduxServices.hiveActivityReport.actions.setSelectedDate(
          previousMonthDate,
        ),
      )
      setStartDate(undefined)
    } else if (event.target.value === 'otherMonth') {
      setIsDatePickerVisible(true)
    }
  }

  const handleSelectView = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      reduxServices.hiveActivityReport.actions.setSelectedView(
        event.target.value,
      ),
    )
    setStartDate(undefined)
    setCurrentPage(1)
    setPageSize(20)
  }

  const clearButtonHandler = () => {
    setStartDate(undefined)
  }

  const searchButtonHandler = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      if (searchInput === '') {
        handleSearchHiveActivityReport(searchInput)
        setCurrentPage(1)
      } else {
        handleSearchHiveActivityReport(searchInput)
      }
    }
  }
  useEffect(() => {
    if (filterByDate || selectedView || selectedDate) {
      setSearchInput('')
    }
  }, [filterByDate, selectedView, selectedDate])

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
            {(employeeRole === 'admin' ||
              employeeRole === 'HR' ||
              employeeRole === 'HR Manager') && (
              <div className="d-inline pull-right ml15">
                <CFormCheck
                  type="radio"
                  name="viewOptions"
                  value="Me"
                  id="Me"
                  label="Me"
                  inline
                  defaultChecked={selectedView === 'Me'}
                  onChange={handleSelectView}
                />
                <CFormCheck
                  type="radio"
                  name="viewOptions"
                  value="All"
                  id="All"
                  label="All"
                  inline
                  defaultChecked={selectedView === 'All'}
                  onChange={handleSelectView}
                />
              </div>
            )}
          </div>
        </CCol>
      </CRow>
      {selectedView !== 'Me' && (
        <CRow className="time-in-office-report-options">
          <CCol md={12}>
            <CButton
              color="info"
              className="text-white btn-ovh pull-right"
              size="sm"
              onClick={handleExportHiveActivityReport}
            >
              <i className="fa fa-plus me-1"></i>
              Click to Export Attendance
            </CButton>
          </CCol>
        </CRow>
      )}
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
        {selectedView !== 'Me' && (
          <CCol sm={4} className="d-md-flex justify-content-md-end">
            <CInputGroup className="global-search me-0">
              <CFormInput
                placeholder="Search Employee"
                aria-label="Search Employee"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value)
                }}
                onKeyDown={searchButtonHandler}
              />
              <CButton
                disabled={false}
                data-testid="search-employee-btn"
                className="cursor-pointer"
                type="button"
                color="info"
                id="button-addon2"
                onClick={() => {
                  handleSearchHiveActivityReport(searchInput)
                }}
              >
                <i className="fa fa-search"></i>
              </CButton>
            </CInputGroup>
          </CCol>
        )}
      </CRow>
    </>
  )
}
export default HiveReportOptions
