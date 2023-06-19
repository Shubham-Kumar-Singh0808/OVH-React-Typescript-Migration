import {
  CButton,
  CCol,
  CFormCheck,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import OModal from '../../../../components/ReusableComponent/OModal'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'

const RejectInterview = () => {
  const [isApproveModalVisibility, setIsApproveModalVisibility] =
    useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(false)
  const [approveLeaveComment, setApproveLeaveComment] = useState<string>('')
  const handleModal = () => {
    setIsApproveModalVisibility(true)
  }
  return (
    <>
      <CButton
        type="button"
        color="btn btn-danger"
        id="button-addon2"
        data-testid="search-employee-btn"
        className="btn btn-danger btn-labeled fa fa-times fa-lg"
        onClick={handleModal}
      >
        Reject
      </CButton>
      <OModal
        alignment="center"
        visible={isApproveModalVisibility}
        setVisible={setIsApproveModalVisibility}
        confirmButtonText="Yes"
        modalTitle="Do you want to REJECTED this candidate?"
        cancelButtonText="No"
        modalHeaderClass="d-none"
        // confirmButtonAction={confirmBtnHandler}
      >
        <>
          <CRow className="mt-1 mb-1">
            <p>Do you want to REJECTED this candidate?</p>
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
          <CFormCheck
            type="radio"
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
