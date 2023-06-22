import { CButton, CCol, CRow } from '@coreui/react-pro'
import React from 'react'
import { getInterviewStatusReportTestId } from '../InterviewStatusReportHelpers'

const ExportButtons = (): JSX.Element => {
  return (
    <div className="my-2 ms-2">
      <CRow>
        <CCol sm={3}>
          <CButton
            color="info"
            className="btn-ovh"
            data-testid={getInterviewStatusReportTestId('exportBtn')}
          >
            <i className="fa fa-plus me-1"></i>
            Click To Export
          </CButton>
        </CCol>
      </CRow>
      <CRow className="justify-content-end text-end">
        <CCol sm={4}>
          <CButton
            color="info"
            className="btn-ovh"
            data-testid={getInterviewStatusReportTestId(
              'exportInterviewerListBtn',
            )}
          >
            <i className="fa fa-plus me-1"></i>
            Click To Export Interviewer List
          </CButton>
        </CCol>
      </CRow>
    </div>
  )
}

export default ExportButtons
