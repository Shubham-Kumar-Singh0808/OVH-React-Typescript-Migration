import React, { useState } from 'react'
import { CRow, CFormLabel, CCol, CFormSelect } from '@coreui/react-pro'
import { showIsRequired } from '../../../../utils/helper'

const StartTimeEndTime = (): JSX.Element => {
  const [startTimeHours, setStartTimeHours] = useState<string>('')
  const [startTimeMinutes, setStartTimeMinutes] = useState<string>('')
  const [startTimeMedetarian, setStartTimeMedetarian] = useState<string>('')
  const [endTimeHours, setEndTimeHours] = useState<string>('')
  const [endTimeMinutes, setEndTimeHoursMinutes] = useState<string>('')
  const [endTime, setEndTime] = useState<string>('')
  return (
    <>
      <CRow className="mt-1 mb-3">
        <CFormLabel className="col-sm-2 col-form-label text-end">
          Start Time:
          <span className={showIsRequired(startTimeHours)}>*</span>
        </CFormLabel>
        <CCol sm={4}>
          <CCol sm={12}>
            <CRow>
              <CCol sm={4}>
                <CFormSelect
                  aria-label="startTimeValue"
                  id="startTimeValue"
                  data-testid="startTimeValue"
                  name="startTimeValue"
                  value={startTimeHours}
                  onChange={(e) => setStartTimeHours(e.target.value)}
                >
                  <option value="">00</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </CFormSelect>
              </CCol>
              <CCol sm={4}>
                <CFormSelect
                  aria-label="location"
                  id="minutes"
                  data-testid="locationSelect"
                  name="minutes"
                  value={startTimeMinutes}
                  onChange={(e) => setStartTimeMinutes(e.target.value)}
                >
                  <option value="00">00</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                </CFormSelect>
              </CCol>
              <CCol sm={4}>
                <CFormSelect
                  aria-label="location"
                  id="location"
                  data-testid="locationSelect"
                  name="location"
                  value={startTimeMedetarian}
                  onChange={(e) => setStartTimeMedetarian(e.target.value)}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </CFormSelect>
              </CCol>
            </CRow>
          </CCol>
        </CCol>
      </CRow>
      <CRow className="mt-1 mb-3">
        <CFormLabel className="col-sm-2 col-form-label text-end">
          End Time:
          <span className={showIsRequired(endTimeHours)}>*</span>
        </CFormLabel>
        <CCol sm={4}>
          <CCol sm={12}>
            <CRow>
              <CCol sm={4}>
                <CFormSelect
                  aria-label="endTimeValue"
                  id="endTimeValue"
                  data-testid="endTimeValue"
                  name="endTimeValue"
                  value={endTimeHours}
                  onChange={(e) => setEndTimeHours(e.target.value)}
                >
                  <option value="00">00</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </CFormSelect>
              </CCol>
              <CCol sm={4}>
                <CFormSelect
                  aria-label="location"
                  id="location"
                  data-testid="locationSelect"
                  name="location"
                  value={endTimeMinutes}
                  onChange={(e) => setEndTimeHoursMinutes(e.target.value)}
                >
                  <option value="00">00</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                </CFormSelect>
              </CCol>
              <CCol sm={4}>
                <CFormSelect
                  aria-label="location"
                  id="location"
                  data-testid="locationSelect"
                  name="location"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </CFormSelect>
              </CCol>
            </CRow>
          </CCol>
        </CCol>
      </CRow>
    </>
  )
}

export default StartTimeEndTime
