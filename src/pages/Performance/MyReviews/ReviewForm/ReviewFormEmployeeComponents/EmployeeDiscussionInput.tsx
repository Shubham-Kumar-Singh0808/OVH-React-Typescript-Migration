import {
  CButton,
  CCol,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useMemo, useState } from 'react'
import { TextDanger, TextWhite } from '../../../../../constant/ClassName'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import { OutgoingSaveReviewCommentsParams } from '../../../../../types/Performance/MyReview/myReviewTypes'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { generateMyReviewTestId } from '../../MyReviewHelpers'

/* This component is rendered to the employee only when he/she has requested for a discussion. */

const EmployeeDiscussionInput = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const appraisalFormId = useTypedSelector(
    (state) => state.myReview.appraisalForm.id,
  )
  const [enteredComments, setEnteredComments] = useState<string>('')
  const [isSubmitButtonEnabled, setSubmitButtonEnabled] =
    useState<boolean>(false)

  const commentsChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEnteredComments(e.target.value)
  }

  // shows comments if following is true
  const showCommentsAsterix = useMemo(() => {
    return enteredComments.trim().length < 50
  }, [enteredComments])

  useEffect(() => {
    if (showCommentsAsterix) {
      // if not satisfying
      setSubmitButtonEnabled(false)
    } else {
      // conditions satisfying
      setSubmitButtonEnabled(true)
    }
  }, [enteredComments])

  const submitButtonHandler = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    const finalData: OutgoingSaveReviewCommentsParams = {
      appraisalFormId,
      comments: enteredComments,
    }
    const saveResult = await dispatch(
      reduxServices.myReview.saveReviewCommentsThunk(finalData),
    )
    if (
      reduxServices.myReview.saveReviewCommentsThunk.fulfilled.match(saveResult)
    ) {
      dispatch(reduxServices.myReview.getReviewCommentsThunk(appraisalFormId))
      setEnteredComments('')
    }
  }

  return (
    <>
      <div
        className="d-flex flex-column m-2"
        data-testid={`${generateMyReviewTestId('empDiscussionInput')}`}
      >
        <div>
          <CFormLabel className="text-primary">
            Comments:
            <span
              data-testid="myRev-empReqDis-asterix"
              className={showCommentsAsterix ? TextDanger : TextWhite}
            >
              *
            </span>
          </CFormLabel>
        </div>
        <div>
          <CFormTextarea
            value={enteredComments}
            onChange={commentsChangeHandler}
            data-testid={generateMyReviewTestId('empReqDis-comments')}
          />
          {enteredComments.trim().length > 0 && (
            <div className="d-flex flex-row flex-wrap align-items-center">
              <span className="mt-1" data-testid="myRev-empReqDis-commentLen">
                {enteredComments.length} / 250
              </span>{' '}
            </div>
          )}
        </div>
      </div>
      <CRow>
        <CCol className="col-md-3 offset-md-4">
          <CButton
            className="btn-ovh mt-3"
            data-testid="myRev-empReqDis-submitBtn"
            color="success"
            disabled={!isSubmitButtonEnabled}
            onClick={submitButtonHandler}
          >
            Submit
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}

export default EmployeeDiscussionInput
