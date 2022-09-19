import React, { useState } from 'react'
import BookingListFilterOptions from './BookingListFilterOptions'
import BookingListTable from './BookingListTable'
import OCard from '../../../components/ReusableComponent/OCard'

const BookingList = (): JSX.Element => {
  const [location, setLocation] = useState<string>('1')
  const [room, setRoom] = useState<string>('')
  const [meetingStatus, setMeetingStatus] = useState<string>('New')
  const [selectDate, setSelectDate] = useState<string>('Today')
  const [date, setDate] = useState<string>('')
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title={'Ticket Approvals'}
        CFooterClassName="d-none"
      >
        <BookingListFilterOptions
          location={location}
          setLocation={setLocation}
          room={room}
          setRoom={setRoom}
          meetingStatus={meetingStatus}
          setMeetingStatus={setMeetingStatus}
          selectDate={selectDate}
          setSelectDate={setSelectDate}
          date={date}
          setDate={setDate}
        />
        <BookingListTable />
      </OCard>
    </>
  )
}

export default BookingList
