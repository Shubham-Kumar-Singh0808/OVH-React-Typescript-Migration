import { CRow, CCol, CButton, CForm, CFormLabel } from '@coreui/react-pro'
import React from 'react'
import { Link } from 'react-router-dom'
import OCard from '../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const ExitFeedBackForm = (): JSX.Element => {
  const checkExitFeedBackForm = useTypedSelector(
    reduxServices.resignationList.selectors.exitFeedBackForm,
  )
  console.log(checkExitFeedBackForm)
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Exit FeedBack Form Details"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <Link to={`/resignationList`}>
              <CButton color="info" className="btn-ovh me-1">
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </Link>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="col-sm-3 col-form-label text-end p-1">
              Employee ID:
            </CFormLabel>
            <CCol sm={3}>
              <p className="mb-0">{checkExitFeedBackForm[0]?.employeeId}</p>
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="col-sm-3 col-form-label text-end p-1">
              Employee Name:
            </CFormLabel>
            <CCol sm={3}>
              <p className="mb-0">{checkExitFeedBackForm[0]?.employeeName}</p>
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="col-sm-3 col-form-label text-end p-1">
              Primary Reason:
            </CFormLabel>
            <CCol sm={3}>
              <p className="mb-0">
                {checkExitFeedBackForm[0]?.primaryReasonName}
              </p>
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="col-sm-3 col-form-label text-end p-1">
              View of the employee on:
            </CFormLabel>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="col-sm-3 col-form-label text-end p-1">
              Salary :
            </CFormLabel>
            <CCol sm={3}>
              <p className="mb-0">{checkExitFeedBackForm[0]?.salary}</p>
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="col-sm-3 col-form-label text-end p-1">
              Opportunity for growth:
            </CFormLabel>
            <CCol sm={3}>
              <p className="mb-0">{checkExitFeedBackForm[0]?.promotion}</p>
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="col-sm-3 col-form-label text-end p-1">
              Recognition of work:
            </CFormLabel>
            <CCol sm={3}>
              <p className="mb-0">
                {checkExitFeedBackForm[0]?.recognitionOfwork}
              </p>
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="col-sm-3 col-form-label text-end p-1">
              Promotion:
            </CFormLabel>
            <CCol sm={3}>
              <p className="mb-0">{checkExitFeedBackForm[0]?.promotion}</p>
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="col-sm-3 col-form-label text-end p-1">
              Use of educational background:
            </CFormLabel>
            <CCol sm={3}>
              <p className="mb-0">
                {checkExitFeedBackForm[0]?.educationalBackground}
              </p>
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="col-sm-3 col-form-label text-end p-1">
              Personnel policies :
            </CFormLabel>
            <CCol sm={3}>
              <p className="mb-0">
                {checkExitFeedBackForm[0]?.personelPolicies}
              </p>
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="col-sm-3 col-form-label text-end p-1">
              Culture of the organization:
            </CFormLabel>
            <CCol sm={3}>
              <p className="mb-0">
                {checkExitFeedBackForm[0]?.organisationCulture}
              </p>
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="col-sm-3 col-form-label text-end p-1">
              Role clarity:
            </CFormLabel>
            <CCol sm={3}>
              <p className="mb-0">{checkExitFeedBackForm[0]?.roleClarity}</p>
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="col-sm-3 col-form-label text-end p-1">
              Guidance from subordinate/superior:
            </CFormLabel>
            <CCol sm={3}>
              <p className="mb-0">
                {checkExitFeedBackForm[0]?.superiorGuidance}
              </p>
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="col-sm-3 col-form-label text-end p-1">
              What were your expectation when you joined the company ?:
            </CFormLabel>
            <CCol sm={3}>
              <p className="mb-0">{checkExitFeedBackForm[0]?.expectations}</p>
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="col-sm-3 col-form-label text-end p-1">
              Would you say that your expectations have been fulfilled ?
            </CFormLabel>
            <CCol sm={3}>
              <p className="mb-0">
                {checkExitFeedBackForm[0]?.expectationsFulfilled}
              </p>
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="col-sm-3 col-form-label text-end p-1">
              What did you like and dislike about the company
            </CFormLabel>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="col-sm-3 col-form-label text-end p-1">
              Like :
            </CFormLabel>
            <CCol sm={3}>
              <p className="mb-0">
                {checkExitFeedBackForm[0]?.likeAboutCompany}
              </p>
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="col-sm-3 col-form-label text-end p-1">
              Dislike :
            </CFormLabel>
            <CCol sm={3}>
              <p className="mb-0">
                {checkExitFeedBackForm[0]?.dislikeAboutCompany}
              </p>
            </CCol>
          </CRow>
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="col-sm-3 col-form-label text-end p-1">
              Would you consider back to join us at a later date :
            </CFormLabel>
            <CCol sm={3}>
              <p className="mb-0">
                {checkExitFeedBackForm[0]?.joinLater || 'N/A'}
              </p>
            </CCol>
          </CRow>
        </CForm>
      </OCard>
    </>
  )
}

export default ExitFeedBackForm
