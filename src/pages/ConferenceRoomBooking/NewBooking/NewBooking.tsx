import React, { useState } from 'react'
import NewBookingFilterOptions from './NewBookingFilterOptions'
import LocationList from './LocationList/LocationList'
import RoomList from './RoomList/RoomList'
import OCard from '../../../components/ReusableComponent/OCard'

const NewBooking = (): JSX.Element => {
  const [toggle, setToggle] = useState('')
  return (
    <>
      {toggle === '' && (
        <>
          <OCard
            className="mb-4 myprofile-wrapper"
            title="Meeting Request"
            CBodyClassName="ps-0 pe-0"
            CFooterClassName="d-none"
          >
            <NewBookingFilterOptions setToggle={setToggle} />
          </OCard>
        </>
      )}
      {toggle === 'addLocation' && <LocationList setToggle={setToggle} />}
      {toggle === 'addRoom' && <RoomList setToggle={setToggle} />}
    </>
  )
}

export default NewBooking
