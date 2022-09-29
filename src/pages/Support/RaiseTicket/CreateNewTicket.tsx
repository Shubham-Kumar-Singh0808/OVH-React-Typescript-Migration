import React, { useState } from 'react'
import CreateNewTicketFilterOptions from './CreateNewTicketFilterOptions'
import TrackerList from './TrackerList/TrackerList'
import OCard from '../../../components/ReusableComponent/OCard'

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
      {toggle === 'addTrackerList' && <TrackerList setToggle={setToggle} />}
    </>
  )
}

export default CreateNewTicket
