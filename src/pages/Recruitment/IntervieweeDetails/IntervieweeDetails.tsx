import React from 'react'
import { CButton, CCol, CRow } from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const IntervieweeDetails = (): JSX.Element => {
  const TimeLineListSelector = useTypedSelector(
    reduxServices.intervieweeDetails.selectors.TimeLineListSelector,
  )
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
            {/* <Link
              to={`/jobschedulecandidateList/${TimeLineListSelector.personId}`}
            > */}
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="back-button"
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
            {/* </Link> */}
          </CCol>
        </CRow>
        <CRow>
          <p>
            <b>Name: </b>
            {TimeLineListSelector.fullName}
          </p>
          <p>
            <b>Candidate added Date: </b>{' '}
            <span>{TimeLineListSelector.addedDate}</span>
          </p>
          <p>
            <b>Applied for:</b> <span>{TimeLineListSelector.appliedFor}</span>
          </p>
          <p>
            <b>Skills:</b> <span>{TimeLineListSelector.skill}</span>
          </p>
          <p>
            <b> Experience: </b>
            <span>{TimeLineListSelector.experience}</span>
          </p>
          <p>
            <b> Recruiter: </b>
            <span>{TimeLineListSelector.recruiter}</span>
          </p>
          <p>
            <b> Status:</b> <span>{TimeLineListSelector.candidateStatus}</span>
          </p>
          <p>
            <b>Status Comments:</b>{' '}
            <span>{TimeLineListSelector.statusComments}</span>
          </p>
          <p>
            <b> Resume: </b>
            <span>{TimeLineListSelector.fullName}</span>
          </p>
          <p>
            <b> Other Documents:</b>{' '}
            <span>{TimeLineListSelector.fullName}</span>
          </p>
          <p>
            <b> Reason for change:</b>{' '}
            <span>{TimeLineListSelector.reason}</span>
          </p>
          <p>
            <b>Initial Comments: </b>
            <span>{TimeLineListSelector.initialComments}</span>
          </p>
        </CRow>
      </OCard>
    </>
  )
}

export default IntervieweeDetails
