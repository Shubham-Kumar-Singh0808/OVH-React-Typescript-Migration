import React, { useState } from 'react'
import BookingListFilterOptions from './BookingListFilterOptions'
import BookingListTable from './BookingListTable'
import OCard from '../../../components/ReusableComponent/OCard'

const BookingList = (): JSX.Element => {
  const [location, setLocation] = useState<string>('1')
  const [room, setRoom] = useState<string>('')
  const [meetingStatus, setMeetingStatus] = useState<string>('New')
  const [selectDateOptions, setSelectDateOptions] = useState<string>('Today')
  const [selectDate, setSelectDate] = useState<string>('')
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
        <BookingListTable />
      </OCard>
    </>
  )
}

export default BookingList
