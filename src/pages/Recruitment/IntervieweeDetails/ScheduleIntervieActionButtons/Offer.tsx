import {
  CButton,
  CCol,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import OModal from '../../../../components/ReusableComponent/OModal'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector, useAppDispatch } from '../../../../stateStore'
import OToast from '../../../../components/ReusableComponent/OToast'

const Offer = (): JSX.Element => {
  const [offerModalVisibility, setIsOfferModalVisibility] =
    useState<boolean>(false)
  const [offerComment, setOfferComment] = useState<string>('')
  const [isYesButtonEnabled, setIsYesButtonEnabled] = useState(false)
  const timeLineListSelector = useTypedSelector(
    reduxServices.intervieweeDetails.selectors.TimeLineListSelector,
  )
  const history = useHistory()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (offerComment?.replace(/^\s*/, '')) {
      setIsYesButtonEnabled(true)
    } else {
      setIsYesButtonEnabled(false)
    }
  }, [offerComment])

  const confirmBtnHandler = async () => {
    const noShowResultAction = await dispatch(
      reduxServices.intervieweeDetails.updateCandidateInterviewStatus({
        candidateId: timeLineListSelector.personId,
        holdSubStatus: '',
        status: 'OFFERED',
        statusComments: offerComment,
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
      setIsOfferModalVisibility(false)
      history.push(`/addnewjoinee/${timeLineListSelector.personId}`)
    } else if (
      reduxServices.intervieweeDetails.updateCandidateInterviewStatus.rejected.match(
        noShowResultAction,
      ) &&
      noShowResultAction.payload === 500
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="danger"
            toastMessage="            
            You can't give offer to the candidate.Because, Vacancies already filled."
          />,
        ),
      )
    }
  }
  const handleModal = () => {
    setIsOfferModalVisibility(true)
  }

  return (
    <>
      <CButton
        ng-click="updateInterviewStatusPopup(interviewTimelineDetailsList.personId, 'OFFERED')"
        type="submit"
        className="btn btn-success btn-labeled fa fa-check fa-lg me-1"
        data-testid="offer-btn"
        onClick={handleModal}
      >
        Offer
      </CButton>
      <OModal
        alignment="center"
        visible={offerModalVisibility}
        setVisible={setIsOfferModalVisibility}
        confirmButtonText="Yes"
        modalTitle="Do you want to No show this candidate?"
        cancelButtonText="No"
        modalHeaderClass="d-none"
        confirmButtonAction={confirmBtnHandler}
        isConfirmButtonDisabled={!isYesButtonEnabled}
      >
        <>
          <CRow className="mt-1 mb-1">
            <p>Do you want to OFFERED this candidate?</p>
            <br></br>
            <CFormLabel className="col-sm-3">
              Comments:
              <span
                className={
                  offerComment?.replace(/^\s*/, '') ? TextWhite : TextDanger
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={7}>
              <CFormTextarea
                className="p-0"
                data-testid="text-area"
                aria-label="textarea"
                autoComplete="off"
                maxLength={150}
                value={offerComment}
                onChange={(e) => setOfferComment(e.target.value)}
              ></CFormTextarea>
            </CCol>
          </CRow>
        </>
      </OModal>
    </>
  )
}

export default Offer
