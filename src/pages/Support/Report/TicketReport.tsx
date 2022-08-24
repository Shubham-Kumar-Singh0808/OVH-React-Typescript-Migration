import React from 'react'
import { CCol, CRow, CSpinner } from '@coreui/react-pro'
import TicketReportFilterOptions from './TicketReportFilterOptions'
import TicketReportTable from './TicketReportTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const TicketReport = (): JSX.Element => {
  const isLoading = useTypedSelector(
    reduxServices.ticketReport.selectors.isLoading,
  )
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Ticket Reports"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <TicketReportFilterOptions />

        {isLoading !== ApiLoadingState.loading ? (
          <>
            <TicketReportTable />
          </>
        ) : (
          <CCol>
            <CRow className="category-loading-spinner">
              <CSpinner />
            </CRow>
          </CCol>
        )}
      </OCard>
    </>
  )
}
export default TicketReport
