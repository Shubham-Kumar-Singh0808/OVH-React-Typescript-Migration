import { CButton, CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import OToast from '../../components/ReusableComponent/OToast'
import { reduxServices } from '../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../stateStore'
import { deviceLocale } from '../../utils/dateFormatUtils'

const SQAAuditReschedule = ({
  setIsRescheduleModalVisible,
}: {
  setIsRescheduleModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element => {
  const disableAfterDate = new Date()
  disableAfterDate.setFullYear(disableAfterDate.getFullYear() + 1)
  const [rescheduleAuditDate, setRescheduleAuditDate] = useState<string>('')
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false)

  const SQAViewDetails = useTypedSelector(
    reduxServices.sqaAuditReport.selectors.sqaAuditReportDetails,
  )

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
  const commonFormatDate = 'l'
  const dispatch = useAppDispatch()

  const rescheduleDateValue = rescheduleAuditDate
    ? new Date(rescheduleAuditDate).toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : ''

  const saveRescheduleMeetingHandler = async () => {
    const saveRescheduleMeetingResultAction = await dispatch(
      reduxServices.sqaAuditReport.saveOrSubmitAuditForm({
        auditDate: rescheduleDateValue,
        auditRescheduleStatus: true,
        endTime: `${rescheduleAuditDate}/${endTime.hours}/${endTime.minutes}`,
        id: SQAViewDetails.id,
        projectId: SQAViewDetails.projectId,
        startTime: `${rescheduleAuditDate}/${startTime.hours}/${startTime.minutes}`,
      }),
    )
    if (
      reduxServices.sqaAuditReport.saveOrSubmitAuditForm.fulfilled.match(
        saveRescheduleMeetingResultAction,
      )
    ) {
      dispatch(
        reduxServices.sqaAuditReport.getSQAAuditReport({
          endIndex: 20,
          multiSearch: '',
          startIndex: 0,
          SQAAuditSelectionDate: '',
          auditRescheduleStatus: '',
          auditStatus: '',
          from: '',
          to: '',
        }),
      )
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="            
            Audit Rescheduled Successfully"
          />,
        ),
      )
      setIsRescheduleModalVisible(false)
    }
  }

  useEffect(() => {
    if (rescheduleAuditDate && endTime.hours && startTime.hours) {
      setIsSaveButtonEnabled(true)
    } else {
      setIsSaveButtonEnabled(false)
    }
  }, [rescheduleAuditDate, endTime.hours, startTime.hours])
  const textWhite = 'text-white'
  const textDanger = 'text-danger'
  return (
    <>
      <div className='modal-header"'>
        <b>Reschedule Audit</b>
      </div>
      <div className="modal-body">
        <div className="form-group row">
          <CFormLabel className="col-sm-3 control-label">
            Reschedule Audit Date :
            <span className={rescheduleDateValue ? textWhite : textDanger}>
              *
            </span>
          </CFormLabel>
          <div className="col-sm-3">
            <ReactDatePicker
              id="fromDate"
              data-testid="ticketReportFromDate"
              className="form-control form-control-sm sh-date-picker"
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              autoComplete="off"
              dropdownMode="select"
              dateFormat="dd/mm/yy"
              placeholderText="dd/mm/yyyy"
              name="rescheduleAuditDate"
              maxDate={disableAfterDate}
              minDate={new Date()}
              value={rescheduleDateValue}
              onChange={(date: Date) =>
                setRescheduleAuditDate(moment(date).format(commonFormatDate))
              }
            />
          </div>
        </div>
        <div className="form-group row">
          <CFormLabel className="col-sm-3 control-label">
            Reschedule Start Time :
            <span className={startTime.hours ? textWhite : textDanger}>*</span>
          </CFormLabel>
          <div className="col-sm-9">
            <CRow>
              <CCol sm={3}>
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
              <CCol sm={3}>
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
              <CCol sm={3}>
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
          </div>
        </div>
        <div className="form-group row">
          <CFormLabel className="col-sm-3 control-label">
            Reschedule End Time :
            <span className={endTime.hours ? textWhite : textDanger}>*</span>
          </CFormLabel>
          <div className="col-sm-9">
            <CRow>
              <CCol sm={3}>
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
              <CCol sm={3}>
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
              <CCol sm={3}>
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
          </div>
        </div>
        <CRow>
          <CCol sm={3} md={{ span: 6, offset: 3 }}>
            <CButton
              className="btn-ovh me-1"
              data-testid="confirmBtn"
              color="success"
              onClick={saveRescheduleMeetingHandler}
              disabled={!isSaveButtonEnabled}
            >
              Save
            </CButton>
          </CCol>
        </CRow>
      </div>
    </>
  )
}

export default SQAAuditReschedule
