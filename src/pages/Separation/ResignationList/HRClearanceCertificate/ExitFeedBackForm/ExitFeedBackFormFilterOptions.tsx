/* eslint-disable prettier/prettier */
import { CButton, CCol, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import OToast from '../../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { SubmitExitFeedBackForm } from '../../../../../types/Separation/ResignationList/resignationListTypes'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'

const ExitFeedBackFormFilterOptions = (): JSX.Element => {
  const initialExitFeedBackForm = {} as SubmitExitFeedBackForm
  const [exitFeedBackForm, setExitFeedBackForm] = useState(initialExitFeedBackForm)
  const [isSubmitButtonEnabled, setIsSubmitButtonEnabled] = useState(false)
  const [uploadFile, setUploadFile] = useState<File | undefined>(undefined)
  const [uploadRelieveLetter, setUploadRelieveLetter] = useState<File | undefined>(undefined)
  const dispatch = useAppDispatch()
  const history = useHistory()
  const getExitFeedBackFormDetails = useTypedSelector(
    reduxServices.resignationList.selectors.getEmpFeedBackDetails,
  )

  const getAllResignationHistory = useTypedSelector(
    reduxServices.resignationList.selectors.resignationTimeLine,
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

  const onChangeFileEventHandler = (element: HTMLInputElement) => {
    const file = element.files
    if (!file) return
    setUploadFile(file[0])
  }
  const onChangeUploadFileEventHandler = (element: HTMLInputElement) => {
    const file = element.files
    if (!file) return
    setUploadRelieveLetter(file[0])
  }

  useEffect(() => {
    if (
      uploadFile &&
      uploadRelieveLetter
    ) {
      setIsSubmitButtonEnabled(true)
    } else {
      setIsSubmitButtonEnabled(false)
    }
  }, [uploadFile, uploadRelieveLetter])


  const handleSubmitExitFeedBackForm = async () => {
    const createNewTicketResultAction = await dispatch(
      reduxServices.resignationList.saveExitFeedBackForm({
        educationalBackground: exitFeedBackForm?.educationalBackground,
        employeeId: getExitFeedBackFormDetails?.employeeId,
        employeeName: getExitFeedBackFormDetails.employeeName,
        expectations: exitFeedBackForm?.expectations,
        expectationsFulfilled: exitFeedBackForm?.expectationsFulfilled,
        joinLater: exitFeedBackForm?.joinLater,
        likeAboutCompany: exitFeedBackForm?.likeAboutCompany,
        opportunityForGrowth: exitFeedBackForm?.opportunityForGrowth,
        organisationCulture: exitFeedBackForm?.organisationCulture,
        personelPolicies: exitFeedBackForm?.personelPolicies,
        primaryReasonId: getExitFeedBackFormDetails?.primaryReasonId,
        promotion: exitFeedBackForm?.promotion,
        recognitionOfwork: exitFeedBackForm?.recognitionOfwork,
        roleClarity: exitFeedBackForm?.roleClarity,
        salary: exitFeedBackForm?.salary,
        separationId: getAllResignationHistory?.separationId as number,
        superiorGuidance: exitFeedBackForm?.superiorGuidance,
        dislikeAboutCompany: exitFeedBackForm?.dislikeAboutCompany
      }),
    )
    if (uploadFile) {
      const formData = new FormData()
      formData.append('file', uploadFile, uploadFile.name)
      const ticketIdParams = createNewTicketResultAction.payload 
      const uploadPrepareObject = {
        exitformId: ticketIdParams as number,
        file: formData,
      }
      dispatch(
        reduxServices.resignationList.uploadRelievingLetter(
          uploadPrepareObject,
        ),
      )
    }
    if (uploadRelieveLetter) {
      const formData = new FormData()
      formData.append('file', uploadRelieveLetter, uploadRelieveLetter.name)
      const ticketIdParams = createNewTicketResultAction.payload 
      const uploadPrepareObject = {
        exitfeddbackformId: ticketIdParams as number,
        file: formData,
      }
      dispatch(
        reduxServices.resignationList.uploadExitfeedBackFile(
          uploadPrepareObject,
        ),
      )    
    }
    history.push('/resignationList')
    if (
      reduxServices.resignationList.saveExitFeedBackForm.fulfilled.match(
        createNewTicketResultAction,
      )
    ) {    
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Ticket created successfully"
          />,
        ),
      )
    }
    
  }
  const clearBtnHandler = () =>{
    setExitFeedBackForm({
      dislikeAboutCompany: '',
      educationalBackground: '',
      employeeId: 0,
      employeeName: '',
      expectations: '',
      expectationsFulfilled: '',
      joinLater: '',
      likeAboutCompany: '',
      opportunityForGrowth: '',
      organisationCulture: '',
      personelPolicies: '',
      primaryReasonId: 0,
      promotion: '',
      recognitionOfwork: '',
      roleClarity: '',
      salary: '',
      separationId: 0,
      superiorGuidance: '',
    })  
    setUploadFile(undefined)  
    setUploadRelieveLetter(undefined)
  }
  
   return (
    <>
      <CForm>   
       
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
          <span
                className={
                  uploadFile
                    ? 'text-white'
                    : 'text-danger'
                }
              >
                *
              </span>
          </CFormLabel>
          <CCol sm={3}>
            <input
              className="sh-updateTicket-file"
              type="file"
              data-testid="file-upload"
              id="fileUpload"
              onChange={(element: React.SyntheticEvent) =>
                onChangeFileEventHandler(
                  element.currentTarget as HTMLInputElement,
                )
              }
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
          Upload Relieving Letter :
          <span
                className={
                  uploadRelieveLetter
                    ? 'text-white'
                    : 'text-danger'
                }
              >
                *
              </span>
          </CFormLabel>
          <CCol sm={3}>
            <input
              className="sh-updateTicket-file"
              type="file"
              data-testid="file-upload"
              id="fileUpload"
              onChange={(element: React.SyntheticEvent) =>
                onChangeUploadFileEventHandler(
                  element.currentTarget as HTMLInputElement,
                )
              }
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
                onClick={handleSubmitExitFeedBackForm}
               disabled={!isSubmitButtonEnabled}
              >
                Submit
              </CButton>
              <CButton
                color="warning "
                data-testid="clear-btn"
                className="btn-ovh"
               onClick={clearBtnHandler}
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
