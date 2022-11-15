import {
  CButton,
  CCol,
  CForm,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import { TextDanger, TextWhite } from '../../../constant/ClassName'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ckeditorConfig } from '../../../utils/ckEditorUtils'
import { SubmitResignationTypes } from '../../../types/Separation/SubmitViewResignation/submitResignationTypes'
import OToast from '../../../components/ReusableComponent/OToast'

const SubmitResignationFilterOptions = (): JSX.Element => {
  const [primaryReason, setPrimaryReason] = useState<string>('')
  const initialSubmitResignation = {} as SubmitResignationTypes
  const [submitResignation, setSubmitResignation] = useState(
    initialSubmitResignation,
  )
  const [isSubmitButtonEnabled, setIsSubmitButtonEnabled] = useState(false)
  const [isClearButtonEnabled, setIsClearButtonEnabled] = useState(false)
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const getSeparation = useTypedSelector(
    reduxServices.submitViewResignation.selectors.separationForm,
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.submitViewResignation.getSeparationFormResponse())
  }, [dispatch])

  const handleDescription = (employeeComments: string) => {
    setSubmitResignation((prevState) => {
      return { ...prevState, ...{ employeeComments } }
    })
  }

  const handleClearDetails = () => {
    setPrimaryReason('')
    setShowEditor(false)
    setTimeout(() => {
      setShowEditor(true)
    }, 100)
    setSubmitResignation({
      employeeComments: '',
    })
  }

  useEffect(() => {
    if (primaryReason && submitResignation?.employeeComments) {
      setIsSubmitButtonEnabled(true)
    } else {
      setIsSubmitButtonEnabled(false)
    }
  }, [primaryReason, submitResignation?.employeeComments])

  useEffect(() => {
    if (primaryReason || submitResignation?.employeeComments) {
      setIsClearButtonEnabled(true)
    } else {
      setIsClearButtonEnabled(false)
    }
  }, [primaryReason, submitResignation?.employeeComments])

  const successToastMessage = (
    <OToast
      toastMessage="Resignation applied successfully."
      toastColor="success"
    />
  )

  const handleSubmitResignation = async () => {
    const submitResignationResultAction = await dispatch(
      reduxServices.submitViewResignation.submitResignation({
        adminCcCss: null,
        canberevoked: null,
        certificate: null,
        certificateDTO: null,
        contractEndDate: null,
        contractExists: false,
        contractStartDate: null,
        empStatus: null,
        employeeComments: submitResignation?.employeeComments,
        employeeId: getSeparation?.form?.employeeId,
        employeeName: getSeparation?.form?.employeeName,
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
        primaryReasonId: primaryReason,
        primaryReasonName: null,
        reasonComments: '',
        relievingDate: null,
        relievingLetterPath: null,
        resignationDate: getSeparation?.form?.resignationDate,
        separationComments: null,
        separationExist: false,
        separationId: null,
        seperationComments: null,
        showCommentsBox: null,
        showEditButton: null,
        showManagerClearance: null,
        showTimeline: null,
        status: null,
        withdrawComments: null,
      }),
    )
    if (
      reduxServices.submitViewResignation.submitResignation.fulfilled.match(
        submitResignationResultAction,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(successToastMessage))
    } else if (
      reduxServices.submitViewResignation.submitResignation.rejected.match(
        submitResignationResultAction,
      ) &&
      submitResignationResultAction.payload === 408
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="danger"
            toastMessage="            
            You can't resgin after 7 or You can't resgin on holidays"
          />,
        ),
      )
    }
    setPrimaryReason('')
    setShowEditor(false)
    setTimeout(() => {
      setShowEditor(true)
    }, 100)
    setSubmitResignation({
      employeeComments: '',
    })
  }

  return (
    <CForm>
      <CRow className="mt-3 mb-4">
        <CFormLabel className="col-sm-3 col-form-label text-end">
          Employee ID:
        </CFormLabel>
        <CCol sm={3}>
          <p>{getSeparation?.form?.employeeId}</p>
        </CCol>
      </CRow>
      <CRow className="mt-3 mb-4">
        <CFormLabel className="col-sm-3 col-form-label text-end">
          Employee Name:
        </CFormLabel>
        <CCol sm={3}>
          <p>{getSeparation?.form?.employeeName}</p>
        </CCol>
      </CRow>
      <CRow className="mt-3 mb-4">
        <CFormLabel className="col-sm-3 col-form-label text-end">
          Resignation Date:
        </CFormLabel>
        <CCol sm={3}>
          <p>{getSeparation?.form?.resignationDate}</p>
        </CCol>
      </CRow>

      <CRow className="mt-3 mb-4">
        <CFormLabel className="col-sm-3 col-form-label text-end">
          Primary Reason:
          <span className={primaryReason ? TextWhite : TextDanger}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            aria-label="Default select example"
            name="primaryReason"
            id="primaryReason"
            value={primaryReason}
            onChange={(e) => {
              setPrimaryReason(e.target.value)
            }}
          >
            <option value={''}>Select</option>
            {getSeparation?.lookup?.map((reasonItem, index) => (
              <option key={index} value={reasonItem?.reasonId}>
                {reasonItem?.reasonName}
              </option>
            ))}
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel className="col-sm-3 col-form-label text-end pe-18">
          Comments :
          <span
            className={
              submitResignation?.employeeComments ? TextWhite : TextDanger
            }
          >
            *
          </span>
        </CFormLabel>
        {showEditor ? (
          <CCol sm={8}>
            <CKEditor<{
              onChange: CKEditorEventHandler<'change'>
            }>
              initData={submitResignation?.employeeComments}
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
            onClick={handleSubmitResignation}
          >
            Submit
          </CButton>
          <CButton
            color="warning "
            className="btn-ovh"
            disabled={!isClearButtonEnabled}
            onClick={handleClearDetails}
          >
            Clear
          </CButton>
        </CCol>
      </CRow>
    </CForm>
  )
}

export default SubmitResignationFilterOptions
