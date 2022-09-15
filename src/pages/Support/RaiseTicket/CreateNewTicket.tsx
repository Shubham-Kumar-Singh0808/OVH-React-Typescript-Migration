import React, { useState } from 'react'
import CreateNewTicketFilterOptions from './CreateNewTicketFilterOptions'
import OCard from '../../../components/ReusableComponent/OCard'
import AddTrackerList from '../Raise Ticket/Add Tracker List/AddTrackerList'

const CreateNewTicket = (): JSX.Element => {
  const [toggle, setToggle] = useState<string>('')
  return (
    <>
      {toggle === '' && (
        <>
          <OCard
            className="mb-4 myprofile-wrapper"
            title="New Ticket"
            CBodyClassName="ps-0 pe-0"
            CFooterClassName="d-none"
          >
            <CreateNewTicketFilterOptions setToggle={setToggle} />
          </OCard>
        </>
      )}
      {toggle === 'addTrackerList' && <AddTrackerList setToggle={setToggle} />}
    </>
  )
}

export default CreateNewTicket
