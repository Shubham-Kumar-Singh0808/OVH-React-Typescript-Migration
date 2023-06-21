import React, { useEffect } from 'react'
import EmployeeAcknowledgeDiscussionButtons from './ReviewForm/ReviewFormButtons/EmployeeAcknowledgeDiscussionButtons'
import MyReviewTabs from './MyReviewTabs'
import EmployeeManagerRating from './EmployeeManagerRating'
import { canEmployeeViewAfterManagerSubmit } from './MyReviewHelpers'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import {
  MyReviewAppraisalFormStatus,
  MyReviewFormStatus,
} from '../../../types/Performance/MyReview/myReviewTypes'

const MyReview = (): JSX.Element => {
  const dispatch = useAppDispatch()
  // getting the employee id to call the api
  const employeeId = useTypedSelector(
    (state) => state.authentication.authenticatedUser.employeeId,
  )
  const myReviewFormStatus = useTypedSelector(
    (state) => state.myReview.myReviewFormStatus,
  )
  // used to differentiate between employees and its managers
  const appraisalFormStatusEmpManager = useTypedSelector(
    (state) => state.myReview.appraisalForm.appraisalFormStatus,
  )

  // calling the apis as soon as the user lands on this page
  useEffect(() => {
    dispatch(reduxServices.myReview.getPerformanceRatingsThunk())
    dispatch(reduxServices.myReview.getAppraisalFormThunk(+employeeId))
    // dispatch(reduxServices.myReview.getAppraisalFormThunk(+employeeId))
  }, [])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="My Review"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        {
          // once the manager has submitted the ratings, the employee can see these buttons until they acknowledge
          (myReviewFormStatus === MyReviewFormStatus.pendingagreement ||
            myReviewFormStatus === MyReviewFormStatus.openForDiscussion) &&
            appraisalFormStatusEmpManager !==
              MyReviewAppraisalFormStatus.NotSubmittedByYou && (
              <>
                <EmployeeAcknowledgeDiscussionButtons />
              </>
            )
        }
        {
          // the employee can see this after the manager has submitted the ratings
          canEmployeeViewAfterManagerSubmit(
            myReviewFormStatus,
            appraisalFormStatusEmpManager,
          ) && (
            <>
              <EmployeeManagerRating />
            </>
          )
        }
        <MyReviewTabs />
      </OCard>
    </>
  )
}

export default MyReview
