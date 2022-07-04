import React from 'react'
import TicketConfigurationOptions from './TicketConfigurationOptions'
import OCard from '../../../components/ReusableComponent/OCard'

const TicketConfiguration = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Sub-Category List"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <TicketConfigurationOptions />
      </OCard>
    </>
  )
}

export default TicketConfiguration
