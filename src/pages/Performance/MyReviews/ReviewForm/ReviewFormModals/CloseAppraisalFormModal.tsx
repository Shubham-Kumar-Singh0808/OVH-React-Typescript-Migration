import {
  CCol,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CModalFooter,
  CButton,
} from '@coreui/react-pro'
import React, { useMemo } from 'react'
import { TextDanger, TextWhite } from '../../../../../constant/ClassName'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import { reduxServices } from '../../../../../reducers/reduxServices'

const CloseAppraisalFormModal = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const closedStatus = useTypedSelector(
    (state) => state.myReview.appraisalForm.closedStatus,
  )
  const closedSummary = useTypedSelector(
    (state) => state.myReview.appraisalForm.closedSummary,
  )

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
          />
        </div>
      </div>
      <CModalFooter>
        <CButton data-testid="modalConfirmBtn" color="warning btn-ovh">
          Submit
        </CButton>
        <CButton color="success btn-ovh">Cancel</CButton>
      </CModalFooter>
    </>
  )
}

export default CloseAppraisalFormModal
