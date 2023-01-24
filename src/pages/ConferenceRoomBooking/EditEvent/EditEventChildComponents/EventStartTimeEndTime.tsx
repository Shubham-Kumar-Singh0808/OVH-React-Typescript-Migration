import { CRow, CFormLabel, CCol, CFormSelect } from '@coreui/react-pro'
import { events } from 'ckeditor4-react/dist/events'
import React, { useEffect, useState } from 'react'
import { convertTime, showIsRequired } from '../../../../utils/helper'

const EventStartTimeEndTime = ({
  startTime,
  endTime,
}: {
  startTime: string
  endTime: string
}): JSX.Element => {
  const eventHoursList = [
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

  const eventMinutesList = [
    { label: '00', value: '' },
    { label: '15', value: '15' },
    { label: '30', value: '30' },
    { label: '45', value: '45' },
  ]

  const [eventStartTime, setEventStartTime] = useState({
    hours: '',
    minutes: '00',
    meridian: 'AM',
  })
  const [eventEndTime, setEventEndTime] = useState({
    hours: '',
    minutes: '00',
    meridian: 'AM',
  })

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
                  data-testid="startTimeHours"
                  name="startTimeHours"
                  value={eventStartTime.hours}
                  disabled
                  onChange={(e) => {
                    setEventStartTime({
                      ...eventStartTime,
                      hours: e.target.value,
                    })
                  }}
                >
                  {eventHoursList.map((currOpt, index) => (
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
                  disabled
                  value={eventStartTime.minutes}
                  onChange={(e) => {
                    setEventStartTime({
                      ...eventStartTime,
                      minutes: e.target.value,
                    })
                  }}
                >
                  {eventMinutesList.map((minItem, index) => (
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
                  value={eventStartTime.meridian}
                  disabled
                  onChange={(e) => {
                    setEventStartTime({
                      ...eventStartTime,
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
                  value={eventEndTime.hours}
                  disabled
                  onChange={(e) => {
                    setEventEndTime({ ...eventEndTime, hours: e.target.value })
                  }}
                >
                  {eventHoursList.map((currItem, index) => (
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
                  value={eventEndTime.minutes}
                  disabled
                  onChange={(e) => {
                    setEventEndTime({
                      ...eventEndTime,
                      minutes: e.target.value,
                    })
                  }}
                >
                  {eventMinutesList.map((currMin, index) => (
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
                  value={eventEndTime.meridian}
                  disabled
                  onChange={(e) => {
                    setEventEndTime({
                      ...eventEndTime,
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

export default EventStartTimeEndTime
