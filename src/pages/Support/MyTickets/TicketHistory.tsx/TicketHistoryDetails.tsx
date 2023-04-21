import React, { useEffect } from 'react'
import { CRow, CCol, CButton } from '@coreui/react-pro'
import { Link, useLocation } from 'react-router-dom'
import TicketHistoryTimeLine from './TicketHistoryTimeLine'
import OCard from '../../../../components/ReusableComponent/OCard'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import OLoadingSpinner from '../../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../../types/Components/loadingScreenTypes'

const TicketHistoryDetails = (): JSX.Element => {
  const location = useLocation()
  const dispatch = useAppDispatch()

  const isLoading = useTypedSelector(reduxServices.tickets.selectors.isLoading)

  const ticketId = useTypedSelector(
    reduxServices.ticketApprovals.selectors.selectTicketId,
  )

  const backButtonHandler = () => {
    if (location.pathname === '/ticketSummary') {
      dispatch(reduxServices.tickets.actions.toggle(''))
    } else {
      dispatch(reduxServices.ticketApprovals.actions.setToggle(''))
    }
  }

  useEffect(() => {
    dispatch(
      reduxServices.ticketApprovals.actions.setRoutePath(location.pathname),
    )
  }, [location.pathname])

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
          <OLoadingSpinner type={LoadingType.PAGE} />
        )}
      </OCard>
    </>
  )
}
export default TicketHistoryDetails
