import { CCol, CRow } from '@coreui/react-pro'

import React from 'react'

// import RbtCvSample from '../../../assets/documents/RBT_CV_Sample.doc'
const DownloadSampleFileButton = (): JSX.Element => {
  return (
    <>
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <a
            className="text-decoration-none btn btn-download btn-ovh"
            href="RbtCvSample"
            download="RBT CV_Sample"
          >
            {' '}
            <i className="fa fa-paperclip me-1"></i>
            Download Sample Cv File
          </a>
        </CCol>
      </CRow>
    </>
  )
}

export default DownloadSampleFileButton
