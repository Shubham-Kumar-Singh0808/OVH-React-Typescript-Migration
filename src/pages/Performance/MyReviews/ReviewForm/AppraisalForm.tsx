import React, { useEffect } from 'react'
import { CButton, CCol, CRow } from '@coreui/react-pro'
import ReviewFormTable from './ReviewFormTable'
import OLoadingSpinner from '../../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { LoadingType } from '../../../../types/Components/loadingScreenTypes'
import ReviewHistoryDetails from '../ReviewHistory/ReviewHistoryDetails'

const AppraisalForm = (): JSX.Element => {
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

  return (
    <>
      {isLoading !== ApiLoadingState.loading &&
      isReviewCommentsLoading !== ApiLoadingState.loading ? (
        <>
          <ReviewFormTable />
          <CRow className="mt-4">
            <CCol>
              <ReviewHistoryDetails />
            </CCol>
          </CRow>
          <div className="completed">
            {appraisalForm.formStatus === 'CLOSED' ? (
              <CButton
                className="btn-bg-closed ng-hide"
                ng-show="appraisalform.formStatus == 'CLOSED'"
              >
                Review form was closed by HR Department.
              </CButton>
            ) : (
              ''
            )}
            {appraisalForm.formStatus === 'COMPLETED' ? (
              <CButton
                className="btn-success"
                ng-show="appraisalform.formStatus == 'COMPLETED'"
              >
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
