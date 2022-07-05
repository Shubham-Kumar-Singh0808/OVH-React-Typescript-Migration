import {
  CRow,
  CCol,
  CFormCheck,
  CFormLabel,
  CButton,
  CForm,
  CInputGroup,
  CFormInput,
} from '@coreui/react-pro'
import moment from 'moment'
import React from 'react'
import DatePicker from 'react-datepicker'

const HiveReportOptions = (): JSX.Element => {
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <div className="mb-3">
            <div className="d-inline">
              <CFormCheck
                type="radio"
                name="selectMonth"
                id="currentMonth"
                label="Current Month"
                inline
              />
              <CFormCheck
                type="radio"
                name="selectMonth"
                id="previousMonth"
                label="Previous Month"
                inline
              />
              <CFormCheck
                type="radio"
                name="selectMonth"
                value={'others'}
                id="otherMonth"
                label="Other"
                inline
              />
            </div>
            <div className="d-inline pull-right ml15">
              <CFormCheck
                type="radio"
                name="viewOptions"
                value="Me"
                id="Me"
                label="Me"
                inline
              />
              <CFormCheck
                type="radio"
                name="viewOptions"
                value="All"
                id="All"
                label="All"
                inline
              />
            </div>
          </div>
        </CCol>
      </CRow>
    </>
  )
}
export default HiveReportOptions
