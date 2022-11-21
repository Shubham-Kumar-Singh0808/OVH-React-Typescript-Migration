import { CButton, CCol, CRow, CTooltip } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector, useAppDispatch } from '../../../stateStore'

const PfAndPanDetails = (): JSX.Element => {
  const bankDetail = useTypedSelector(
    reduxServices.panDetails.selectors.bankDetails,
  )

  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(reduxServices.panDetails.bankInformation(Number(employeeId)))
  }, [dispatch])

  return (
    <>
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
              >
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                Edit
              </CButton>
            </CTooltip>
          </CCol>
        </CRow>
        <CRow className="mt-2 mb-2">
          <CCol sm={3} className="text-end">
            <b>P.F. A/C No :</b>
          </CCol>
          <CCol sm={6}>{bankDetail.finance?.pfAccountNumber || 'N/A'}</CCol>
        </CRow>
        <CRow className="mt-2 mb-2">
          <CCol sm={3} className="text-end">
            <b>UAN :</b>
          </CCol>
          <CCol sm={6}>{bankDetail.finance?.uaNumber || 'N/A'}</CCol>
        </CRow>
        <CRow className="mt-2 mb-2">
          <CCol sm={3} className="text-end">
            <b>Pan Card No :</b>
          </CCol>
          <CCol sm={6}>
            {bankDetail.finance?.panCardAccountNumber || 'N/A'}
          </CCol>
        </CRow>
        <CRow className="mt-2 mb-2">
          <CCol sm={3} className="text-end">
            <b>Aadhar Card No :</b>
          </CCol>
          <CCol sm={6}>{bankDetail.finance?.aadharCardNumber || 'N/A'}</CCol>
        </CRow>
        <CRow className="mt-2 mb-2">
          <CCol sm={3} className="text-end">
            <b>Attachment :</b>
          </CCol>
          <CCol sm={6}>{bankDetail.finance?.financeFilePath || 'N/A'}</CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default PfAndPanDetails
