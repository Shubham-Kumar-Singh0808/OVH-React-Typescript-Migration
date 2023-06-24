import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CRow, CFormLabel, CCol, CButton } from '@coreui/react-pro'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import OCard from '../../../../components/ReusableComponent/OCard'
import {
  CandidateAppliedForList,
  country,
  CandidateWhatsAppNotificationsRadio,
  IncomingEditCandidateData,
} from '../../../../types/Recruitment/CandidateList/CandidateListTypes'
import {
  emailExistsError,
  filterCandidateCountryByCountryId,
  getFinalIncomingCandidateValue,
  initialCandidateAppliedForList,
  initialCandidateCountry,
  mobileExistsError,
  getTrimmedCandidateValue,
  nonRequiredFinalCandidateData,
  getCurrentScheduleTime,
  candidateFeatureId,
} from '../CandidateListHelpers'
import AddEditCandidateTemplate from '../AddEditCandidateTemplate/AddEditCandidateTemplate'
import OToast from '../../../../components/ReusableComponent/OToast'
import { exchangeMonthAndDayInDate } from '../../InterviewStatusReport/InterviewStatusReportHelpers'

const EditCandidate = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { personId } = useParams<{ personId: string }>()
  const candidateData = useTypedSelector(
    (state) => state.candidateList.editCandidateData,
  )
  const allEmpCountries = useTypedSelector(
    (state) => state.candidateList.empCountries,
  )
  const userAccessToFeaturesCandidate = useTypedSelector(
    (state) =>
      state.userAccessToFeatures.userAccessToFeatures.filter(
        (feature) => feature.featureId === candidateFeatureId,
      )[0],
  )

  const [enteredFirstName, setEnteredFirstName] = useState<string>('')
  const [enteredLastName, setEnteredLastName] = useState<string>('')
  const [enteredAadharNumber, setEnteredAadharNumber] = useState<string>('')
  const [enteredPanNumber, setEnteredPanNumber] = useState<string>('')
  const [enteredAppliedFor, setEnteredAppliedFor] =
    useState<CandidateAppliedForList>(initialCandidateAppliedForList)
  const [enteredSourceType, setEnteredSourceType] = useState<string>('')
  const [enteredExperience, setEnteredExperience] = useState<string>('')
  const [enteredSourceName, setEnteredSourceName] = useState<string>('')
  const [enteredEmail, setEnteredEmail] = useState<string>('')
  const [enteredLinkedInId, setEnteredLinkedInId] = useState<string>('')
  const [enteredDob, setEnteredDob] = useState<string>('')
  const [enteredMobileCode, setEnteredMobileCode] = useState<country>(
    initialCandidateCountry,
  )
  const [enteredMobileNumber, setEnteredMobileNumber] = useState<string>('')
  const [enteredTechnology, setEnteredTechnology] = useState<string>('')
  const [enteredCtc, setEnteredCtc] = useState<string>('')
  const [enteredEctc, setEnteredEctc] = useState<string>('')
  const [enteredRecruiterName, setEnteredRecruiterName] = useState<string>('')
  const [enteredSkills, setEnteredSkills] = useState<string>('')
  const [enteredCurrentEmployer, setEnteredCurrentEmployer] =
    useState<string>('')
  const [enteredCurrentLocation, setEnteredCurrentLocation] =
    useState<string>('')
  const [enteredNoticePeriod, setEnteredNoticePeriod] = useState<string>('')
  const [enteredJobType, setEnteredJobType] = useState<string>('')
  const [enteredSkypeId, setEnteredSkypeId] = useState<string>('')
  const [enteredWhatsAppNotifications, setEnteredWhatsAppNotifications] =
    useState<string>(CandidateWhatsAppNotificationsRadio.yes)
  const [enteredCountry, setEnteredCountry] = useState<country>(
    initialCandidateCountry,
  )
  const [uploadedFile, setUploadedFile] = useState<File>()
  const [enteredReasonForChange, setEnteredReasonForChange] = useState<string>(
    candidateData.reason,
  )
  const [showEditor, setShowEditor] = useState<boolean>(true)

  const [isUpdateBtnEnabled, setUpdateBtnEnabled] = useState<boolean>(true)

  const reasonForChangeHandler = (value: string) => {
    setEnteredReasonForChange(value)
  }

  useEffect(() => {
    dispatch(reduxServices.candidateList.getAllEmployeeDetailsThunk())
    dispatch(reduxServices.candidateList.getAllCompaniesDataThunk())
    dispatch(reduxServices.candidateList.getAllJobVacanciesThunk())
    dispatch(reduxServices.candidateList.getEmpCountries())
    dispatch(reduxServices.candidateList.getTechnology())
    dispatch(reduxServices.candidateList.editCandidateDataThunk(+personId))
  }, [])

  useEffect(() => {
    setEnteredFirstName(candidateData.candidateFirstName)
    setEnteredLastName(candidateData.candidateLastName)
    setEnteredAadharNumber(getFinalIncomingCandidateValue(candidateData.adhar))
    setEnteredPanNumber(getFinalIncomingCandidateValue(candidateData.pan))
    setEnteredAppliedFor(candidateData.appliedFor)
    setEnteredEmail(candidateData.candidateEmail)
    setEnteredSourceType(candidateData.sourceType)
    setEnteredExperience(candidateData.experience)
    setEnteredTechnology(candidateData.technology)
    setEnteredLinkedInId(getFinalIncomingCandidateValue(candidateData.linkedin))
    setEnteredDob(exchangeMonthAndDayInDate(candidateData.dob))
    setEnteredMobileCode(
      filterCandidateCountryByCountryId(
        allEmpCountries,
        candidateData.countryCode,
      ),
    )
    setEnteredMobileNumber(candidateData.mobile)
    setEnteredRecruiterName(
      getFinalIncomingCandidateValue(candidateData.recruiter),
    )
    setEnteredSkills(candidateData.skills)
    setEnteredCtc(candidateData.ctc)
    setEnteredEctc(candidateData.ectc)
    setEnteredCurrentEmployer(
      getFinalIncomingCandidateValue(candidateData.currentEmployer),
    )
    setEnteredCurrentLocation(candidateData.currentLocation)
    setEnteredNoticePeriod(candidateData.np)
    setEnteredJobType(candidateData.jobTypeName)
    setEnteredSkypeId(getFinalIncomingCandidateValue(candidateData.skypeId))
    setEnteredCountry(candidateData.country)
    setEnteredWhatsAppNotifications(candidateData.notifications)
    setShowEditor(false)
    reasonForChangeHandler(candidateData.reason)
    setTimeout(() => {
      setShowEditor(true)
      setEnteredSourceName(candidateData.sourceName)
    }, 100)
  }, [candidateData])

  const updateButtonHandler = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    const finalData: IncomingEditCandidateData = {
      ...candidateData,
      candidateFirstName: getTrimmedCandidateValue(enteredFirstName),
      candidateLastName: getTrimmedCandidateValue(enteredLastName),
      adhar: nonRequiredFinalCandidateData(enteredAadharNumber),
      pan: nonRequiredFinalCandidateData(enteredPanNumber),
      candidateEmail: getTrimmedCandidateValue(enteredEmail),
      sourceType: enteredSourceType,
      experience: enteredExperience,
      sourceName: getTrimmedCandidateValue(enteredSourceName),
      technology: enteredTechnology,
      linkedin: nonRequiredFinalCandidateData(enteredLinkedInId),
      dob: exchangeMonthAndDayInDate(enteredDob),
      mobile: getTrimmedCandidateValue(enteredMobileNumber),
      recruiter: nonRequiredFinalCandidateData(enteredRecruiterName),
      skills: getTrimmedCandidateValue(enteredSkills),
      ctc: getTrimmedCandidateValue(enteredCtc),
      ectc: getTrimmedCandidateValue(enteredEctc),
      currentEmployer: nonRequiredFinalCandidateData(enteredCurrentEmployer),
      currentLocation: getTrimmedCandidateValue(enteredCurrentLocation),
      np: getTrimmedCandidateValue(enteredNoticePeriod),
      jobTypeName: enteredJobType,
      skypeId: nonRequiredFinalCandidateData(enteredSkypeId),
      reason: enteredReasonForChange,
      vacancyId: enteredAppliedFor.id,
      scheduleTime: getCurrentScheduleTime(),
      scheduleFlag: 'no',
      interviewersDTOList: [],
      countryCode: enteredMobileCode.id,
      countryId: enteredCountry.id,
      uploadResume: null,
      otherDocs: null,
      candidateId: candidateData.candidateId.toString(),
    }
    const emailExistsResult = await dispatch(
      reduxServices.candidateList.isEditNewCandidateEmailExistsThunk({
        candidateId: +candidateData.candidateId,
        mailId: enteredEmail,
      }),
    )
    if (
      reduxServices.candidateList.isEditNewCandidateEmailExistsThunk.fulfilled.match(
        emailExistsResult,
      ) &&
      emailExistsResult.payload === true
    ) {
      setEnteredEmail('')
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast toastColor="danger" toastMessage={emailExistsError} />,
        ),
      )
      return
    }
    const mobileNumExists = await dispatch(
      reduxServices.candidateList.isEditNewCandidateMobileNumExistsThunk({
        candidateId: +candidateData.candidateId,
        mobileNum: +enteredMobileNumber,
      }),
    )
    if (
      reduxServices.candidateList.isEditNewCandidateMobileNumExistsThunk.fulfilled.match(
        mobileNumExists,
      ) &&
      mobileNumExists.payload === true
    ) {
      setEnteredMobileNumber('')
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast toastColor="danger" toastMessage={mobileExistsError} />,
        ),
      )
      return
    }
    const finalDataDispatch = await dispatch(
      reduxServices.candidateList.editNewCandidateThunk(finalData),
    )
    if (
      reduxServices.candidateList.editNewCandidateThunk.fulfilled.match(
        finalDataDispatch,
      )
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Candidate Details Updated Successfully"
          />,
        ),
      )
      const file = new FormData()
      if (uploadedFile !== undefined) {
        file.append('file', uploadedFile)
      }
      await dispatch(
        reduxServices.candidateList.uploadCandidateResumeThunk({
          personId: +candidateData.candidateId,
          file,
        }),
      )
      window.location.href = '/jobschedulecandidateList'
    }
  }

  console.log(useTypedSelector((state) => state.candidateList))

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="Edit Candidate"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      <AddEditCandidateTemplate
        isAddFunctionality={false}
        backButtonLink="jobschedulecandidateList"
        firstName={enteredFirstName}
        setFirstName={setEnteredFirstName}
        lastName={enteredLastName}
        setLastName={setEnteredLastName}
        aadharNumber={enteredAadharNumber}
        setAadharNumber={setEnteredAadharNumber}
        panNumber={enteredPanNumber}
        setPanNumber={setEnteredPanNumber}
        appliedFor={enteredAppliedFor}
        setAppliedFor={setEnteredAppliedFor}
        sourceType={enteredSourceType}
        setSourceType={setEnteredSourceType}
        experience={enteredExperience}
        setExperience={setEnteredExperience}
        sourceName={enteredSourceName}
        setSourceName={setEnteredSourceName}
        emailId={enteredEmail}
        setEmailId={setEnteredEmail}
        linkedInId={enteredLinkedInId}
        setLinkedInId={setEnteredLinkedInId}
        mobileCode={enteredMobileCode}
        setMobileCode={setEnteredMobileCode}
        mobileNumber={enteredMobileNumber}
        setMobileNumber={setEnteredMobileNumber}
        dob={enteredDob}
        setDob={setEnteredDob}
        technology={enteredTechnology}
        setTechnology={setEnteredTechnology}
        ctc={enteredCtc}
        setCtc={setEnteredCtc}
        ectc={enteredEctc}
        setEctc={setEnteredEctc}
        recruiterName={enteredRecruiterName}
        setRecruiterName={setEnteredRecruiterName}
        skills={enteredSkills}
        setSkills={setEnteredSkills}
        currentEmployer={enteredCurrentEmployer}
        setCurrentEmployer={setEnteredCurrentEmployer}
        currentLocation={enteredCurrentLocation}
        setCurrentLocation={setEnteredCurrentLocation}
        noticePeriod={enteredNoticePeriod}
        setNoticePeriod={setEnteredNoticePeriod}
        skypeId={enteredSkypeId}
        setSkypeId={setEnteredSkypeId}
        jobType={enteredJobType}
        setJobType={setEnteredJobType}
        selectCountry={enteredCountry}
        setSelectCountry={setEnteredCountry}
        whatsAppNotifications={enteredWhatsAppNotifications}
        setWhatsAppNotifications={setEnteredWhatsAppNotifications}
        reasonForChange={enteredReasonForChange}
        reasonForChangeHandler={setEnteredReasonForChange}
        uploadedFile={uploadedFile}
        setUploadedFile={setUploadedFile}
        uploadedResumeFileName={candidateData.uploadResume}
        showEditor={showEditor}
        setFinalButtonEnabled={setUpdateBtnEnabled}
      />
      {userAccessToFeaturesCandidate?.updateaccess === true && (
        <CRow>
          <CFormLabel className="col-form-label category-label col-sm-2 col-form-label text-end"></CFormLabel>
          <CCol sm={4}>
            <CButton
              type="submit"
              color="success"
              className="btn-ovh"
              data-testid="editCand-updateBtn"
              disabled={!isUpdateBtnEnabled}
              onClick={updateButtonHandler}
            >
              Update
            </CButton>
          </CCol>
        </CRow>
      )}
    </OCard>
  )
}

export default EditCandidate
