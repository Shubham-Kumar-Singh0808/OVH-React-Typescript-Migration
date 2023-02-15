import { CRow, CCol, CButton, CForm, CFormLabel } from '@coreui/react-pro'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import { eventListThunk } from '../../../../reducers/ConferenceRoomBooking/EventList/eventListSlice'
import { useAppDispatch } from '../../../../stateStore'

const UploadFeedbackForm = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { eventId } = useParams<{ eventId: string }>()
  const [uploadFeedbackForm, setUploadFeedbackForm] = useState<
    File | undefined
  >(undefined)
  const [isUploadBtnEnabled, setIsUploadBtnEnabled] = useState(false)
  const [uploadErrorText, setUploadErrorText] = useState<string>('')

  const formLabelProps = {
    htmlFor: 'inputUploadForm',
    className: 'col-form-label feedbackForm-label',
  }

  const onChangeFileUploadHandler = (element: HTMLInputElement) => {
    const file = element.files
    const acceptedFileTypes = ['pdf', 'doc', 'docx']
    let extension = ''
    if (!file) return
    if (file && file[0] !== undefined) {
      extension = file[0].name.split('.').pop() as string
    }
    if (file[0] !== undefined && file[0].size > 2048000) {
      setUploadErrorText('Please upload file lessthan 2MB.')
      return
    }
    if (!acceptedFileTypes.includes(extension)) {
      setUploadErrorText('Please choose doc or docx or pdf.')
      return
    }
    setIsUploadBtnEnabled(true)
    setUploadErrorText('')
    setUploadFeedbackForm(file[0])
  }

  useEffect(() => {
    if (uploadFeedbackForm) {
      setIsUploadBtnEnabled(true)
    } else {
      setIsUploadBtnEnabled(false)
    }
  })

  const handleUploadFeedbackForm = async () => {
    if (uploadFeedbackForm) {
      const formData = new FormData()
      formData.append('file', uploadFeedbackForm, uploadFeedbackForm.name)
      const uploadPrepareObject = {
        eventId: Number(eventId),
        file: formData,
      }
      await dispatch(eventListThunk.uploadFeedbackForm(uploadPrepareObject))
    }
    window.location.reload()
  }
  return (
    <>
      <CRow>
        <CCol xs={12} className="gap-2 d-md-flex justify-content-md-end pe-0">
          <Link to={`/eventList`}>
            <CButton color="info btn-ovh me-1" data-testid="back-btn">
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </Link>
        </CCol>
      </CRow>
      <CForm>
        <CRow className="mt-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Upload Feedback form:
            <span className={uploadFeedbackForm ? TextWhite : TextDanger}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <input
              className="mt-1"
              data-testid="feedback-form"
              type="file"
              name="upload-form"
              accept=".doc, .docx, .pdf"
              onChange={(element: SyntheticEvent) =>
                onChangeFileUploadHandler(
                  element.currentTarget as HTMLInputElement,
                )
              }
            />
            {uploadErrorText && (
              <div id="error" className="mt-1">
                <strong className="text-danger">{uploadErrorText}</strong>
              </div>
            )}
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CCol md={{ span: 6, offset: 3 }}>
            <CButton
              data-testid="upload-btn"
              className="btn-ovh me-1 text-white"
              color="success"
              disabled={!isUploadBtnEnabled}
              onClick={handleUploadFeedbackForm}
            >
              Upload
            </CButton>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default UploadFeedbackForm
