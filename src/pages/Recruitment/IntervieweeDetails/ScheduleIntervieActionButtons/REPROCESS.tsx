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

const REPROCESS = (): JSX.Element => {
  const [ReprocessModalVisibility, setIsReprocessModalVisibility] =
    useState<boolean>(false)
  const [reprocessComment, setReprocessComment] = useState<string>('')
  const [isYesButtonEnabled, setIsYesButtonEnabled] = useState(false)
  const handleModal = () => {
    setIsReprocessModalVisibility(true)
  }
  const dispatch = useAppDispatch()
  const timeLineListSelector = useTypedSelector(
    reduxServices.intervieweeDetails.selectors.TimeLineListSelector,
  )
  const confirmBtnHandler = async () => {
    const noShowResultAction = await dispatch(
      reduxServices.intervieweeDetails.updateCandidateInterviewStatus({
        candidateId: timeLineListSelector.personId,
        holdSubStatus: '',
        status: 'REPROCESS',
        statusComments: reprocessComment,
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
      setIsReprocessModalVisibility(false)
    }
  }

  useEffect(() => {
    if (reprocessComment?.replace(/^\s*/, '')) {
      setIsYesButtonEnabled(true)
    } else {
      setIsYesButtonEnabled(false)
    }
  }, [reprocessComment])
  return (
    <>
      <CButton
        type="button"
        id="button-addon2"
        data-testid="search-employee-btn"
        className="btn btn-info btn-labeled fa fa-refresh fa-lg me-1"
        onClick={handleModal}
      >
        REPROCESS
      </CButton>
      <OModal
        alignment="center"
        visible={ReprocessModalVisibility}
        setVisible={setIsReprocessModalVisibility}
        confirmButtonText="Yes"
        modalTitle="Do you want to No show this candidate?"
        cancelButtonText="No"
        modalHeaderClass="d-none"
        confirmButtonAction={confirmBtnHandler}
        isConfirmButtonDisabled={!isYesButtonEnabled}
      >
        <>
          <CRow className="mt-1 mb-1">
            <p>Do you want to REPROCESS this candidate?</p>
            <br></br>
            <CFormLabel className="col-sm-3">
              Comments:
              <span
                className={
                  reprocessComment?.replace(/^\s*/, '') ? TextWhite : TextDanger
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={7}>
              <CFormTextarea
                className="form-control p-0"
                data-testid="text-area"
                aria-label="textarea"
                autoComplete="off"
                maxLength={150}
                value={reprocessComment}
                onChange={(e) => setReprocessComment(e.target.value)}
              ></CFormTextarea>
            </CCol>
          </CRow>
        </>
      </OModal>
    </>
  )
}

export default REPROCESS
