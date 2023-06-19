import { CButton } from '@coreui/react-pro'
import React from 'react'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import { reduxServices } from '../../../../../reducers/reduxServices'
import OToast from '../../../../../components/ReusableComponent/OToast'
import {
  IncomingMyReviewAppraisalForm,
  MyReviewFormStatus,
  MyReviewModalProps,
  MyReviewButtonsProps,
} from '../../../../../types/Performance/MyReview/myReviewTypes'
import ReviewAverageRatingModal from '../ReviewFormModals/ReviewAverageRatingModal'
import { generateMyReviewTestId } from '../../MyReviewHelpers'

/* These buttons are shown to the employee when he/she is submitted the form initially */

const InitialEmployeeButtons = ({
  saveButtonApiCall,
}: MyReviewButtonsProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const isSubmitButtonEnabled = useTypedSelector(
    (state) => state.myReview.isEmployeeSubmitButtonEnabled,
  )
  const finalAppraisalForm = useTypedSelector(
    (state) => state.myReview.appraisalForm,
  )

  // click action for save button in the myReview Form
  const saveButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    saveButtonApiCall(finalAppraisalForm)
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
      <CButton
        color="success"
        data-testid={`${generateMyReviewTestId('empSaveBtn')}`}
        className="btn-ovh me-2"
        onClick={saveButtonHandler}
      >
        Save
      </CButton>
      <CButton
        color="success"
        data-testid={`${generateMyReviewTestId('empSubmitBtn')}`}
        className="btn-ovh"
        disabled={!isSubmitButtonEnabled}
        onClick={submitButtonHandler}
      >
        Submit
      </CButton>
    </>
  )
}

export default InitialEmployeeButtons
