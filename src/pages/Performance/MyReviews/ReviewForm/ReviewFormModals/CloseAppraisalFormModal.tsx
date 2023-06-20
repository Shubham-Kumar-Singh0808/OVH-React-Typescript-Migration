import {
  CCol,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CModalFooter,
  CButton,
} from '@coreui/react-pro'
import React, { useEffect, useMemo, useState } from 'react'
import { TextDanger, TextWhite } from '../../../../../constant/ClassName'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import { reduxServices } from '../../../../../reducers/reduxServices'
import {
  IncomingMyReviewAppraisalForm,
  MyReviewFormStatus,
} from '../../../../../types/Performance/MyReview/myReviewTypes'
import OToast from '../../../../../components/ReusableComponent/OToast'
import { generateMyReviewTestId } from '../../MyReviewHelpers'

const CloseAppraisalFormModal = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const appraisalForm = useTypedSelector(
    (state) => state.myReview.appraisalForm,
  )
  const closedStatus = useTypedSelector(
    (state) => state.myReview.appraisalForm.closedStatus,
  )
  const closedSummary = useTypedSelector(
    (state) => state.myReview.appraisalForm.closedSummary,
  )
  const [isSubmitButtonEnabled, setIsSubmitButtonEnabled] =
    useState<boolean>(false)

  const finalClosedStatus = useMemo(() => {
    return closedStatus === null ? '' : closedStatus
  }, [closedStatus])

  const finalClosedSummary = useMemo(() => {
    return closedSummary === null ? '' : closedSummary
  }, [closedSummary])

  const statusChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(reduxServices.myReview.actions.setClosedStatus(e.target.value))
  }

  const summaryChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(reduxServices.myReview.actions.setClosedSummary(e.target.value))
  }

  //shows red asterix if true
  const closeStatusAsterix = useMemo(() => {
    return finalClosedStatus === ''
  }, [finalClosedStatus])
  const summaryAsterix = useMemo(() => {
    return finalClosedSummary === ''
  }, [finalClosedSummary])

  useEffect(() => {
    if (closeStatusAsterix || summaryAsterix) {
      setIsSubmitButtonEnabled(false)
    } else {
      setIsSubmitButtonEnabled(true)
    }
  }, [closeStatusAsterix, summaryAsterix])

  const submitButtonHandler = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    const finalData: IncomingMyReviewAppraisalForm = {
      ...appraisalForm,
      formStatus: MyReviewFormStatus.completed,
    }
    const result = await dispatch(
      reduxServices.myReview.closeAppraisalFormThunk(finalData),
    )
    if (
      reduxServices.myReview.closeAppraisalFormThunk.fulfilled.match(result)
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Appraisal Form Closed Successfully"
          />,
        ),
      )
      window.location.href = '/listofAppraisal'
    }
  }

  const cancelButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(reduxServices.myReview.actions.setDisplayModal(false))
  }

  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center mb-2">
          <CCol sm={3}>
            <CFormLabel className="text-info">
              Closed Status:{' '}
              <span className={closeStatusAsterix ? TextDanger : TextWhite}>
                *
              </span>
            </CFormLabel>
          </CCol>
          <CCol sm={5}>
            <CFormSelect
              value={finalClosedStatus}
              onChange={statusChangeHandler}
              data-testid={generateMyReviewTestId('delManagerStatusInp')}
            >
              <option value="">Select</option>
              <option value="Relieved">Relieved</option>
            </CFormSelect>
          </CCol>
        </div>
        <div className="d-flex flex-column">
          <CFormLabel className="text-info">
            Closed Summary:{' '}
            <span className={summaryAsterix ? TextDanger : TextWhite}>*</span>
          </CFormLabel>
          <CFormTextarea
            value={finalClosedSummary}
            onChange={summaryChangeHandler}
            data-testid={generateMyReviewTestId('delManagerSummaryInp')}
          />
        </div>
      </div>
      <CModalFooter className="mt-2">
        <CButton
          data-testid={generateMyReviewTestId('delManagerFinalSubmitBtn')}
          color="warning btn-ovh"
          disabled={!isSubmitButtonEnabled}
          onClick={submitButtonHandler}
        >
          Submit
        </CButton>
        <CButton
          color="success btn-ovh"
          onClick={cancelButtonHandler}
          data-testid={generateMyReviewTestId('delManagerCancelModalBtn')}
        >
          Cancel
        </CButton>
      </CModalFooter>
    </>
  )
}

export default CloseAppraisalFormModal
