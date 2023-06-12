import { CRow, CCol, CFormLabel } from '@coreui/react-pro'
import React from 'react'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import { getLabelAsterixDataTestId } from '../CandidateListHelpers'

const CandidateEntryItem = ({
  label,
  children,
  showAsterix = false,
  labelMdNumber = 3,
  childrenMdNumber = 6,
}: {
  label: string
  children: React.ReactNode
  showAsterix?: boolean
  labelMdNumber?: number
  childrenMdNumber?: number
}): JSX.Element => {
  return (
    <CRow className="mb-3">
      <CCol xs={12} md={labelMdNumber} className="form-label text-end mt-1">
        <CFormLabel data-testid={getLabelAsterixDataTestId(label)[0]}>
          {label}:
        </CFormLabel>
        <span
          data-testid={getLabelAsterixDataTestId(label)[1]}
          className={showAsterix ? TextDanger : TextWhite}
        >
          *
        </span>
      </CCol>
      <CCol xs={12} md={childrenMdNumber}>
        {children}
      </CCol>
    </CRow>
  )
}

export default CandidateEntryItem
