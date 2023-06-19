import React from 'react'
import InitialEmployeeButtons from './InitialEmployeeButtons'
import InitialManagerButtons from './InitialManagerButtons'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import {
  IncomingMyReviewAppraisalForm,
  MyReviewAppraisalFormStatus,
  MyReviewFormStatus,
} from '../../../../../types/Performance/MyReview/myReviewTypes'
import OToast from '../../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../../reducers/reduxServices'

const ReviewFormButtons = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const appraisalFormStatus = useTypedSelector(
    (state) => state.myReview.myReviewFormStatus,
  )
  // used to differentiate between employee and manager
  const appraisalFormStatusEmpManager = useTypedSelector(
    (state) => state.myReview.appraisalForm.appraisalFormStatus,
  )

  // as the save api is common, with variation in data, the logic is written down here and passed to components
  const saveButtonApiCall = async (
    finalData: IncomingMyReviewAppraisalForm,
  ) => {
    const result = await dispatch(
      reduxServices.myReview.employeeAppraisalFormThunk(finalData),
    )
    if (
      reduxServices.myReview.employeeAppraisalFormThunk.fulfilled.match(result)
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Appraisal Form has been saved."
          />,
        ),
      )
      dispatch(
        reduxServices.myReview.getAppraisalFormThunk(+finalData.employee.id),
      )
    }
  }

  return (
    <>
      {
        // these buttons are only displayed to employee
        appraisalFormStatus === MyReviewFormStatus.saveForEmployee &&
          appraisalFormStatusEmpManager !==
            MyReviewAppraisalFormStatus.NotSubmittedByYou && (
            <InitialEmployeeButtons saveButtonApiCall={saveButtonApiCall} />
          )
      }
      {
        // these buttons are only displayed to manager
        appraisalFormStatusEmpManager ===
          MyReviewAppraisalFormStatus.NotSubmittedByYou && (
          <InitialManagerButtons saveButtonApiCall={saveButtonApiCall} />
        )
      }
    </>
  )
}

export default ReviewFormButtons
