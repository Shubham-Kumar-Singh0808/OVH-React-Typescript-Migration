import {
  CButton,
  CCol,
  CFormCheck,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import OModal from '../../../../components/ReusableComponent/OModal'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'

const RejectInterview = (): JSX.Element => {
  const [isRejectModalVisibility, setIsRejectModalVisibility] =
    useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(false)
  const [rejectLeaveComment, setRejectComment] = useState<string>('')
  const [isYesButtonEnabled, setIsYesButtonEnabled] = useState(false)
  const dispatch = useAppDispatch()
  const timeLineListSelector = useTypedSelector(
    reduxServices.intervieweeDetails.selectors.TimeLineListSelector,
  )
  const handleModal = () => {
    setIsRejectModalVisibility(true)
  }
  useEffect(() => {
    if (rejectLeaveComment?.replace(/^\s*/, '')) {
      setIsYesButtonEnabled(true)
    } else {
      setIsYesButtonEnabled(false)
    }
  }, [rejectLeaveComment])

  const confirmRejectBtnHandler = async () => {
    // setIsDeleteModalVisible(false)
    const rejectBtnResultAction = await dispatch(
      reduxServices.intervieweeDetails.updateCandidateInterviewStatus({
        candidateId: timeLineListSelector.personId,
        holdSubStatus: '',
        status: 'REJECTED',
        statusComments: rejectLeaveComment,
      }),
    )
    if (
      reduxServices.intervieweeDetails.updateCandidateInterviewStatus.fulfilled.match(
        rejectBtnResultAction,
      )
    ) {
      dispatch(
        reduxServices.intervieweeDetails.timeLineData(
          timeLineListSelector.personId,
        ),
      )
      dispatch(
        reduxServices.intervieweeDetails.sendRejectedMessagetoCandidate(
          timeLineListSelector.personId,
        ),
      )
      setIsRejectModalVisibility(false)
    }
  }
  return (
    <>
      <CButton
        type="button"
        color="btn btn-danger"
        id="button-addon2"
        data-testid="reject-btn"
        className="btn btn-danger btn-labeled fa fa-times fa-lg"
        onClick={handleModal}
      >
        Reject
      </CButton>
      <OModal
        alignment="center"
        visible={isRejectModalVisibility}
        setVisible={setIsRejectModalVisibility}
        confirmButtonText="Yes"
        modalTitle="Do you want to REJECTED this candidate?"
        cancelButtonText="No"
        modalHeaderClass="d-none"
        confirmButtonAction={confirmRejectBtnHandler}
        isConfirmButtonDisabled={!isYesButtonEnabled}
      >
        <>
          <CRow className="mt-1 mb-1">
            <p>Do you want to REJECTED this candidate?</p>
            <br></br>
            <CFormLabel className="col-sm-3">
              Comments:
              <span
                className={
                  rejectLeaveComment?.replace(/^\s*/, '')
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
                value={rejectLeaveComment}
                onChange={(e) => setRejectComment(e.target.value)}
              ></CFormTextarea>
            </CCol>
          </CRow>
          <CFormCheck
            type="checkbox"
            id="checked"
            name="checked"
            data-testid="checked"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            inline
          />
          <b>Send Message to candidate</b>
        </>
      </OModal>
    </>
  )
}

export default RejectInterview
