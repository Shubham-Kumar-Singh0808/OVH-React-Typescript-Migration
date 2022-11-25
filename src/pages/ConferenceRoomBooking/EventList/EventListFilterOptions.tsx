import { CButton, CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch } from '../../../stateStore'
import { EventListOptions } from '../../../types/ConferenceRoomBooking/EventList/eventListTypes'
import { deviceLocale, commonDateFormat } from '../../../utils/dateFormatUtils'

const EventListFilterOptions = ({
  selectDate,
  setSelectDate,
  eventFromDate,
  setEventFromDate,
  eventToDate,
  setEventToDate,
}: EventListOptions): JSX.Element => {
  const [isSearchBtnEnable, setSearchBtnEnable] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const selectDateOptions = [
    { label: 'Today', value: 'Today' },
    { label: 'Yesterday', value: 'Yesterday' },
    { label: 'This Week', value: 'This Week' },
    { label: 'Last Month', value: 'Last Month' },
    { label: 'Current Month', value: 'Current Month' },
    { label: 'Custom', value: 'Custom' },
  ]

  const handleEventList = () => {
    dispatch(
      reduxServices.eventList.getAllEvents({
        startIndex: 0,
        endIndex: 20,
        dateSelection: selectDate,
        eventTypeId: 0,
        searchFromDate: new Date(eventFromDate).toLocaleDateString(
          deviceLocale,
          {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          },
        ),
        searchToDate: new Date(eventToDate).toLocaleDateString(deviceLocale, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      }),
    )
  }

  useEffect(() => {
    if (selectDate !== 'Custom') {
      setEventFromDate('')
      setEventToDate('')
    }
  }, [selectDate])

  useEffect(() => {
    const start = moment(eventFromDate, commonDateFormat).format(
      commonDateFormat,
    )
    const end = moment(eventToDate, commonDateFormat).format(commonDateFormat)

    setSearchBtnEnable(moment(start).isBefore(end))
  }, [eventFromDate, eventToDate])

  const toDate = eventToDate
    ? new Date(eventToDate).toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : ''

  const fromDate = eventFromDate
    ? new Date(eventFromDate).toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : ''
  return (
    <>
      <CCol sm={2} md={2}>
        <CFormLabel className="mb0">Select:</CFormLabel>
        <CFormSelect
          size="sm"
          id="selectEvent"
          data-testid="event-select-date"
          name="selectEvent"
          value={selectDate}
          onChange={(e) => {
            setSelectDate(e.target.value)
          }}
        >
          {selectDateOptions.map((opt, index) => (
            <option key={index} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </CFormSelect>
      </CCol>
      {selectDate === 'Custom' ? (
        <>
          <CCol sm={6}>
            <CRow>
              <CCol sm={4} md={4}>
                <CFormLabel className="mb0">
                  From :
                  {(eventFromDate == null || eventFromDate === '') && (
                    <span className="text-danger">*</span>
                  )}
                </CFormLabel>
                <ReactDatePicker
                  id="fromDate"
                  data-testid="eventList-FromDate"
                  autoComplete="off"
                  className="form-control form-control-sm sh-date-picker"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  dateFormat="dd/mm/yy"
                  placeholderText="dd/mm/yy"
                  name="fromDate"
                  value={fromDate}
                  onChange={(date: Date) =>
                    setEventFromDate(moment(date).format(commonDateFormat))
                  }
                />
              </CCol>
              <CCol sm={4} md={4}>
                <CFormLabel className="mb0">
                  To :
                  {(eventToDate == null || eventToDate === '') && (
                    <span className="text-danger">*</span>
                  )}
                </CFormLabel>
                <ReactDatePicker
                  id="toDate"
                  data-testid="eventList-FromDate"
                  autoComplete="off"
                  className="form-control form-control-sm sh-date-picker"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  dateFormat="dd/mm/yy"
                  placeholderText="dd/mm/yy"
                  name="toDate"
                  value={toDate}
                  onChange={(date: Date) =>
                    setEventToDate(moment(date).format(commonDateFormat))
                  }
                />
              </CCol>
              <CCol md={1} sm={1} className="event-list-search">
                <CButton
                  className="event-list-search-btn"
                  type="button"
                  color="info"
                  id="button-search"
                  size="sm"
                  disabled={!isSearchBtnEnable}
                  onClick={handleEventList}
                >
                  <i className="fa fa-search"></i>
                </CButton>
              </CCol>
            </CRow>
          </CCol>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default EventListFilterOptions
