import React, { ChangeEvent } from 'react'
import { CRow, CFormLabel, CCol, CFormSelect } from '@coreui/react-pro'
import { showIsRequired } from '../../../../utils/helper'

const StartTimeEndTime = ({
  startTimeValue,
  endTimeValue,
  onChangeStartEndTime,
}: {
  startTimeValue: string
  endTimeValue: string
  onChangeStartEndTime: (value: ChangeEvent<HTMLSelectElement>) => void
}): JSX.Element => {
  return (
    <>
      <CRow className="mt-1 mb-3">
        <CFormLabel className="col-sm-2 col-form-label text-end">
          Start Time:
          <span className={showIsRequired(startTimeValue)}>*</span>
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
                  value={startTimeValue}
                  onChange={onChangeStartEndTime}
                >
                  <option value="">00</option>
                  <option value="">01</option>
                  <option value="">02</option>
                  <option value="">03</option>
                  <option value="">04</option>
                  <option value="">05</option>
                  <option value="">06</option>
                  <option value="">07</option>
                  <option value="">08</option>
                  <option value="">09</option>
                  <option value="">10</option>
                  <option value="">11</option>
                  <option value="">12</option>
                </CFormSelect>
              </CCol>
              <CCol sm={4}>
                <CFormSelect
                  aria-label="location"
                  id="location"
                  data-testid="locationSelect"
                  name="location"
                >
                  <option value="">00</option>
                  <option value="">15</option>
                  <option value="">30</option>
                  <option value="">45</option>
                </CFormSelect>
              </CCol>
              <CCol sm={4}>
                <CFormSelect
                  aria-label="location"
                  id="location"
                  data-testid="locationSelect"
                  name="location"
                >
                  <option value="">AM</option>
                  <option value="">PM</option>
                </CFormSelect>
              </CCol>
            </CRow>
          </CCol>
        </CCol>
      </CRow>
      <CRow className="mt-1 mb-3">
        <CFormLabel className="col-sm-2 col-form-label text-end">
          End Time:
          <span className={showIsRequired(endTimeValue)}>*</span>
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
                  value={endTimeValue}
                  onChange={onChangeStartEndTime}
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
