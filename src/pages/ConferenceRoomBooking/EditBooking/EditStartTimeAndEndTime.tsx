import { CRow, CFormLabel, CCol, CFormSelect } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { convertTime, showIsRequired } from '../../../utils/helper'

const EditStartTimeAndEndTime = ({
  onSelectStartAndEndTime,
}: {
  onSelectStartAndEndTime: (val1: string, val2: string) => void
}): JSX.Element => {
  const editExistingMeetingRequest = useTypedSelector(
    reduxServices.bookingList.selectors.editExistingMeetingRequest,
  )
  const bookingStartTime = editExistingMeetingRequest?.startTime
  const bookingEndTime = editExistingMeetingRequest?.endTime

  const startHour = bookingStartTime?.split(':')[0]
  const startMeridian = bookingStartTime?.split(' ')[1]
  const startMinutesDay = bookingStartTime?.split(':')[1]?.split(' ')[0]

  const endHour = bookingEndTime?.split(':')[0]
  const endMeridian = bookingEndTime?.split(' ')[1]
  const endMinutesDay = bookingEndTime?.split(':')[1]?.split(' ')[0]

  const editHoursList = [
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

  const editMinutesList = [
    { label: '00', value: '' },
    { label: '15', value: '15' },
    { label: '30', value: '30' },
    { label: '45', value: '45' },
  ]

  const [editStartTime, setEditStartTime] = useState({
    hours: '',
    minutes: '00',
    meridian: 'AM',
  })
  const [editEndTime, setEditEndTime] = useState({
    hours: '',
    minutes: '00',
    meridian: 'AM',
  })

  useEffect(() => {
    if (startHour && startMinutesDay && startMeridian) {
      setEditStartTime({
        hours: startHour,
        minutes: startMinutesDay,
        meridian: startMeridian,
      })
    }
    if (endHour && endMeridian && endMinutesDay) {
      setEditEndTime({
        hours: endHour,
        minutes: endMinutesDay,
        meridian: endMeridian,
      })
    }
  }, [startHour, startMinutesDay, startMeridian])

  useEffect(() => {
    if (editStartTime.hours && editEndTime.hours) {
      const concatStartTime = `${editStartTime.hours}:${editStartTime.minutes} ${editStartTime.meridian}`
      const concatEndTime = `${editEndTime.hours}:${editEndTime.minutes} ${editEndTime.meridian}`
      const startTimeResult = convertTime(concatStartTime)
      const endTimeResult = convertTime(concatEndTime)
      onSelectStartAndEndTime(startTimeResult, endTimeResult)
    } else {
      onSelectStartAndEndTime('', '')
    }
  }, [editStartTime, editEndTime])

  return (
    <>
      <CRow className="mt-1 mb-3">
        <CFormLabel className="col-sm-3 col-form-label text-end">
          Start Time:
          <span className={showIsRequired(editStartTime.hours)}>*</span>
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
                  value={editStartTime.hours}
                  onChange={(e) => {
                    setEditStartTime({
                      ...editStartTime,
                      hours: e.target.value,
                    })
                  }}
                >
                  {editHoursList.map((currOpt, index) => (
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
                  value={editStartTime.minutes}
                  onChange={(e) => {
                    setEditStartTime({
                      ...editStartTime,
                      minutes: e.target.value,
                    })
                  }}
                >
                  {editMinutesList.map((minItem, index) => (
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
                  value={editStartTime.meridian}
                  onChange={(e) => {
                    setEditStartTime({
                      ...editStartTime,
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
          <span className={showIsRequired(editEndTime.hours)}>*</span>
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
                  value={editEndTime.hours}
                  onChange={(e) => {
                    setEditEndTime({ ...editEndTime, hours: e.target.value })
                  }}
                >
                  {editHoursList.map((currItem, index) => (
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
                  value={editEndTime.minutes}
                  onChange={(e) => {
                    setEditEndTime({ ...editEndTime, minutes: e.target.value })
                  }}
                >
                  {editMinutesList.map((currMin, index) => (
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
                  value={editEndTime.meridian}
                  onChange={(e) => {
                    setEditEndTime({ ...editEndTime, meridian: e.target.value })
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

export default EditStartTimeAndEndTime
