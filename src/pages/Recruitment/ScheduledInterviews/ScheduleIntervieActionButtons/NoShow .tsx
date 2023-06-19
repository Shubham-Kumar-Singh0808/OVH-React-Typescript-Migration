import {
  CButton,
  CCol,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import OModal from '../../../../components/ReusableComponent/OModal'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

const NoShow = () => {
  const [noShowModalVisibility, setIsNoShowModalVisibility] =
    useState<boolean>(false)
  const [noShowComment, setNoShowComment] = useState<string>('')
  const [isYesButtonEnabled, setIsYesButtonEnabled] = useState(false)
  const handleModal = () => {
    setIsNoShowModalVisibility(true)
  }
  const dispatch = useAppDispatch()
  const timeLineListSelector = useTypedSelector(
    reduxServices.intervieweeDetails.selectors.TimeLineListSelector,
  )
  const confirmBtnHandler = async () => {
    // setIsDeleteModalVisible(false)
    const noShowResultAction = await dispatch(
      reduxServices.intervieweeDetails.updateCandidateInterviewStatus({
        candidateId: timeLineListSelector.personId,
        holdSubStatus: '',
        status: 'NO_SHOW',
        statusComments: noShowComment,
      }),
    )
    if (
      reduxServices.intervieweeDetails.updateCandidateInterviewStatus.fulfilled.match(
        noShowResultAction,
      )
    ) {
      dispatch(
        reduxServices.intervieweeDetails.timeLineData(
          timeLineListSelector.personId,
        ),
      )
      setIsNoShowModalVisibility(false)
    }
  }

  useEffect(() => {
    if (noShowComment?.replace(/^\s*/, '')) {
      setIsYesButtonEnabled(true)
    } else {
      setIsYesButtonEnabled(false)
    }
  }, [noShowComment])
  return (
    <>
      <CButton
        type="button"
        color="btn btn-danger"
        id="button-addon2"
        data-testid="search-employee-btn"
        className="btn btn-danger btn-labeled fa fa-times fa-lg"
        onClick={handleModal}
        disabled={timeLineListSelector.candidateStatus === 'NO_SHOW'}
      >
        NoShow
      </CButton>
      <OModal
        alignment="center"
        visible={noShowModalVisibility}
        setVisible={setIsNoShowModalVisibility}
        confirmButtonText="Yes"
        modalTitle="Do you want to No show this candidate?"
        cancelButtonText="No"
        modalHeaderClass="d-none"
        confirmButtonAction={confirmBtnHandler}
        isConfirmButtonDisabled={!isYesButtonEnabled}
      >
        <>
          <CRow className="mt-1 mb-1">
            <p>Do you want to No show this candidate?</p>
            <br></br>
            <CFormLabel className="col-sm-3">
              Comments:
              <span
                className={
                  noShowComment?.replace(/^\s*/, '') ? TextWhite : TextDanger
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
                value={noShowComment}
                onChange={(e) => setNoShowComment(e.target.value)}
              ></CFormTextarea>
            </CCol>
          </CRow>
        </>
      </OModal>
    </>
  )
}

export default NoShow
