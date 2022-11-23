import { CButton, CCol, CFormLabel, CRow, CTooltip } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

const PanDetails = ({
  setToggle,
}: {
  setToggle: (value: string) => void
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const bankDetail = useTypedSelector(
    reduxServices.panDetails.selectors.bankDetails,
  )
  useEffect(() => {
    dispatch(reduxServices.bankDetails.bankNameList())
  }, [dispatch])

  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

  useEffect(() => {
    dispatch(reduxServices.panDetails.bankInformation(Number(employeeId)))
  }, [dispatch])

  return (
    <>
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <CTooltip content="Edit">
            <CButton
              size="sm"
              className="btn btn-info btn-sm btn-ovh-employee-list cursor-pointer"
              color="info btn-ovh me-1"
              onClick={() => {
                setToggle('editPanDetails')
              }}
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
              Edit
            </CButton>
          </CTooltip>
        </CCol>
      </CRow>
      <CRow>
        <CFormLabel className="col-sm-2 col-form-label">
          <b>P.F. A/C No :</b>
        </CFormLabel>
        <CCol sm={1}>{bankDetail.finance?.pfAccountNumber || 'N/A'}</CCol>
      </CRow>
      <CRow>
        <CFormLabel className="col-sm-2 col-form-label">
          <b>UAN :</b>
        </CFormLabel>
        <CCol sm={1}>{bankDetail.finance?.uaNumber || 'N/A'}</CCol>
      </CRow>
      <CRow>
        <CFormLabel className="col-sm-2 col-form-label">
          <b>Pan Card No :</b>
        </CFormLabel>
        <CCol sm={1}>{bankDetail.finance?.panCardAccountNumber || 'N/A'}</CCol>
      </CRow>
      <CRow>
        <CFormLabel className="col-sm-2 col-form-label">
          <b>Aadhar Card No :</b>
        </CFormLabel>
        <CCol sm={1}>{bankDetail.finance?.aadharCardNumber || 'N/A'}</CCol>
      </CRow>
      <CRow>
        <CFormLabel className="col-sm-2 col-form-label">
          <b>Attachment :</b>
        </CFormLabel>
        <CCol sm={1}>{bankDetail.finance?.financeFilePath || 'N/A'}</CCol>
      </CRow>
    </>
  )
}

export default PanDetails
