import React from 'react'
import InitialEmployeeButtons from './InitialEmployeeButtons'
import InitialManagerButtons from './InitialManagerButtons'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import {
  IncomingMyReviewAppraisalForm,
  MyReviewAppraisalFormStatus,
  MyReviewFormStatus,
  MyReviewModalProps,
} from '../../../../../types/Performance/MyReview/myReviewTypes'
import OToast from '../../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../../reducers/reduxServices'
import ReviewAverageRatingModal from '../ReviewFormModals/ReviewAverageRatingModal'

const ReviewFormButtons = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const appraisalFormStatus = useTypedSelector(
    (state) => state.myReview.myReviewFormStatus,
  )
  // used to differentiate between employee and manager
  const appraisalFormStatusEmpManager = useTypedSelector(
    (state) => state.myReview.appraisalForm.appraisalFormStatus,
  )
  const finalAppraisalForm = useTypedSelector(
    (state) => state.myReview.appraisalForm,
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

  //click action for the "ACCEPT" button in the modal that is opened
  const modalAcceptBtnHandler = async () => {
    const finalData: IncomingMyReviewAppraisalForm = {
      ...finalAppraisalForm,
      formStatus: MyReviewFormStatus.submitForEmployee,
    }
    // submitting the final draft of myReview
    const submitResult = await dispatch(
      reduxServices.myReview.employeeAppraisalFormThunk(finalData),
    )
    if (
      reduxServices.myReview.employeeAppraisalFormThunk.fulfilled.match(
        submitResult,
      )
    ) {
      // after submitted successfully, closing the modal
      const modalObject: MyReviewModalProps = {
        showModal: false,
        description: '',
        confirmBtnAction: undefined,
      }
      // fetching the latest data
      dispatch(
        reduxServices.myReview.getAppraisalFormThunk(
          +finalAppraisalForm.employee.id,
        ),
      )
      dispatch(reduxServices.myReview.actions.setModal(modalObject))
      //giving success message
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastMessage="Appraisal Form Submitted Successfully"
            toastColor="success"
          />,
        ),
      )
    }
  }

  // this is click action for the submit button below the myReview table
  const submitButtonHandler = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    const finalRatingResult = await dispatch(
      reduxServices.myReview.employeeAppraisalFormForRatingThunk(
        finalAppraisalForm,
      ),
    )
    if (
      reduxServices.myReview.employeeAppraisalFormForRatingThunk.fulfilled.match(
        finalRatingResult,
      )
    ) {
      const finalRating = finalRatingResult.payload
      const modalObject: MyReviewModalProps = {
        showModal: true,
        confirmBtnText: 'Accept',
        cancelBtnText: 'Cancel',
        modalHeaderClass: 'd-none',
        modalFooterClass: undefined,
        description: <ReviewAverageRatingModal averageRating={finalRating} />,
        confirmBtnAction: modalAcceptBtnHandler,
      }
      dispatch(reduxServices.myReview.actions.setModal(modalObject))
    }
  }

  return (
    <>
      {
        // these buttons are only displayed to employee
        appraisalFormStatus === MyReviewFormStatus.saveForEmployee &&
          appraisalFormStatusEmpManager !==
            MyReviewAppraisalFormStatus.NotSubmittedByYou && (
            <InitialEmployeeButtons
              saveButtonApiCall={saveButtonApiCall}
              submitButtonHandler={submitButtonHandler}
            />
          )
      }
      {
        // these buttons are only displayed to manager
        appraisalFormStatusEmpManager ===
          MyReviewAppraisalFormStatus.NotSubmittedByYou && (
          <InitialManagerButtons
            saveButtonApiCall={saveButtonApiCall}
            submitButtonHandler={submitButtonHandler}
          />
        )
      }
    </>
  )
}

export default ReviewFormButtons
