import { CRow, CCol, CButton } from '@coreui/react-pro'
import React from 'react'

const FinalButtonDisplay = ({
  buttonColor,
  buttonText,
  testId,
}: {
  buttonColor: 'danger' | 'success'
  buttonText: string
  testId?: string
}): JSX.Element => {
  return (
    <CRow className="justify-content-center">
      <CCol sm={5}>
        <CButton
          className="mt-4 text-white p-2"
          color={buttonColor}
          data-testid={testId}
        >
          {buttonText}
        </CButton>
      </CCol>
    </CRow>
  )
}

export default FinalButtonDisplay
