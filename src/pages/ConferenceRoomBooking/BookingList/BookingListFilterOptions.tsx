import { CRow, CCol, CFormLabel, CFormSelect } from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect } from 'react'
import ReactDatePicker from 'react-datepicker'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { deviceLocale, commonDateFormat } from '../../../utils/dateFormatUtils'

const BookingListFilterOptions = ({
  location,
  room,
  meetingStatus,
  selectDate,
  date,
  setLocation,
  setRoom,
  setMeetingStatus,
  setSelectDate,
  setDate,
}: {
  location: string
  room: string
  meetingStatus: string
  selectDate: string
  date: string
  setLocation: React.Dispatch<React.SetStateAction<string>>
  setRoom: React.Dispatch<React.SetStateAction<string>>
  setMeetingStatus: React.Dispatch<React.SetStateAction<string>>
  setSelectDate: React.Dispatch<React.SetStateAction<string>>
  setDate: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const meetingLocation = useTypedSelector(
    (state) => state.bookingList.meetingLocation,
  )
  const roomsOfLocation = useTypedSelector(
    (state) => state.bookingList.roomsOfLocation,
  )

  useEffect(() => {
    dispatch(reduxServices.bookingList.getAllMeetingLocations())
    if (location) {
      dispatch(reduxServices.bookingList.getRoomsOfLocation(Number(location)))
    }
  }, [dispatch, location])

  return (
    <>
      <CRow className="mb-5">
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">Location:</CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="location"
            data-testid="form-select1"
            name="location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value)
            }}
          >
            <option value={''}>Select</option>
            {meetingLocation?.map((location, index) => (
              <option key={index} value={location.id}>
                {location.locationName}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">Room:</CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="billingStatus"
            data-testid="form-select2"
            name="billingStatus"
            value={room}
            onChange={(e) => {
              setRoom(e.target.value)
            }}
          >
            <option value={''}>Select Room</option>
            {roomsOfLocation?.map((room, index) => (
              <option key={index} value={room.id}>
                {room.roomName}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol sm={2} md={2} className="text-end">
          <CFormLabel className="mt-1">Meeting Status:</CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="meetingStatus"
            data-testid="form-select2"
            name="meetingStatus"
            value={meetingStatus}
            onChange={(e) => {
              setMeetingStatus(e.target.value)
            }}
          >
            <option value="New">New</option>
            <option value="true">In Progress</option>
            <option value="false">Cancelled</option>
            <option value="onBench">Completed</option>
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">Select:</CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="selectDate"
            data-testid="form-select1"
            name="selectDate"
            value={selectDate}
            onChange={(e) => {
              setSelectDate(e.target.value)
            }}
          >
            <option value="Today">Today</option>
            <option value="Custom">Custom</option>
          </CFormSelect>
        </CCol>
        {selectDate === 'Custom' && (
          <>
            <CCol sm={2} md={1} className="text-end">
              <CFormLabel className="mt-1">Date:</CFormLabel>
            </CCol>
            <CCol sm={2}>
              <ReactDatePicker
                id="date"
                data-testid="date"
                className="form-control form-control-sm sh-date-picker"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/mm/yy"
                name="date"
                value={
                  date
                    ? new Date(date).toLocaleDateString(deviceLocale, {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })
                    : ''
                }
                onChange={(date: Date) =>
                  setDate(moment(date).format(commonDateFormat))
                }
              />
            </CCol>
          </>
        )}
      </CRow>
    </>
  )
}

export default BookingListFilterOptions
