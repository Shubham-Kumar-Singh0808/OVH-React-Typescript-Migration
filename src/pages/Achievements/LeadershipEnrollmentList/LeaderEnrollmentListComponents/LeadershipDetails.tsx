import {
  CButton,
  CCol,
  CContainer,
  CFormTextarea,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import LeadershipDetailsItem from './LeadershipDetailsItem'
import {
  ApproveRejectLeadershipQueryParameters,
  IncomingLeadershipListItem,
  LeadershipDetailsProps,
  LeadershipListDateFiltersEnums,
  LeadershipListQueryParameters,
  LeadershipListStatusFiltersEnums,
} from '../../../../types/Achievements/LeadershipEnrollmentList/LeadershipEnrollmentListTypes'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { emptyString } from '../../AchievementConstants'
import OModal from '../../../../components/ReusableComponent/OModal'
import OToast from '../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../reducers/reduxServices'

enum ButtonClicked {
  approve = 'Approve',
  reject = 'Reject',
}

const LeadershipDetails = (props: LeadershipDetailsProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const { setShowLeadershipDetails, currentIndex } = props

  const [currentDetails, setCurrentDetails] =
    useState<IncomingLeadershipListItem>()

  const [enteredComment, setEnteredComment] = useState<string>(emptyString)

  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalDescription, setModalDescription] = useState<string>(emptyString)
  const [buttonVerify, setButtonVerify] = useState<ButtonClicked>(
    ButtonClicked.approve,
  )

  const backButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowLeadershipDetails(false)
  }

  const commentsHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEnteredComment(e.target.value)
  }

  const employeeDetails = useTypedSelector(
    (state) => state.leadershipEnrollmentList.leadershipList,
  )

  useEffect(() => {
    setCurrentDetails(employeeDetails?.at(currentIndex))
  }, [currentIndex])

  const booleanToString = (value: boolean | undefined) => {
    return value === true ? 'Yes' : 'No'
  }

  const approveButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setButtonVerify(ButtonClicked.approve)
    setModalDescription(String(ButtonClicked.approve) + ' ')
    setShowModal(true)
  }

  const rejectButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setButtonVerify(ButtonClicked.reject)
    setModalDescription(String(ButtonClicked.reject) + ' ')
    setShowModal(true)
  }

  const modalClickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (enteredComment.trim().length === 0) {
      const errorToast = (
        <OToast
          toastColor="danger"
          toastMessage={`Sorry! Leadership not ${buttonVerify}`}
        />
      )
      dispatch(reduxServices.app.actions.addToast(errorToast))
      return
    }
    const successMessage = 'Comments Submitted Successfully'
    const successToast = (
      <OToast toastColor="success" toastMessage={successMessage} />
    )
    const finalQuery: ApproveRejectLeadershipQueryParameters = {
      comments: enteredComment,
      id: currentDetails?.employeeId,
    }
    if (buttonVerify === ButtonClicked.approve) {
      const result = await dispatch(
        reduxServices.leadershipEnrollmentList.approveLeadershipThunk(
          finalQuery,
        ),
      )
      if (
        reduxServices.leadershipEnrollmentList.approveLeadershipThunk.fulfilled.match(
          result,
        )
      ) {
        dispatch(reduxServices.app.actions.addToast(successToast))
      }
    } else {
      const result = await dispatch(
        reduxServices.leadershipEnrollmentList.rejectLeadershipThunk(
          finalQuery,
        ),
      )
      if (
        reduxServices.leadershipEnrollmentList.rejectLeadershipThunk.fulfilled.match(
          result,
        )
      ) {
        dispatch(reduxServices.app.actions.addToast(successToast))
      }
    }
    setShowModal(false)
    const finalQueries: LeadershipListQueryParameters = {
      dateSelection: String(LeadershipListDateFiltersEnums.currentMonth),
      from: emptyString,
      to: emptyString,
      statusSelection: String(LeadershipListStatusFiltersEnums.new),
    }
    dispatch(
      reduxServices.leadershipEnrollmentList.getLeadershipListThunk(
        finalQueries,
      ),
    )
  }

  const buttonColor =
    buttonVerify === ButtonClicked.approve ? 'success' : 'danger'
  const buttonLabel =
    buttonVerify === ButtonClicked.approve ? 'Approve' : 'Reject'

  const givenComments =
    currentDetails?.comments === null ? emptyString : currentDetails?.comments

  return (
    <>
      <CContainer>
        <CRow className="mt-2 justify-content-end">
          <CCol xs={2} className="px-0 text-end">
            <CButton
              color="info"
              data-testid="back-btn"
              className="btn-ovh me-1"
              onClick={backButtonHandler}
            >
              <i className="fa fa-arrow-left me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CContainer>
          <LeadershipDetailsItem
            question="Employee Name"
            answer={currentDetails?.employeeName}
            toParse={false}
          />
          <LeadershipDetailsItem
            question="Employee ID"
            answer={currentDetails?.employeeId.toString()}
            toParse={false}
          />
          <LeadershipDetailsItem
            question="Are you a Leader?"
            answer={booleanToString(currentDetails?.leader)}
            toParse={false}
          />
          <LeadershipDetailsItem
            question="Do you communicate clearly and effectively?"
            answer={booleanToString(currentDetails?.communicate)}
            toParse={false}
          />
          <LeadershipDetailsItem
            question="Are you interested in taking initiative?"
            answer={booleanToString(currentDetails?.initiative)}
            toParse={false}
          />
          <LeadershipDetailsItem
            question="Are you good at working with a team?"
            answer={booleanToString(currentDetails?.teamWorker)}
            toParse={false}
          />
          <LeadershipDetailsItem
            question="Do you accept constructive criticism?"
            answer={booleanToString(currentDetails?.constructiveCriticism)}
            toParse={false}
          />
          <LeadershipDetailsItem
            question="Do you help others to ensure the team delivers on time?"
            answer={booleanToString(currentDetails?.helper)}
            toParse={false}
          />
          <LeadershipDetailsItem
            question="Are you good at working directly with clients?"
            answer={booleanToString(currentDetails?.directlyWorking)}
            toParse={false}
          />
          <LeadershipDetailsItem
            question="Are you open to travel onsite, USA, Australia & Canada?"
            answer={booleanToString(currentDetails?.travelOnsite)}
            toParse={false}
          />
          <LeadershipDetailsItem
            question="Are you open to innovation and Research for growth?"
            answer={booleanToString(currentDetails?.innovationAndResearch)}
            toParse={false}
          />
          <LeadershipDetailsItem
            question="Please let us know why you want to be part of this Elite group"
            answer={currentDetails?.reasonDetails}
            toParse={true}
          />
          <LeadershipDetailsItem
            question="Please let us know any example where you really exceeded expectations"
            answer={currentDetails?.expectationsExample}
            toParse={true}
          />
          {currentDetails?.status !== 'NEW' && (
            <LeadershipDetailsItem
              question="Comments on Approve / Reject"
              answer={givenComments}
              toParse={false}
            />
          )}
        </CContainer>
        {currentDetails?.status === 'NEW' && (
          <CContainer>
            <CRow>
              <CRow className="mt-3">
                <CCol className="col-md-4 offset-md-4">
                  <CButton
                    color="success"
                    className="btn-ovh me-1"
                    data-testid="approve-btn"
                    onClick={approveButtonHandler}
                  >
                    Approve
                  </CButton>
                  <CButton
                    color="danger"
                    role="addNewAchiever"
                    data-testid="reject-btn"
                    className="btn-ovh me-1"
                    onClick={rejectButtonHandler}
                  >
                    Reject
                  </CButton>
                </CCol>
              </CRow>
            </CRow>
          </CContainer>
        )}
      </CContainer>
      <OModal
        visible={showModal}
        setVisible={setShowModal}
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
      >
        <CContainer>
          <div data-testid="modal-content">
            Do you really want to
            <span data-testid="app-rej">{` ${modalDescription}`}</span>
            <span>
              <strong data-testid="emp-name">
                {currentDetails?.employeeName}?
              </strong>
            </span>
          </div>
          <CFormTextarea
            placeholder="Comments"
            value={enteredComment}
            onChange={commentsHandler}
            data-testid="text-area-comments"
          />
          <CRow className="mt-2 justify-content-end">
            <CCol xs={2} className="px-0 pe-3 text-end">
              <CButton
                color={buttonColor}
                data-testid="final-btn"
                className="btn-ovh me-1"
                onClick={modalClickHandler}
              >
                {buttonLabel}
              </CButton>
            </CCol>
          </CRow>
        </CContainer>
      </OModal>
    </>
  )
}

export default LeadershipDetails
