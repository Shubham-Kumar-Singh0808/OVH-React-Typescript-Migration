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

const HRClearanceCertificateForm = (): JSX.Element => {
  const [hrIsActive, setIsHrActive] = useState<string>('false')
  const [hrTextArea, setHrTextArea] = useState<string>('')
  const dispatch = useAppDispatch()
  const getAllHRResignationHistory = useTypedSelector(
    reduxServices.resignationList.selectors.resignationTimeLine,
  )

  const successToastMessage = (
    <OToast
      toastMessage="CC details submitted Successfully."
      toastColor="success"
    />
  )

  const SubmitHRClearanceCertificateHandler = async () => {
    const addTemplateTypeResultAction = await dispatch(
      reduxServices.resignationList.submitClearanceCertificate({
        addedBy: 'HR',
        comments: hrTextArea,
        employeeId: getAllHRResignationHistory?.employeeId,
        employeeName: getAllHRResignationHistory?.employeeName,
        isDue: hrIsActive,
        seperationId: getAllHRResignationHistory.separationId,
      }),
    )
    if (
      reduxServices.resignationList.submitClearanceCertificate.fulfilled.match(
        addTemplateTypeResultAction,
      )
    ) {
      dispatch(
        reduxServices.resignationList.getClearanceDetails({
          separationId: getAllHRResignationHistory.separationId,
          submittedBy: 'HR',
        }),
      )
      dispatch(reduxServices.app.actions.addToast(successToastMessage))
    }
  }

  const ClearHRButtonHandler = () => {
    setIsHrActive('false')
    setHrTextArea('')
  }
  return (
    <>
      <CForm>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1 pe-3">
            Employee ID:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{getAllHRResignationHistory?.employeeId}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1 pe-3">
            Employee Name:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{getAllHRResignationHistory?.employeeName}</p>
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
              checked={hrIsActive === 'true'}
              onChange={(e) => setIsHrActive(e.target.value)}
            />
            <CFormCheck
              inline
              type="radio"
              name="No"
              id="No"
              data-testId="due-test"
              value="false"
              label="No"
              checked={hrIsActive === 'false'}
              onChange={(e) => setIsHrActive(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1 sh-clearance">
            Comments:
            <span
              className={
                hrIsActive === 'false' || hrTextArea
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
              value={hrTextArea}
              onChange={(e) => setHrTextArea(e.target.value)}
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
                onClick={SubmitHRClearanceCertificateHandler}
                disabled={
                  hrIsActive === 'true' &&
                  hrTextArea?.replace(/^\s*/, '') === ''
                }
              >
                Submit
              </CButton>
              <CButton
                color="warning "
                data-testid="clearBtn"
                className="btn-ovh"
                onClick={ClearHRButtonHandler}
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

export default HRClearanceCertificateForm
