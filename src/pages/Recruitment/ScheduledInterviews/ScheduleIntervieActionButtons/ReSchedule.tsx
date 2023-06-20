import {
  CRow,
  CCol,
  CButton,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CFormCheck,
  CFormInput,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import Autocomplete from 'react-autocomplete'
import OCard from '../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../reducers/reduxServices'
import { deviceLocale } from '../../../../utils/dateFormatUtils'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import OToast from '../../../../components/ReusableComponent/OToast'

const ReSchedule = (): JSX.Element => {
  const [selectDate, setSelectDate] = useState<string | Date>('')

  const resultTime = new Date().toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  })
  const startHour = resultTime?.split(':')[0]
  const startMinutesDay = resultTime?.split(':')[1]?.split(' ')[0]
  const startMeridianDay = resultTime?.split(':')[1]?.split(' ')[1]

  const [mode, setMode] = useState<string>('')
  const [comments, setComments] = useState<string>('')
  const [mailToCandidate, setMailToCandidate] = useState<boolean>(false)
  const [sendMailToInterviewer, setSendMailToInterviewer] =
    useState<boolean>(false)
  const [sendMessageToCandidate, setSendMessageToCandidate] =
    useState<boolean>(false)
  const [sendMessageToInterviewer, setSendMessageToInterviewer] =
    useState<boolean>(false)
  const [isSaveBtnEnable, setIsSaveBtnEnable] = useState(false)
  const [autoCompleteTarget, setAutoCompleteTarget] = useState<string>('')

  const selectDateValue = selectDate
    ? new Date(selectDate).toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit',
      })
    : ''

  const [timePicker, setTimePicker] = useState({
    hours: startHour,
    minutes: startMinutesDay,
    meridian: startMeridianDay,
  })

  const interviewProfiles = useTypedSelector(
    reduxServices.intervieweeDetails.selectors.employeeProperties,
  )

  const result = interviewProfiles.filter(
    (item) => item.fullName === autoCompleteTarget,
  )
  const dispatch = useAppDispatch()

  const timeLineListSelector = useTypedSelector(
    reduxServices.intervieweeDetails.selectors.TimeLineListSelector,
  )

  useEffect(() => {
    dispatch(reduxServices.intervieweeDetails.getAllEmployeeDetails())
  }, [dispatch])

  const formLabelProps = {
    htmlFor: 'inputNewHandbook',
    className: 'col-form-label category-label',
  }

  const formattedTime = `${timePicker.hours}:${timePicker.minutes} ${timePicker.meridian}`

  const handleSaveScheduleInterview = async () => {
    const interviewRoundCountResult = await dispatch(
      reduxServices.intervieweeDetails.interviewRoundCount(
        timeLineListSelector.personId,
      ),
    )

    const SaveInterviewResultAction = await dispatch(
      reduxServices.intervieweeDetails.scheduleInterview({
        candidateId: timeLineListSelector.personId,
        description: comments,
        interviewRound: Number(interviewRoundCountResult.payload) + 1,
        interviewType: mode,
        interviewerId: result[0].id,
        scheduleDate: selectDateValue,
        scheduleTime: formattedTime,
        sendMailToCandidate: false,
        sendMailToInterviewer: true,
        sendMessageToCandidate: false,
        sendMessageToInterviewer: false,
      }),
    )
    if (
      reduxServices.intervieweeDetails.scheduleInterview.fulfilled.match(
        SaveInterviewResultAction,
      )
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Leave calender settings are done"
          />,
        ),
      )
    }
  }

  const itemsLayout = (
    id: string | number,
    fullName: string,
    isHighlighted: boolean,
  ): JSX.Element => {
    return (
      <div
        data-testid="option"
        className={
          isHighlighted
            ? 'autocomplete-dropdown-item active'
            : 'autocomplete-dropdown-item '
        }
        key={id}
      >
        {fullName}
      </div>
    )
  }

  const onHandleSelectHRAssociate = (projectName: string) => {
    setAutoCompleteTarget(projectName)
  }

  const clearBtnHandler = () => {
    setSelectDate('')
    setAutoCompleteTarget('')
    setComments('')
    setMode('')
  }

  useEffect(() => {
    if (selectDate && mode && autoCompleteTarget) {
      setIsSaveBtnEnable(true)
    } else {
      setIsSaveBtnEnable(false)
    }
  }, [selectDate, mode, autoCompleteTarget])

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
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Date:
          </CFormLabel>
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
              value={selectDateValue}
              onChange={(date: Date) => {
                setSelectDate(date)
              }}
              selected={selectDate as Date}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Time:
          </CFormLabel>
          <CCol sm={2}>
            <CRow>
              <CCol sm={6}>
                <CFormInput
                  autoComplete="off"
                  type="text"
                  id="Name"
                  name="personName"
                  data-testid="person-name"
                  value={timePicker.hours}
                  onChange={(e) => {
                    setTimePicker({
                      ...timePicker,
                      hours: e.target.value,
                    })
                  }}
                  max={12}
                />
              </CCol>
              <CCol sm={6}>
                <CFormInput
                  autoComplete="off"
                  type="text"
                  id="Name"
                  name="personName"
                  data-testid="person-name"
                  value={timePicker.minutes}
                  onChange={(e) => {
                    setTimePicker({
                      ...timePicker,
                      minutes: e.target.value,
                    })
                  }}
                />
              </CCol>
              <CCol sm={6}>
                <CFormSelect
                  aria-label="startTimeMeridian"
                  id="startTimeMeridian"
                  data-testid="startTimeMeridian"
                  name="startTimeMeridian"
                  value={timePicker.meridian}
                  onChange={(e) => {
                    setTimePicker({
                      ...timePicker,
                      meridian: e.target.value,
                    })
                  }}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </CFormSelect>
              </CCol>
            </CRow>
            <CFormCheck
              type="checkbox"
              id="checked"
              name="checked"
              data-testid="checked"
              checked={mailToCandidate}
              onChange={(e) => setMailToCandidate(e.target.checked)}
              inline
            />
            <b>Send mail to candidate</b>
            <CFormCheck
              type="checkbox"
              id="checked"
              name="checked"
              data-testid="checked"
              checked={sendMailToInterviewer}
              onChange={(e) => setSendMailToInterviewer(e.target.checked)}
              inline
            />
            <b>Send mail to interviewer</b>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Mode:
          </CFormLabel>
          <CCol sm={2}>
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
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Interviewer:
          </CFormLabel>
          <CCol sm={2}>
            <Autocomplete
              inputProps={{
                className: 'form-control form-control-sm hr-autocomplete',
                id: 'hr-autocomplete',
                placeholder: 'Type name here for auto fill',
              }}
              getItemValue={(item) => item.fullName}
              data-testid="hrautocomplete"
              items={interviewProfiles}
              wrapperStyle={{ position: 'relative' }}
              renderMenu={(children) => (
                <div
                  className={
                    autoCompleteTarget && autoCompleteTarget.length > 0
                      ? 'autocomplete-dropdown-wrap'
                      : 'autocomplete-dropdown-wrap hide'
                  }
                >
                  {children}
                </div>
              )}
              renderItem={(item, isHighlighted) =>
                itemsLayout(item.id, item.fullName, isHighlighted)
              }
              value={autoCompleteTarget}
              shouldItemRender={(item, value) =>
                item.fullName.toLowerCase().indexOf(value.toLowerCase()) > -1
              }
              onChange={(e) => setAutoCompleteTarget(e.target.value)}
              onSelect={(value) => onHandleSelectHRAssociate(value)}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Comments:
          </CFormLabel>
          <CCol sm={2}>
            <CFormTextarea
              data-testid="text-area"
              aria-label="textarea"
              autoComplete="off"
              maxLength={150}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            ></CFormTextarea>
            <CFormCheck
              type="checkbox"
              id="checked"
              name="checked"
              data-testid="checked"
              checked={sendMessageToCandidate}
              onChange={(e) => setSendMessageToCandidate(e.target.checked)}
              inline
            />
            <b>Send Message to candidate</b>
            <CFormCheck
              type="checkbox"
              id="sendMessageToInterviewer"
              name="sendMessageToInterviewer"
              data-testid="checked"
              checked={sendMessageToInterviewer}
              onChange={(e) => setSendMessageToInterviewer(e.target.checked)}
              inline
            />
            <b>Send Message to interviewer</b>
          </CCol>
        </CRow>
        <CRow>
          <CCol md={{ span: 6, offset: 3 }}>
            <CButton
              className="btn-ovh me-1"
              color="success"
              onClick={handleSaveScheduleInterview}
              disabled={!isSaveBtnEnable}
            >
              Save
            </CButton>

            <CButton
              color="warning "
              className="btn-ovh"
              onClick={clearBtnHandler}
            >
              Clear
            </CButton>
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default ReSchedule
