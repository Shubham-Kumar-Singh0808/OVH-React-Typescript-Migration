import { CForm, CRow, CFormLabel, CCol, CButton } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import { TextDanger, TextWhite } from '../../../constant/ClassName'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ckeditorConfig } from '../../../utils/ckEditorUtils'
import OToast from '../../../components/ReusableComponent/OToast'

const EmployeeViewFilterOptions = ({
  setToggle,
}: {
  setToggle: (value: string) => void
}): JSX.Element => {
  const [comments, setComments] = useState<string>('')
  const [isSubmitButtonEnabled, setIsSubmitButtonEnabled] = useState(false)
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const getResignationViewResponse = useTypedSelector(
    reduxServices.submitViewResignation.selectors.resignationView,
  )
  const handleDescription = (comments: string) => {
    setComments(comments)
  }

  useEffect(() => {
    if (comments) {
      setIsSubmitButtonEnabled(true)
    } else {
      setIsSubmitButtonEnabled(false)
    }
  }, [comments])

  const handleClearDetails = () => {
    setShowEditor(false)
    setTimeout(() => {
      setShowEditor(true)
    }, 100)
    setComments('')
  }
  const dispatch = useAppDispatch()
  const successToastMessage = (
    <OToast
      toastMessage="Resignation Withdrawn Successfully"
      toastColor="success"
    />
  )
  const handleRevokeResignation = async () => {
    const submitRevokeResultAction = await dispatch(
      reduxServices.submitViewResignation.revokeResignation({
        adminCcCss: null,
        canberevoked: null,
        certificate: null,
        certificateDTO: null,
        contractEndDate: null,
        contractExists: null,
        contractStartDate: null,
        empStatus: null,
        employeeComments: null,
        employeeId: null,
        employeeName: null,
        exitFeedbackFormPath: null,
        finanaceCcCss: null,
        hrCcCss: null,
        initiatedDate: null,
        isPIP: null,
        isRevoked: null,
        isprocessInitiated: null,
        itCcCss: null,
        managerCcCss: null,
        managerComments: null,
        managerName: null,
        personalEmailFlag: null,
        pipAuditDTO: null,
        primaryReasonId: null,
        primaryReasonName: null,
        reasonComments: null,
        relievingDate: getResignationViewResponse.relievingDate,
        relievingLetterPath: null,
        resignationDate: null,
        separationComments: null,
        separationExist: null,
        separationId: getResignationViewResponse.separationId,
        seperationComments: null,
        showCommentsBox: null,
        showEditButton: null,
        showManagerClearance: null,
        showTimeline: null,
        status: getResignationViewResponse.status,
        withdrawComments: comments,
      }),
    )
    if (
      reduxServices.submitViewResignation.revokeResignation.fulfilled.match(
        submitRevokeResultAction,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(successToastMessage))
      setToggle('submitResignation')
    }
  }

  return (
    <>
      <CForm>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Status:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{getResignationViewResponse?.status}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Employee Name:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{getResignationViewResponse?.relievingDate}</p>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end pe-18">
            Comments :
            <span className={comments ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          {showEditor ? (
            <CCol sm={8}>
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData={comments}
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  handleDescription(editor.getData().trim())
                }}
              />
            </CCol>
          ) : (
            ''
          )}
        </CRow>
        <CRow>
          <CCol md={{ span: 6, offset: 3 }}>
            <CButton
              className="btn-ovh me-1"
              color="success"
              disabled={!isSubmitButtonEnabled}
              onClick={handleRevokeResignation}
            >
              Submit
            </CButton>
            <CButton
              color="warning "
              className="btn-ovh"
              disabled={!isSubmitButtonEnabled}
              onClick={handleClearDetails}
            >
              Clear
            </CButton>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default EmployeeViewFilterOptions
