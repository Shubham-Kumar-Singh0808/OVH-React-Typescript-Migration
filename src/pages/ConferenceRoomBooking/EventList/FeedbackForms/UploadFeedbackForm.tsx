import { CRow, CCol, CButton, CForm, CFormLabel } from '@coreui/react-pro'
import React from 'react'
import { Link } from 'react-router-dom'
import { showIsRequired } from '../../../../utils/helper'

const UploadFeedbackForm = (): JSX.Element => {
  const formLabelProps = {
    htmlFor: 'inputUploadForm',
    className: 'col-form-label feedbackForm-label',
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
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Upload Feedback form:
            <span className="text-danger">*</span>
            {/* <span className={showIsRequired(addHoliday?.name)}>*</span> */}
          </CFormLabel>
          <CCol sm={3}>
            <input
              className="mt-1"
              data-testid="feedback-form"
              type="file"
              name="name"
              maxLength={50}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CCol md={{ span: 6, offset: 3 }}>
            <CButton
              data-testid="upload-btn"
              className="btn-ovh me-1 text-white"
              color="success"
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
