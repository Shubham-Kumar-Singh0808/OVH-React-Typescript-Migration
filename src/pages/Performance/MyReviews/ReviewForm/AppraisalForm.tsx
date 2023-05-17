import React, { useEffect, useState } from 'react'
import { CButton, CCol, CFormTextarea, CRow } from '@coreui/react-pro'
import ReviewFormTable from './ReviewFormTable'
import OLoadingSpinner from '../../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { LoadingType } from '../../../../types/Components/loadingScreenTypes'
import ReviewHistoryDetails from '../ReviewHistory/ReviewHistoryDetails'

const AppraisalForm = (): JSX.Element => {
  const [comments, setComments] = useState<string>()
  const [isPostButtonEnabled, setIsPostButtonEnabled] = useState(false)
  const dispatch = useAppDispatch()
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const appraisalFormId = useTypedSelector(
    reduxServices.myReview.selectors.appraisalFormId,
  )

  const isLoading = useTypedSelector(reduxServices.myReview.selectors.isLoading)
  const isReviewCommentsLoading = useTypedSelector(
    reduxServices.myReview.selectors.isReviewCommentsLoading,
  )

  const appraisalForm = useTypedSelector(
    reduxServices.myReview.selectors.appraisalForm,
  )

  useEffect(() => {
    dispatch(reduxServices.myReview.getEmployeeReviewForm(Number(employeeId)))
  }, [dispatch])

  useEffect(() => {
    if (appraisalFormId) {
      dispatch(reduxServices.myReview.getReviewComments(appraisalFormId))
      dispatch(reduxServices.myReview.existingAppraisalForm(appraisalFormId))
    }
  }, [appraisalFormId])

  const saveButtonHandler = async () => {
    const saveCommentsResultAction = await dispatch(
      reduxServices.myReview.saveReviewComments({
        appraisalFormId,
        comments: comments as string,
      }),
    )
    if (
      reduxServices.myReview.saveReviewComments.fulfilled.match(
        saveCommentsResultAction,
      )
    ) {
      setComments('')
      dispatch(reduxServices.myReview.getReviewComments(appraisalFormId))
    }
  }

  useEffect(() => {
    if (Number(comments?.length) > 50) {
      setIsPostButtonEnabled(true)
    } else {
      setIsPostButtonEnabled(false)
    }
  }, [comments])

  return (
    <>
      {isLoading !== ApiLoadingState.loading &&
      isReviewCommentsLoading !== ApiLoadingState.loading ? (
        <>
          <ReviewFormTable />
          <div
            className="form-group"
            ng-show="requestDiscussionFlag || (appraisalform.requestDiscussion &amp;&amp; level1Flag &amp;&amp; appraisalform.formStatus != 'COMPLETED')"
          >
            <label className="col-sm-3 text-primary">
              Comments:
              <span
                className={
                  Number(comments?.length) > 50 ? 'text-white' : 'text-danger'
                }
              >
                *
              </span>
            </label>
            <CRow className="mt-4 mb-0">
              <CCol col-xs-12 mt-10>
                <CFormTextarea
                  autoComplete="off"
                  type="text"
                  id="notesLink"
                  name="notesLink"
                  placeholder="What you are thinking?"
                  data-testid="notes-link"
                  maxLength={250}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                ></CFormTextarea>
                <p className="mt-1">{comments?.length}/250</p>
              </CCol>
            </CRow>
            <div className="col-sm-8 col-sm-offset-3  col-xs-offset-3">
              <button
                type="submit"
                className="btn btn-success"
                onClick={saveButtonHandler}
                disabled={!isPostButtonEnabled}
              >
                Submit
              </button>
            </div>
          </div>
          <CRow className="mt-4">
            <CCol>
              <ReviewHistoryDetails />
            </CCol>
          </CRow>
          <div className="completed">
            {appraisalForm.formStatus === 'CLOSED' ? (
              <CButton className="btn-bg-closed ng-hide">
                Review form was closed by HR Department.
              </CButton>
            ) : (
              ''
            )}
            {appraisalForm.formStatus === 'COMPLETED' ? (
              <CButton className="btn-success">
                Review Process Completed.
              </CButton>
            ) : (
              ''
            )}
          </div>
        </>
      ) : (
        <OLoadingSpinner type={LoadingType.PAGE} />
      )}
    </>
  )
}

export default AppraisalForm
