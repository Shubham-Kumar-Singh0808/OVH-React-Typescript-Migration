import { CRow, CCol, CButton, CFormLabel } from '@coreui/react-pro'
import React from 'react'
import { Link } from 'react-router-dom'
import ExitFeedBackFormFilterOptions from './ExitFeedBackFormFilterOptions'
import OCard from '../../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../../stateStore'

const ExitFeedBackForm = (): JSX.Element => {
  const getExitFeedBackFormDetails = useTypedSelector(
    reduxServices.resignationList.selectors.getEmpFeedBackDetails,
  )
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Exit FeedBack Form"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <Link to={`/ClearanceCertificateHR`}>
              <CButton
                color="info"
                className="btn-ovh me-1"
                data-testid="back-btn"
              >
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </Link>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1 ps-3 pe-3">
            Employee ID:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{getExitFeedBackFormDetails.employeeId}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1 ps-3 pe-3">
            Employee Name:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{getExitFeedBackFormDetails.employeeName}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1 ps-3 pe-3">
            Primary Reason:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">
              {getExitFeedBackFormDetails?.primaryReasonName}
            </p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1 ps-3 pe-3">
            View of the employee on :
          </CFormLabel>
        </CRow>
        <ExitFeedBackFormFilterOptions />
      </OCard>
    </>
  )
}

export default ExitFeedBackForm
