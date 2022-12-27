import React, { useEffect } from 'react'
import OCard from '../../../../components/ReusableComponent/OCard'
import OLoadingSpinner from '../../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { LoadingType } from '../../../../types/Components/loadingScreenTypes'
import MyKRAsTable from '../../MyKRAs/MyKRAsTable'

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
      <OCard
        className="mb-4 myprofile-wrapper"
        title="My KRAs"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        {isLoading !== ApiLoadingState.loading ? (
          <MyKRAsTable />
        ) : (
          <OLoadingSpinner type={LoadingType.PAGE} />
        )}
      </OCard>
    </>
  )
}

export default AppraisalForm
