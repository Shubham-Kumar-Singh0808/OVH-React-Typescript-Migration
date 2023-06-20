import {
  CButton,
  CCol,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import React, { SyntheticEvent, useEffect, useMemo } from 'react'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import { Link } from 'react-router-dom'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import CandidateEntryItem from './CandidateEntryItem'
import AutoFillSourceName from './AutofillSourceName'
import AutoFillCurrentEmployer from './AutoFillCurrentEmployer'
import {
  AddEditCandidateTemplateProps,
  CandidateSourceType,
  CandidateWhatsAppNotificationsRadio,
} from '../../../../types/Recruitment/CandidateList/CandidateListTypes'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import {
  candidateSourceTypeList,
  initialCandidateAppliedForList,
  initialCandidateCountry,
  candidateJobTypeList,
  get18YearsBackDate,
  getDataInputTestId,
  filterCandidateAppliedForById,
  filterCandidateCountryByCountryId,
} from '../CandidateListHelpers'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { commonDateFormat } from '../../../../utils/dateFormatUtils'
import { getFormattedDate } from '../../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'
import { reduxServices } from '../../../../reducers/reduxServices'
import OToast from '../../../../components/ReusableComponent/OToast'
import { regexNumberOnly } from '../../../../constant/constantData'

const AddEditCandidateTemplate = ({
  backButtonLink,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  aadharNumber,
  setAadharNumber,
  panNumber,
  setPanNumber,
  appliedFor,
  setAppliedFor,
  sourceType,
  setSourceType,
  experience,
  setExperience,
  sourceName,
  setSourceName,
  emailId,
  setEmailId,
  linkedInId,
  setLinkedInId,
  mobileCode,
  setMobileCode,
  mobileNumber,
  setMobileNumber,
  dob,
  setDob,
  technology,
  setTechnology,
  ctc,
  setCtc,
  ectc,
  setEctc,
  recruiterName,
  setRecruiterName,
  skills,
  setSkills,
  currentEmployer,
  setCurrentEmployer,
  currentLocation,
  setCurrentLocation,
  noticePeriod,
  setNoticePeriod,
  skypeId,
  setSkypeId,
  jobType,
  setJobType,
  whatsAppNotifications,
  setWhatsAppNotifications,
  selectCountry,
  setSelectCountry,
  reasonForChange,
  reasonForChangeHandler,
  uploadedFileHandler,
  showEditor,
  setFinalButtonEnabled,
}: AddEditCandidateTemplateProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const allJobVacanciesList = useTypedSelector(
    (state) => state.candidateList.allJobVacancies?.list,
  )
  const allEmpCountriesList = useTypedSelector(
    (state) => state.candidateList.empCountries,
  )
  const allTechnologyList = useTypedSelector(
    (state) => state.candidateList.getAllTechnology,
  )
  const allEmployeesList = useTypedSelector(
    (state) => state.candidateList.allEmployeeDetailsList,
  )
  const allCompaniesList = useTypedSelector(
    (state) => state.candidateList.allCompaniesData,
  )

  const showAsterixHandler = (inputValue: string): boolean => {
    //returns true if required value is not entered
    return inputValue.trim().length === 0 || inputValue === ''
  }

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
    setEmailId(e.target.value.trim())
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

  //returns true if required value is not entered
  const firstNameAsterix = useMemo(() => {
    return showAsterixHandler(firstName)
  }, [firstName])
  const lastNameAsterix = useMemo(() => {
    return showAsterixHandler(lastName)
  }, [lastName])
  const appliedForAsterix = useMemo(() => {
    return appliedFor.id === initialCandidateAppliedForList.id
  }, [appliedFor])
  const sourceTypeAsterix = useMemo(() => {
    return showAsterixHandler(sourceType)
  }, [sourceType])
  const experienceAsterix = useMemo(() => {
    return showAsterixHandler(experience)
  }, [experience])
  const sourceNameAsterix = useMemo(() => {
    return sourceName === ''
  }, [sourceName])
  const emailAsterix = useMemo(() => {
    return emailId.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) === null
  }, [emailId])
  const technologyAsterix = useMemo(() => {
    return showAsterixHandler(technology)
  }, [technology])
  const mobileAsterix = useMemo(() => {
    return (
      mobileCode.id === initialCandidateCountry.id || mobileNumber.length < 10
    )
  }, [mobileCode, mobileNumber])
  const dobAsterix = useMemo(() => {
    return showAsterixHandler(dob)
  }, [dob])
  const ctcAsterix = useMemo(() => {
    return showAsterixHandler(ctc)
  }, [ctc])
  const ectcAsterix = useMemo(() => {
    return showAsterixHandler(ectc)
  }, [ectc])
  const skillsAsterix = useMemo(() => {
    return showAsterixHandler(skills)
  }, [skills])
  const currentLocationAsterix = useMemo(() => {
    return showAsterixHandler(currentLocation)
  }, [currentLocation])
  const noticePeriodAsterix = useMemo(() => {
    return showAsterixHandler(noticePeriod)
  }, [noticePeriod])
  const jobTypeAsterix = useMemo(() => {
    return showAsterixHandler(jobType)
  }, [jobType])
  const countryAsterix = useMemo(() => {
    return selectCountry.id === initialCandidateCountry.id
  }, [selectCountry])
  const reasonForChangeAsterix = useMemo(() => {
    return showAsterixHandler(reasonForChange)
  }, [reasonForChange])

  useEffect(() => {
    setSourceName('')
  }, [sourceType])

  // once we are out of focus, an api is called to check whether is pre registered or not
  const outFocusEmail = async () => {
    if (emailId !== '') {
      const result = await dispatch(
        reduxServices.candidateList.checkCandidateEmailThunk(emailId),
      )
      if (
        reduxServices.candidateList.checkCandidateEmailThunk.fulfilled.match(
          result,
        ) &&
        result.payload === true
      ) {
        dispatch(
          reduxServices.app.actions.addToast(
            <OToast toastColor="danger" toastMessage="Email Already Exists" />,
          ),
        )
        setEmailId('')
      }
    }
  }

  // used to enable or disable button based on compulsory fields
  useEffect(() => {
    if (
      firstNameAsterix ||
      lastNameAsterix ||
      appliedForAsterix ||
      sourceTypeAsterix ||
      experienceAsterix ||
      sourceNameAsterix ||
      emailAsterix ||
      technologyAsterix ||
      dobAsterix ||
      mobileAsterix ||
      ctcAsterix ||
      ectcAsterix ||
      skillsAsterix ||
      currentLocationAsterix ||
      noticePeriodAsterix ||
      jobTypeAsterix ||
      countryAsterix ||
      reasonForChangeAsterix
    ) {
      setFinalButtonEnabled(false)
    } else {
      setFinalButtonEnabled(true)
    }
  }, [
    firstNameAsterix,
    lastNameAsterix,
    appliedForAsterix,
    sourceTypeAsterix,
    experienceAsterix,
    sourceNameAsterix,
    emailAsterix,
    technologyAsterix,
    dobAsterix,
    mobileAsterix,
    ctcAsterix,
    ectcAsterix,
    skillsAsterix,
    currentLocationAsterix,
    noticePeriodAsterix,
    jobTypeAsterix,
    countryAsterix,
    reasonForChangeAsterix,
  ])

  return (
    <>
      <CRow className="mt-2 justify-content-end text-end">
        <CCol xs={2} className="px-0">
          <CButton color="info" className="btn-ovh me-3">
            <Link to={`/${backButtonLink}`} style={{ color: 'white' }}>
              <i className="fa fa-arrow-left me-1"></i>Back
            </Link>
          </CButton>
        </CCol>
      </CRow>
      <div>
        <CRow>
          <CCol sm={6}>
            <CandidateEntryItem
              label="First Name"
              showAsterix={firstNameAsterix}
            >
              <CFormInput
                type="text"
                placeholder="FirstName"
                data-testid={`${getDataInputTestId('fName')}`}
                value={firstName}
                onChange={firstNameChangeHandler}
              />
            </CandidateEntryItem>
          </CCol>
          <CCol sm={6}>
            <CandidateEntryItem label="Last Name" showAsterix={lastNameAsterix}>
              <CFormInput
                type="text"
                placeholder="LastName"
                data-testid={`${getDataInputTestId('lName')}`}
                value={lastName}
                onChange={lastNameChangeHandler}
              />
            </CandidateEntryItem>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6}>
            <CandidateEntryItem label="Aadhar Number">
              <CFormInput
                type="text"
                placeholder="Aadhar Number"
                data-testid={`${getDataInputTestId('aNum')}`}
                value={aadharNumber}
                onChange={aadharNumberChangeHandler}
              />
            </CandidateEntryItem>
          </CCol>
          <CCol sm={6}>
            <CandidateEntryItem label="PAN Number">
              <CFormInput
                type="text"
                placeholder="PAN Number"
                data-testid={`${getDataInputTestId('pNum')}`}
                value={panNumber}
                onChange={panNumberChangeHandler}
              />
            </CandidateEntryItem>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6}>
            <CandidateEntryItem
              label="Applied For"
              showAsterix={appliedForAsterix}
            >
              <CFormSelect
                value={appliedFor.id}
                onChange={appliedForChangeHandler}
                data-testid={`${getDataInputTestId('appliedFor')}`}
              >
                <option
                  data-testid="addCandOpt-jobVacancies"
                  value={initialCandidateAppliedForList.id}
                >
                  Select Position Vacant
                </option>
                {allJobVacanciesList?.map((position, positionIndex) => (
                  <option
                    data-testid="addCandOpt-jobVacancies"
                    value={position.id}
                    key={positionIndex}
                  >
                    {position.positionVacant}
                  </option>
                ))}
              </CFormSelect>
            </CandidateEntryItem>
          </CCol>
          <CCol sm={6}>
            <CandidateEntryItem label="Email" showAsterix={emailAsterix}>
              <CFormInput
                type="email"
                placeholder="Email"
                data-testid={`${getDataInputTestId('email')}`}
                value={emailId}
                onChange={emailChangeHandler}
                onBlur={outFocusEmail}
              />
            </CandidateEntryItem>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6}>
            <CandidateEntryItem
              label="Source Type"
              showAsterix={sourceTypeAsterix}
            >
              <CFormSelect
                value={sourceType}
                onChange={sourceTypeChangeHandler}
                data-testid={`${getDataInputTestId('sourceType')}`}
              >
                <option value="">Select Source Type</option>
                {candidateSourceTypeList.map(
                  (sourceTypeItem, sourceTypeIndex) => (
                    <option key={sourceTypeIndex} value={sourceTypeItem}>
                      {sourceTypeItem}
                    </option>
                  ),
                )}
              </CFormSelect>
            </CandidateEntryItem>
          </CCol>
          <CCol sm={6}>
            <CandidateEntryItem
              label="Experience"
              showAsterix={experienceAsterix}
            >
              <CFormInput
                data-testid={`${getDataInputTestId('experience')}`}
                type="text"
                placeholder="Experience"
                value={experience}
                onChange={experienceChangeHandler}
              />
            </CandidateEntryItem>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6}>
            <CandidateEntryItem
              label="Source Name"
              showAsterix={sourceNameAsterix}
            >
              {sourceType !== CandidateSourceType.internal && (
                <CFormInput
                  type="text"
                  placeholder="Enter Source Name"
                  data-testid={`${getDataInputTestId('sourceName-ext')}`}
                  value={sourceName}
                  onChange={(e) => {
                    setSourceName(e.target.value.trim())
                  }}
                />
              )}
              {sourceType === CandidateSourceType.internal && (
                <AutoFillSourceName
                  allEmployeesList={allEmployeesList}
                  employeeName={sourceName}
                  placeholderValue="Type here to autofill"
                  setEmployeeName={setSourceName}
                  implementFocusOut={true}
                />
              )}
            </CandidateEntryItem>
          </CCol>
          <CCol sm={6}>
            <CandidateEntryItem
              label="Technology"
              showAsterix={technologyAsterix}
            >
              <CRow className="align-items-center">
                <CCol sm={7}>
                  <CFormSelect
                    value={technology}
                    onChange={technologyChangeHandler}
                    data-testid={`${getDataInputTestId('technology')}`}
                  >
                    <option value="" data-testid="addCandOpt-techOpt">
                      Select
                    </option>
                    {allTechnologyList.length > 0 &&
                      allTechnologyList?.map(
                        (technologyItem, technologyIndex) => (
                          <option
                            key={technologyIndex}
                            data-testid="addCandOpt-techOpt"
                            value={technologyItem.name}
                          >
                            {technologyItem.name}
                          </option>
                        ),
                      )}
                  </CFormSelect>
                </CCol>
                <CCol sm={5}>
                  <CButton className="btn-ovh" color="info">
                    <i className="fa fa-plus me-1"></i>
                    Add
                  </CButton>
                </CCol>
              </CRow>
            </CandidateEntryItem>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6}>
            <CandidateEntryItem label="LinkedIn ID">
              <CFormInput
                type="text"
                placeholder="LinkedIn ID"
                value={linkedInId}
                onChange={linkedInIdChangeHandler}
                data-testid={`${getDataInputTestId('linkedin')}`}
              />
            </CandidateEntryItem>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6}>
            <CandidateEntryItem label="DOB" showAsterix={dobAsterix}>
              <ReactDatePicker
                className="form-control form-control-sm sh-date-picker"
                dropdownMode="select"
                placeholderText="dd/mm/yyyy"
                value={getFormattedDate(dob)}
                onChange={(date: Date) =>
                  setDob(moment(date).format(commonDateFormat))
                }
                maxDate={get18YearsBackDate()}
                openToDate={get18YearsBackDate()}
              />
            </CandidateEntryItem>
          </CCol>
          <CCol sm={6}>
            <CandidateEntryItem label="Mobile" showAsterix={mobileAsterix}>
              <CRow>
                <CCol sm={5}>
                  <CFormSelect
                    value={mobileCode.id.toString()}
                    onChange={mobileCodeChangeHandler}
                    data-testid={`${getDataInputTestId('mobileCode')}`}
                  >
                    <option
                      data-testid="addCandOpt-countryOpt"
                      value={initialCandidateCountry.id.toString()}
                    >
                      Select
                    </option>
                    {allEmpCountriesList?.length > 0 &&
                      allEmpCountriesList?.map(
                        (countryCode, countryCodeIndex) => (
                          <option
                            key={countryCodeIndex}
                            data-testid="addCandOpt-countryOpt"
                            value={countryCode.id.toString()}
                          >
                            {countryCode.countryCode}
                          </option>
                        ),
                      )}
                  </CFormSelect>
                </CCol>
                <CCol sm={7}>
                  <CFormInput
                    type="text"
                    placeholder="Enter 10 digit Mobile Number"
                    data-testid={`${getDataInputTestId('mobileNumber')}`}
                    value={mobileNumber}
                    onChange={mobileNumberChangeHandler}
                  />
                </CCol>
              </CRow>
            </CandidateEntryItem>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6}>
            <CandidateEntryItem label="Recruiter Name">
              <AutoFillSourceName
                allEmployeesList={allEmployeesList}
                employeeName={recruiterName}
                placeholderValue="Recruiter Name"
                setEmployeeName={setRecruiterName}
              />
            </CandidateEntryItem>
          </CCol>
          <CCol sm={6}>
            <CandidateEntryItem label="Skills" showAsterix={skillsAsterix}>
              <CFormInput
                type="text"
                placeholder="Skills"
                data-testid={`${getDataInputTestId('skills')}`}
                value={skills}
                onChange={skillsChangeHandler}
              />
            </CandidateEntryItem>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6}>
            <CandidateEntryItem label="CTC" showAsterix={ctcAsterix}>
              <CFormInput
                type="text"
                placeholder="CTC"
                data-testid={`${getDataInputTestId('ctc')}`}
                value={ctc}
                onChange={ctcChangeHandler}
              />
            </CandidateEntryItem>
          </CCol>
          <CCol sm={6}>
            <CandidateEntryItem label="ECTC" showAsterix={ectcAsterix}>
              <CFormInput
                type="text"
                data-testid={`${getDataInputTestId('ectc')}`}
                placeholder="ECTC"
                value={ectc}
                onChange={ectcChangeHandler}
              />
            </CandidateEntryItem>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6}>
            <CandidateEntryItem label="Current Employer">
              <AutoFillCurrentEmployer
                companiesList={allCompaniesList}
                currentEmployer={currentEmployer}
                setCurrentEmployer={setCurrentEmployer}
              />
            </CandidateEntryItem>
          </CCol>
          <CCol sm={6}>
            <CandidateEntryItem
              label="Current Location"
              showAsterix={currentLocationAsterix}
            >
              <CFormInput
                type="text"
                placeholder="Current Location"
                data-testid={`${getDataInputTestId('currentLoc')}`}
                value={currentLocation}
                onChange={currentLocationChangeHandler}
              />
            </CandidateEntryItem>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6}>
            <CandidateEntryItem
              label="Notice Period"
              showAsterix={noticePeriodAsterix}
            >
              <CFormInput
                type="text"
                placeholder="Notice Period"
                data-testid={`${getDataInputTestId('noticeP')}`}
                value={noticePeriod}
                onChange={noticePeriodChangeHandler}
              />
            </CandidateEntryItem>
          </CCol>
          <CCol sm={6}>
            <CandidateEntryItem label="Job Type" showAsterix={jobTypeAsterix}>
              <CFormSelect
                value={jobType}
                onChange={jobTypeChangeHandler}
                data-testid={`${getDataInputTestId('jobType')}`}
              >
                <option value="">Select Job Type</option>
                {candidateJobTypeList.map((thisJobType, jobTypeIndex) => (
                  <option key={jobTypeIndex} value={thisJobType}>
                    {thisJobType}
                  </option>
                ))}
              </CFormSelect>
            </CandidateEntryItem>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6}>
            <CandidateEntryItem label="Skype ID">
              <CFormInput
                type="text"
                placeholder="Skype ID"
                data-testid={`${getDataInputTestId('skype')}`}
                value={skypeId}
                onChange={skypeIdChangeHandler}
              />
            </CandidateEntryItem>
          </CCol>
          <CCol sm={6}>
            <CandidateEntryItem label="Country" showAsterix={countryAsterix}>
              <CFormSelect
                value={selectCountry.id}
                onChange={countryChangeHandler}
                data-testid={getDataInputTestId('country')}
              >
                <option value={initialCandidateCountry.id}>
                  Select Country
                </option>
                {allEmpCountriesList.length > 0 &&
                  allEmpCountriesList?.map((country, countryIndex) => (
                    <option key={countryIndex} value={country.id}>
                      {country.name}
                    </option>
                  ))}
              </CFormSelect>
            </CandidateEntryItem>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6}>
            <CandidateEntryItem label="Upload Resume">
              <input
                type="file"
                onChange={(e: SyntheticEvent) => {
                  uploadedFileHandler(e.currentTarget as HTMLInputElement)
                }}
                data-testid={getDataInputTestId('resumeUpload')}
              />
            </CandidateEntryItem>
          </CCol>
          <CCol sm={6}>
            <CandidateEntryItem label="WhatsApp Notifications">
              <CRow>
                <CCol sm={4} className="mt-2">
                  <CFormCheck
                    type="radio"
                    data-testid={`${getDataInputTestId('whatsapp')}-yes`}
                    hitArea="full"
                    inline
                    checked={
                      whatsAppNotifications ===
                      CandidateWhatsAppNotificationsRadio.yes
                    }
                    onChange={whatsAppNotificationsChangeHandler}
                    label={CandidateWhatsAppNotificationsRadio.yes}
                    value={CandidateWhatsAppNotificationsRadio.yes}
                  />
                </CCol>
                <CCol sm={2} className="mt-2 align-items-start p-0">
                  <CFormCheck
                    type="radio"
                    data-testid={`${getDataInputTestId('whatsapp')}-no`}
                    hitArea="full"
                    inline
                    checked={
                      whatsAppNotifications ===
                      CandidateWhatsAppNotificationsRadio.no
                    }
                    onChange={whatsAppNotificationsChangeHandler}
                    label={CandidateWhatsAppNotificationsRadio.no}
                    value={CandidateWhatsAppNotificationsRadio.no}
                  />
                </CCol>
              </CRow>
            </CandidateEntryItem>
          </CCol>
        </CRow>
        <CRow>
          <CandidateEntryItem
            label="Reason For Change"
            labelMdNumber={2}
            childrenMdNumber={10}
            showAsterix={reasonForChangeAsterix}
          >
            {showEditor && (
              <CKEditor<{ onChange: CKEditorEventHandler<'change'> }>
                initData={reasonForChange}
                config={ckeditorConfig}
                debug={false}
                onChange={({ editor }) => {
                  reasonForChangeHandler(editor.getData().trim())
                }}
                data-testid="testing"
              />
            )}
          </CandidateEntryItem>
        </CRow>
      </div>
    </>
  )
}

export default AddEditCandidateTemplate
