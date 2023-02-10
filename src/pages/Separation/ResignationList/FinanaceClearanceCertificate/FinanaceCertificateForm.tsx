import {
  CForm,
  CRow,
  CFormLabel,
  CCol,
  CButton,
  CFormTextarea,
  CFormCheck,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

const FinanceCertificateForm = (): JSX.Element => {
  const [isActiveValues, setIsActiveValues] = useState<string>('false')
  const [textAreaValues, setTextAreaValues] = useState<string>('')
  const dispatch = useAppDispatch()
  const getAllFinanceResignationHistory = useTypedSelector(
    reduxServices.resignationList.selectors.resignationTimeLine,
  )

  const SubmitFinanceClearanceCertificateHandler = async () => {
    const addTemplateTypeResultAction = await dispatch(
      reduxServices.resignationList.submitClearanceCertificate({
        addedBy: 'Finance',
        comments: textAreaValues,
        employeeId: getAllFinanceResignationHistory?.employeeId,
        employeeName: getAllFinanceResignationHistory?.employeeName,
        isDue: isActiveValues,
        seperationId: getAllFinanceResignationHistory.separationId,
      }),
    )
    if (
      reduxServices.resignationList.submitClearanceCertificate.fulfilled.match(
        addTemplateTypeResultAction,
      )
    ) {
      dispatch(
        reduxServices.resignationList.getClearanceDetails({
          separationId: getAllFinanceResignationHistory.separationId,
          submittedBy: 'Finance',
        }),
      )
    }
  }

  const ClearFinanceButtonHandler = () => {
    setIsActiveValues('false')
    setTextAreaValues('')
  }
  return (
    <>
      <CForm>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1 pe-3">
            Employee ID:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">
              {getAllFinanceResignationHistory?.employeeId}
            </p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1 pe-3">
            Employee Name:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">
              {getAllFinanceResignationHistory?.employeeName}
            </p>
          </CCol>
        </CRow>

        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1 pe-3">
            Due:
          </CFormLabel>
          <CCol sm={3}>
            <CFormCheck
              inline
              type="radio"
              name="Yes"
              id="yes"
              data-testId="yes"
              value="true"
              label="Yes"
              defaultChecked
              checked={isActiveValues === 'true'}
              onChange={(e) => setIsActiveValues(e.target.value)}
            />
            <CFormCheck
              inline
              type="radio"
              name="No"
              id="No"
              data-testId="due-test"
              value="false"
              label="No"
              checked={isActiveValues === 'false'}
              onChange={(e) => setIsActiveValues(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1 pe-3">
            Comments:
            <span
              className={
                isActiveValues === 'false' || textAreaValues
                  ? 'text-white'
                  : 'text-danger'
              }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={6} className="w-500">
            <CFormTextarea
              aria-label="textarea"
              id="textArea"
              name="textArea"
              data-testid="text-area"
              value={textAreaValues}
              onChange={(e) => setTextAreaValues(e.target.value)}
            ></CFormTextarea>
          </CCol>
        </CRow>
        <CRow className="mt-5 mb-4">
          <CCol md={{ span: 6, offset: 3 }}>
            <>
              <CButton
                className="btn-ovh me-1"
                data-testid="confirmBtn"
                color="success"
                onClick={SubmitFinanceClearanceCertificateHandler}
                disabled={
                  isActiveValues === 'true' &&
                  textAreaValues?.replace(/^\s*/, '') === ''
                }
              >
                Submit
              </CButton>
              <CButton
                color="warning "
                data-testid="clearBtn"
                className="btn-ovh"
                onClick={ClearFinanceButtonHandler}
              >
                Clear
              </CButton>
            </>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default FinanceCertificateForm
