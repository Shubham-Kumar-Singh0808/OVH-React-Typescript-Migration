import { CCol, CFormLabel, CRow } from '@coreui/react-pro'
import React from 'react'

const LeadershipDetailsItem = ({
  question,
  answer,
}: {
  question: string
  answer: string | undefined
}): JSX.Element => {
  return (
    <CRow className="align-items-center mb-1">
      <CFormLabel
        data-testid={`test-question-check`}
        className="col-sm-4 col-form-label text-end"
      >
        {question}:
      </CFormLabel>
      <CCol sm={7}>
        <strong data-testid="test-answer-check">{answer}</strong>
      </CCol>
    </CRow>
  )
}

export default LeadershipDetailsItem
