import { CButton } from '@coreui/react-pro'
import React from 'react'
import {
  IncomingMyReviewAppraisalForm,
  MyReviewFormStatus,
  MyReviewButtonsProps,
} from '../../../../../types/Performance/MyReview/myReviewTypes'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import {
  generateMyReviewTestId,
  isAnyKPIIncompleteForManager,
} from '../../MyReviewHelpers'
import OToast from '../../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../../reducers/reduxServices'

/* This component is rendered for the manager when he/she is submitting the
  form for the first time...
*/

const InitialManagerButtons = ({
  saveButtonApiCall,
  submitButtonHandler,
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
    const [isKpiIncomplete, incompleteKpiName] = isAnyKPIIncompleteForManager(
      finalAppraisalForm.kra,
    )
    if (isKpiIncomplete) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="danger"
            toastMessage={`Please enter at least 50 characters for this KPI: ${incompleteKpiName}`}
          />,
        ),
      )
      return
    }
    const finalData: IncomingMyReviewAppraisalForm = {
      ...finalAppraisalForm,
      formStatus: MyReviewFormStatus.pending.toString(),
    }
    saveButtonApiCall(finalData)
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
