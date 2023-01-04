import { CRow } from '@coreui/react-pro'
import React from 'react'

const KRAInputFieldContainer = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  return <CRow className={'mt-3 mb-3 align-items-center'}>{children}</CRow>
}

export default KRAInputFieldContainer
