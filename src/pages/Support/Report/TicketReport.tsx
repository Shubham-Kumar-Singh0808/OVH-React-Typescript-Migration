import React, { useState } from 'react'
import { CCol, CRow, CSpinner } from '@coreui/react-pro'
import TicketReportFilterOptions from './TicketReportFilterOptions'
import TicketReportTable from './TicketReportTable'
import TicketDetails from './TicketDetails'
import OCard from '../../../components/ReusableComponent/OCard'
import { useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const TicketReport = (): JSX.Element => {
  const [toggle, setToggle] = useState('')
  const isLoading = useTypedSelector(
    reduxServices.ticketReport.selectors.isLoading,
  )
  return (
    <>
      {toggle === '' && (
        <OCard
          className="mb-4 myprofile-wrapper"
          title="Ticket Reports"
          CBodyClassName="ps-0 pe-0"
          CFooterClassName="d-none"
        >
          <TicketReportFilterOptions />

          {isLoading !== ApiLoadingState.loading ? (
            <>
              <TicketReportTable setToggle={setToggle} />
            </>
          ) : (
            <CCol>
              <CRow className="category-loading-spinner">
                <CSpinner />
              </CRow>
            </CCol>
          )}
        </OCard>
      )}
      {toggle === 'ticketDetails' && <TicketDetails />}
    </>
  )
}
export default TicketReport
