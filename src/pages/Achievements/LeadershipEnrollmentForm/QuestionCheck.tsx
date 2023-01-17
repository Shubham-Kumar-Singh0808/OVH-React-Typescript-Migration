import { CRow, CFormLabel, CFormCheck, CCol } from '@coreui/react-pro'
import React from 'react'
import { TextDanger, TextWhite } from '../../../constant/ClassName'
import { CheckedQuestionsOptions } from '../../../types/Achievements/LeadershipEnrollmentForm/LeadershipEnrollmentFormTypes'

const QuestionCheck = ({
  question,
  isChecked,
  changeHandler,
}: {
  question: string
  isChecked: null | string
  changeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
}): JSX.Element => {
  return (
    <CRow className="align-items-center mb-1">
      <CFormLabel
        data-testid={`test-question-check`}
        className="col-sm-4 col-form-label text-end mb-1 pe-1"
      >
        {question}
        <span
          data-testid={`ast-question-check`}
          className={isChecked === null ? TextDanger : TextWhite}
        >
          *
        </span>
      </CFormLabel>
      <CCol sm={1} className="mt-2">
        <CFormCheck
          type="radio"
          data-testid={`yes-radio`}
          hitArea="full"
          label={String(CheckedQuestionsOptions.yes)}
          inline
          checked={isChecked === CheckedQuestionsOptions.yes}
          onChange={changeHandler}
          value={String(CheckedQuestionsOptions.yes)}
        />
      </CCol>
      <CCol sm={1} className="mt-2 align-items-start p-0">
        <CFormCheck
          type="radio"
          data-testid={`no-radio`}
          hitArea="full"
          label={String(CheckedQuestionsOptions.no)}
          checked={isChecked === CheckedQuestionsOptions.no}
          onChange={changeHandler}
          inline
          value={String(CheckedQuestionsOptions.no)}
        />
      </CCol>
    </CRow>
  )
}

export default QuestionCheck