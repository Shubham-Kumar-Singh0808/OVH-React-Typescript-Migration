import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import MyReviewTabs from '../MyReviewTabs'
import OCard from '../../../../components/ReusableComponent/OCard'
import EmployeeManagerRating from '../EmployeeManagerRating'
import ManagerAppraisalTopButtons from '../ReviewForm/ReviewFormButtons/ManagerAppraisalTopButtons'

const ManagerAppraisal = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { employeeId } = useParams<{ employeeId: string }>()
  const isMyReviewError = useTypedSelector((state) => state.myReview.error)

  const getAppraisalLatestData = async () => {
    const appraisalResult = await dispatch(
      reduxServices.myReview.getAppraisalFormThunk(+employeeId),
    )
    if (
      reduxServices.myReview.getAppraisalFormThunk.fulfilled.match(
        appraisalResult,
      )
    ) {
      // validating and getting the correct data from the api
      dispatch(
        reduxServices.myReview.getExistingAppraisalFormThunk(
          appraisalResult.payload.id,
        ),
      )
    }
  }

  useEffect(() => {
    getAppraisalLatestData()
    dispatch(reduxServices.myReview.getPerformanceRatingsThunk())
  }, [])

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="Appraisal Form"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      {isMyReviewError === null ? (
        <>
          <ManagerAppraisalTopButtons />
          <EmployeeManagerRating />
          <MyReviewTabs />
        </>
      ) : (
        <p>Loading</p>
      )}
    </OCard>
  )
}

export default ManagerAppraisal
