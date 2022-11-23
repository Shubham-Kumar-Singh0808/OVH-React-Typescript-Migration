import { CButton, CCol, CFormLabel, CRow, CTooltip } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import EditPanDetails from './EditPanDetails'
import BankDetails from './BankDetails'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector, useAppDispatch } from '../../../stateStore'

const PanDetails = (): JSX.Element => {
  const [toggle, setToggle] = useState('')

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
      {toggle === '' && (
        <OCard
          className="mb-4 myprofile-wrapper"
          title={'P.F. & PAN Details'}
          CBodyClassName="ps-0 pe-0"
          CFooterClassName="d-none"
        >
          <CRow className="justify-content-end">
            <CCol className="text-end" md={4}>
              <CTooltip content="Edit">
                <CButton
                  size="sm"
                  className="btn btn-info btn-sm btn-ovh-employee-list cursor-pointer"
                  color="info btn-ovh me-1"
                  onClick={() => setToggle('/myFinance')}
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
            <CCol sm={1}>
              {bankDetail.finance?.panCardAccountNumber || 'N/A'}
            </CCol>
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
        </OCard>
      )}
      {toggle === '/myFinance' && <EditPanDetails setToggle={setToggle} />}
      <BankDetails />
    </>
  )
}

export default PanDetails
