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

const ReSchedule = (): JSX.Element => {
  const [rescheduleSelectDate, setRescheduleSelectDate] = useState<
    string | Date
  >('')
  const history = useHistory()

  const [rescheduleContactLink, setRescheduleContactLink] = useState<string>('')
  const [rescheduleMode, setRescheduleMode] = useState<string>('')
  const [rescheduleComments, setRescheduleComments] = useState<string>('')
  const [rescheduleMailToCandidate, setRescheduleMailToCandidate] =
    useState<boolean>(false)
  const [rescheduleSendMailToInterviewer, setRescheduleSendMailToInterviewer] =
    useState<boolean>(false)
  const [
    rescheduleSendMessageToCandidate,
    setRescheduleSendMessageToCandidate,
  ] = useState<boolean>(false)
  const [
    rescheduleSendMessageToInterviewer,
    setRescheduleSendMessageToInterviewer,
  ] = useState<boolean>(false)
  const [isSaveBtnEnable, setIsSaveBtnEnable] = useState(false)
  const [rescheduleAutoCompleteTarget, setRescheduleAutoCompleteTarget] =
    useState<string>('')

  const selectRescheduleDateValue = rescheduleSelectDate
    ? new Date(rescheduleSelectDate).toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit',
      })
    : ''

  const resultTime = new Date().toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  })
  const rescheduleStartHour = resultTime?.split(':')[0]
  const rescheduleStartMinutesDay = resultTime?.split(':')[1]?.split(' ')[0]
  const rescheduleStartMeridianDay = resultTime?.split(':')[1]?.split(' ')[1]

  const [rescheduleTimePicker, setRescheduleTimePicker] = useState({
    hours: rescheduleStartHour,
    minutes: rescheduleStartMinutesDay,
    meridian: rescheduleStartMeridianDay,
  })

  const interviewProfiles = useTypedSelector(
    reduxServices.intervieweeDetails.selectors.employeeProperties,
  )

  const result = interviewProfiles.filter(
    (item) => item.fullName === rescheduleAutoCompleteTarget,
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

  const formattedTime = `${rescheduleTimePicker.hours}:${rescheduleTimePicker.minutes} ${rescheduleTimePicker.meridian}`

  const handleSaveScheduleInterview = async () => {
    const SaveInterviewResultAction = await dispatch(
      reduxServices.intervieweeDetails.reScheduleInterview({
        candidateId: timeLineListSelector.personId,
        contactDetails: rescheduleContactLink || '',
        description: rescheduleComments,
        interviewType: rescheduleMode,
        interviewerId: result[0].id,
        scheduleDate: selectRescheduleDateValue,
        scheduleTime: formattedTime,
        sendMailToCandidate: rescheduleMailToCandidate,
        sendMailToInterviewer: rescheduleSendMailToInterviewer,
        sendMessageToCandidate: rescheduleSendMessageToCandidate,
        sendMessageToInterviewer: rescheduleSendMessageToInterviewer,
      }),
    )
    if (
      reduxServices.intervieweeDetails.reScheduleInterview.fulfilled.match(
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

  const rescheduleInterviewItemsLayout = (
    id: string | number,
    fullName: string,
    isHighlighted: boolean,
  ): JSX.Element => {
    return (
      <div
        data-testid="option-test"
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

  const onHandleRescheduleInterviewer = (projectName: string) => {
    setRescheduleAutoCompleteTarget(projectName)
  }

  const clearBtnHandler = () => {
    setRescheduleSelectDate('')
    setRescheduleAutoCompleteTarget('')
    setRescheduleComments('')
    setRescheduleMode('')
    setRescheduleMailToCandidate(false)
    setRescheduleSendMailToInterviewer(false)
    setRescheduleContactLink('')
  }

  useEffect(() => {
    if (
      rescheduleSelectDate &&
      rescheduleMode &&
      rescheduleAutoCompleteTarget &&
      (rescheduleMailToCandidate === true ||
        rescheduleSendMailToInterviewer === true)
    ) {
      setIsSaveBtnEnable(true)
    } else {
      setIsSaveBtnEnable(false)
    }
  }, [
    rescheduleSelectDate,
    rescheduleMode,
    rescheduleAutoCompleteTarget,
    rescheduleMailToCandidate,
    rescheduleSendMailToInterviewer,
  ])

  const onChangeRescheduleInterviewHourHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target
    if (Number(value) <= 12) {
      setRescheduleTimePicker({
        ...rescheduleTimePicker,
        hours: e.target.value,
      })
    } else {
      setRescheduleTimePicker({
        ...rescheduleTimePicker,
        hours: '',
      })
    }
  }

  const backBtnHandler = () => {
    history.push(`/candidatetimeline/${timeLineListSelector.personId}`)
  }
  const checkMandatoryContactLink = rescheduleContactLink
    ? TextWhite
    : TextDanger
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
            <span
              className={selectRescheduleDateValue ? TextWhite : TextDanger}
            >
              *
            </span>
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
              value={selectRescheduleDateValue}
              onChange={(date: Date) => {
                setRescheduleSelectDate(date)
              }}
              selected={rescheduleSelectDate as Date}
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
                  value={rescheduleTimePicker.hours}
                  onChange={onChangeRescheduleInterviewHourHandler}
                />
              </CCol>
              <CCol sm={4}>
                <CFormInput
                  autoComplete="off"
                  type="text"
                  id="minutes"
                  name="minutes"
                  data-testid="minutes"
                  value={rescheduleTimePicker.minutes}
                  onChange={(e) => {
                    setRescheduleTimePicker({
                      ...rescheduleTimePicker,
                      minutes: e.target.value,
                    })
                  }}
                />
              </CCol>
              <CCol sm={4}>
                <CFormSelect
                  aria-label="startTimeMeridian"
                  id="startTimeMeridian"
                  data-testid="startTimeMeridian"
                  name="startTimeMeridian"
                  value={rescheduleTimePicker.meridian}
                  onChange={(e) => {
                    setRescheduleTimePicker({
                      ...rescheduleTimePicker,
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
                data-testid="rescheduleMailToCandidate"
                checked={rescheduleMailToCandidate}
                onChange={(e) => setRescheduleMailToCandidate(e.target.checked)}
                inline
              />
              <b className="ms-1">Send mail to candidate</b>
            </div>
            <div>
              <CFormCheck
                type="checkbox"
                id="checked"
                name="checked"
                data-testid="rescheduleSendMailToInterviewer"
                checked={rescheduleSendMailToInterviewer}
                onChange={(e) =>
                  setRescheduleSendMailToInterviewer(e.target.checked)
                }
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
            <span className={rescheduleMode ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="mode"
              data-testid="select-mode"
              name="mode"
              value={rescheduleMode}
              onChange={(e) => setRescheduleMode(e.target.value)}
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
        {rescheduleMode === 'FACE_TO_FACE' ||
        rescheduleMode === 'SYSTEM' ||
        rescheduleMode === '' ? (
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
                value={rescheduleContactLink}
                onChange={(e) => setRescheduleContactLink(e.target.value)}
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
              className={rescheduleAutoCompleteTarget ? TextWhite : TextDanger}
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
                    rescheduleAutoCompleteTarget &&
                    rescheduleAutoCompleteTarget.length > 0
                      ? 'autocomplete-dropdown-wrap'
                      : 'autocomplete-dropdown-wrap hide'
                  }
                >
                  {children}
                </div>
              )}
              renderItem={(item, isHighlighted) =>
                rescheduleInterviewItemsLayout(
                  item.id,
                  item.fullName,
                  isHighlighted,
                )
              }
              value={rescheduleAutoCompleteTarget}
              shouldItemRender={(item, value) =>
                item.fullName.toLowerCase().indexOf(value.toLowerCase()) > -1
              }
              onChange={(e) => setRescheduleAutoCompleteTarget(e.target.value)}
              onSelect={(value) => onHandleRescheduleInterviewer(value)}
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
              value={rescheduleComments}
              onChange={(e) => setRescheduleComments(e.target.value)}
            ></CFormTextarea>
          </CCol>
          <CCol sm={4}>
            <div>
              <CFormCheck
                type="checkbox"
                id="checked"
                name="checked"
                data-testid="rescheduleSendMessageToCandidate"
                checked={rescheduleSendMessageToCandidate}
                onChange={(e) =>
                  setRescheduleSendMessageToCandidate(e.target.checked)
                }
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
                checked={rescheduleSendMessageToInterviewer}
                onChange={(e) =>
                  setRescheduleSendMessageToInterviewer(e.target.checked)
                }
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

export default ReSchedule
