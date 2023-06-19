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
import { useTypedSelector, useAppDispatch } from '../../../../stateStore'

const Offer = (): JSX.Element => {
  const [offerModalVisibility, setIsOfferModalVisibility] =
    useState<boolean>(false)
  const [offerComment, setOfferComment] = useState<string>('')
  const [isYesButtonEnabled, setIsYesButtonEnabled] = useState(false)
  const timeLineListSelector = useTypedSelector(
    reduxServices.intervieweeDetails.selectors.TimeLineListSelector,
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (offerComment) {
      setIsYesButtonEnabled(true)
    } else {
      setIsYesButtonEnabled(false)
    }
  }, [offerComment])

  const confirmBtnHandler = async () => {
    // setIsDeleteModalVisible(false)
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
    }
  }
  return (
    <>
      <CButton
        ng-show="(myservice.Roles | filter:{name:'candidateOffer'}:true)[0].viewaccess"
        ng-click="updateInterviewStatusPopup(interviewTimelineDetailsList.personId, 'OFFERED')"
        type="submit"
        className="btn btn-success btn-labeled fa fa-check fa-lg"
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
            <CCol sm={6}>
              <CFormTextarea
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
