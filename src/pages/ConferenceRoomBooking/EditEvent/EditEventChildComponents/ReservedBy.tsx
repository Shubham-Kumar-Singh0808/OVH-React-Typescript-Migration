import { CRow, CFormLabel, CCol, CFormInput } from '@coreui/react-pro'
import React from 'react'

const ReservedBy = ({
  eventReservedBy,
}: {
  eventReservedBy: string
}): JSX.Element => {
  return (
    <CRow className="mt-1 mb-3">
      <CFormLabel
        className="col-sm-3 col-form-label text-end"
        data-testid="pmLabel"
      >
        Reserved by:
      </CFormLabel>
      <CCol sm={6}>
        <CFormInput
          data-testid="event-reserved-by"
          autoComplete="off"
          type="text"
          name="reservedBy"
          disabled
          value={eventReservedBy}
        />
      </CCol>
    </CRow>
  )
}

export default ReservedBy
