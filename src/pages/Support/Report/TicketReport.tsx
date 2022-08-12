import React from 'react'
import TicketReportFilterOptions from './TicketReportFilterOptions'
import TicketReportTable from './TicketReportTable'
import OCard from '../../../components/ReusableComponent/OCard'

const TicketReport = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Ticket Reports"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <TicketReportFilterOptions />
        <TicketReportTable />
      </OCard>
    </>
  )
}
export default TicketReport
