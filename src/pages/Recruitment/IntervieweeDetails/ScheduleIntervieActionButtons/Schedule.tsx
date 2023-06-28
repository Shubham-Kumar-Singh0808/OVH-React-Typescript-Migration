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
import { useHistory } from 'react-router-dom'
import OCard from '../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../reducers/reduxServices'
import { deviceLocale } from '../../../../utils/dateFormatUtils'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import OToast from '../../../../components/ReusableComponent/OToast'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'

const Schedule = (): JSX.Element => {
  const [selectDate, setSelectDate] = useState<string | Date>('')
  const history = useHistory()
  const resultTime = new Date().toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  })
  const startHour = resultTime?.split(':')[0]
  const startMinutesDay = resultTime?.split(':')[1]?.split(' ')[0]
  const startMeridianDay = resultTime?.split(':')[1]?.split(' ')[1]
  const [contactLink, setContactLink] = useState<string>('')
  const [scheduleInterviewMode, setScheduleInterviewMode] = useState<string>('')
  const [comments, setComments] = useState<string>('')
  const [mailToCandidate, setMailToCandidate] = useState<boolean>(false)
  const [sendMailToInterviewer, setSendMailToInterviewer] =
    useState<boolean>(false)
  const [sendMessageToCandidate, setSendMessageToCandidate] =
    useState<boolean>(false)
  const [sendMessageToInterviewer, setSendMessageToInterviewer] =
    useState<boolean>(false)
  const [isSaveBtnEnable, setIsSaveBtnEnable] = useState(false)
  const [interviewerAutoCompleteTarget, setScheduleAutoCompleteTarget] =
    useState<string>('')

  const selectDateValue = selectDate
    ? new Date(selectDate).toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit',
      })
    : ''

  const [scheduleInterviewTimePicker, setScheduleInterviewTimePicker] =
    useState({
      hours: startHour,
      minutes: startMinutesDay,
      meridian: startMeridianDay,
    })

  const interviewProfiles = useTypedSelector(
    reduxServices.intervieweeDetails.selectors.employeeProperties,
  )

  const result = interviewProfiles.filter(
    (item) => item.fullName === interviewerAutoCompleteTarget,
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

  const formattedTime = `${scheduleInterviewTimePicker.hours}:${scheduleInterviewTimePicker.minutes} ${scheduleInterviewTimePicker.meridian}`

  const handleSaveScheduleInterview = async () => {
    const interviewRoundCountResult = await dispatch(
      reduxServices.intervieweeDetails.interviewRoundCount(
        timeLineListSelector.personId,
      ),
    )

    const SaveInterviewResultAction = await dispatch(
      reduxServices.intervieweeDetails.scheduleInterview({
        candidateId: timeLineListSelector.personId,
        contactDetails: contactLink || '',
        description: comments,
        interviewRound: Number(interviewRoundCountResult.payload) + 1,
        interviewType: scheduleInterviewMode,
        interviewerId: result[0].id,
        scheduleDate: selectDateValue,
        scheduleTime: formattedTime,
        sendMailToCandidate: mailToCandidate,
        sendMailToInterviewer,
        sendMessageToCandidate,
        sendMessageToInterviewer,
      }),
    )
    if (
      reduxServices.intervieweeDetails.scheduleInterview.fulfilled.match(
        SaveInterviewResultAction,
      )
    ) {
      history.push('/jobschedulecandidateList')
    } else if (
      reduxServices.intervieweeDetails.scheduleInterview.rejected.match(
        SaveInterviewResultAction,
      ) &&
      SaveInterviewResultAction.payload === 409
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="danger"
            toastMessage="            
            Candidate already Scheduled"
          />,
        ),
      )
    }
  }

  const scheduleInterviewItemsLayout = (
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

  const onHandleSelectInterviewer = (employeeName: string) => {
    setScheduleAutoCompleteTarget(employeeName)
  }

  const clearBtnHandler = () => {
    setSelectDate('')
    setScheduleAutoCompleteTarget('')
    setComments('')
    setScheduleInterviewMode('')
    setMailToCandidate(false)
    setSendMailToInterviewer(false)
    setContactLink('')
  }

  useEffect(() => {
    if (
      selectDate &&
      scheduleInterviewMode &&
      interviewerAutoCompleteTarget &&
      (mailToCandidate === true || sendMailToInterviewer === true)
    ) {
      setIsSaveBtnEnable(true)
    } else {
      setIsSaveBtnEnable(false)
    }
  }, [
    selectDate,
    scheduleInterviewMode,
    interviewerAutoCompleteTarget,
    mailToCandidate,
    sendMailToInterviewer,
  ])

  const onChangeScheduleInterviewHourHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target
    if (Number(value) <= 12) {
      setScheduleInterviewTimePicker({
        ...scheduleInterviewTimePicker,
        hours: e.target.value,
      })
    } else {
      setScheduleInterviewTimePicker({
        ...scheduleInterviewTimePicker,
        hours: '',
      })
    }
  }

  const onChangeScheduleInterviewMinutesHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target
    if (Number(value) <= 60) {
      setScheduleInterviewTimePicker({
        ...scheduleInterviewTimePicker,
        minutes: e.target.value,
      })
    } else {
      setScheduleInterviewTimePicker({
        ...scheduleInterviewTimePicker,
        minutes: '',
      })
    }
  }

  const backBtnHandler = () => {
    history.push(`/candidatetimeline/${timeLineListSelector.personId}`)
  }
  const checkMandatoryContactLink = contactLink ? TextWhite : TextDanger
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Schedule Interview"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="back-button"
              onClick={backBtnHandler}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-2 col-form-label text-end"
          >
            Date:
            <span className={selectDateValue ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          <CCol sm={3}>
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
        <CRow className="mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-2 col-form-label text-end"
          >
            Time:
          </CFormLabel>
          <CCol sm={3}>
            <CRow>
              <CCol sm={4}>
                <CFormInput
                  autoComplete="off"
                  type="text"
                  id="hours"
                  name="hours"
                  data-testid="hours"
                  value={scheduleInterviewTimePicker.hours}
                  onChange={onChangeScheduleInterviewHourHandler}
                />
              </CCol>
              <CCol sm={4}>
                <CFormInput
                  autoComplete="off"
                  type="text"
                  id="minutes"
                  name="minutes"
                  data-testid="minutes"
                  value={scheduleInterviewTimePicker.minutes}
                  onChange={onChangeScheduleInterviewMinutesHandler}
                />
              </CCol>
              <CCol sm={4}>
                <CFormSelect
                  aria-label="startTimeMeridian"
                  id="startTimeMeridian"
                  data-testid="startTimeMeridian"
                  name="startTimeMeridian"
                  value={scheduleInterviewTimePicker.meridian}
                  onChange={(e) => {
                    setScheduleInterviewTimePicker({
                      ...scheduleInterviewTimePicker,
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
          <CCol sm={4}>
            <div>
              <CFormCheck
                type="checkbox"
                id="checked"
                name="checked"
                data-testid="send-to-Candidate"
                checked={mailToCandidate}
                onChange={(e) => setMailToCandidate(e.target.checked)}
                inline
              />
              <b className="ms-1">Send mail to candidate</b>
            </div>
            <div>
              <CFormCheck
                type="checkbox"
                id="checked"
                name="checked"
                data-testid="send-to-interviewer"
                checked={sendMailToInterviewer}
                onChange={(e) => setSendMailToInterviewer(e.target.checked)}
                inline
              />
              <b className="ms-1">Send mail to interviewer</b>
            </div>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-2 col-form-label text-end"
          >
            Mode:
            <span className={scheduleInterviewMode ? TextWhite : TextDanger}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="mode"
              data-testid="select-mode"
              name="mode"
              value={scheduleInterviewMode}
              onChange={(e) => setScheduleInterviewMode(e.target.value)}
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
        {scheduleInterviewMode === 'FACE_TO_FACE' ||
        scheduleInterviewMode === 'SYSTEM' ||
        scheduleInterviewMode === '' ? (
          ''
        ) : (
          <CRow className="mb-3">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-2 col-form-label text-end"
            >
              Contact/Link:
              <span className={checkMandatoryContactLink}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                autoComplete="off"
                type="text"
                id="contactLink"
                name="contactLink"
                placeholder="Enter Contact number or Meeting link"
                data-testid="person-name"
                value={contactLink}
                onChange={(e) => setContactLink(e.target.value)}
              />
            </CCol>
          </CRow>
        )}
        <CRow className="mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-2 col-form-label text-end"
          >
            Interviewer:
            <span
              className={interviewerAutoCompleteTarget ? TextWhite : TextDanger}
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
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
                    interviewerAutoCompleteTarget &&
                    interviewerAutoCompleteTarget.length > 0
                      ? 'autocomplete-dropdown-wrap'
                      : 'autocomplete-dropdown-wrap hide'
                  }
                >
                  {children}
                </div>
              )}
              renderItem={(item, isHighlighted) =>
                scheduleInterviewItemsLayout(
                  item.id,
                  item.fullName,
                  isHighlighted,
                )
              }
              value={interviewerAutoCompleteTarget}
              shouldItemRender={(item, value) =>
                item.fullName.toLowerCase().indexOf(value.toLowerCase()) > -1
              }
              onChange={(e) => setScheduleAutoCompleteTarget(e.target.value)}
              onSelect={(value) => onHandleSelectInterviewer(value)}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-2 col-form-label text-end"
          >
            Comments:
          </CFormLabel>
          <CCol sm={3}>
            <CFormTextarea
              data-testid="text-area"
              aria-label="textarea"
              autoComplete="off"
              maxLength={150}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            ></CFormTextarea>
          </CCol>
          <CCol sm={4}>
            <div>
              <CFormCheck
                type="checkbox"
                id="checked"
                name="checked"
                data-testid="sendMessageToCandidate"
                checked={sendMessageToCandidate}
                onChange={(e) => setSendMessageToCandidate(e.target.checked)}
                inline
              />
              <b className="ms-1">Send Message to candidate</b>
            </div>
            <div>
              <CFormCheck
                type="checkbox"
                id="sendMessageToInterviewer"
                name="sendMessageToInterviewer"
                data-testid="sendMessageToInterviewer"
                checked={sendMessageToInterviewer}
                onChange={(e) => setSendMessageToInterviewer(e.target.checked)}
                inline
              />
              <b className="ms-1">Send Message to interviewer</b>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol md={{ span: 6, offset: 2 }}>
            <CButton
              className="btn-ovh me-1"
              color="success"
              data-testid="save-btn"
              onClick={handleSaveScheduleInterview}
              disabled={!isSaveBtnEnable}
            >
              Save
            </CButton>
            <CButton
              color="warning "
              className="btn-ovh"
              onClick={clearBtnHandler}
              data-testid="clear-btn"
            >
              Clear
            </CButton>
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default Schedule
