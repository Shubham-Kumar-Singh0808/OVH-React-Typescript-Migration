import React, { useEffect, useMemo } from 'react'
import { CFormText, CRow, CCol, CButton } from '@coreui/react-pro'
import ReviewFormKRATable from './ReviewFormKRATable/ReviewFormKRATable'
import ReviewFormButtons from './ReviewFormButtons/ReviewFormButtons'
import EmployeeDiscussionInput from './ReviewFormEmployeeComponents/EmployeeDiscussionInput'
import RequestDiscussionTimeline from './ReviewFormEmployeeComponents/RequestDiscussionTimeline'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { TextDanger } from '../../../../constant/ClassName'
import {
  MyReviewAppraisalFormStatus,
  MyReviewFormStatus,
} from '../../../../types/Performance/MyReview/myReviewTypes'
import { reduxServices } from '../../../../reducers/reduxServices'
import {
  checkIfEmployeeSubmitButtonIsEnabled,
  checkIfManagerSubmitButtonIsEnabled,
  generateMyReviewTestId,
} from '../MyReviewHelpers'
import OModal from '../../../../components/ReusableComponent/OModal'

/* This component is shared by both manager and the employee roles. */

const EmployeeReviewForm = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const apiError = useTypedSelector((state) => state.myReview.error)
  const isLoading = useTypedSelector((state) => state.myReview.isLoading)
  const appraisalForm = useTypedSelector(
    (state) => state.myReview.appraisalForm,
  )
  // const currentLoggedInEmployee = useTypedSelector(
  //   (state) => state.authentication.authenticatedUser.employeeId,
  // )
  const requestDiscussionEmployee = useTypedSelector(
    (state) => state.myReview.appraisalForm.requestDiscussion,
  )
  const myReviewFormStatus = useTypedSelector(
    (state) => state.myReview.myReviewFormStatus,
  )
  // used to differentiate between employee and manager
  const appraisalFormStatusEmpManager = useTypedSelector(
    (state) => state.myReview.appraisalForm.appraisalFormStatus,
  )
  const myReviewModal = useTypedSelector((state) => state.myReview.modal)

  useEffect(() => {
    // only if request for discussion, we call this api to fetch the documents
    if (appraisalForm.requestDiscussion) {
      dispatch(reduxServices.myReview.getReviewCommentsThunk(appraisalForm.id))
    }
  }, [appraisalForm.requestDiscussion])

  // initially when api comes, the form status is stored in the redux state
  useEffect(() => {
    const appraisalFormStatus = appraisalForm.formStatus
    if (appraisalFormStatus === MyReviewFormStatus.saveForEmployee.toString()) {
      dispatch(
        reduxServices.myReview.actions.setMyReviewFormStatus(
          MyReviewFormStatus.saveForEmployee,
        ),
      )
    } else if (
      appraisalFormStatus === MyReviewFormStatus.submitForEmployee.toString()
    ) {
      dispatch(
        reduxServices.myReview.actions.setMyReviewFormStatus(
          MyReviewFormStatus.submitForEmployee,
        ),
      )
    } else if (appraisalFormStatus === MyReviewFormStatus.pending.toString()) {
      dispatch(
        reduxServices.myReview.actions.setMyReviewFormStatus(
          MyReviewFormStatus.pending,
        ),
      )
    } else if (
      appraisalFormStatus === MyReviewFormStatus.pendingagreement.toString()
    ) {
      dispatch(
        reduxServices.myReview.actions.setMyReviewFormStatus(
          MyReviewFormStatus.pendingagreement,
        ),
      )
    } else if (
      appraisalFormStatus === MyReviewFormStatus.openForDiscussion.toString()
    ) {
      dispatch(
        reduxServices.myReview.actions.setMyReviewFormStatus(
          MyReviewFormStatus.openForDiscussion,
        ),
      )
    } else if (
      appraisalFormStatus === MyReviewFormStatus.completed.toString()
    ) {
      dispatch(
        reduxServices.myReview.actions.setMyReviewFormStatus(
          MyReviewFormStatus.completed,
        ),
      )
    }
  }, [appraisalForm.formStatus])

  // implementing the logic to enable or disable the button whenever the user changes something
  useEffect(() => {
    dispatch(
      reduxServices.myReview.actions.setEmployeeSubmitButtonEnabled(
        checkIfEmployeeSubmitButtonIsEnabled(appraisalForm.kra),
      ),
    )
    dispatch(
      reduxServices.myReview.actions.setManagerSubmitButtonEnabled(
        checkIfManagerSubmitButtonIsEnabled(appraisalForm.kra),
      ),
    )
  }, [appraisalForm.kra])

  const modalVisibleHandler = (value: boolean) => {
    dispatch(reduxServices.myReview.actions.setDisplayModal(value))
  }

  // checking if the employee who is logged in is the same of whose review is being shown
  const isItTheSameEmployee = useMemo(() => {
    const currentLoggedInEmployee = localStorage.getItem('employeeId')
    if (currentLoggedInEmployee) {
      return +currentLoggedInEmployee === appraisalForm.employee.id
    }
    return false
  }, [appraisalForm.employee.id])

  return (
    <>
      {apiError === null && (
        <>
          <ReviewFormKRATable appraisalForm={appraisalForm} />
          <CRow>
            <CCol className="col-md-3 offset-md-4">
              <ReviewFormButtons />
            </CCol>
          </CRow>
          <hr />
          {
            // shown only when discussion request is raised by employee
            requestDiscussionEmployee === true && (
              <div>
                {
                  // must be visible only to the employee until the employee agrees
                  isItTheSameEmployee &&
                    myReviewFormStatus !== MyReviewFormStatus.completed && (
                      <EmployeeDiscussionInput />
                    )
                }
                <RequestDiscussionTimeline />
              </div>
            )
          }
          {myReviewFormStatus === MyReviewFormStatus.completed && (
            <CRow className="justify-content-center">
              <CCol sm={4}>
                <CButton
                  data-testid={generateMyReviewTestId('reviewCompletedBtn')}
                  className="mt-4 text-white p-2"
                  style={{ backgroundColor: '#5cb85c' }}
                >
                  Review Process Completed
                </CButton>
              </CCol>
            </CRow>
          )}
          <OModal
            visible={myReviewModal?.showModal}
            setVisible={modalVisibleHandler}
            confirmButtonText={myReviewModal?.confirmBtnText}
            cancelButtonText={myReviewModal?.cancelBtnText}
            modalFooterClass={myReviewModal?.modalFooterClass}
            modalHeaderClass={myReviewModal?.modalHeaderClass}
            confirmButtonAction={myReviewModal?.confirmBtnAction}
          >
            {myReviewModal?.description}
          </OModal>
        </>
      )}
      {apiError === 406 && isLoading === ApiLoadingState.failed && (
        // user is not allowed as he/she is on probationary period - 406 == not acceptable
        <CFormText className={TextDanger}>Probationay Error</CFormText>
      )}
    </>
  )
}

export default EmployeeReviewForm
