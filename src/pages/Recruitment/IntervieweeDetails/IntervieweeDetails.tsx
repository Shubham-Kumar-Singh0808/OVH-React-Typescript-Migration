import React, { useState } from 'react'
import {
  CButton,
  CCol,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import IntervieweeDetailsTimeline from './IntervieweeDetailsTimeline'
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
            <Link to={`/jobschedulecandidateList`}>
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
        <CRow>
          <p>
            <b>Name: </b>
            {timeLineListSelector.fullName}
          </p>
          <p>
            <b>Candidate added Date: </b>{' '}
            <span>{timeLineListSelector.addedDate}</span>
          </p>
          <p>
            <b>Applied for:</b> <span>{timeLineListSelector.appliedFor}</span>
          </p>
          <p>
            <b>Skills:</b> <span>{timeLineListSelector.skill}</span>
          </p>
          <p>
            <b> Experience: </b>
            <span>{timeLineListSelector.experience}</span>
          </p>
          <p>
            <b> Recruiter: </b>
            <span>{timeLineListSelector.recruiter}</span>
          </p>
          <p>
            <b> Status:</b> <span>{timeLineListSelector.candidateStatus}</span>
          </p>
          <p>
            <b>Status Comments:</b>{' '}
            <span>{timeLineListSelector.statusComments}</span>
          </p>
          <p>
            <b> Resume: </b>
            <span>{timeLineListSelector.fullName}</span>
          </p>
          <p>
            <b> Other Documents:</b>{' '}
            <span>{timeLineListSelector.fullName}</span>
          </p>
          <p>
            <b> Reason for change:</b>{' '}
            <span>{timeLineListSelector.reason}</span>
          </p>
          <p>
            <b>Initial Comments: </b>
            <CFormTextarea
              data-testid="text-area"
              aria-label="textarea"
              autoComplete="off"
              value={comment}
              className="sh-question"
              onChange={(e) => setComment(e.target.value)}
            ></CFormTextarea>
          </p>
        </CRow>
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
