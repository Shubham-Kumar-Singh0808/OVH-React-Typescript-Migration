import React from 'react'
import { CFormText } from '@coreui/react-pro'
import { TextDanger } from '../../../../../../constant/ClassName'

const JustificationLengthError = ({
  showError,
  length,
}: {
  showError: boolean
  length: number
}): JSX.Element => {
  return (
    <>
      {showError && (
        <CFormText className={TextDanger} data-testid="tailor-charLengthError">
          Please write {length} characters
        </CFormText>
      )}
    </>
  )
}

export default JustificationLengthError
