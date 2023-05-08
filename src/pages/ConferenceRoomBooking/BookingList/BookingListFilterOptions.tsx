import { CRow, CCol, CFormLabel, CFormSelect } from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect } from 'react'
import ReactDatePicker from 'react-datepicker'
import { TextWhite, TextDanger } from '../../../constant/ClassName'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { dateFormat } from '../../../constant/DateFormat'

const BookingListFilterOptions = ({
  location,
  room,
  meetingStatus,
  selectDateOptions,
  selectDate,
  setLocation,
  setRoom,
  setMeetingStatus,
  setSelectDateOptions,
  setSelectDate,
}: {
  location: string
  room: string
  meetingStatus: string
  selectDateOptions: string
  selectDate: string
  setLocation: React.Dispatch<React.SetStateAction<string>>
  setRoom: React.Dispatch<React.SetStateAction<string>>
  setMeetingStatus: React.Dispatch<React.SetStateAction<string>>
  setSelectDateOptions: React.Dispatch<React.SetStateAction<string>>
  setSelectDate: React.Dispatch<React.SetStateAction<string>>
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

  useEffect(() => {
    if (location || meetingStatus || room || selectDate || selectDateOptions) {
      dispatch(
        reduxServices.bookingList.getBookingsForSelection({
          location: Number(location),
          meetingStatus,
          room,
          status: selectDate || selectDateOptions,
        }),
      )
      dispatch(reduxServices.bookingList.actions.setCurrentPage(1))
      dispatch(reduxServices.bookingList.actions.setPageSize(20))
    }
  }, [dispatch, location, meetingStatus, room, selectDate, selectDateOptions])

  const onHandleStartDate = (value: Date) => {
    setSelectDate(moment(value).format(dateFormat))
    dispatch(
      reduxServices.bookingList.actions.setFromDateValue(
        moment(value).format(dateFormat),
      ),
    )
  }

  return (
    <>
      <CRow className="mb-5">
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">
            Location :
            <span className={location ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="location"
            data-testid="location-select"
            name="location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value)
              dispatch(
                reduxServices.bookingList.actions.setLocationValue(
                  e.target.value,
                ),
              )
            }}
          >
            <option value={''}>Select Location</option>
            {meetingLocation &&
              meetingLocation?.length > 0 &&
              meetingLocation?.map((locationItem, index) => (
                <option key={index} value={locationItem.id}>
                  {locationItem.locationName}
                </option>
              ))}
          </CFormSelect>
        </CCol>
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">Room :</CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="billingStatus"
            data-testid="room-select"
            name="billingStatus"
            value={room}
            onChange={(e) => {
              setRoom(e.target.value)
              dispatch(
                reduxServices.bookingList.actions.setRoomValue(e.target.value),
              )
            }}
          >
            <option value={''}>Select Room</option>
            {roomsOfLocation?.map((roomItem, index) => (
              <option key={index} value={roomItem.id}>
                {roomItem.roomName}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol sm={2} md={2} className="text-end">
          <CFormLabel className="mt-1">Meeting Status :</CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="meetingStatus"
            data-testid="meetingStatus-select"
            name="meetingStatus"
            value={meetingStatus}
            onChange={(e) => {
              setMeetingStatus(e.target.value)
              dispatch(
                reduxServices.bookingList.actions.setMeetingStatus(
                  e.target.value,
                ),
              )
            }}
          >
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option>
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">Select :</CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="selectDateOptions"
            data-testid="date-option"
            name="selectDateOptions"
            value={selectDateOptions}
            onChange={(e) => {
              setSelectDateOptions(e.target.value)
              dispatch(
                reduxServices.bookingList.actions.setSelectCustom(
                  e.target.value,
                ),
              )
            }}
          >
            <option value="Today">Today</option>
            <option value="Custom">Custom</option>
          </CFormSelect>
        </CCol>
        {selectDateOptions === 'Custom' && (
          <>
            <CCol sm={2} md={1} className="text-end">
              <CFormLabel className="mt-1">Date :</CFormLabel>
            </CCol>
            <CCol sm={2}>
              <ReactDatePicker
                autoComplete="off"
                id="date"
                data-testid="date"
                className="form-control form-control-sm sh-date-picker"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/mm/yyyy"
                name="date"
                value={selectDate}
                onChange={(date: Date) => onHandleStartDate(date)}
              />
            </CCol>
          </>
        )}
      </CRow>
    </>
  )
}

export default BookingListFilterOptions
