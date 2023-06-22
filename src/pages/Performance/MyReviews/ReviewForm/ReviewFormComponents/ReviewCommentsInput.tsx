import { CFormText, CFormTextarea } from '@coreui/react-pro'
import React, { useMemo } from 'react'
import { TextDanger } from '../../../../../constant/ClassName'
import { generateMyReviewTestId } from '../../MyReviewHelpers'

const ReviewCommentsInput = ({
  value,
  changeHandler,
  testId,
}: {
  value: string | null
  changeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  testId: string
}): JSX.Element => {
  const finalWrittenValue = useMemo(() => {
    return value !== null ? value : ''
  }, [value])

  return (
    <>
      <CFormTextarea
        placeholder="Comments"
        data-testid={`${generateMyReviewTestId(testId)}`}
        value={finalWrittenValue}
        onChange={changeHandler}
      />
      {finalWrittenValue.trim().length > 0 && (
        <div className="d-flex flex-row flex-wrap align-items-center">
          <span className="mt-1">{finalWrittenValue.length} / 500</span>{' '}
          {finalWrittenValue.length < 50 && (
            <CFormText className={`${TextDanger} ms-2`}>
              (Please enter at least 50 characters.)
            </CFormText>
          )}
        </div>
      )}
    </>
  )
}

export default ReviewCommentsInput
