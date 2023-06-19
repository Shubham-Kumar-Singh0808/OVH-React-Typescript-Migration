import {
  CRow,
  CCol,
  CButton,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CFormCheck,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactDatePicker from 'react-datepicker'
import Autocomplete from 'react-autocomplete'
import OCard from '../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../reducers/reduxServices'
import { showIsRequired } from '../../../../utils/helper'
import { deviceLocale } from '../../../../utils/dateFormatUtils'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'

const ReSchedule = () => {
  const [dateValue, setDateValue] = useState<string | Date>('')
  const [time, setTime] = useState<string>('')
  const [mode, setMode] = useState<string>('')
  const [interviewer, setInterviewer] = useState<string>('')
  const [comments, setComments] = useState<string>('')
  const [mailToCcandidate, setMailToCcandidate] = useState<boolean>(false)
  const [sendMailToInterviewer, setSendMailToInterviewer] =
    useState<boolean>(false)
  const [sendMessageTocandidate, setSendMessageTocandidate] =
    useState<boolean>(false)
  const [sendMessageToInterviewer, setSendMessageToInterviewer] =
    useState<boolean>(false)
  const [isEnable, setIsEnable] = useState(false)
  const [projectsAutoCompleteTarget, setProjectsAutoCompleteTarget] =
    useState<string>('')

  const fromDateValue = dateValue
    ? new Date(dateValue).toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit',
      })
    : ''

  const allProjectNames = useTypedSelector(
    reduxServices.intervieweeDetails.selectors.employeeProperties,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(reduxServices.intervieweeDetails.getAllEmployeeDetails())
  }, [dispatch])

  const autoCompleteOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setProjectsAutoCompleteTarget(e.target.value)
  }

  const onHandleSelectProjectName = (projectName: string) => {
    setProjectsAutoCompleteTarget(projectName)
    setIsEnable(true)
  }
  const formLabelProps = {
    htmlFor: 'inputNewHandbook',
    className: 'col-form-label category-label',
  }
  const formLabel = 'col-sm-3 col-form-label text-end'

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
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">
            Date:
            <span className={showIsRequired(dateValue as string)}>*</span>
          </CFormLabel>
        </CCol>
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
            value={fromDateValue}
            onChange={(date: Date) => {
              setDateValue(date)
            }}
            selected={dateValue as Date}
          />
        </CCol>
        <CFormCheck
          type="checkbox"
          id="checked"
          name="checked"
          data-testid="checked"
          checked={mailToCcandidate}
          onChange={(e) => setMailToCcandidate(e.target.checked)}
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
        <CRow className="mt-3">
          <CFormLabel {...formLabelProps} className={formLabel}>
            Interviewer:
            <span className={isEnable ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <Autocomplete
              inputProps={{
                className: 'form-control form-control-sm',
                placeholder: 'Project Name',
              }}
              getItemValue={(item) => item.projectName}
              items={allProjectNames ? allProjectNames : []}
              wrapperStyle={{ position: 'relative' }}
              renderMenu={(children) => (
                <div
                  className={
                    projectsAutoCompleteTarget &&
                    projectsAutoCompleteTarget.length > 0
                      ? 'autocomplete-dropdown-wrap'
                      : 'autocomplete-dropdown-wrap hide'
                  }
                >
                  {children}
                </div>
              )}
              renderItem={(item, isHighlighted) => (
                <div
                  data-testid="project-option"
                  className={
                    isHighlighted
                      ? 'autocomplete-dropdown-item active'
                      : 'autocomplete-dropdown-item '
                  }
                  key={item.id}
                >
                  {item.projectName}
                </div>
              )}
              value={projectsAutoCompleteTarget}
              shouldItemRender={(item, itemValue) =>
                item?.projectName
                  ?.toLowerCase()
                  .indexOf(itemValue.toLowerCase()) > -1
              }
              onChange={(e) => autoCompleteOnChangeHandler(e)}
              onSelect={(selectedVal) => onHandleSelectProjectName(selectedVal)}
            />
          </CCol>
        </CRow>
        <CFormLabel className="col-sm-3">
          Comments:
          <span
            className={comments?.replace(/^\s*/, '') ? TextWhite : TextDanger}
          >
            *
          </span>
        </CFormLabel>
        <CCol sm={6}>
          <CFormTextarea
            data-testid="text-area"
            aria-label="textarea"
            autoComplete="off"
            maxLength={150}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          ></CFormTextarea>
        </CCol>
        <CFormCheck
          type="checkbox"
          id="checked"
          name="checked"
          data-testid="checked"
          checked={sendMessageTocandidate}
          onChange={(e) => setSendMessageTocandidate(e.target.checked)}
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
      </OCard>
    </>
  )
}

export default ReSchedule
