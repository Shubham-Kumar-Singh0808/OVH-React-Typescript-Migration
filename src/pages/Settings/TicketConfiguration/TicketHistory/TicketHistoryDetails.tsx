import React from 'react'
import { CRow, CCol, CButton } from '@coreui/react-pro'
import TicketHistoryTimeLine from './TicketHistoryTimeLine'
import OCard from '../../../../components/ReusableComponent/OCard'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import OLoadingSpinner from '../../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../../types/Components/loadingScreenTypes'

const TicketHistoryDetails = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const isLoading = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.isLoading,
  )

  const backButtonHandler = () => {
    dispatch(reduxServices.ticketConfiguration.actions.setToggle(''))
  }

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
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="toggle-back-btn"
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
