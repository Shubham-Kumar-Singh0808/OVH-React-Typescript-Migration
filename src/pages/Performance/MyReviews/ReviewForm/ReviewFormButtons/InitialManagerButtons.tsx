import { CButton } from '@coreui/react-pro'
import React from 'react'
import {
  IncomingMyReviewAppraisalForm,
  MyReviewFormStatus,
  MyReviewButtonsProps,
  MyReviewModalProps,
} from '../../../../../types/Performance/MyReview/myReviewTypes'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import OToast from '../../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../../reducers/reduxServices'
import ReviewAverageRatingModal from '../ReviewFormModals/ReviewAverageRatingModal'
import { generateMyReviewTestId } from '../../MyReviewHelpers'

/* This component is rendered for the manager when he/she is submitting the
  form for the first time...
*/

const InitialManagerButtons = ({
  saveButtonApiCall,
}: MyReviewButtonsProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const finalAppraisalForm = useTypedSelector(
    (state) => state.myReview.appraisalForm,
  )
  const myReviewFormStatus = useTypedSelector(
    (state) => state.myReview.myReviewFormStatus,
  )
  const isSubmitButtonEnabled = useTypedSelector(
    (state) => state.myReview.isManagerSubmitButtonEnabled,
  )

  const saveButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const finalData: IncomingMyReviewAppraisalForm = {
      ...finalAppraisalForm,
      formStatus: MyReviewFormStatus.pending.toString(),
    }
    saveButtonApiCall(finalData)
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
        // manager is only allowed to save until he/she has not submitted till now
        (myReviewFormStatus === MyReviewFormStatus.pending ||
          myReviewFormStatus === MyReviewFormStatus.submitForEmployee) && (
          <CButton
            color="success"
            data-testid={generateMyReviewTestId('managerSaveBtn')}
            className="btn-ovh me-2"
            onClick={saveButtonHandler}
          >
            Save
          </CButton>
        )
      }
      {
        // once the employee is acknowledged, manager cannot submit
        myReviewFormStatus !== MyReviewFormStatus.completed && (
          <CButton
            color="success"
            data-testid={generateMyReviewTestId('managerSubmitBtn')}
            className="btn-ovh"
            disabled={!isSubmitButtonEnabled}
            onClick={submitButtonHandler}
          >
            Submit
          </CButton>
        )
      }
    </>
  )
}

export default InitialManagerButtons
