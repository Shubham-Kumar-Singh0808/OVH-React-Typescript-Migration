import { CButton } from '@coreui/react-pro'
import React from 'react'
import { useTypedSelector } from '../../../../../stateStore'
import { MyReviewButtonsProps } from '../../../../../types/Performance/MyReview/myReviewTypes'
import { generateMyReviewTestId } from '../../MyReviewHelpers'

/* These buttons are shown to the employee when he/she is submitted the form initially */

const InitialEmployeeButtons = ({
  saveButtonApiCall,
  submitButtonHandler,
}: MyReviewButtonsProps): JSX.Element => {
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
