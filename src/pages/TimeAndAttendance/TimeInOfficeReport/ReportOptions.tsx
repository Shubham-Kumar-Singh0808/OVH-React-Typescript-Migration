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
import moment from 'moment'
import React, { useMemo, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

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

  const currentMonthDate = moment().subtract(1, 'months').format('M/YYYY')
  const previousMonthDate = moment().subtract(2, 'months').format('M/YYYY')

  const selectedDate = useTypedSelector(
    reduxServices.timeInOfficeReport.selectors.selectedDate,
  )
  const selectedView = useTypedSelector(
    reduxServices.timeInOfficeReport.selectors.selectedView,
  )

  const dateToUse = useMemo(() => {
    return startDate ? startDate : new Date()
  }, [startDate])

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
          />
        </CCol>
      </CRow>
      {isDatePickerVisible && (
        <CRow className="time-in-office-report-options">
          <CFormLabel className="col-sm-1 col-form-label">Month:</CFormLabel>
          <CCol sm={2}>
            <ReactDatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              showFullMonthYearPicker
              showFourColumnMonthYearPicker
              placeholderText="mm/yyyy"
            />
          </CCol>
          <CCol>
            <CButton
              className="cursor-pointer"
              disabled={!startDate}
              color="info btn-ovh me-1"
              onClick={viewButtonHandler}
              data-testid="form-button1"
            >
              <i className="fa fa-search-plus text-white"></i> View
            </CButton>
            <CButton
              className="cursor-pointer"
              disabled={!startDate}
              color="info btn-ovh me-1"
              onClick={clearButtonHandler}
              data-testid="form-button2"
            >
              <i className="fa fa-refresh text-white"></i> Clear
            </CButton>
          </CCol>
        </CRow>
      )}
      <CRow className="time-in-office-report-options">
        {selectedView !== 'Me' && (
          <CCol md={12}>
            <CButton
              color="info"
              className="text-white btn-ovh pull-right"
              size="sm"
              // onClick={handleExportAttendance}
            >
              <i className="fa fa-plus me-1"></i>
              Click to Export Attendance
            </CButton>
          </CCol>
        )}
      </CRow>
      <CRow className="time-in-office-report-options">
        <CCol sm={9} className="time-in-office-header">
          <h5 className="time-in-office-header">
            Time in Office for {moment(dateToUse).format('MMMM-YYYY')}
          </h5>
        </CCol>
        {selectedView !== 'Me' && (
          <CCol sm={6} md={4} lg={5} xl={4} xxl={3}>
            <CForm onSubmit={searchButtonHandler}>
              <CInputGroup className="global-search me-0">
                <CFormInput
                  placeholder="Multiple Search"
                  aria-label="Multiple Search"
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
                  onClick={searchButtonHandler}
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
