import { CRow, CFormLabel, CCol } from '@coreui/react-pro'
import moment from 'moment'
import React from 'react'
import ReactDatePicker from 'react-datepicker'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { showIsRequired } from '../../../utils/helper'

const SQAAuditDate = ({
  editAuditDate,
  setEditAuditDate,
}: {
  editAuditDate: string
  setEditAuditDate: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const selectedAuditDetails = useTypedSelector(
    reduxServices.addNewAuditForm.selectors.selectedAuditDetails,
  )
  const formStatusSubmit = selectedAuditDetails.formStatus === 'Submit'
  const formStatusPMUpdate = selectedAuditDetails.formStatus === 'PM Update'
  return (
    <>
      <CRow className="mt-4 mb-4" data-testid="auditDateInput">
        <CFormLabel className="col-sm-3 col-form-label text-end">
          Audit Date :<span className={showIsRequired(editAuditDate)}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <ReactDatePicker
            id="holiday-date"
            data-testid="auditDate-Input"
            autoComplete="off"
            className="form-control form-control-sm sh-date-picker"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            placeholderText="dd/mm/yyyy"
            name="auditDate"
            minDate={new Date()}
            disabled={formStatusSubmit || formStatusPMUpdate}
            value={editAuditDate}
            onChange={(date: Date) => {
              setEditAuditDate(moment(date).format('DD/MM/YYYY'))
            }}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default SQAAuditDate
