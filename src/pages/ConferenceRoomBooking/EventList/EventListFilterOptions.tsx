import { CButton, CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch } from '../../../stateStore'
import { EventListOptions } from '../../../types/ConferenceRoomBooking/EventList/eventListTypes'
import { dateFormat } from '../../../constant/DateFormat'
import { TextWhite, TextDanger } from '../../../constant/ClassName'
import { commonDateFormat } from '../../../utils/dateFormatUtils'

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
        searchFromDate: eventFromDate,
        searchToDate: eventToDate,
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

  const onHandleToDate = (value: Date) => {
    setEventToDate(moment(value).format(dateFormat))
    dispatch(
      reduxServices.eventList.actions.setToDateFilter(
        moment(value).format(dateFormat),
      ),
    )
  }

  const onHandleFromDate = (value: Date) => {
    setEventFromDate(moment(value).format(dateFormat))
    dispatch(
      reduxServices.eventList.actions.setFromDateFilter(
        moment(value).format(dateFormat),
      ),
    )
  }
  const fromDate = (
    <span className={eventFromDate ? TextWhite : TextDanger}>*</span>
  )
  const toDate = <span className={eventToDate ? TextWhite : TextDanger}>*</span>
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
            dispatch(
              reduxServices.eventList.actions.setSelectCustom(e.target.value),
            )
          }}
        >
          {selectDateOptions?.map((opt, index) => (
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
                <CFormLabel className="mb0">From :{fromDate}</CFormLabel>
                <ReactDatePicker
                  id="eventFromDate"
                  data-testid="eventList-eventFromDate"
                  autoComplete="off"
                  className="form-control form-control-sm sh-date-picker"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  dateFormat="dd/mm/yy"
                  placeholderText="dd/mm/yy"
                  name="eventFromDate"
                  value={eventFromDate}
                  onChange={(date: Date) => onHandleFromDate(date)}
                />
              </CCol>
              <CCol sm={4} md={4}>
                <CFormLabel className="mb0">To :{toDate}</CFormLabel>
                <ReactDatePicker
                  id="eventToDate"
                  data-testid="eventList-FromDate"
                  autoComplete="off"
                  className="form-control form-control-sm sh-date-picker"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  dateFormat="dd/mm/yy"
                  placeholderText="dd/mm/yy"
                  name="eventToDate"
                  value={eventToDate}
                  onChange={(date: Date) => onHandleToDate(date)}
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
