import { CRow, CCol, CButton } from '@coreui/react-pro'
import React from 'react'

const EmployeeViewButtons = ({
  saveEmployeeAppraisalFormHandler,
  submitAppraisalFormHandler,
  isSubmitButtonDisabled,
}: {
  saveEmployeeAppraisalFormHandler: () => void
  submitAppraisalFormHandler: () => void
  isSubmitButtonDisabled: boolean
}): JSX.Element => {
  return (
    <>
      <CRow>
        <CCol md={{ span: 6, offset: 3 }}>
          <CButton
            className="btn-ovh me-1"
            color="success"
            onClick={saveEmployeeAppraisalFormHandler}
          >
            Save
          </CButton>
          <CButton
            color="success "
            className="btn-ovh"
            onClick={submitAppraisalFormHandler}
            disabled={!isSubmitButtonDisabled}
          >
            Submit
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}

export default EmployeeViewButtons
