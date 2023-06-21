import React, { useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react-pro'
import { useHistory } from 'react-router-dom'
import IntervieweeDetailsTimeline from './IntervieweeDetailsTimeline'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OModal from '../../../components/ReusableComponent/OModal'
import { TextDanger, TextWhite } from '../../../constant/ClassName'
import OToast from '../../../components/ReusableComponent/OToast'
import NoShow from '../ScheduledInterviews/ScheduleIntervieActionButtons/NoShow '
import RejectInterview from '../ScheduledInterviews/ScheduleIntervieActionButtons/RejectInterview'
import Offer from '../ScheduledInterviews/ScheduleIntervieActionButtons/Offer'
import OnHold from '../ScheduledInterviews/ScheduleIntervieActionButtons/OnHold'
import REPROCESS from '../ScheduledInterviews/ScheduleIntervieActionButtons/REPROCESS'

const IntervieweeDetails = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const timeLineListSelector = useTypedSelector(
    reduxServices.intervieweeDetails.selectors.TimeLineListSelector,
  )
  const history = useHistory()
  const [isApproveModalVisibility, setIsApproveModalVisibility] =
    useState<boolean>(false)
  const [approveLeaveComment, setApproveLeaveComment] = useState<string>('')
  const [comment, setComment] = useState<string>(
    timeLineListSelector.initialComments,
  )

  const handleModal = () => {
    setIsApproveModalVisibility(true)
  }
  const deletedToastElement = (
    <OToast toastColor="success" toastMessage="saved successfully" />
  )
  const saveBtnHandler = async () => {
    const saveInitialCommentsResult = await dispatch(
      reduxServices.intervieweeDetails.saveInitialComments({
        initialComments: comment,
        personId: timeLineListSelector.personId,
      }),
    )
    if (
      reduxServices.intervieweeDetails.saveInitialComments.fulfilled.match(
        saveInitialCommentsResult,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(deletedToastElement))
    }
  }

  const confirmBtnHandler = async () => {
    const updateCandidateInterviewStatusResult = await dispatch(
      reduxServices.intervieweeDetails.updateCandidateInterviewStatus({
        candidateId: timeLineListSelector.personId,
        holdSubStatus: '',
        status: 'ADD_COMMENTS',
        statusComments: approveLeaveComment,
        candiadateEmailId: '',
        candidateName: '',
        communicationComments: '',
        country: null,
        ctc: null,
        cycleDTOs: null,
        description: null,
        ectc: null,
        excellenceComments: '',
        experiance: null,
        interviewComments: '',
        interviewCycleId: 0,
        interviewDate: '',
        interviewMode: '',
        interviewResultStatus: null,
        interviewRound: '',
        interviewStatus: null,
        interviewTime: '',
        interviewers: '',
        interviewersDTOList: null,
        jobCode: null,
        mobileNumber: '',
        np: null,
        personId: null,
        proactiveComments: '',
        rating: 1,
        reason: null,
        recruiter: null,
        skills: '',
        skypeId: null,
        sourceName: null,
        technology: null,
        updatedBy: null,
      }),
    )
    if (
      reduxServices.intervieweeDetails.updateCandidateInterviewStatus.fulfilled.match(
        updateCandidateInterviewStatusResult,
      )
    ) {
      setApproveLeaveComment('')
      setIsApproveModalVisibility(false)

      dispatch(
        reduxServices.intervieweeDetails.timeLineData(
          timeLineListSelector.personId,
        ),
      )
    }
  }

  const resumeDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const resumePath = timeLineListSelector.resumePath
      ? timeLineListSelector.resumePath
      : undefined
    window.open(`https://ovh2.raybiztech.com/documents/${resumePath}`, '_blank')
  }
  const otherDocumentDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const otherDocumentPath = timeLineListSelector.otherDocumentPath
      ? timeLineListSelector.otherDocumentPath
      : undefined
    window.open(
      `https://ovh2.raybiztech.com/documents/${otherDocumentPath}`,
      '_blank',
    )
  }
  const reScheduleButtonHandler = () => {
    history.push(`/reScheduleInterview/${timeLineListSelector.personId}`)
  }

  const scheduleBtnHandler = () => {
    history.push(`/scheduleInterview/${timeLineListSelector.personId}`)
  }

  const backBtnHandler = () => {
    history.push('/jobschedulecandidateList')
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Interviewee Details"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end Schedule-Interview-action-buttons">
          <CCol className="d-flex justify-content-end" md={12}>
            {timeLineListSelector.candidateStatus === 'OFFERED' ||
            timeLineListSelector.candidateStatus === 'REJECTED' ||
            timeLineListSelector.candidateStatus === 'DID_NOT_JOIN' ? (
              ''
            ) : (
              <CButton
                ng-click="redirectToScheduleInterview(interviewTimelineDetailsList)"
                type="submit"
                className="btn btn-primary btn-labeled fa fa-calendar fa-lg me-1"
                disabled={
                  timeLineListSelector.pendingInterviewStatus > 0 &&
                  timeLineListSelector.candidateStatus !== 'REPROCESS'
                }
                onClick={scheduleBtnHandler}
              >
                Schedule
              </CButton>
            )}
            {timeLineListSelector.candidateStatus === 'OFFERED' ||
            timeLineListSelector.candidateStatus === 'REJECTED' ||
            timeLineListSelector.candidateStatus === 'DID_NOT_JOIN' ? (
              ''
            ) : (
              <CButton
                ng-click="redirectTo_Re_ScheduleInterview(interviewTimelineDetailsList)"
                type="submit"
                className="btn btn-info btn-labeled fa fa-retweet fa-lg me-1"
                disabled={
                  timeLineListSelector.pendingInterviewStatus <= 0 ||
                  timeLineListSelector.candidateStatus === 'REPROCESS'
                }
                onClick={reScheduleButtonHandler}
              >
                Re-Schedule
              </CButton>
            )}
            <CButton
              color="info"
              className="btn btn-primary btn-labeled fa fa-edit fa-lg me-1"
              data-testid="edit-family"
            >
              Edit
            </CButton>
            {timeLineListSelector.candidateStatus === 'REJECTED' ||
            timeLineListSelector.candidateStatus === 'DID_NOT_JOIN' ? (
              ''
            ) : (
              <OnHold />
            )}
            {timeLineListSelector.candidateStatus === 'REJECTED' ||
            timeLineListSelector.candidateStatus === 'DID_NOT_JOIN' ? (
              ''
            ) : (
              <Offer />
            )}
            {timeLineListSelector.candidateStatus === 'REJECTED' ||
            timeLineListSelector.candidateStatus === 'DID_NOT_JOIN' ? (
              ''
            ) : (
              <RejectInterview />
            )}
            {timeLineListSelector.candidateStatus === 'OFFERED' ||
            timeLineListSelector.candidateStatus === 'REJECTED' ||
            timeLineListSelector.candidateStatus === 'DID_NOT_JOIN' ? (
              ''
            ) : (
              <NoShow />
            )}

            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="back-button"
              onClick={backBtnHandler}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
            {timeLineListSelector.candidateStatus === 'REJECTED' ? (
              <REPROCESS />
            ) : (
              ''
            )}
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
              Name:
            </CFormLabel>
            <CCol sm={3}>
              <p className="mb-0">{timeLineListSelector.fullName}</p>
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
              Candidate added Date:
            </CFormLabel>
            <CCol sm={3}>
              <p className="mb-0">{timeLineListSelector.addedDate}</p>
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
              Applied for:
            </CFormLabel>
            <CCol sm={3}>
              <p className="mb-0">{timeLineListSelector.appliedFor}</p>
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
              Skills:
            </CFormLabel>
            <CCol sm={3}>
              <p className="mb-0">{timeLineListSelector.skill || 'N/A'}</p>
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
              Experience:
            </CFormLabel>
            <CCol sm={3}>
              <p className="mb-0">{timeLineListSelector.experience || 'N/A'}</p>
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
              Recruiter:
            </CFormLabel>
            <CCol sm={3}>
              <p className="mb-0">{timeLineListSelector?.recruiter || 'N/A'}</p>
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
              Status:
            </CFormLabel>
            <CCol sm={3}>
              <p className="mb-0">{timeLineListSelector?.candidateStatus}</p>
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
              Mode of interview:
            </CFormLabel>
            <CCol sm={3}>
              <p className="mb-0">{timeLineListSelector?.modeOfInterview}</p>
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
              Resume:
            </CFormLabel>
            <CCol sm={3}>
              <CButton
                size="sm"
                className="btn btn-primary btn-xs preview-Interview"
                ng-click="openInNewTab(interviewTimelineDetailsList.resumePath)"
                disabled={timeLineListSelector?.resumePath === null}
                onClick={resumeDownload}
              >
                PREVIEW
              </CButton>
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
              Other Documents:
            </CFormLabel>
            <CCol sm={3}>
              <CButton
                size="sm"
                className="btn btn-primary btn-xs preview-Interview"
                ng-click="openInNewTabDoc(interviewTimelineDetailsList.otherDocumentPath)"
                disabled={timeLineListSelector?.otherDocumentPath === null}
                onClick={otherDocumentDownload}
              >
                PREVIEWDOC
              </CButton>
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
              Reason for change:
            </CFormLabel>
            <CCol sm={3}>
              <p className="mb-0">{timeLineListSelector?.reason}</p>
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
              Initial Comments:
              <span
                className={
                  comment?.replace(/^\s*/, '') ? 'text-white' : 'text-danger'
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormTextarea
                data-testid="text-area"
                aria-label="textarea"
                autoComplete="off"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></CFormTextarea>
            </CCol>
          </CRow>
        </CForm>
        <CRow>
          <CCol md={{ span: 6, offset: 3 }}>
            <CButton
              data-testid="save-btn"
              className="btn-ovh me-1 text-white"
              color="success"
              onClick={saveBtnHandler}
            >
              Save
            </CButton>
          </CCol>
        </CRow>
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="success"
              className="btn-ovh me-1 text-white"
              onClick={handleModal}
            >
              <i className="fa fa-plus fa-lg me-1"></i>Add Comments
            </CButton>
          </CCol>
        </CRow>
        <IntervieweeDetailsTimeline />
      </OCard>
      <OModal
        alignment="center"
        visible={isApproveModalVisibility}
        setVisible={setIsApproveModalVisibility}
        confirmButtonText="Yes"
        modalTitle="Do you want to add comments to this candidate?"
        cancelButtonText="No"
        modalHeaderClass="d-none"
        confirmButtonAction={confirmBtnHandler}
      >
        <>
          <CRow className="mt-1 mb-1">
            <p>Do you want to add comments to this candidate?</p>
            <br></br>
            <CFormLabel className="col-sm-3">
              Comments:
              <span
                className={
                  approveLeaveComment?.replace(/^\s*/, '')
                    ? TextWhite
                    : TextDanger
                }
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
                value={approveLeaveComment}
                onChange={(e) => setApproveLeaveComment(e.target.value)}
              ></CFormTextarea>
            </CCol>
          </CRow>
        </>
      </OModal>
    </>
  )
}

export default IntervieweeDetails
