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
import OToast from '../../../../components/ReusableComponent/OToast'

const ManagerClearanceForm = (): JSX.Element => {
  const [isActive, setIsActive] = useState<string>('false')
  const [textArea, setTextArea] = useState<string>('')
  const dispatch = useAppDispatch()
  const getAllResignationHistory = useTypedSelector(
    reduxServices.resignationList.selectors.resignationTimeLine,
  )

  const successToastMessage = (
    <OToast
      toastMessage="CC details submitted Successfully."
      toastColor="success"
    />
  )

  const SubmitClearanceCertificateHandler = async () => {
    const addTemplateTypeResultAction = await dispatch(
      reduxServices.resignationList.submitClearanceCertificate({
        addedBy: 'Manager',
        comments: textArea,
        employeeId: getAllResignationHistory?.employeeId,
        employeeName: getAllResignationHistory?.employeeName,
        isDue: isActive,
        seperationId: getAllResignationHistory.separationId,
      }),
    )
    if (
      reduxServices.resignationList.submitClearanceCertificate.fulfilled.match(
        addTemplateTypeResultAction,
      )
    ) {
      dispatch(
        reduxServices.resignationList.getClearanceDetails({
          separationId: getAllResignationHistory.separationId,
          submittedBy: 'Manager',
        }),
      )
      dispatch(reduxServices.app.actions.addToast(successToastMessage))
    }
  }

  const ClearButtonHandler = () => {
    setIsActive('false')
    setTextArea('')
  }
  return (
    <>
      <CForm>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1 pe-3">
            Employee ID:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{getAllResignationHistory?.employeeId}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1 pe-3">
            Employee Name:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{getAllResignationHistory?.employeeName}</p>
          </CCol>
        </CRow>

        <CRow className="mt-1 mb-3 align-items-center">
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
              checked={isActive === 'true'}
              onChange={(e) => setIsActive(e.target.value)}
            />
            <CFormCheck
              inline
              type="radio"
              name="No"
              id="No"
              data-testId="due-test"
              value="false"
              label="No"
              checked={isActive === 'false'}
              onChange={(e) => setIsActive(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1 sh-clearance">
            Comments:
            <span
              className={
                isActive === 'false' || textArea?.replace(/^\s*/, '')
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
              value={textArea}
              onChange={(e) => setTextArea(e.target.value)}
            ></CFormTextarea>
          </CCol>
        </CRow>
        <CRow className="mb-4 mt-3">
          <CCol md={{ span: 6, offset: 3 }}>
            <>
              <CButton
                className="btn-ovh me-1"
                data-testid="confirmBtn"
                color="success"
                onClick={SubmitClearanceCertificateHandler}
                disabled={
                  isActive === 'true' && textArea?.replace(/^\s*/, '') === ''
                }
              >
                Submit
              </CButton>
              <CButton
                color="warning "
                data-testid="clearBtn"
                className="btn-ovh"
                onClick={ClearButtonHandler}
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

export default ManagerClearanceForm
