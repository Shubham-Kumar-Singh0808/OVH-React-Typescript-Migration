import React from 'react'
import ReviewHistoryTimeLine from './ReviewHistoryTimeLine'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'
import OLoadingSpinner from '../../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../../types/Components/loadingScreenTypes'

const ReviewHistoryDetails = (): JSX.Element => {
  const isLoading = useTypedSelector(reduxServices.myReview.selectors.isLoading)

  return (
    <>
      {isLoading !== ApiLoadingState.loading ? (
        <>
          <ReviewHistoryTimeLine />
        </>
      ) : (
        <OLoadingSpinner type={LoadingType.PAGE} />
      )}
    </>
  )
}
export default ReviewHistoryDetails
