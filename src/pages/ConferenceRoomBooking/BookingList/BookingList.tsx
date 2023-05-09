import React, { useEffect, useState } from 'react'
import BookingListFilterOptions from './BookingListFilterOptions'
import BookingListTable from './BookingListTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const BookingList = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const LocationValue = useTypedSelector(
    reduxServices.bookingList.selectors.LocationValue,
  )
  const MeetingStatus = useTypedSelector(
    reduxServices.bookingList.selectors.MeetingStatus,
  )
  const RoomValue = useTypedSelector(
    reduxServices.bookingList.selectors.RoomValue,
  )
  const SelectCustom = useTypedSelector(
    reduxServices.bookingList.selectors.SelectCustom,
  )
  const FromDateValue = useTypedSelector(
    reduxServices.bookingList.selectors.FromDateValue,
  )
  const [location, setLocation] = useState<string>(LocationValue)
  const [room, setRoom] = useState<string>(RoomValue)
  const [meetingStatus, setMeetingStatus] = useState<string>(MeetingStatus)
  const [selectDateOptions, setSelectDateOptions] =
    useState<string>(SelectCustom)
  const [selectDate, setSelectDate] = useState<string>(FromDateValue as string)

  useEffect(() => {
    dispatch(reduxServices.bookingList.actions.setLocationValue(location))
    dispatch(reduxServices.bookingList.actions.setRoomValue(room))

    dispatch(reduxServices.bookingList.actions.setMeetingStatus(meetingStatus))

    dispatch(
      reduxServices.bookingList.actions.setSelectCustom(selectDateOptions),
    )
    dispatch(reduxServices.bookingList.actions.setFromDateValue(selectDate))
  }, [location, room, meetingStatus, selectDateOptions, selectDate])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title={'Meeting Request Summary'}
        CFooterClassName="d-none"
      >
        <BookingListFilterOptions
          location={location}
          setLocation={setLocation}
          room={room}
          setRoom={setRoom}
          meetingStatus={meetingStatus}
          setMeetingStatus={setMeetingStatus}
          selectDateOptions={selectDateOptions}
          setSelectDateOptions={setSelectDateOptions}
          selectDate={selectDate}
          setSelectDate={setSelectDate}
        />
        <BookingListTable
          location={location}
          meetingStatus={meetingStatus}
          room={room}
          selectDate={selectDate}
          selectDateOptions={selectDateOptions}
        />
      </OCard>
    </>
  )
}

export default BookingList
