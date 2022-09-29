import React from 'react'
import { CRow, CCol, CButton, CSpinner } from '@coreui/react-pro'
import { Link, useLocation } from 'react-router-dom'
import TicketHistoryTimeLine from './TicketHistoryTimeLine'
import { TicketHistoryDetailsProps } from '../../../../types/Support/MyTickets/myTicketsTypes'
import OCard from '../../../../components/ReusableComponent/OCard'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const TicketHistoryDetails = ({
  backButtonHandler,
}: TicketHistoryDetailsProps): JSX.Element => {
  const location = useLocation()

  const isLoading = useTypedSelector(reduxServices.tickets.selectors.isLoading)

  const ticketId = useTypedSelector(
    reduxServices.ticketApprovals.selectors.selectTicketId,
  )

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Ticket History Details"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <Link
              to={
                location.pathname === '/ticketApprovals'
                  ? `/updateTicketInApprovals/${ticketId}`
                  : `/updateTicket/${ticketId}`
              }
            >
              <CButton color="info btn-ovh me-1" data-testid="edit-btn">
                <i className="fa fa-pencil-square-o"></i>&nbsp;Edit
              </CButton>
            </Link>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="toggle-back-button"
              onClick={backButtonHandler}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        {isLoading !== ApiLoadingState.loading ? (
          <>
            <TicketHistoryTimeLine />
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
export default TicketHistoryDetails
