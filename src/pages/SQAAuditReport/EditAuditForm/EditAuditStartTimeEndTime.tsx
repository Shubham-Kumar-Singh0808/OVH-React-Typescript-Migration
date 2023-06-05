import { CRow, CFormLabel, CCol, CFormSelect } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { convertTime, showIsRequired } from '../../../utils/helper'

const EditAuditStartTimeEndTime = ({
  onSelectAuditStartAndEndTime,
}: {
  onSelectAuditStartAndEndTime: (val1: string, val2: string) => void
}): JSX.Element => {
  const selectedAuditDetails = useTypedSelector(
    reduxServices.addNewAuditForm.selectors.selectedAuditDetails,
  )
  const auditStartTime = selectedAuditDetails?.startTime
  const auditEndTime = selectedAuditDetails?.endTime

  const auditStartHour = auditStartTime?.split(':')[0]
  const auditStartMeridian = auditStartTime?.split(' ')[1]
  const auditStartMinutesDay = auditStartTime?.split(':')[1]?.split(' ')[0]

  const auditEndHour = auditEndTime?.split(':')[0]
  const auditEndMeridian = auditEndTime?.split(' ')[1]
  const auditEndMinutesDay = auditEndTime?.split(':')[1]?.split(' ')[0]

  const editAuditHoursList = [
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

  const editAuditMinutesList = [
    { label: '00', value: '' },
    { label: '15', value: '15' },
    { label: '30', value: '30' },
    { label: '45', value: '45' },
  ]

  const [editAuditStartTime, setEditAuditStartTime] = useState({
    hours: '',
    minutes: '00',
    meridian: 'AM',
  })
  const [editAuditEndTime, setEditAuditEndTime] = useState({
    hours: '',
    minutes: '00',
    meridian: 'AM',
  })
  const fieldDisabled = selectedAuditDetails.formStatus === 'Submit'
  useEffect(() => {
    if (auditStartHour && auditStartMinutesDay && auditStartMeridian) {
      setEditAuditStartTime({
        hours: auditStartHour,
        minutes: auditStartMinutesDay,
        meridian: auditStartMeridian,
      })
    }
    if (auditEndHour && auditEndMeridian && auditEndMinutesDay) {
      setEditAuditEndTime({
        hours: auditEndHour,
        minutes: auditEndMinutesDay,
        meridian: auditEndMeridian,
      })
    }
  }, [auditStartHour, auditStartMinutesDay, auditStartMeridian])

  useEffect(() => {
    if (editAuditStartTime.hours && editAuditEndTime.hours) {
      const concatAuditStartTime = `${editAuditStartTime.hours}:${editAuditStartTime.minutes} ${editAuditStartTime.meridian}`
      const concatAuditEndTime = `${editAuditEndTime.hours}:${editAuditEndTime.minutes} ${editAuditEndTime.meridian}`
      const auditStartTimeResult = convertTime(concatAuditStartTime)
      const auditEndTimeResult = convertTime(concatAuditEndTime)
      onSelectAuditStartAndEndTime(auditStartTimeResult, auditEndTimeResult)
    } else {
      onSelectAuditStartAndEndTime('', '')
    }
  }, [editAuditStartTime, editAuditEndTime])

  return (
    <>
      <CRow className="mt-1 mb-3">
        <CFormLabel className="col-sm-3 col-form-label text-end">
          Start Time:
          <span className={showIsRequired(editAuditStartTime.hours)}>*</span>
        </CFormLabel>
        <CCol sm={6}>
          <CCol sm={12}>
            <CRow>
              <CCol sm={4}>
                <CFormSelect
                  aria-label="startTimeHours"
                  id="startTimeHours"
                  data-testid="editAudit-startTimeHours"
                  name="startTimeHours"
                  value={editAuditStartTime.hours}
                  disabled={fieldDisabled}
                  onChange={(e) => {
                    setEditAuditStartTime({
                      ...editAuditStartTime,
                      hours: e.target.value,
                    })
                  }}
                >
                  {editAuditHoursList.map((currOpt, index) => (
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
                  data-testid="editAudit-startTimeMin"
                  name="startTimeMin"
                  value={editAuditStartTime.minutes}
                  disabled={fieldDisabled}
                  onChange={(e) => {
                    setEditAuditStartTime({
                      ...editAuditStartTime,
                      minutes: e.target.value,
                    })
                  }}
                >
                  {editAuditMinutesList.map((minItem, index) => (
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
                  data-testid="editAudit-startTimeMeridian"
                  name="startTimeMeridian"
                  value={editAuditStartTime.meridian}
                  disabled={fieldDisabled}
                  onChange={(e) => {
                    setEditAuditStartTime({
                      ...editAuditStartTime,
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
          <span className={showIsRequired(editAuditEndTime.hours)}>*</span>
        </CFormLabel>
        <CCol sm={6}>
          <CCol sm={12}>
            <CRow>
              <CCol sm={4}>
                <CFormSelect
                  aria-label="endTimeHours"
                  id="endTimeHours"
                  data-testid="editAudit-endTimeHours"
                  name="endTimeHours"
                  value={editAuditEndTime.hours}
                  disabled={fieldDisabled}
                  onChange={(e) => {
                    setEditAuditEndTime({
                      ...editAuditEndTime,
                      hours: e.target.value,
                    })
                  }}
                >
                  {editAuditHoursList.map((currItem, index) => (
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
                  data-testid="editAudit-endTimeMin"
                  name="endTimeMin"
                  value={editAuditEndTime.minutes}
                  disabled={fieldDisabled}
                  onChange={(e) => {
                    setEditAuditEndTime({
                      ...editAuditEndTime,
                      minutes: e.target.value,
                    })
                  }}
                >
                  {editAuditMinutesList.map((currMin, index) => (
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
                  data-testid="editAudit-endTimeMeridian"
                  name="endTimeMeridian"
                  value={editAuditEndTime.meridian}
                  disabled={fieldDisabled}
                  onChange={(e) => {
                    setEditAuditEndTime({
                      ...editAuditEndTime,
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

export default EditAuditStartTimeEndTime
