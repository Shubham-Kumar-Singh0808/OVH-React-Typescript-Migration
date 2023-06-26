import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CRow,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import timeInOfficeReportApi from '../../../middleware/api/TimeAndAttendance/TimeInOfficeReport/timeInOfficeReportApi'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import {
  currentMonthDate,
  downloadFile,
  previousMonthDate,
} from '../../../utils/helper'

const ReportOptions = ({
  setSearchValue,
  startDate,
  setStartDate,
  viewButtonHandler,
}: {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
  startDate: Date | undefined
  setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  viewButtonHandler: () => void
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const [searchInput, setSearchInput] = useState<string>('')
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)

  const selectedDate = useTypedSelector(
    reduxServices.timeInOfficeReport.selectors.selectedDate,
  )
  const selectedView = useTypedSelector(
    reduxServices.timeInOfficeReport.selectors.selectedView,
  )

  const monthDisplay = useTypedSelector(
    reduxServices.timeInOfficeReport.selectors.monthDisplay,
  )

  const handleSelectMonthRadio = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.value === 'option1') {
      setIsDatePickerVisible(false)
      dispatch(
        reduxServices.timeInOfficeReport.actions.setSelectedDate(
          currentMonthDate,
        ),
      )
    } else if (event.target.value === 'option2') {
      setIsDatePickerVisible(false)
      dispatch(
        reduxServices.timeInOfficeReport.actions.setSelectedDate(
          previousMonthDate,
        ),
      )
    } else if (event.target.value === 'option3') {
      setIsDatePickerVisible(true)
    }
  }

  const searchButtonHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setSearchValue(searchInput)
  }

  const handleSelectView = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      reduxServices.timeInOfficeReport.actions.setSelectedView(
        event.target.value,
      ),
    )
  }

  const clearButtonHandler = () => {
    setStartDate(undefined)
  }

  const handleExportAttendance = async () => {
    const timeInOfficeListDownload =
      await timeInOfficeReportApi.exportAttendanceReport({
        hiveDate: selectedDate,
        search: '',
      })
    downloadFile(timeInOfficeListDownload, 'timeInOfficeList.csv')
  }

  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

  const handleSearchBtnHandler = (searchValue: string) => {
    dispatch(
      reduxServices.timeInOfficeReport.searchTimeInOffice({
        date: '',
        endIndex: 20,
        loggedInEmployeeId: Number(employeeId),
        search: searchValue,
        startIndex: 0,
      }),
    )
  }

  return (
    <>
      <CRow className="radio-container">
        <CCol md={6} className="d-inline">
          <CFormCheck
            type="radio"
            name="monthOptions"
            value="option1"
            id="monthCurrent"
            label="Current Month"
            data-testid="select-month-current"
            inline
            defaultChecked={selectedDate === currentMonthDate}
            onChange={handleSelectMonthRadio}
          />
          <CFormCheck
            type="radio"
            name="monthOptions"
            value="option2"
            id="monthPrevious"
            label="Previous Month"
            data-testid="select-month-previous"
            inline
            defaultChecked={selectedDate === previousMonthDate}
            onChange={handleSelectMonthRadio}
          />
          <CFormCheck
            type="radio"
            name="monthOptions"
            value="option3"
            id="monthOther"
            label="Other"
            data-testid="select-month-other"
            inline
            defaultChecked={
              selectedDate !== currentMonthDate &&
              selectedDate !== previousMonthDate
            }
            onChange={handleSelectMonthRadio}
          />
        </CCol>
        <CCol md={6} className="d-inline">
          <CFormCheck
            type="radio"
            name="viewOptions"
            value="All"
            id="viewAll"
            label="All"
            inline
            defaultChecked={selectedView === 'All'}
            onChange={handleSelectView}
            className="pull-right"
            data-testid="select-view-all"
          />
          <CFormCheck
            type="radio"
            name="viewOptions"
            value="Me"
            id="viewMe"
            label="Me"
            inline
            defaultChecked={selectedView === 'Me'}
            onChange={handleSelectView}
            className="pull-right"
            data-testid="select-view-me"
          />
        </CCol>
      </CRow>
      <CRow className="time-in-office-report-options">
        {selectedView !== 'Me' && (
          <CCol md={12}>
            <CButton
              color="info"
              className="text-white btn-ovh pull-right"
              size="sm"
              onClick={handleExportAttendance}
            >
              <i className="fa fa-plus me-1"></i>
              Click to Export Attendance
            </CButton>
          </CCol>
        )}
      </CRow>
      {isDatePickerVisible && (
        <CRow className="mb-20">
          <CFormLabel className="col-sm-1 col-form-label text-center">
            Month:
            <span className={startDate ? 'text-white' : 'text-danger'}>*</span>
          </CFormLabel>
          <CCol sm={2} className="time-in-datepicker-col">
            <ReactDatePicker
              autoComplete="off"
              className="form-control form-control-sm sh-date-picker"
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              dateFormat="MM/yyyy"
              maxDate={new Date()}
              showMonthYearPicker
              placeholderText="mm/yyyy"
              data-testid="date-picker-input"
            />
          </CCol>
          <CCol>
            <CButton
              className="cursor-pointer"
              disabled={!startDate}
              color="info btn-ovh me-1 text-white"
              onClick={viewButtonHandler}
              data-testid="form-button1"
            >
              <i className="fa fa-search-plus text-white"></i> View
            </CButton>
            <CButton
              className="cursor-pointer"
              disabled={!startDate}
              color="info btn-ovh me-1 text-white"
              onClick={clearButtonHandler}
              data-testid="form-button2"
            >
              <i className="fa fa-refresh text-white"></i> Clear
            </CButton>
          </CCol>
        </CRow>
      )}
      <CRow className="time-in-office-report-options">
        <CCol sm={9} className="time-in-office-header">
          <h5 className="time-in-office-header">
            Time in Office Report for {monthDisplay}
          </h5>
        </CCol>
        {selectedView !== 'Me' && (
          <CCol sm={6} md={3}>
            <CForm onSubmit={searchButtonHandler}>
              <CInputGroup className="global-search me-0">
                <CFormInput
                  placeholder="Multiple Search"
                  aria-label="Multiple Search"
                  data-testid="multi-search-input"
                  className="time-in-office-search-field"
                  aria-describedby="button-addon2"
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value)
                  }}
                />
                <CButton
                  disabled={!searchInput}
                  data-testid="multi-search-btn"
                  className="cursor-pointer"
                  type="button"
                  color="info"
                  id="button-addon2"
                  // onClick={searchButtonHandler}
                  onClick={() => {
                    handleSearchBtnHandler(searchInput)
                  }}
                >
                  <i className="fa fa-search"></i>
                </CButton>
              </CInputGroup>
            </CForm>
          </CCol>
        )}
      </CRow>
    </>
  )
}

export default ReportOptions
