import React, { useEffect, useState } from 'react'
import { CButton, CCol, CFormLabel, CRow } from '@coreui/react-pro'
import AddEditCandidateTemplate from '../AddEditCandidateTemplate/AddEditCandidateTemplate'
import {
  AddNewCandidateDTO,
  CandidateAppliedForList,
  CandidateWhatsAppNotificationsRadio,
  CurrentAddCandidatePage,
  country,
} from '../../../../types/Recruitment/CandidateList/CandidateListTypes'
import {
  initialCandidateCountry,
  initialCandidateAppliedForList,
  nonRequiredFinalCandidateData,
  getCurrentScheduleTime,
} from '../CandidateListHelpers'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import { interchangeMonthAndDay } from '../../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'
import OCard from '../../../../components/ReusableComponent/OCard'
import AddTechnologyMainPage from '../AddEditCandidateTemplate/AddTechnology/AddTechnologyMainPage'

const AddCandidate = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const currentAddCandidatePage = useTypedSelector(
    (state) => state.candidateList.currentAddCandidatePage,
  )
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [aadharNumber, setAadharNumber] = useState<string>('')
  const [panNumber, setPanNumber] = useState<string>('')
  const [appliedFor, setAppliedFor] = useState<CandidateAppliedForList>(
    initialCandidateAppliedForList,
  )
  const [sourceType, setSourceType] = useState<string>('')
  const [experience, setExperience] = useState<string>('')
  const [sourceName, setSourceName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [linkedInId, setLinkedInId] = useState<string>('')
  const [dob, setDob] = useState<string>('')
  const [mobileCode, setMobileCode] = useState<country>(initialCandidateCountry)
  const [mobileNumber, setMobileNumber] = useState<string>('')
  const [technology, setTechnology] = useState<string>('')
  const [ctc, setCtc] = useState<string>('')
  const [ectc, setEctc] = useState<string>('')
  const [recruiterName, setRecruiterName] = useState<string>('')
  const [skills, setSkills] = useState<string>('')
  const [currentEmployer, setCurrentEmployer] = useState<string>('')
  const [currentLocation, setCurrentLocation] = useState<string>('')
  const [noticePeriod, setNoticePeriod] = useState<string>('')
  const [jobType, setJobType] = useState<string>('')
  const [skypeId, setSkypeId] = useState<string>('')
  const [whatsAppNotifications, setWhatsAppNotifications] = useState<string>(
    CandidateWhatsAppNotificationsRadio.yes,
  )
  const [selectCountry, setSelectCountry] = useState<country>(
    initialCandidateCountry,
  )
  const [uploadedFile, setUploadedFile] = useState<File>()
  const [reasonForChange, setReasonForChange] = useState<string>('')
  const [showEditor, setShowEditor] = useState<boolean>(true)

  const [isAddButtonEnabled, setAddButtonEnabled] = useState<boolean>(false)

  useEffect(() => {
    dispatch(reduxServices.candidateList.getAllEmployeeDetailsThunk())
    dispatch(reduxServices.candidateList.getAllCompaniesDataThunk())
    dispatch(reduxServices.candidateList.getAllJobVacanciesThunk())
    dispatch(reduxServices.candidateList.getEmpCountries())
    dispatch(reduxServices.candidateList.getTechnology())
  }, [])

  const reasonForChangeHandler = (value: string) => {
    setReasonForChange(value)
  }

  const uploadedFileHandler = (element: HTMLInputElement) => {
    const file = element.files
    if (file && file !== undefined) {
      setUploadedFile(file[0])
    }
  }

  const clearButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowEditor(false)
    setFirstName('')
    setLastName('')
    setAppliedFor(initialCandidateAppliedForList)
    setExperience('')
    setSourceType('')
    setExperience('')
    setSourceName('')
    setTechnology('')
    setLinkedInId('')
    setEmail('')
    setDob('')
    setMobileCode(initialCandidateCountry)
    setMobileNumber('')
    setRecruiterName('')
    setSkills('')
    setCtc('')
    setEctc('')
    setCurrentEmployer('')
    setCurrentLocation('')
    setNoticePeriod('')
    setJobType('')
    setSkypeId('')
    setUploadedFile(undefined)
    setSelectCountry(initialCandidateCountry)
    setWhatsAppNotifications(CandidateWhatsAppNotificationsRadio.yes)
    setReasonForChange('')
    setTimeout(() => {
      setShowEditor(true)
    }, 20)
  }

  const addButtonHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setAddButtonEnabled(false)
    const mobileResult = await dispatch(
      reduxServices.candidateList.checkCandidateMobileNumberThunk(mobileNumber),
    )
    if (
      reduxServices.candidateList.checkCandidateMobileNumberThunk.fulfilled.match(
        mobileResult,
      ) &&
      mobileResult.payload === false
    ) {
      const finalData: AddNewCandidateDTO = {
        notifications: whatsAppNotifications,
        candidateEmail: email,
        mobile: mobileNumber,
        countryCode: +mobileCode.id,
        candidateFirstName: firstName,
        candidateLastName: lastName,
        adhar: nonRequiredFinalCandidateData(aadharNumber),
        pan: nonRequiredFinalCandidateData(panNumber),
        appliedFor,
        sourceType,
        sourceName,
        experience,
        technology,
        linkedin: nonRequiredFinalCandidateData(linkedInId),
        dob: interchangeMonthAndDay(dob),
        recruiter: nonRequiredFinalCandidateData(recruiterName),
        skills,
        ctc,
        ectc,
        currentEmployer: nonRequiredFinalCandidateData(currentEmployer),
        currentLocation,
        np: noticePeriod,
        jobTypeName: jobType,
        skypeId: nonRequiredFinalCandidateData(skypeId),
        countryId: selectCountry.id,
        reason: reasonForChange,
        scheduleFlag: 'no',
        interviewersDTOList: [],
        scheduleTime: getCurrentScheduleTime(),
      }
      const result = await dispatch(
        reduxServices.candidateList.addNewCandidateThunk(finalData),
      )
      if (
        reduxServices.candidateList.addNewCandidateThunk.fulfilled.match(result)
      ) {
        const personId = result.payload
        const file = new FormData()
        if (uploadedFile !== undefined) {
          file.append('file', uploadedFile)
        }
        await dispatch(
          reduxServices.candidateList.uploadCandidateResumeThunk({
            personId,
            file,
          }),
        )
        window.location.href = '/jobschedulecandidateList'
      }
    }
    setAddButtonEnabled(true)
  }

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title={currentAddCandidatePage}
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      {currentAddCandidatePage === CurrentAddCandidatePage.addCandidate && (
        <>
          <AddEditCandidateTemplate
            backButtonLink="jobschedulecandidateList"
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            aadharNumber={aadharNumber}
            setAadharNumber={setAadharNumber}
            panNumber={panNumber}
            setPanNumber={setPanNumber}
            appliedFor={appliedFor}
            setAppliedFor={setAppliedFor}
            sourceType={sourceType}
            setSourceType={setSourceType}
            experience={experience}
            setExperience={setExperience}
            sourceName={sourceName}
            setSourceName={setSourceName}
            emailId={email}
            setEmailId={setEmail}
            linkedInId={linkedInId}
            setLinkedInId={setLinkedInId}
            mobileCode={mobileCode}
            setMobileCode={setMobileCode}
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
            dob={dob}
            setDob={setDob}
            technology={technology}
            setTechnology={setTechnology}
            ctc={ctc}
            setCtc={setCtc}
            ectc={ectc}
            setEctc={setEctc}
            recruiterName={recruiterName}
            setRecruiterName={setRecruiterName}
            skills={skills}
            setSkills={setSkills}
            currentEmployer={currentEmployer}
            setCurrentEmployer={setCurrentEmployer}
            currentLocation={currentLocation}
            setCurrentLocation={setCurrentLocation}
            noticePeriod={noticePeriod}
            setNoticePeriod={setNoticePeriod}
            skypeId={skypeId}
            setSkypeId={setSkypeId}
            jobType={jobType}
            setJobType={setJobType}
            selectCountry={selectCountry}
            setSelectCountry={setSelectCountry}
            whatsAppNotifications={whatsAppNotifications}
            setWhatsAppNotifications={setWhatsAppNotifications}
            reasonForChange={reasonForChange}
            reasonForChangeHandler={reasonForChangeHandler}
            uploadedFileHandler={uploadedFileHandler}
            showEditor={showEditor}
            setFinalButtonEnabled={setAddButtonEnabled}
          />
          <CRow>
            <CFormLabel className="col-form-label category-label col-sm-2 col-form-label text-end"></CFormLabel>
            <CCol sm={4}>
              <CButton
                type="submit"
                color="success"
                className="btn-ovh me-1"
                data-testid="addCand-addBtn"
                disabled={!isAddButtonEnabled}
                onClick={addButtonHandler}
              >
                Add
              </CButton>
              <CButton
                color="warning"
                data-testid="clear-btn"
                className="btn-ovh me-1"
                onClick={clearButtonHandler}
              >
                Clear
              </CButton>
            </CCol>
          </CRow>
        </>
      )}
      {currentAddCandidatePage === CurrentAddCandidatePage.addTechnology && (
        <AddTechnologyMainPage />
      )}
    </OCard>
  )
}

export default AddCandidate
