import { CCardHeader } from '@coreui/react-pro'
import React from 'react'
import UpdateTicketHistoryTimeline from './UpdateTicketHistoryTimeline'
import OLoadingSpinner from '../../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'
import { LoadingType } from '../../../../types/Components/loadingScreenTypes'

const UpdateTicketHistory = (): JSX.Element => {
  const isLoading = useTypedSelector(
    reduxServices.updateTicket.selectors.isLoading,
  )
  return (
    <>
      <CCardHeader className="mt-4">
        <h4 className="h4">History</h4>
      </CCardHeader>

      {isLoading !== ApiLoadingState.loading ? (
        <>
          <UpdateTicketHistoryTimeline />
        </>
      ) : (
        <>
          <OLoadingSpinner type={LoadingType.PAGE} />
        </>
      )}
    </>
  )
}

export default UpdateTicketHistory
