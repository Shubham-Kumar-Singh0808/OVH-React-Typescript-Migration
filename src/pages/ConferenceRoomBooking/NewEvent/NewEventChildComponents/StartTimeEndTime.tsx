import { CRow, CFormLabel, CCol, CFormSelect } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { convertTime, showIsRequired } from '../../../../utils/helper'

const StartTimeEndTime = ({
  onSelectStartAndEndTime,
  shouldReset,
}: {
  onSelectStartAndEndTime: (val1: string, val2: string) => void
  shouldReset: boolean
}): JSX.Element => {
  const hoursList = [
    { label: '00', value: '' },
    { label: '01', value: '01' },
    { label: '02', value: '02' },
    { label: '03', value: '03' },
    { label: '04', value: '04' },
    { label: '05', value: '05' },
    { label: '06', value: '06' },
    { label: '07', value: '07' },
    { label: '08', value: '08' },
    { label: '09', value: '09' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' },
  ]

  const minutesList = [
    { label: '00', value: '' },
    { label: '15', value: '15' },
    { label: '30', value: '30' },
    { label: '45', value: '45' },
  ]
  const [startTime, setStartTime] = useState({
    hours: '',
    minutes: '00',
    meridian: 'AM',
  })
  const [endTime, setEndTime] = useState({
    hours: '',
    minutes: '00',
    meridian: 'AM',
  })
  useEffect(() => {
    if (shouldReset)
      setStartTime({
        hours: '',
        minutes: '00',
        meridian: 'AM',
      })
    setEndTime({
      hours: '',
      minutes: '00',
      meridian: 'AM',
    })
  }, [shouldReset])

  useEffect(() => {
    if (startTime.hours && endTime.hours) {
      const concatStartTime = `${startTime.hours}:${startTime.minutes} ${startTime.meridian}`
      const concatEndTime = `${endTime.hours}:${endTime.minutes} ${endTime.meridian}`
      const startTimeResult = convertTime(concatStartTime)
      const endTimeResult = convertTime(concatEndTime)
      console.log(startTimeResult)
      onSelectStartAndEndTime(startTimeResult, endTimeResult)
    } else {
      onSelectStartAndEndTime('', '')
    }
  }, [startTime, endTime])

  return (
    <>
      <CRow className="mt-1 mb-3">
        <CFormLabel className="col-sm-3 col-form-label text-end">
          Start Time :<span className={showIsRequired(startTime.hours)}>*</span>
        </CFormLabel>
        <CCol sm={6}>
          <CCol sm={12}>
            <CRow>
              <CCol sm={4}>
                <CFormSelect
                  aria-label="startTimeHours"
                  id="startTimeHours"
                  data-testid="startTimeHours"
                  name="startTimeHours"
                  value={startTime.hours}
                  onChange={(e) => {
                    setStartTime({ ...startTime, hours: e.target.value })
                  }}
                >
                  {hoursList.map((currOpt, index) => (
                    <option key={index} value={currOpt.value}>
                      {currOpt.label}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol sm={4}>
                <CFormSelect
                  aria-label="startTimeMin"
                  id="startTimeMin"
                  data-testid="startTimeMin"
                  name="startTimeMin"
                  value={startTime.minutes}
                  onChange={(e) => {
                    setStartTime({ ...startTime, minutes: e.target.value })
                  }}
                >
                  {minutesList.map((minItem, index) => (
                    <option key={index} value={minItem.value}>
                      {minItem.label}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol sm={4}>
                <CFormSelect
                  aria-label="startTimeMeridian"
                  id="startTimeMeridian"
                  data-testid="startTimeMeridian"
                  name="startTimeMeridian"
                  value={startTime.meridian}
                  onChange={(e) => {
                    setStartTime({ ...startTime, meridian: e.target.value })
                  }}
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
        <CFormLabel className="col-sm-3 col-form-label text-end">
          End Time :<span className={showIsRequired(endTime.hours)}>*</span>
        </CFormLabel>
        <CCol sm={6}>
          <CCol sm={12}>
            <CRow>
              <CCol sm={4}>
                <CFormSelect
                  aria-label="endTimeHours"
                  id="endTimeHours"
                  data-testid="endTimeHours"
                  name="endTimeHours"
                  value={endTime.hours}
                  onChange={(e) => {
                    setEndTime({ ...endTime, hours: e.target.value })
                  }}
                >
                  {hoursList.map((currItem, index) => (
                    <option key={index} value={currItem.value}>
                      {currItem.label}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol sm={4}>
                <CFormSelect
                  aria-label="endTimeMin"
                  id="endTimeMin"
                  data-testid="endTimeMin"
                  name="endTimeMin"
                  value={endTime.minutes}
                  onChange={(e) => {
                    setEndTime({ ...endTime, minutes: e.target.value })
                  }}
                >
                  {minutesList.map((currMin, index) => (
                    <option key={index} value={currMin.value}>
                      {currMin.label}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol sm={4}>
                <CFormSelect
                  aria-label="endTimeMeridian"
                  id="endTimeMeridian"
                  data-testid="endTimeMeridian"
                  name="endTimeMeridian"
                  value={endTime.meridian}
                  onChange={(e) => {
                    setEndTime({ ...endTime, meridian: e.target.value })
                  }}
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
