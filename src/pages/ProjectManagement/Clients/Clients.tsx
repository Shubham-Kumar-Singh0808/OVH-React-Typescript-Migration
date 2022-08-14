import React from 'react'
import ClientFilterOptions from './ClientFilterOptions'
import ClientsTable from './ClientsTable'
import OCard from '../../../components/ReusableComponent/OCard'

const Clients = () => {
  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title={'Clients'}
      CFooterClassName="d-none"
    >
      <ClientFilterOptions />
      <ClientsTable />
    </OCard>
  )
}

export default Clients
