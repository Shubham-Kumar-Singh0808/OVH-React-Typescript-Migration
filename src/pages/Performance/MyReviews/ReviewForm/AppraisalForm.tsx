import React, { useEffect } from 'react'
import ReviewFormTable from './ReviewFormTable'
import OLoadingSpinner from '../../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { LoadingType } from '../../../../types/Components/loadingScreenTypes'

const AppraisalForm = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const isLoading = useTypedSelector(reduxServices.myReview.selectors.isLoading)

  useEffect(() => {
    dispatch(reduxServices.myReview.getEmployeeReviewForm(Number(employeeId)))
  }, [dispatch])

  return (
    <>
      {isLoading !== ApiLoadingState.loading ? (
        <ReviewFormTable />
      ) : (
        <OLoadingSpinner type={LoadingType.PAGE} />
      )}
    </>
  )
}

export default AppraisalForm
