import {
  CForm,
  CRow,
  CFormLabel,
  CCol,
  CButton,
  CFormTextarea,
  CFormCheck,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

const ManagerClearenceForm = (): JSX.Element => {
  const [isActive, setIsActive] = useState<string>('false')
  const [textArea, setTextArea] = useState<string>('')

  const getAllResignationHistory = useTypedSelector(
    reduxServices.resignationList.selectors.resignationTimeLine,
  )

  const getAllResignationList = useTypedSelector(
    reduxServices.resignationList.selectors.resignationListDetails,
  )
  const dispatch = useAppDispatch()

  const SubmitClearenceCertificateHandler = async () => {
    const addTemplateTypeResultAction = await dispatch(
      reduxServices.resignationList.submitClearenceCertificate({
        addedBy: 'Manager',
        comments: textArea,
        employeeId: getAllResignationHistory?.employeeId,
        employeeName: getAllResignationHistory?.employeeName,
        isDue: isActive,
        seperationId: getAllResignationHistory.separationId,
      }),
    )
    if (
      reduxServices.resignationList.submitClearenceCertificate.fulfilled.match(
        addTemplateTypeResultAction,
      )
    ) {
      dispatch(
        reduxServices.resignationList.getClearanceDetails({
          separationId: getAllResignationHistory.separationId,
          submittedBy: 'Manager',
        }),
      )
      dispatch(reduxServices.resignationList.actions.toggle('ClearenceDetails'))
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
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Employee ID:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{getAllResignationHistory?.employeeId}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Employee Name:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{getAllResignationHistory?.employeeName}</p>
          </CCol>
        </CRow>

        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
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
              data-testId="workfromhome"
              value="false"
              label="No"
              checked={isActive === 'false'}
              onChange={(e) => setIsActive(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Comments:
          </CFormLabel>
          <CCol sm={5}>
            <CFormTextarea
              placeholder="Purpose"
              aria-label="textarea"
              id="textArea"
              name="textArea"
              value={textArea}
              onChange={(e) => setTextArea(e.target.value)}
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
                onClick={SubmitClearenceCertificateHandler}
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

export default ManagerClearenceForm
