import { CRow, CCol, CButton, CFormLabel, CForm } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import OCard from '../../../../components/ReusableComponent/OCard'
import OToast from '../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

const EmployeePIPClearenceCertificate = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const [uploadExitFeedbackForm, setUploadExitFeedbackForm] = useState<
    File | undefined
  >(undefined)
  const [uploadRelievingLetter, setUploadRelievingLetter] = useState<
    File | undefined
  >(undefined)
  const [isSubmitBtn, setIsSubmitBtn] = useState(false)
  const [clearFileRelievingLetter, setClearFileRelievingLetter] =
    useState<string>('')
  const [clearFileExitFeedbackForm, setClearFileExitFeedbackForm] =
    useState<string>('')

  const onChangeExitFeedBackFormEventHandler = (element: HTMLInputElement) => {
    const file = element.files
    if (!file) return
    setUploadExitFeedbackForm(file[0])
    setClearFileExitFeedbackForm(element.value)
  }
  const onChangeUploadRelievingLetterEventHandler = (
    element: HTMLInputElement,
  ) => {
    const file = element.files
    if (!file) return
    setUploadRelievingLetter(file[0])
    setClearFileRelievingLetter(element.value)
  }
  useEffect(() => {
    if (uploadExitFeedbackForm && uploadRelievingLetter) {
      setIsSubmitBtn(true)
    } else {
      setIsSubmitBtn(false)
    }
  }, [uploadExitFeedbackForm, uploadRelievingLetter])

  const clearButtonHandler = () => {
    setUploadExitFeedbackForm(undefined)
    setUploadRelievingLetter(undefined)
    setClearFileRelievingLetter('')
    setClearFileExitFeedbackForm('')
  }

  const viewEmployeePipDetails = useTypedSelector(
    reduxServices.pipList.selectors.viewEmployeePipDetails,
  )

  const handleSubmitExitFeedBackForm = async () => {
    const feedBackFormResultAction = await dispatch(
      reduxServices.pipList.savePIPClearnceCertificate(
        viewEmployeePipDetails.empId,
      ),
    )
    if (uploadExitFeedbackForm) {
      const formData = new FormData()
      formData.append(
        'file',
        uploadExitFeedbackForm,
        uploadExitFeedbackForm.name,
      )
      const exitFeedBackFormIdParams = feedBackFormResultAction.payload
      const prepareObject = {
        exitFormId: exitFeedBackFormIdParams as number,
        file: formData,
      }
      dispatch(
        reduxServices.resignationList.uploadRelievingLetter(prepareObject),
      )
    }
    if (uploadRelievingLetter) {
      const formData = new FormData()
      formData.append('file', uploadRelievingLetter, uploadRelievingLetter.name)
      const exitFeedBackFormIdIdParams = feedBackFormResultAction.payload
      const uploadPrepareObject = {
        exitFeedBackFormId: exitFeedBackFormIdIdParams as number,
        file: formData,
      }
      dispatch(
        reduxServices.resignationList.uploadExitFeedBackFile(
          uploadPrepareObject,
        ),
      )
    }
    history.push('/PIPList')
    if (
      reduxServices.pipList.savePIPClearnceCertificate.fulfilled.match(
        feedBackFormResultAction,
      )
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Exit form added Successfully"
          />,
        ),
      )
    }
  }

  return (
    <>
      {' '}
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Exit FeedBack Form"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CForm>
          <CRow className="justify-content-end">
            <CCol className="text-end" md={4}>
              <Link to={`/PIPList`}>
                <CButton
                  color="info"
                  className="btn-ovh me-1"
                  data-testid="back-btn"
                >
                  <i className="fa fa-arrow-left  me-1"></i>Back
                </CButton>
              </Link>
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="col-sm-3 col-form-label text-end p-1">
              Employee ID:
            </CFormLabel>
            <CCol sm={3}>
              <p className="mb-0">{viewEmployeePipDetails.empId}</p>
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="col-sm-3 col-form-label text-end p-1">
              Employee Name:
            </CFormLabel>
            <CCol sm={3}>
              <p className="mb-0">{viewEmployeePipDetails.employeeName}</p>
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="col-sm-3 col-form-label text-end p-1">
              Upload Exit Feedback Form :
              <span
                className={
                  uploadExitFeedbackForm ? 'text-white' : 'text-danger'
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <input
                className="sh-updateTicket-file"
                type="file"
                data-testid="file-upload"
                id="fileUpload"
                value={clearFileExitFeedbackForm}
                onChange={(element: React.SyntheticEvent) =>
                  onChangeExitFeedBackFormEventHandler(
                    element.currentTarget as HTMLInputElement,
                  )
                }
              />
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="col-sm-3 col-form-label text-end p-1">
              Upload Relieving Letter :
              <span
                className={uploadRelievingLetter ? 'text-white' : 'text-danger'}
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <input
                className="sh-updateTicket-file"
                type="file"
                data-testid="relievingFile-upload"
                id="fileUpload"
                value={clearFileRelievingLetter}
                onChange={(element: React.SyntheticEvent) =>
                  onChangeUploadRelievingLetterEventHandler(
                    element.currentTarget as HTMLInputElement,
                  )
                }
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol md={{ span: 6, offset: 3 }}>
              <>
                <CButton
                  className="btn-ovh me-1"
                  data-testid="create-btn"
                  color="success"
                  disabled={!isSubmitBtn}
                  onClick={handleSubmitExitFeedBackForm}
                >
                  Submit
                </CButton>
                <CButton
                  color="warning "
                  data-testid="clear-btn"
                  className="btn-ovh"
                  onClick={clearButtonHandler}
                >
                  Clear
                </CButton>
              </>
            </CCol>
          </CRow>
        </CForm>
      </OCard>
    </>
  )
}

export default EmployeePIPClearenceCertificate
