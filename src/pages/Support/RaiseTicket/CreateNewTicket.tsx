import React from 'react'
import CreateNewTicketFilterOptions from './CreateNewTicketFilterOptions'
import OCard from '../../../components/ReusableComponent/OCard'

const CreateNewTicket = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="New Ticket"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CreateNewTicketFilterOptions />
      </OCard>
    </>
  )
}

export default CreateNewTicket
