import { CButton, CRow } from '@coreui/react-pro'
import React from 'react'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { generateMyReviewTestId } from '../../MyReviewHelpers'

const EmployeeAcknowledgeDiscussionButtons = (): JSX.Element => {
  const dispatch = useAppDispatch()
  // used to check whether employee requests discussion or not
  const requestDiscussion = useTypedSelector(
    (state) => state.myReview.appraisalForm.requestDiscussion,
  )
  const finalAppraisalForm = useTypedSelector(
    (state) => state.myReview.appraisalForm,
  )
  const requestDiscussionButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    // after clicking this button the, comments is opened below the table for employee
    e.preventDefault()
    dispatch(
      reduxServices.myReview.actions.setRequestForDiscusstionForEmployee(),
    )
    window.scroll(0, 400)
  }

  const acknowledgeButtonHandler = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    const result = await dispatch(
      reduxServices.myReview.appraisalConfirmationThunk(finalAppraisalForm),
    )
    if (
      reduxServices.myReview.appraisalConfirmationThunk.fulfilled.match(result)
    ) {
      dispatch(
        reduxServices.myReview.getAppraisalFormThunk(
          +finalAppraisalForm.employee.id,
        ),
      )
    }
  }

  return (
    <CRow>
      <div className="d-flex flex-row flex-wrap justify-content-end align-items-center">
        <CButton
          className="btn-ovh me-2"
          data-testid={generateMyReviewTestId('empAckBtn')}
          color="success"
          onClick={acknowledgeButtonHandler}
        >
          Acknowledge
        </CButton>
        {
          // once it is true, we must not display the button again to the employee
          requestDiscussion !== true && (
            <CButton
              className="btn-ovh"
              data-testid={generateMyReviewTestId('empReqDiscussBtn')}
              color="warning"
              onClick={requestDiscussionButtonHandler}
            >
              Request Discussion
            </CButton>
          )
        }
      </div>
    </CRow>
  )
}

export default EmployeeAcknowledgeDiscussionButtons
