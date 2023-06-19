import {
  CRow,
  CFormLabel,
  CCol,
  CFormInput,
  CFormTextarea,
  CButton,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import RatingStar from './RatingStar'
import { TextWhite, TextDanger } from '../../../constant/ClassName'
import { formLabelProps } from '../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const InterviewDetailsRatingForm = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const scheduleInterviewData = useTypedSelector(
    reduxServices.intervieweeDetails.selectors.scheduleInterviewData,
  )
  const [rating, setRating] = useState<number | null>(null)

  const [proactive, setProactive] = useState<string>('')

  const [communication, setCommunication] = useState<string>('')

  const [excellence, setExcellence] = useState<string>('')

  const [otherComments, setOtherComments] = useState<string>('')

  const [isBtnEnable, setIsBtnEnable] = useState(false)

  useEffect(() => {
    if (proactive && communication && excellence && otherComments) {
      setIsBtnEnable(true)
    } else {
      setIsBtnEnable(false)
    }
  }, [proactive, communication, excellence, otherComments, rating])
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
        candidateId: scheduleInterviewData.candidateId,
        interviewers: scheduleInterviewData.interviewers,
        interviewersDTOList: scheduleInterviewData.interviewersDTOList,
        interviewDate: scheduleInterviewData.interviewDate,
        interviewTime: scheduleInterviewData.interviewTime,
        interviewComments: scheduleInterviewData.interviewComments,
        interviewRound: scheduleInterviewData.interviewRound,
        interviewStatus: scheduleInterviewData.interviewStatus,
        candidateName: scheduleInterviewData.candidateName,
        interviewMode: scheduleInterviewData.interviewMode,
        interviewCycleId: scheduleInterviewData.interviewCycleId,
        experiance: scheduleInterviewData.experiance,
        rating,
        status: scheduleInterviewData.status,
        candiadateEmailId: scheduleInterviewData.candiadateEmailId,
        skills: scheduleInterviewData.skills,
        mobileNumber: scheduleInterviewData.mobileNumber,
        cycleDTOs: scheduleInterviewData.cycleDTOs,
        interviewResultStatus: scheduleInterviewData.interviewResultStatus,
        description: scheduleInterviewData.description,
        skypeId: scheduleInterviewData.skypeId,
        proactiveComments: proactive,
        communicationComments: communication,
        excellenceComments: excellence,
        updatedBy: scheduleInterviewData.updatedBy,
        recruiter: scheduleInterviewData.recruiter,
        reason: scheduleInterviewData.reason,
        ctc: scheduleInterviewData.ctc,
        ectc: scheduleInterviewData.ectc,
        technology: scheduleInterviewData.technology,
        np: scheduleInterviewData.np,
        country: scheduleInterviewData.country,
        jobCode: scheduleInterviewData.jobCode,
        sourceName: scheduleInterviewData.sourceName,
        personId: scheduleInterviewData.personId,
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
          scheduleInterviewData.interviewCycleId as number,
        ),
      )
    }
  }
  return (
    <>
      <div className="sh-timeline-body">
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Rating:
            <span className={rating ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          <CCol>
            <RatingStar rating={rating} setRating={setRating} />
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
      </div>
    </>
  )
}

export default InterviewDetailsRatingForm
