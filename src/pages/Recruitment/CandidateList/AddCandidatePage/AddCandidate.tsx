import React, { useEffect, useState } from 'react'
import { CButton, CCol, CFormLabel, CRow } from '@coreui/react-pro'
import AddEditCandidateTemplate from '../AddEditCandidateTemplate/AddEditCandidateTemplate'
import {
  AddNewCandidateDTO,
  CandidateAppliedForList,
  CandidateWhatsAppNotificationsRadio,
  country,
} from '../../../../types/Recruitment/CandidateList/CandidateListTypes'
import {
  filterCandidateCountryByCountryId,
  initialCandidateCountry,
  initialCandidateAppliedForList,
  filterCandidateAppliedForById,
  nonRequiredFinalCandidateData,
  getCurrentScheduleTime,
} from '../CandidateListHelpers'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { regexNumberOnly } from '../../../../constant/constantData'
import { reduxServices } from '../../../../reducers/reduxServices'
import { interchangeMonthAndDay } from '../../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'
import OCard from '../../../../components/ReusableComponent/OCard'

const AddCandidate = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const allEmpCountriesList = useTypedSelector(
    (state) => state.candidateList.empCountries,
  )
  const allJobVacanciesList = useTypedSelector(
    (state) => state.candidateList.allJobVacancies?.list,
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

  const firstNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value?.trim())
  }

  const lastNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value?.trim())
  }

  const aadharNumberChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // only numbers allowed
    setAadharNumber(e.target.value.replace(regexNumberOnly, ''))
  }

  const panNumberChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPanNumber(e.target.value)
  }

  const sourceTypeChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSourceType(e.target.value)
  }

  const experienceChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // only numbers allowed
    setExperience(e.target.value.replace(regexNumberOnly, ''))
  }

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.trim())
  }

  const linkedInIdChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkedInId(e.target.value.trim())
  }

  const mobileCodeChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMobileCode(
      filterCandidateCountryByCountryId(allEmpCountriesList, +e.target.value),
    )
  }

  const mobileNumberChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const finalVal = e.target.value.replace(regexNumberOnly, '').trim()
    if (finalVal.length <= 10) {
      setMobileNumber(finalVal)
    }
  }

  const technologyChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTechnology(e.target.value)
  }

  const ctcChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // allowing only number input
    setCtc(e.target.value.replace(regexNumberOnly, ''))
  }

  const ectcChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //allowing only number input
    setEctc(e.target.value.replace(regexNumberOnly, ''))
  }

  const skillsChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkills(e.target.value.trim())
  }

  const currentLocationChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCurrentLocation(e.target.value.trim())
  }

  const noticePeriodChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // allowing only number input
    setNoticePeriod(e.target.value.replace(regexNumberOnly, ''))
  }

  const skypeIdChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkypeId(e.target.value.trim())
  }

  const jobTypeChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setJobType(e.target.value)
  }

  const whatsAppNotificationsChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setWhatsAppNotifications(e.target.value)
  }

  const countryChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectCountry(
      filterCandidateCountryByCountryId(allEmpCountriesList, +e.target.value),
    )
  }

  const appliedForChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAppliedFor(
      filterCandidateAppliedForById(allJobVacanciesList, +e.target.value),
    )
  }

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
    const mobileResult = await dispatch(
      reduxServices.candidateList.checkCandidateMobileNumberThunk(mobileNumber),
    )
    if (
      reduxServices.candidateList.checkCandidateMobileNumberThunk.fulfilled.match(
        mobileResult,
      ) &&
      mobileResult.payload === false
    ) {
      console.log(mobileCode)
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
        window.location.href = '/jobschedulecandidateList'
      }
    }
  }

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="Add New Candidate"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      <AddEditCandidateTemplate
        backButtonLink="jobschedulecandidateList"
        firstName={firstName}
        firstNameChangeHandler={firstNameChangeHandler}
        lastName={lastName}
        lastNameChangeHandler={lastNameChangeHandler}
        aadharNumber={aadharNumber}
        aadharNumberChangeHandler={aadharNumberChangeHandler}
        panNumber={panNumber}
        panNumberChangeHandler={panNumberChangeHandler}
        appliedFor={appliedFor}
        appliedForChangeHandler={appliedForChangeHandler}
        sourceType={sourceType}
        sourceTypeChangeHandler={sourceTypeChangeHandler}
        experience={experience}
        experienceChangeHandler={experienceChangeHandler}
        sourceName={sourceName}
        setSourceName={setSourceName}
        emailId={email}
        setEmailId={setEmail}
        emailIdChangeHandler={emailChangeHandler}
        linkedInId={linkedInId}
        linkedInIdChangeHandler={linkedInIdChangeHandler}
        mobileCode={mobileCode}
        mobileCodeChangeHandler={mobileCodeChangeHandler}
        mobileNumber={mobileNumber}
        mobileNumberChangeHandler={mobileNumberChangeHandler}
        dob={dob}
        setDob={setDob}
        technology={technology}
        technologyChangeHandler={technologyChangeHandler}
        ctc={ctc}
        ctcChangeHandler={ctcChangeHandler}
        ectc={ectc}
        ectcChangeHandler={ectcChangeHandler}
        recruiterName={recruiterName}
        setRecruiterName={setRecruiterName}
        skills={skills}
        skillsChangeHandler={skillsChangeHandler}
        currentEmployer={currentEmployer}
        setCurrentEmployer={setCurrentEmployer}
        currentLocation={currentLocation}
        currentLocationChangeHandler={currentLocationChangeHandler}
        noticePeriod={noticePeriod}
        noticePeriodChangeHandler={noticePeriodChangeHandler}
        skypeId={skypeId}
        skypeIdChangeHandler={skypeIdChangeHandler}
        jobType={jobType}
        jobTypeChangeHandler={jobTypeChangeHandler}
        selectCountry={selectCountry}
        countryChangeHandler={countryChangeHandler}
        whatsAppNotifications={whatsAppNotifications}
        whatsAppNotificationsChangeHandler={whatsAppNotificationsChangeHandler}
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
    </OCard>
  )
}

export default AddCandidate
