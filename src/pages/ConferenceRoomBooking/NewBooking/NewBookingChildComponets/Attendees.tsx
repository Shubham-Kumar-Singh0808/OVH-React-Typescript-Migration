import { CRow, CFormLabel, CCol, CFormInput } from '@coreui/react-pro'
import React from 'react'

const Attendees = (): JSX.Element => {
  return (
    <>
      <CRow className="mt-1 mb-3">
        <CFormLabel className="col-sm-2 col-form-label text-end">
          Attendees:
          <span>*</span>
        </CFormLabel>
        <CCol sm={4}>
          <CFormInput
            type="text"
            data-testid="selectSubject"
            id="subjectValue"
            name="subjectValue"
          />
        </CCol>
      </CRow>
    </>
  )
}

export default Attendees
