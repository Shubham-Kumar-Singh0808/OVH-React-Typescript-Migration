import React from 'react'
import TicketDetailsTable from './TicketDetailsTable'
import OCard from '../../../components/ReusableComponent/OCard'

const TicketDetails = ({
  setToggle,
}: {
  setToggle: (value: string) => void
}): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Ticket Details"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <TicketDetailsTable backButtonHandler={() => setToggle('')} />
      </OCard>
    </>
  )
}
export default TicketDetails
