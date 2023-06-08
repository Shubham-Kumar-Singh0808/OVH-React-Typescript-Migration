import { CRow, CCol, CButton } from '@coreui/react-pro'
import React from 'react'

const ManagerViewButtons = ({
  saveManagerAppraisalFormHandler,
  submitManagerAppraisalFormHandler,
}: {
  saveManagerAppraisalFormHandler: () => void
  submitManagerAppraisalFormHandler: () => void
}): JSX.Element => {
  return (
    <>
      <CRow>
        <CCol md={{ span: 6, offset: 3 }}>
          <CButton
            className="btn-ovh me-1"
            color="success"
            onClick={saveManagerAppraisalFormHandler}
          >
            Save
          </CButton>
          <CButton
            color="success "
            className="btn-ovh"
            onClick={submitManagerAppraisalFormHandler}
            // disabled={!isSubmitButtonDisabled}
          >
            Submit
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}

export default ManagerViewButtons
