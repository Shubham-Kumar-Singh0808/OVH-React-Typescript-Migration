import { CRow, CCol, CButton, CFormLabel, CFormSelect } from '@coreui/react-pro'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ReactDatePicker from 'react-datepicker'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { showIsRequired } from '../../../utils/helper'
import { deviceLocale } from '../../../utils/dateFormatUtils'

const ReSchedule = () => {
  const [dateValue, setDateValue] = useState<string | Date>('')
  const [time, setTime] = useState<string>('')
  const [mode, setMode] = useState<string>('')
  const [interviewer, setInterviewer] = useState<string>('')
  const [comments, setComments] = useState<string>('')
  const [mailToCcandidate, setMailToCcandidate] = useState<string>('')
  const [sendMailToInterviewer, setSendMailToInterviewer] = useState<string>('')
  const [sendMessageTocandidate, setSendMessageTocandidate] =
    useState<string>('')
  const [sendMessageToInterviewer, setSendMessageToInterviewer] =
    useState<string>('')

  const fromDateValue = dateValue
    ? new Date(dateValue).toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit',
      })
    : ''

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Interviewee Details"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="back-button"
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">
            Date:
            <span className={showIsRequired(dateValue as string)}>*</span>
          </CFormLabel>
        </CCol>
        <CCol sm={2}>
          <ReactDatePicker
            className="form-control form-control-sm sh-date-picker"
            data-testid="date-picker"
            placeholderText="dd/mm/yyyy"
            name="dateValue"
            id="dateValue"
            autoComplete="off"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            value={fromDateValue}
            onChange={(date: Date) => {
              setDateValue(date)
            }}
            selected={dateValue as Date}
          />
        </CCol>
        <CFormSelect
          aria-label="Default select example"
          size="sm"
          id="mode"
          data-testid="form-select-3"
          name="mode"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="">Select Mode Of Interview</option>
          <option value="FACE_TO_FACE">In Person</option>
          <option value="SYSTEM">System</option>
          <option value="TELEPHONE">Telephone</option>
          <option value="SKYPE">Skype</option>
          <option value="Google_Meet">Google Meet</option>
          <option value="GoToMeeting">GoToMeeting</option>
          <option value="Microsoft_Teams">Microsoft Teams</option>
          <option value="Zoom">Zoom</option>
        </CFormSelect>
      </OCard>
    </>
  )
}

export default ReSchedule
