import {
  CButton,
  CCol,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import OModal from '../../../components/ReusableComponent/OModal'
import { TextWhite, TextDanger } from '../../../constant/ClassName'

const OnHold = () => {
  const [isApproveModalVisibility, setIsApproveModalVisibility] =
    useState<boolean>(false)
  const [approveLeaveComment, setApproveLeaveComment] = useState<string>('')
  const [select, setSelect] = useState<string>('')
  const [isDropDon, setIsDropDon] = useState<boolean>(false)

  const handleModal = () => {
    setIsDropDon(true)
  }
  useEffect(() => {
    if (select) {
      setIsApproveModalVisibility(true)
    }
  })
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
            onChange={(e) => setSelect(e.target.value)}
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
        visible={isApproveModalVisibility}
        setVisible={setIsApproveModalVisibility}
        confirmButtonText="Yes"
        modalTitle="Do you want to HOLD this candidate?"
        cancelButtonText="No"
        modalHeaderClass="d-none"
        // confirmButtonAction={confirmBtnHandler}
      >
        <>
          <CRow className="mt-1 mb-1">
            <p>Do you want to HOLD this candidate?</p>
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

export default OnHold
