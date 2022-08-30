import React from 'react'
import MyTicketsTable from './MyTicketsTable'
import OCard from '../../../components/ReusableComponent/OCard'

const MyTickets = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Ticket List"
        CFooterClassName="d-none"
      >
        <MyTicketsTable />
      </OCard>
    </>
  )
}
export default MyTickets
