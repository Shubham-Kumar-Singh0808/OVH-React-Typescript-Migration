import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { TextWhite, TextDanger } from '../../../constant/ClassName'
import { formLabelProps } from '../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'

const IntervieweeDetailsTimeline = () => {
  const dispatch = useAppDispatch()

  const timeLineListSelector = useTypedSelector(
    reduxServices.intervieweeDetails.selectors.TimeLineListSelector,
  )
  const scheduleInterviewData = useTypedSelector(
    reduxServices.intervieweeDetails.selectors.scheduleInterviewData,
  )
  const [jobTitle, setJobTitle] = useState<string>('')
  const [proactive, setProactive] = useState<string>('')

  const [communication, setCommunication] = useState<string>('')

  const [excellence, setExcellence] = useState<string>('')

  const [otherComments, setOtherComments] = useState<string>('')

  const [selectRating, setSelectRating] = useState<string>('')

  const [isBtnEnable, setIsBtnEnable] = useState(false)

  useEffect(() => {
    if (proactive && communication && excellence && otherComments) {
      setIsBtnEnable(true)
    } else {
      setIsBtnEnable(false)
    }
  }, [proactive, communication, excellence, otherComments])
  const handledInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'proactive') {
      const newValue = value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, '')
      setProactive(newValue)
    } else if (name === 'communication') {
      const newValue = value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, '')
      setCommunication(newValue)
    } else if (name === 'excellence') {
      const targetValue = value
        .replace(/-_[^a-z0-9\s]/gi, '')
        .replace(/^\s*/, '')
      setExcellence(targetValue)
    } else if (name === 'otherComments') {
      const newValue = value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, '')
      setOtherComments(newValue)
    }
  }

  const saveButtonHandler = async () => {
    const updateResultAction = await dispatch(
      reduxServices.intervieweeDetails.updateInterview({
        candiadateEmailId: 'sunnymaish2212@gmail.com',
        candidateId: '13806',
        candidateName: 'Jyo Goru',
        communicationComments: communication,
        country: null,
        ctc: null,
        cycleDTOs: null,
        description: null,
        ectc: null,
        excellenceComments: excellence,
        experiance: null,
        interviewComments: 'test',
        interviewCycleId: 21836,
        interviewDate: '17 May 2023',
        interviewMode: 'FACE_TO_FACE',
        interviewResultStatus: null,
        interviewRound: '1',
        interviewStatus: null,
        interviewTime: '9:30 PM',
        interviewers: 'Sunny Manesh Kumar Eagala',
        interviewersDTOList: null,
        jobCode: null,
        mobileNumber: '9966223254',
        np: null,
        personId: null,
        proactiveComments: proactive,
        rating: 1,
        reason: null,
        recruiter: null,
        skills: 'Automation',
        skypeId: null,
        sourceName: null,
        status: 'pending',
        technology: null,
        updatedBy: null,
      }),
    )
    if (
      reduxServices.intervieweeDetails.updateInterview.fulfilled.match(
        updateResultAction,
      )
    ) {
      dispatch(
        reduxServices.intervieweeDetails.timeLineData(
          Number(scheduleInterviewData.candidateId),
        ),
      )
      dispatch(
        reduxServices.intervieweeDetails.empScheduleInterviewDetails(
          scheduleInterviewData.interviewCycleId,
        ),
      )
    }
  }
  return (
    <>
      <div className="sh-timeline-container">
        {timeLineListSelector?.cycleDTOs?.length > 0 &&
          timeLineListSelector?.cycleDTOs?.map((item, index) => {
            return (
              <>
                <div key={index} className="sh-timeline-card">
                  <div
                    className="sh-timeline-timestamp"
                    data-testid="sh-time-stamp"
                  >
                    {item.interviewDate} {item.interviewTime}
                  </div>

                  <div className="sh-timeline-content">
                    <div
                      className="sh-timeline-header mb-4 clearfix"
                      data-testid="sh-modifiedBy"
                    >
                      <CFormLabel className="col-form-label p-0">
                        {item.interviewRound}
                      </CFormLabel>
                      <Link to={''}>
                        <h4 className="sh-timeline-title">
                          {item.updatedBy} - {item.rating}★★★★
                        </h4>
                      </Link>
                    </div>
                    <div className="sh-timeline-body">
                      <div className="sh-timeline-item mb-1"></div>
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            <blockquote>Proactive :</blockquote>
                          </CFormLabel>
                          &nbsp;
                          {item.proactiveComments}
                        </div>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            <blockquote>Communication :</blockquote>
                          </CFormLabel>
                          &nbsp;
                          {item.communicationComments}
                          {selectRating}
                        </div>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            <blockquote>Excellence :</blockquote>
                          </CFormLabel>
                          &nbsp;
                          {item.excellenceComments}
                        </div>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            <blockquote>Other Comments :</blockquote>
                          </CFormLabel>
                          &nbsp;
                          {item.interviewComments}
                        </div>
                      </>
                    </div>
                  </div>
                </div>
              </>
            )
          })}
      </div>
      <CRow className="mt-3 mb-3">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Rating:
          <span className={jobTitle ? TextWhite : TextDanger}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            className="mb-2"
            data-testid="jobTitle"
            type="text"
            id="jobTitle"
            size="sm"
            name="jobTitle"
            autoComplete="off"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </CCol>
      </CRow>
      <CRow className="mt-3 mb-3">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Proactive:
          <span className={proactive ? TextWhite : TextDanger}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            className="mb-2"
            data-testid="proactive"
            type="text"
            id="proactive"
            size="sm"
            name="proactive"
            autoComplete="off"
            value={proactive}
            onChange={handledInputChange}
          />
        </CCol>
      </CRow>
      <CRow className="mt-3 mb-3">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Communication:
          <span className={communication ? TextWhite : TextDanger}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            className="mb-2"
            data-testid="communication"
            type="text"
            id="communication"
            size="sm"
            name="communication"
            autoComplete="off"
            value={communication}
            onChange={handledInputChange}
          />
        </CCol>
      </CRow>
      <CRow className="mt-3 mb-3">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Excellence:
          <span className={excellence ? TextWhite : TextDanger}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            className="mb-2"
            data-testid="excellence"
            type="text"
            id="excellence"
            size="sm"
            name="excellence"
            autoComplete="off"
            value={excellence}
            onChange={handledInputChange}
          />
        </CCol>
      </CRow>
      <CRow className="mt-3 mb-3">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Other Comments:
          <span
            className={
              otherComments.replace(/^\s*/, '') ? TextWhite : TextDanger
            }
          >
            *
          </span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormTextarea
            placeholder="Enter Your Comments"
            data-testid="text-area"
            aria-label="textarea"
            autoComplete="off"
            value={otherComments}
            maxLength={250}
            onChange={(e) => setOtherComments(e.target.value)}
          ></CFormTextarea>
          <p>{otherComments?.length}Left/250Max</p>
        </CCol>
      </CRow>
      <CRow>
        <CCol md={{ span: 6, offset: 3 }}>
          <CButton
            data-testid="save-btn"
            className="btn-ovh me-1 text-white"
            color="warning"
            onClick={saveButtonHandler}
            disabled={!isBtnEnable}
          >
            Save
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}

export default IntervieweeDetailsTimeline
