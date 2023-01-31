import { CRow, CFormLabel, CCol, CFormSelect } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'
import { convertTime } from '../../../../utils/helper'

const EventStartTimeEndTime = ({
  onSelectStartAndEndTime,
}: {
  onSelectStartAndEndTime: (val1: string, val2: string) => void
}): JSX.Element => {
  const editExistingEvent = useTypedSelector(
    reduxServices.eventList.selectors.editExistingEventData,
  )
  const eventStartTime = editExistingEvent?.startTime
  const eventEndTime = editExistingEvent?.endTime

  const startHour = eventStartTime?.split(':')[0]
  const startMeridian = eventStartTime?.split(' ')[1]
  const startMinutesDay = eventStartTime?.split(':')[1]?.split(' ')[0]

  const endHour = eventEndTime?.split(':')[0]
  const endMeridian = eventEndTime?.split(' ')[1]
  const endMinutesDay = eventEndTime?.split(':')[1]?.split(' ')[0]

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
    if (startHour && startMinutesDay && startMeridian) {
      setStartTime({
        hours: startHour,
        minutes: startMinutesDay,
        meridian: startMeridian,
      })
    }
    if (endHour && endMeridian && endMinutesDay) {
      setEndTime({
        hours: endHour,
        minutes: endMinutesDay,
        meridian: endMeridian,
      })
    }
  }, [startHour, startMinutesDay, startMeridian])

  useEffect(() => {
    if (startTime.hours && endTime.hours) {
      const concatStartTime = `${startTime.hours}:${startTime.minutes} ${startTime.meridian}`
      const concatEndTime = `${endTime.hours}:${endTime.minutes} ${endTime.meridian}`
      const startTimeResult = convertTime(concatStartTime)
      const endTimeResult = convertTime(concatEndTime)
      onSelectStartAndEndTime(startTimeResult, endTimeResult)
    } else {
      onSelectStartAndEndTime('', '')
    }
  }, [startTime, endTime])

  return (
    <>
      <CRow className="mt-1 mb-3">
        <CFormLabel className="col-sm-3 col-form-label text-end">
          Start Time:
        </CFormLabel>
        <CCol sm={6}>
          <CCol sm={12}>
            <CRow>
              <CCol sm={4}>
                <CFormSelect
                  aria-label="startTimeHours"
                  id="startTimeHours"
                  data-testid="event-startTimeHours"
                  name="startTimeHours"
                  value={startTime.hours}
                  disabled
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
                  data-testid="event-startTimeMin"
                  name="startTimeMin"
                  value={startTime.minutes}
                  disabled
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
                  data-testid="event-startTimeMeridian"
                  name="startTimeMeridian"
                  value={startTime.meridian}
                  disabled
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
          End Time:
        </CFormLabel>
        <CCol sm={6}>
          <CCol sm={12}>
            <CRow>
              <CCol sm={4}>
                <CFormSelect
                  aria-label="endTimeHours"
                  id="endTimeHours"
                  data-testid="event-endTimeHours"
                  name="endTimeHours"
                  value={endTime.hours}
                  disabled
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
                  data-testid="event-endTimeMin"
                  name="endTimeMin"
                  value={endTime.minutes}
                  disabled
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
                  data-testid="event-endTimeMeridian"
                  name="endTimeMeridian"
                  value={endTime.meridian}
                  disabled
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

export default EventStartTimeEndTime
