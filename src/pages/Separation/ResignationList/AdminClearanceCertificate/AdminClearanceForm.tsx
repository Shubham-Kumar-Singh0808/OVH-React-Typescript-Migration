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
import OToast from '../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

const AdminClearanceForm = (): JSX.Element => {
  const [isActiveAdminValue, setIsActiveAdminValue] = useState<string>('false')
  const [adminTextAreaValue, setTextAreaValues] = useState<string>('')
  const dispatch = useAppDispatch()
  const getAllAdminResignationHistory = useTypedSelector(
    reduxServices.resignationList.selectors.resignationTimeLine,
  )

  const successToastMessage = (
    <OToast
      toastMessage="CC Details Submitted Successfully"
      toastColor="success"
    />
  )

  const SubmitAdminClearanceCertificateHandler = async () => {
    const addTemplateTypeResultAction = await dispatch(
      reduxServices.resignationList.submitClearanceCertificate({
        addedBy: 'Admin',
        comments: adminTextAreaValue,
        employeeId: getAllAdminResignationHistory?.employeeId,
        employeeName: getAllAdminResignationHistory?.employeeName,
        isDue: isActiveAdminValue,
        seperationId: getAllAdminResignationHistory.separationId,
      }),
    )
    if (
      reduxServices.resignationList.submitClearanceCertificate.fulfilled.match(
        addTemplateTypeResultAction,
      )
    ) {
      dispatch(
        reduxServices.resignationList.getClearanceDetails({
          separationId: getAllAdminResignationHistory.separationId,
          submittedBy: 'Admin',
        }),
      )
      dispatch(reduxServices.app.actions.addToast(successToastMessage))
    }
  }

  const ClearAdminButtonHandler = () => {
    setIsActiveAdminValue('false')
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
            <p className="mb-0">{getAllAdminResignationHistory?.employeeId}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1 pe-3">
            Employee Name:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">
              {getAllAdminResignationHistory?.employeeName}
            </p>
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
              checked={isActiveAdminValue === 'true'}
              onChange={(e) => setIsActiveAdminValue(e.target.value)}
            />
            <CFormCheck
              inline
              type="radio"
              name="No"
              id="No"
              data-testId="due-test"
              value="false"
              label="No"
              checked={isActiveAdminValue === 'false'}
              onChange={(e) => setIsActiveAdminValue(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1 sh-clearance">
            Comments:
            <span
              className={
                isActiveAdminValue === 'false' ||
                adminTextAreaValue?.replace(/^\s*/, '')
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
              value={adminTextAreaValue}
              onChange={(e) => setTextAreaValues(e.target.value)}
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
                onClick={SubmitAdminClearanceCertificateHandler}
                disabled={
                  isActiveAdminValue === 'true' &&
                  adminTextAreaValue?.replace(/^\s*/, '') === ''
                }
              >
                Submit
              </CButton>
              <CButton
                color="warning "
                data-testid="clearBtn"
                className="btn-ovh"
                onClick={ClearAdminButtonHandler}
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

export default AdminClearanceForm
