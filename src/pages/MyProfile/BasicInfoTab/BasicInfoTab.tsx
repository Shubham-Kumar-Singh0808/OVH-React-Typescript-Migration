import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react-pro'
import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import moment from 'moment'
import validator from 'validator'
import DownloadCVButton from './DownloadCVButton'
import BasicInfoTabImageCropper from './BasicInfoTabImageCropper'
import BasicInfoInputFields from './BasicInfoInputFields'
import MaritalStatusAndAnniversary from './MaritalStatusAndAnniversary'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OToast from '../../../components/ReusableComponent/OToast'
import { employeeBasicInformationThunk } from '../../../reducers/MyProfile/BasicInfoTab/basicInformatiomSlice'
import { reduxServices } from '../../../reducers/reduxServices'
import { useSelectedEmployee } from '../../../middleware/hooks/useSelectedEmployee'
import { UploadImageInterface } from '../../../types/MyProfile/BasicInfoTab/basicInformationTypes'
import { ckeditorConfig } from '../../../utils/ckEditorUtils'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import {
  reformatDate,
  dateFormatPerLocale,
} from '../../../utils/dateFormatUtils'
import { base64Extension } from '../../Achievements/AchievementConstants'

const BasicInfoTab = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const [dateFormat, setDateFormat] = useState<string>('')

  const [isViewingAnotherEmployee] = useSelectedEmployee()
  const employeeBasicInformation = useTypedSelector((state) =>
    reduxServices.generalInformation.selectors.selectLoggedInEmployeeData(
      state,
      isViewingAnotherEmployee,
    ),
  )
  const tenantKey = useTypedSelector(
    reduxServices.authentication.selectors.selectTenantKey,
  )
  const authenticatedToken = useTypedSelector(
    reduxServices.authentication.selectors.selectToken,
  )

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'My Profile-BasicInfo',
  )
  const selectedUserBasicInformation = {
    id: employeeBasicInformation.id,
    baseLocation: employeeBasicInformation.baseLocation,
    bloodgroup: employeeBasicInformation.bloodgroup,
    departmentName: employeeBasicInformation.departmentName,
    designation: employeeBasicInformation.designation,
    emailId: employeeBasicInformation.emailId,
    curentLocation: employeeBasicInformation.curentLocation,
    employmentTypeName: employeeBasicInformation.employmentTypeName,
    fullName: employeeBasicInformation.fullName,
    gender: employeeBasicInformation.gender,
    jobTypeName: employeeBasicInformation.jobTypeName,
    maritalStatus: employeeBasicInformation.maritalStatus,
    thumbPicture: employeeBasicInformation.thumbPicture,
    personalEmail: employeeBasicInformation.personalEmail,
    projectManager: employeeBasicInformation.projectManager,
    rbtCvPath: employeeBasicInformation.rbtCvPath,
    rbtCvName: employeeBasicInformation.rbtCvName,
    aboutMe: employeeBasicInformation.aboutMe,
    officialBirthday: employeeBasicInformation.officialBirthday,
    realBirthday: employeeBasicInformation.realBirthday,
    anniversary: employeeBasicInformation.anniversary,
    skypeId: employeeBasicInformation.skypeId,
    mobile: employeeBasicInformation?.mobile,
    alternativeMobile: employeeBasicInformation?.alternativeMobile,
    homeCode: employeeBasicInformation?.homeCode,
    homeNumber: employeeBasicInformation?.homeNumber,
    workCode: employeeBasicInformation?.workCode,
    workNumber: employeeBasicInformation?.workNumber,
    emergencyContactName: employeeBasicInformation?.emergencyContactName,
    emergencyPhone: employeeBasicInformation?.emergencyPhone,
    emergencyRelationShip: employeeBasicInformation?.emergencyRelationShip,
    presentAddress: employeeBasicInformation?.presentAddress,
    presentCity: employeeBasicInformation?.presentCity,
    presentZip: employeeBasicInformation?.presentZip,
    presentLandMark: employeeBasicInformation?.presentLandMark,
    permanentAddress: employeeBasicInformation?.permanentAddress,
    permanentCity: employeeBasicInformation?.permanentCity,
    permanentZip: employeeBasicInformation?.permanentZip,
    permanentLandMark: employeeBasicInformation?.permanentLandMark,
    passportNumber: employeeBasicInformation?.passportNumber,
    passportIssuedPlace: employeeBasicInformation?.passportIssuedPlace,
    passportIssuedDate: employeeBasicInformation?.passportIssuedDate,
    passportExpDate: employeeBasicInformation?.passportExpDate,
  }

  const [baseLocationShown, setBaseLocationShown] = useState<boolean>(false)
  const [realBirthdayShown, setRealBirthdayShown] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<boolean>(false)
  const [
    employeeBasicInformationEditData,
    setEmployeeBasicInformationEditData,
  ] = useState(selectedUserBasicInformation)
  const [saveButtonEnabled, setSaveButtonEnabled] = useState(false)
  const [dateErrorMessage, setDateErrorMessage] = useState(false)
  const [cvToUpload, setCVToUpload] = useState<File | undefined>(undefined)
  const [uploadErrorText, setUploadErrorText] = useState<string>('')
  const [selectedProfilePicture, setSelectedProfilePicture] =
    useState<UploadImageInterface>()
  const [officialBday, setOfficialBday] = useState<Date | string>()
  const [realBday, setRealBday] = useState<Date | string>()
  const [selectedAnniversary, setSelectedAnniversary] = useState<
    Date | string
  >()
  const [officialBdyFlag, setOfficialBdayFlag] = useState(false)
  const [realBdayFlag, setRealBdayFlag] = useState(false)
  const [anniversaryFlag, setAnniversaryFlag] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const localeDateFormat = dateFormatPerLocale.filter(
      (lang) => lang.label === navigator.languages[0],
    )
    setDateFormat(localeDateFormat[0].format)
  }, [])

  const commonFormatDate = 'DD/MM/YYYY'

  let newOfficialBday = new Date()
  if (employeeBasicInformationEditData.officialBirthday) {
    const currentOfficialBday =
      employeeBasicInformationEditData.officialBirthday
    newOfficialBday = reformatDate(currentOfficialBday)
  }
  let newRealBirthday = new Date()
  if (employeeBasicInformationEditData.realBirthday) {
    const currentRealBirthday = employeeBasicInformationEditData.realBirthday
    newRealBirthday = reformatDate(currentRealBirthday)
  }
  let newAnniversary = new Date()
  if (employeeBasicInformationEditData.anniversary) {
    const currentAnniversary = employeeBasicInformationEditData.anniversary
    newAnniversary = reformatDate(currentAnniversary)
  }

  const validateEmail = (email: string) => {
    if (validator.isEmail(email)) {
      setEmailError(false)
    } else {
      setEmailError(true)
    }
  }

  //onChange handler for image upload and crop
  const croppedImageHandler = useCallback(
    (croppedImageData: UploadImageInterface) => {
      setSelectedProfilePicture(croppedImageData)
      setSaveButtonEnabled(true)
    },
    [],
  )
  // onchange handler for input fields
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    const replaceValue = value.replace(/[^a-z\s]/gi, '').replace(/^\s*/, '')
    if (name === 'curentLocation') {
      const currentLocation = replaceValue
      setEmployeeBasicInformationEditData((prevState) => {
        return { ...prevState, ...{ [name]: currentLocation } }
      })
    } else if (name === 'baseLocation') {
      const baseLocation = replaceValue
      setEmployeeBasicInformationEditData((prevState) => {
        return { ...prevState, ...{ [name]: baseLocation } }
      })
    } else if (name === 'personalEmail') {
      const personalEmail = value
      validateEmail(personalEmail)
      setEmployeeBasicInformationEditData((prevState) => {
        return { ...prevState, ...{ [name]: personalEmail } }
      })
    } else {
      setEmployeeBasicInformationEditData((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }
  // onchange handler for date pickers
  const onDateChangeHandler = (date: Date, e: { name: string }) => {
    if (employeeBasicInformationEditData) {
      const formatDate = moment(date).format(commonFormatDate)
      const { name } = e
      setEmployeeBasicInformationEditData((prevState) => {
        return { ...prevState, ...{ [name]: formatDate } }
      })
    }
  }
  // change CV to upload state value
  const onChangeCVHandler = (element: HTMLInputElement) => {
    const file = element.files
    const acceptedFileTypes = ['pdf', 'doc', 'docx']
    let extension = ''
    if (!file) return
    if (file) {
      extension = file[0].name.split('.').pop() as string
    }
    if (file[0].size > 2048000) {
      setUploadErrorText(
        'File size exceeded. Please upload a file less than 2MB.',
      )
      return
    }
    if (!acceptedFileTypes.includes(extension)) {
      setUploadErrorText(
        'Wrong file format chosen. Please choose either doc, docx, or pdf.',
      )
      return
    }
    setSaveButtonEnabled(true)
    setUploadErrorText('')
    setCVToUpload(file[0])
  }

  // condition to enable and disable save button
  useEffect(() => {
    if (
      employeeBasicInformationEditData.curentLocation &&
      employeeBasicInformationEditData.bloodgroup &&
      employeeBasicInformationEditData.maritalStatus &&
      employeeBasicInformationEditData.personalEmail &&
      employeeBasicInformationEditData.officialBirthday &&
      !emailError
    ) {
      setSaveButtonEnabled(true)
    } else {
      setSaveButtonEnabled(false)
    }
    if (employeeBasicInformationEditData.personalEmail) {
      validateEmail(employeeBasicInformationEditData.personalEmail)
    }
  }, [
    employeeBasicInformationEditData,
    baseLocationShown,
    realBirthdayShown,
    emailError,
  ])

  // condition to enable and disable save button
  useEffect(() => {
    if (baseLocationShown) {
      if (employeeBasicInformationEditData.baseLocation) {
        setSaveButtonEnabled(true)
      } else {
        setSaveButtonEnabled(false)
      }
    }
    if (realBirthdayShown) {
      if (employeeBasicInformationEditData.realBirthday) {
        setSaveButtonEnabled(true)
      } else {
        setSaveButtonEnabled(false)
      }
    }
    if (employeeBasicInformationEditData.maritalStatus === 'Married') {
      if (employeeBasicInformationEditData.anniversary) {
        setSaveButtonEnabled(true)
      } else {
        setSaveButtonEnabled(false)
      }
    }
  }, [
    baseLocationShown,
    employeeBasicInformationEditData.baseLocation,
    realBirthdayShown,
    employeeBasicInformationEditData.realBirthday,
    employeeBasicInformationEditData.maritalStatus,
    employeeBasicInformationEditData.anniversary,
  ])

  useEffect(() => {
    if (
      employeeBasicInformationEditData.realBirthday &&
      employeeBasicInformationEditData.anniversary
    ) {
      const typeCastedRealBirthday =
        employeeBasicInformationEditData.realBirthday.toString()
      const typeCastedAnniversary =
        employeeBasicInformationEditData.anniversary.toString()

      const formattedRealBirthday = new Date(
        moment(typeCastedRealBirthday).format(commonFormatDate),
      )
      const formattedAnniversary = new Date(
        moment(typeCastedAnniversary).format(commonFormatDate),
      )
      if (formattedRealBirthday.getTime() >= formattedAnniversary.getTime()) {
        setDateErrorMessage(true)
        setSaveButtonEnabled(false)
      } else {
        setDateErrorMessage(false)
        setSaveButtonEnabled(true)
      }
    }
  }, [
    employeeBasicInformationEditData.anniversary,
    employeeBasicInformationEditData.realBirthday,
  ])

  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor,
      className,
    }
  }

  // change on gender the defaultPic api should call
  useEffect(() => {
    if (
      employeeBasicInformationEditData.gender &&
      !employeeBasicInformationEditData.rbtCvName?.includes(
        employeeBasicInformation.id as unknown as string,
      )
    ) {
      dispatch(
        employeeBasicInformationThunk.updateEmployeeDefaultPicOnGenderChange(
          employeeBasicInformationEditData.gender,
        ),
      )
    }
  }, [
    dispatch,
    employeeBasicInformation.id,
    employeeBasicInformationEditData.gender,
    employeeBasicInformationEditData.rbtCvName,
  ])

  // upon save click have to save updated employee details and upload cv
  const handleSubmitBasicDetails = async (event: SyntheticEvent) => {
    event.preventDefault()
    const prepareObject = employeeBasicInformationEditData
    setIsLoading(true)
    if (selectedProfilePicture) {
      await dispatch(
        employeeBasicInformationThunk.uploadEmployeeProfilePicture(
          selectedProfilePicture,
        ),
      )
    }
    await dispatch(
      employeeBasicInformationThunk.updateEmployeeBasicInformation(
        prepareObject,
      ),
    )
    if (cvToUpload) {
      const formData = new FormData()
      formData.append('file', cvToUpload, cvToUpload.name)
      const uploadPrepareObject = {
        personId: employeeBasicInformation.id as number,
        file: formData,
      }
      await dispatch(
        employeeBasicInformationThunk.uploadEmployeeCV(uploadPrepareObject),
      )
    }
    setIsLoading(false)
    dispatch(reduxServices.app.actions.addToast(toastElement))
    window.location.reload()
  }

  const toastElement = (
    <OToast
      toastMessage="Your changes have been saved successfully."
      toastColor="success"
    />
  )

  // base location and real date of birth hide and show validations
  useEffect(() => {
    if (
      employeeBasicInformationEditData.curentLocation?.toLowerCase() !==
      employeeBasicInformationEditData.baseLocation?.toLowerCase()
    ) {
      setBaseLocationShown(true)
    } else {
      setBaseLocationShown(false)
    }
    const tempOfficialBirthday =
      employeeBasicInformationEditData?.officialBirthday?.toString()

    const tempRealBirthday =
      employeeBasicInformationEditData?.realBirthday?.toString()

    const newOfficialBirthday = new Date(
      moment(tempOfficialBirthday).format(commonFormatDate),
    )
    const formattedRealBirthday = new Date(
      moment(tempRealBirthday).format(commonFormatDate),
    )
    if (newOfficialBirthday.getTime() !== formattedRealBirthday.getTime()) {
      setRealBirthdayShown(true)
    } else {
      setRealBirthdayShown(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOfficialBday = (date: Date) => {
    setOfficialBday(date)
    setOfficialBdayFlag(true)
  }
  const handleRealBday = (date: Date) => {
    setRealBday(date)
    setRealBdayFlag(true)
  }
  const handleAnniversary = (date: Date) => {
    setSelectedAnniversary(date)
    setAnniversaryFlag(true)
  }
  const handleDescription = (aboutMe: string) => {
    setEmployeeBasicInformationEditData((prevState) => {
      return { ...prevState, ...{ aboutMe } }
    })
  }

  const dateIsValid = (date: Date) => {
    return !Number.isNaN(new Date(date).getTime())
  }

  const commonFormLabel = 'col-sm-3 col-form-label text-end'
  const formLabelWithPadding = 'col-sm-3 col-form-label text-end pe-18'
  const normalText = 'text-white'
  const dangerText = 'text-danger'

  return (
    <>
      {isLoading && <OLoadingSpinner type={LoadingType.PAGE} />}

      <CForm
        className="form-horizontal ng-pristine ng-valid-pattern ng-valid-email ng-valid ng-valid-required"
        onSubmit={handleSubmitBasicDetails}
      >
        <CRow className="mt-3 justify-content-end">
          <CCol className="text-end" md={4}>
            <DownloadCVButton className="text-decoration-none btn btn-download btn-ovh" />
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel
            {...dynamicFormLabelProps('employeeId', formLabelWithPadding)}
          >
            Employee ID:
          </CFormLabel>
          <CCol sm={2}>
            <CFormLabel className="col-sm-15 col-form-label text-end">
              {employeeBasicInformation.id}
            </CFormLabel>
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel
            {...dynamicFormLabelProps('employeeEmailId', formLabelWithPadding)}
          >
            Email ID:
          </CFormLabel>
          <CCol sm={2}>
            <CFormLabel className="col-sm-15 col-form-label text-end">
              {employeeBasicInformation.emailId}
            </CFormLabel>
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel
            {...dynamicFormLabelProps('employeeFullName', formLabelWithPadding)}
          >
            Full Name:
          </CFormLabel>
          <CCol sm={2}>
            <CFormLabel className="col-sm-15 col-form-label text-end">
              {employeeBasicInformation.fullName}
            </CFormLabel>
          </CCol>
        </CRow>
        <BasicInfoInputFields
          dateFormat={dateFormat}
          commonFormLabel={commonFormLabel}
          formLabelWithPadding={formLabelWithPadding}
          employeeBasicInformationEditData={employeeBasicInformationEditData}
          handleChange={handleChange}
          baseLocationShown={baseLocationShown}
          setBaseLocationShown={setBaseLocationShown}
          officialBday={officialBday}
          officialBdyFlag={officialBdyFlag}
          newOfficialBday={newOfficialBday}
          dateIsValid={dateIsValid}
          onDateChangeHandler={onDateChangeHandler}
          handleOfficialBday={handleOfficialBday}
          realBirthdayShown={realBirthdayShown}
          setRealBirthdayShown={setRealBirthdayShown}
          realBday={realBday}
          realBdayFlag={realBdayFlag}
          newRealBirthday={newRealBirthday}
          handleRealBday={handleRealBday}
        />
        <MaritalStatusAndAnniversary
          dateFormat={dateFormat}
          commonFormLabel={commonFormLabel}
          employeeBasicInformationEditData={employeeBasicInformationEditData}
          handleChange={handleChange}
          selectedAnniversary={selectedAnniversary}
          dateErrorMessage={dateErrorMessage}
          anniversaryFlag={anniversaryFlag}
          newAnniversary={newAnniversary}
          dateIsValid={dateIsValid}
          onDateChangeHandler={onDateChangeHandler}
          handleAnniversary={handleAnniversary}
        />
        <CRow className="mt-3 ">
          <CFormLabel
            {...dynamicFormLabelProps('department', formLabelWithPadding)}
          >
            Department:
          </CFormLabel>
          <CCol sm={2}>
            <CFormLabel className="col-form-label text-end">
              {employeeBasicInformation.departmentName}
            </CFormLabel>
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel
            {...dynamicFormLabelProps('reportingManager', formLabelWithPadding)}
          >
            Reporting Manager:
          </CFormLabel>
          <CCol sm={6}>
            <CFormLabel className="col-sm-15 col-form-label text-end">
              {employeeBasicInformation.empManager}
            </CFormLabel>
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel
            {...dynamicFormLabelProps('employmentType', formLabelWithPadding)}
          >
            Employment Type:
          </CFormLabel>
          <CCol sm={2}>
            <CFormLabel className="col-form-label text-end">
              {employeeBasicInformation.employmentTypeName}
            </CFormLabel>
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel
            {...dynamicFormLabelProps('jobType', formLabelWithPadding)}
          >
            Job Type:
          </CFormLabel>
          <CCol sm={2}>
            <CFormLabel className="col-form-label text-end">
              {employeeBasicInformation.jobTypeName}
            </CFormLabel>
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel
            {...dynamicFormLabelProps('country', formLabelWithPadding)}
          >
            Country:
          </CFormLabel>
          <CCol sm={2}>
            <CFormLabel className="col-form-label text-end">
              {employeeBasicInformation.country}
            </CFormLabel>
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel
            {...dynamicFormLabelProps('employeePersonalEmail', commonFormLabel)}
          >
            Personal Email:
            <span
              className={
                employeeBasicInformationEditData.personalEmail && !emailError
                  ? normalText
                  : dangerText
              }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              id="employeePersonalEmail"
              size="sm"
              type="email"
              name="personalEmail"
              placeholder="Personal Email"
              value={employeeBasicInformationEditData.personalEmail}
              onChange={handleChange}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel
            {...dynamicFormLabelProps('employeeSkypeID', formLabelWithPadding)}
          >
            Skype ID:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              autoComplete="off"
              id="employeeSkypeID"
              size="sm"
              type="text"
              name="skypeId"
              placeholder="Enter SkypeID"
              value={employeeBasicInformationEditData.skypeId}
              onChange={handleChange}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel
            {...dynamicFormLabelProps(
              'employeeProfilePicture',
              formLabelWithPadding,
            )}
          >
            Profile Picture:
          </CFormLabel>
          <CCol sm={3}>
            <BasicInfoTabImageCropper
              file={`${base64Extension}${employeeBasicInformation.thumbPicture}`}
              empId={employeeBasicInformation.id as number}
              onUploadImage={croppedImageHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel
            {...dynamicFormLabelProps('aboutMe', formLabelWithPadding)}
          >
            About Me:
          </CFormLabel>
          <CCol sm={8}>
            <CKEditor<{
              onChange: CKEditorEventHandler<'change'>
            }>
              initData={employeeBasicInformationEditData?.aboutMe}
              config={ckeditorConfig}
              debug={true}
              onChange={({ editor }) => {
                handleDescription(editor.getData().trim())
              }}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3">
          <CFormLabel
            {...dynamicFormLabelProps('uploadRBTCV', formLabelWithPadding)}
          >
            Upload RBT CV:
          </CFormLabel>
          <CCol sm={3}>
            <input
              id="uploadRBTCV"
              className="sh-updateTicket-file mt-1 cursor-pointer"
              type="file"
              name="file"
              accept=".doc, .docx, .pdf"
              onChange={(element: SyntheticEvent) =>
                onChangeCVHandler(element.currentTarget as HTMLInputElement)
              }
            />
          </CCol>
        </CRow>
        <CRow className="mt-3">
          <CCol md={{ span: 6, offset: 3 }}>
            {employeeBasicInformation.rbtCvName && (
              <DownloadCVButton
                className="cursor-pointer"
                fileName={employeeBasicInformation.rbtCvName}
                token={authenticatedToken}
                tenantKey={tenantKey}
              />
            )}
            {uploadErrorText && (
              <div id="error">
                <strong className="mt-3 text-danger">{uploadErrorText}</strong>
              </div>
            )}
          </CCol>
        </CRow>
        {userAccess?.updateaccess && (
          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              <CButton
                className="mt-3 btn-ovh btn btn-success"
                size="sm"
                disabled={!saveButtonEnabled}
                type="submit"
              >
                Save
              </CButton>
            </CCol>
          </CRow>
        )}
      </CForm>
    </>
  )
}

export default BasicInfoTab
