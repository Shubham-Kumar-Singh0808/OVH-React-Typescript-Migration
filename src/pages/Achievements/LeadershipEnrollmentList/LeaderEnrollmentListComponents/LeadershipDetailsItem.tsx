import { CCol, CFormLabel, CRow } from '@coreui/react-pro'
import parse from 'html-react-parser'
import React from 'react'
import { emptyString } from '../../AchievementConstants'

const LeadershipDetailsItem = ({
  question,
  answer,
  toParse,
}: {
  question: string
  answer: string | undefined
  toParse: boolean
}): JSX.Element => {
  const ans = answer ? answer : emptyString
  return (
    <CRow className="align-items-center mb-1">
      <CFormLabel
        data-testid={`test-question-check`}
        className="col-sm-4 col-form-label text-end"
      >
        {question}:
      </CFormLabel>
      <CCol sm={7}>
        {toParse ? (
          <div style={{ fontWeight: 'bold' }}>{parse(ans)}</div>
        ) : (
          <strong data-testid="test-answer-check">{ans}</strong>
        )}
      </CCol>
    </CRow>
  )
}

export default LeadershipDetailsItem
