import React, { useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import IntervieweeDetailsTimeline from './IntervieweeDetailsTimeline'
import InterviewDetailsRatingForm from './InterviewDetailsRatingForm'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OModal from '../../../components/ReusableComponent/OModal'
import { TextDanger, TextWhite } from '../../../constant/ClassName'
import OToast from '../../../components/ReusableComponent/OToast'

const IntervieweeDetails = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const timeLineListSelector = useTypedSelector(
    reduxServices.intervieweeDetails.selectors.TimeLineListSelector,
  )
  const scheduleInterviewData = useTypedSelector(
    reduxServices.intervieweeDetails.selectors.scheduleInterviewData,
  )
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
            <Link to={`/candidateSearch`}>
              <CButton
                color="info"
                className="btn-ovh me-1"
                data-testid="back-button"
              >
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </Link>
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
              <p className="mb-0">{timeLineListSelector?.resumePath}</p>
              <CButton
                size="sm"
                className="btn btn-primary btn-xs"
                ng-click="openInNewTab(interviewTimelineDetailsList.resumePath)"
                disabled={timeLineListSelector?.resumePath === null}
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
              <p className="mb-0">{timeLineListSelector?.otherDocumentPath}</p>
              <CButton
                size="sm"
                className="btn btn-primary btn-xs"
                ng-click="openInNewTabDoc(interviewTimelineDetailsList.otherDocumentPath)"
                disabled={timeLineListSelector?.otherDocumentPath === null}
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
        {scheduleInterviewData.status === 'finished' ? (
          <></>
        ) : (
          <InterviewDetailsRatingForm />
        )}
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
