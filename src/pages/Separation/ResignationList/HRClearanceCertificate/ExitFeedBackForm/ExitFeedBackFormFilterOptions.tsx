/* eslint-disable prettier/prettier */
import { CButton, CCol, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react-pro'
import React, { useState } from 'react'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../../stateStore'
import { SubmitExitFeedBackForm } from '../../../../../types/Separation/ResignationList/resignationListTypes'

const ExitFeedBackFormFilterOptions = (): JSX.Element => {
  const initialExitFeedBackForm = {} as SubmitExitFeedBackForm
  const [exitFeedBackForm, setExitFeedBackForm] = useState(initialExitFeedBackForm)
  const getExitFeedBackFormDetails = useTypedSelector(
    reduxServices.resignationList.selectors.getEmpFeedBackDetails,
  )

  const onChangeExitFeedBackHandler = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target   
    setExitFeedBackForm((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })   
  }
  return (
    <>
      <CForm>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Employee ID:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{getExitFeedBackFormDetails.employeeId}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Employee Name:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{getExitFeedBackFormDetails.employeeName}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Primary Reason:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{getExitFeedBackFormDetails?.primaryReasonName}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            View of the employee on :
          </CFormLabel>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Salary :
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              autoComplete="off"
              type="text"
              id="salary"
              name="salary"             
              data-testid="salary-test"
              value={exitFeedBackForm?.salary}
              onChange = {onChangeExitFeedBackHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Opportunity for growth :
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              autoComplete="off"
              type="text"
              id="opportunityForGrowth"
              name="opportunityForGrowth"              
              data-testid="opportunityForGrowth-test"
              value = {exitFeedBackForm?.opportunityForGrowth}
              onChange = {onChangeExitFeedBackHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Recognition of work :
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              autoComplete="off"
              type="text"
              id="recognitionOfwork"
              name="recognitionOfwork"             
              data-testid="person-name"
              value = {exitFeedBackForm?.recognitionOfwork}
              onChange = {onChangeExitFeedBackHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Promotion :
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              autoComplete="off"
              type="text"
              id="promotion"
              name="promotion"             
              data-testid="person-name"
              value = {exitFeedBackForm?.promotion}
              onChange = {onChangeExitFeedBackHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Use of educational background :
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              autoComplete="off"
              type="text"
              id="educationalBackground"
              name="educationalBackground"
              placeholder="Name"
              data-testid="educationalBackground-name"
              value = {exitFeedBackForm?.educationalBackground}
              onChange = {onChangeExitFeedBackHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Personnel policies :
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              autoComplete="off"
              type="text"
              id="personelPolicies"
              name="personelPolicies"              
              data-testid="person-name"
              value = {exitFeedBackForm?.personelPolicies}
              onChange = {onChangeExitFeedBackHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Culture of the organisation :
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              autoComplete="off"
              type="text"
              id="organisationCulture"
              name="organisationCulture"              
              data-testid="person-name"
              value = {exitFeedBackForm?.organisationCulture}
              onChange = {onChangeExitFeedBackHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Role clarity :
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              autoComplete="off"
              type="text"
              id="roleClarity"
              name="roleClarity"            
              data-testid="person-name"
              value = {exitFeedBackForm?.roleClarity}
              onChange = {onChangeExitFeedBackHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Guidance from subordinate/superior :
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              autoComplete="off"
              type="text"
              id="superiorGuidance"
              name="superiorGuidance"            
              data-testid="person-name"
              value = {exitFeedBackForm?.superiorGuidance}
              onChange = {onChangeExitFeedBackHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            What were your expectation when you joined the company ? :
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              autoComplete="off"
              type="text"
              id="expectations"
              name="expectations"             
              data-testid="person-name"
              value = {exitFeedBackForm?.expectations}
              onChange = {onChangeExitFeedBackHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Would you say that your expectations have been fulfilled ? :
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              autoComplete="off"
              type="text"
              id="expectationsFulfilled"
              name="expectationsFulfilled"             
              data-testid="person-name"
              value = {exitFeedBackForm?.expectationsFulfilled}
              onChange = {onChangeExitFeedBackHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
          What did you like and dislike about the company :
          </CFormLabel>         
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
           Like :
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              autoComplete="off"
              type="text"
              id="likeAboutCompany"
              name="likeAboutCompany"             
              data-testid="person-name"
              value = {exitFeedBackForm?.likeAboutCompany}
              onChange = {onChangeExitFeedBackHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
          Dislike :
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              autoComplete="off"
              type="text"
              id="dislikeAboutCompany"
              name="dislikeAboutCompany"
              data-testid="person-name"
              value = {exitFeedBackForm?.dislikeAboutCompany}
              onChange = {onChangeExitFeedBackHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
           Would you consider back to join us at a later date :
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              autoComplete="off"
              type="text"
              id="joinLater"
              name="joinLater"
              data-testid="person-name"
              value = {exitFeedBackForm?.joinLater}
              onChange = {onChangeExitFeedBackHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
          Upload Exit Feedback Form :
          </CFormLabel>
          <CCol sm={3}>
            <input
              className="sh-updateTicket-file"
              type="file"
              data-testid="file-upload"
              id="fileUpload"
              // onChange={(element: React.SyntheticEvent) =>
              //   onChangeFileEventHandler(
              //     element.currentTarget as HTMLInputElement,
              //   )
              // }
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
          Upload Relieving Letter :
          </CFormLabel>
          <CCol sm={3}>
            <input
              className="sh-updateTicket-file"
              type="file"
              data-testid="file-upload"
              id="fileUpload"
              // onChange={(element: React.SyntheticEvent) =>
              //   onChangeFileEventHandler(
              //     element.currentTarget as HTMLInputElement,
              //   )
              // }
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol md={{ span: 6, offset: 2 }}>
            <>
              <CButton
                className="btn-ovh me-1"
                data-testid="create-btn"
                color="success"
                // onClick={handleApplyTicket}
                // disabled={!isCreateButtonEnabled || dateError}
              >
                Submit
              </CButton>
              <CButton
                color="warning "
                data-testid="clear-btn"
                className="btn-ovh"
                // onClick={clearBtnHandler}
              >
                Clear
              </CButton>
            </>
          </CCol>
          </CRow>
      </CForm>
    </>
  )
}

export default ExitFeedBackFormFilterOptions
