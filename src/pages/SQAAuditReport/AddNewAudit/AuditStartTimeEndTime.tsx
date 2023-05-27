import { CRow, CFormLabel, CCol, CFormSelect } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { convertTime, showIsRequired } from '../../../utils/helper'

const AuditStartTimeEndTime = ({
  onSelectStartAndEndTime,
}: {
  onSelectStartAndEndTime: (val1: string, val2: string) => void
}): JSX.Element => {
  const auditHoursList = [
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

  const auditMinutesList = [
    { label: '00', value: '' },
    { label: '15', value: '15' },
    { label: '30', value: '30' },
    { label: '45', value: '45' },
  ]
  const [auditStartTime, setAuditStartTime] = useState({
    hours: '',
    minutes: '00',
    meridian: 'AM',
  })
  const [auditEndTime, setAuditEndTime] = useState({
    hours: '',
    minutes: '00',
    meridian: 'AM',
  })
  useEffect(() => {
    if (auditStartTime.hours && auditEndTime.hours) {
      const concatStartTime = `${auditStartTime.hours}:${auditStartTime.minutes} ${auditStartTime.meridian}`
      const concatEndTime = `${auditEndTime.hours}:${auditEndTime.minutes} ${auditEndTime.meridian}`
      const startTimeResult = convertTime(concatStartTime)
      const endTimeResult = convertTime(concatEndTime)
      console.log(startTimeResult)
      onSelectStartAndEndTime(startTimeResult, endTimeResult)
    } else {
      onSelectStartAndEndTime('', '')
    }
  }, [auditStartTime, auditEndTime])

  return (
    <>
      <CRow className="mt-1 mb-3">
        <CFormLabel className="col-sm-3 col-form-label text-end">
          Start Time:
          <span className={showIsRequired(auditStartTime.hours)}>*</span>
        </CFormLabel>
        <CCol sm={6}>
          <CCol sm={12}>
            <CRow>
              <CCol sm={4}>
                <CFormSelect
                  aria-label="startTimeHours"
                  id="startTimeHours"
                  data-testid="audit-startTimeHours"
                  name="startTimeHours"
                  value={auditStartTime.hours}
                  onChange={(e) => {
                    setAuditStartTime({
                      ...auditStartTime,
                      hours: e.target.value,
                    })
                  }}
                >
                  {auditHoursList.map((currOpt, index) => (
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
                  data-testid="audit-startTimeMin"
                  name="startTimeMin"
                  value={auditStartTime.minutes}
                  onChange={(e) => {
                    setAuditStartTime({
                      ...auditStartTime,
                      minutes: e.target.value,
                    })
                  }}
                >
                  {auditMinutesList.map((minItem, index) => (
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
                  data-testid="audit-startTimeMeridian"
                  name="startTimeMeridian"
                  value={auditStartTime.meridian}
                  onChange={(e) => {
                    setAuditStartTime({
                      ...auditStartTime,
                      meridian: e.target.value,
                    })
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
          End Time:
          <span className={showIsRequired(auditEndTime.hours)}>*</span>
        </CFormLabel>
        <CCol sm={6}>
          <CCol sm={12}>
            <CRow>
              <CCol sm={4}>
                <CFormSelect
                  aria-label="endTimeHours"
                  id="endTimeHours"
                  data-testid="audit-endTimeHours"
                  name="endTimeHours"
                  value={auditEndTime.hours}
                  onChange={(e) => {
                    setAuditEndTime({ ...auditEndTime, hours: e.target.value })
                  }}
                >
                  {auditHoursList.map((currItem, index) => (
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
                  data-testid="audit-endTimeMin"
                  name="endTimeMin"
                  value={auditEndTime.minutes}
                  onChange={(e) => {
                    setAuditEndTime({
                      ...auditEndTime,
                      minutes: e.target.value,
                    })
                  }}
                >
                  {auditMinutesList.map((currMin, index) => (
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
                  data-testid="audit-endTimeMeridian"
                  name="endTimeMeridian"
                  value={auditEndTime.meridian}
                  onChange={(e) => {
                    setAuditEndTime({
                      ...auditEndTime,
                      meridian: e.target.value,
                    })
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

export default AuditStartTimeEndTime
