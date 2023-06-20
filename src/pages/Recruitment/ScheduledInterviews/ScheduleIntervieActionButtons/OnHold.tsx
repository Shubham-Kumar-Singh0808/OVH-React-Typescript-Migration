import {
  CButton,
  CCol,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import OModal from '../../../../components/ReusableComponent/OModal'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

const OnHold = (): JSX.Element => {
  const [isOnHoldModalVisibility, setIsOnHoldModalVisibility] =
    useState<boolean>(false)
  const [onHoldComment, setonHoldComment] = useState<string>('')
  const [isYesButtonEnabled, setIsYesButtonEnabled] = useState(false)
  const [select, setSelect] = useState<string>('')
  const [isDropDon, setIsDropDon] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const timeLineListSelector = useTypedSelector(
    reduxServices.intervieweeDetails.selectors.TimeLineListSelector,
  )

  const handleModal = () => {
    setIsDropDon(true)
  }

  const confirmBtnHandler = async () => {
    const onHoldResultAction = await dispatch(
      reduxServices.intervieweeDetails.updateCandidateInterviewStatus({
        candidateId: timeLineListSelector.personId,
        holdSubStatus: timeLineListSelector.holdSubStatus,
        status: 'HOLD',
        statusComments: onHoldComment,
      }),
    )
    if (
      reduxServices.intervieweeDetails.updateCandidateInterviewStatus.fulfilled.match(
        onHoldResultAction,
      )
    ) {
      dispatch(
        reduxServices.intervieweeDetails.timeLineData(
          timeLineListSelector.personId,
        ),
      )
      setIsOnHoldModalVisibility(false)
    }
  }
  useEffect(() => {
    if (onHoldComment) {
      setIsYesButtonEnabled(true)
    } else {
      setIsYesButtonEnabled(false)
    }
  }, [onHoldComment])

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value)
    setIsOnHoldModalVisibility(true)
  }
  return (
    <>
      <CButton
        type="button"
        color="btn btn-danger"
        id="button-addon2"
        data-testid="onHold-btn"
        className="btn btn-danger btn-labeled fa fa-times fa-lg"
        onClick={handleModal}
        disabled={timeLineListSelector.candidateStatus === 'HOLD'}
      >
        On Hold
      </CButton>
      {isDropDon && (
        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="select"
            data-testid="form-select-3"
            name="select"
            value={select}
            // onChange={(e) => setSelect(e.target.value)}
            onChange={onChangeHandler}
          >
            <option value="">select</option>
            <option value="Expensive">Expensive</option>
            <option value="Average Skills">Average Skills</option>
            <option value="Communication">Communication</option>
            <option value="Not Interested">Not Interested</option>
            <option value="Notice Period"> Notice Period</option>
          </CFormSelect>
        </CCol>
      )}
      <OModal
        alignment="center"
        visible={isOnHoldModalVisibility}
        setVisible={setIsOnHoldModalVisibility}
        confirmButtonText="Yes"
        modalTitle="Do you want to HOLD this candidate?"
        cancelButtonText="No"
        modalHeaderClass="d-none"
        confirmButtonAction={confirmBtnHandler}
        isConfirmButtonDisabled={!isYesButtonEnabled}
      >
        <>
          <CRow className="mt-1 mb-1">
            <p>Do you want to HOLD this candidate?</p>
            <br></br>
            <CFormLabel className="col-sm-3">
              Comments:
              <span
                className={
                  onHoldComment?.replace(/^\s*/, '') ? TextWhite : TextDanger
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
                value={onHoldComment}
                onChange={(e) => setonHoldComment(e.target.value)}
              ></CFormTextarea>
            </CCol>
          </CRow>
        </>
      </OModal>
    </>
  )
}

export default OnHold
