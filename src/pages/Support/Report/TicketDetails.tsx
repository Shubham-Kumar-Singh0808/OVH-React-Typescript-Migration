import React from 'react'
import { CCol, CRow, CSpinner } from '@coreui/react-pro'
import TicketDetailsTable from './TicketDetailsTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'

const TicketDetails = ({
  setToggle,
}: {
  setToggle: (value: string) => void
}): JSX.Element => {
  const isLoading = useTypedSelector(
    reduxServices.ticketReport.selectors.isLoading,
  )
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Ticket Details"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        {isLoading !== ApiLoadingState.loading ? (
          <>
            <TicketDetailsTable backButtonHandler={() => setToggle('')} />
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
export default TicketDetails
