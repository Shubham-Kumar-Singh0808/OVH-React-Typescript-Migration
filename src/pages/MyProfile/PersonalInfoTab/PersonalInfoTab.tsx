/* eslint-disable sonarjs/no-duplicate-string */
// Todo: remove eslint and fix errors
import {
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import AddEditFamilyDetails from './AddEditFamilyDetails'
import AddEditVisaDetails from './AddEditVisaDetails'
import FamilyDetailsTable from './FamilyDetailsTable'
import VisaDetailsTable from './VisaDetailsTable'
import ContactNumberDetails from './ContactNumberDetails'
import { PassportDetails } from './PassportDetails'
import PersonalInfoOptions from './PersonalInfoOptions'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OAddButton from '../../../components/ReusableComponent/OAddButton'
import OToast from '../../../components/ReusableComponent/OToast'
import {
  EmployeePassportImage,
  handleActiveTabProps,
} from '../../../types/MyProfile/PersonalInfoTab/personalInfoTypes'
import { reduxServices } from '../../../reducers/reduxServices'
import { useSelectedEmployee } from '../../../middleware/hooks/useSelectedEmployee'
import {
  EmployeeContactInformation,
  EmployeeEmergencyContactInformation,
  EmployeePassportDetails,
} from '../../../types/MyProfile/GeneralTab/generalInformationTypes'

const PersonalInfoTab = ({
  handleActiveTab,
}: handleActiveTabProps): JSX.Element => {
  const [isViewingAnotherEmployee] = useSelectedEmployee()
  const employeePersonalInformation = useTypedSelector((state) =>
    reduxServices.generalInformation.selectors.selectLoggedInEmployeeData(
      state,
      isViewingAnotherEmployee,
    ),
  )
  const [toggle, setToggle] = useState('')
  const dispatch = useAppDispatch()

  const editButtonHandler = (familyId: number) => {
    setToggle('EditFamily')
    dispatch(
      reduxServices.personalInformation.getEmployeeFamilyMember(familyId),
    )
  }
  const editVisaButtonHandler = (id: number) => {
    setToggle('EditVisa')
    dispatch(reduxServices.personalInformation.getEmployeeVisa(id))
  }
  const employeeBasicInformation = useTypedSelector(
    reduxServices.generalInformation.selectors.selectLoggedInEmployeeData,
  )

  const selectedUserPresenetAddressDetails = {
    presentAddress: employeePersonalInformation?.presentAddress,
    presentCity: employeePersonalInformation?.presentCity,
    presentZip: employeePersonalInformation?.presentZip,
    presentLandMark: employeePersonalInformation?.presentLandMark,
  }

  const selectedUserPermanentAddressDetails = {
    permanentAddress: employeePersonalInformation?.permanentAddress,
    permanentCity: employeePersonalInformation?.permanentCity,
    permanentZip: employeePersonalInformation?.permanentZip,
    permanentLandMark: employeePersonalInformation?.permanentLandMark,
  }

  const selectedUserBasicInformation = {
    baseLocation: employeeBasicInformation?.baseLocation,
    bloodgroup: employeeBasicInformation?.bloodgroup,
    departmentName: employeeBasicInformation?.departmentName,
    designation: employeeBasicInformation?.designation,
    emailId: employeeBasicInformation?.emailId,
    curentLocation: employeeBasicInformation?.curentLocation,
    employmentTypeName: employeeBasicInformation?.employmentTypeName,
    fullName: employeeBasicInformation?.fullName,
    gender: employeeBasicInformation?.gender,
    jobTypeName: employeeBasicInformation?.jobTypeName,
    maritalStatus: employeeBasicInformation?.maritalStatus,
    thumbPicture: employeeBasicInformation?.thumbPicture,
    personalEmail: employeeBasicInformation?.personalEmail,
    projectManager: employeeBasicInformation?.projectManager,
    rbtCvPath: employeeBasicInformation?.rbtCvPath,
    rbtCvName: employeeBasicInformation?.rbtCvName,
    aboutMe: employeeBasicInformation?.aboutMe,
    officialBirthday: employeeBasicInformation?.officialBirthday,
    realBirthday: employeeBasicInformation?.realBirthday,
    anniversary: employeeBasicInformation?.anniversary,
    skypeId: employeeBasicInformation?.skypeId,
  }

  const [saveButtonEnabled, setSaveButtonEnabled] = useState(false)
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

  const [employeeContactDetails, setEmployeeContactDetails] = useState<
    EmployeeContactInformation | undefined
  >()

  const [employeeEmergencyContactDetails, setEmployeeEmergencyContactDetails] =
    useState<EmployeeEmergencyContactInformation | undefined>()

  const [employeePresenetAddressDetails, setEmployeePresenetAddressDetails] =
    useState(selectedUserPresenetAddressDetails)

  const [employeePermanentAddressDetails, setEmployeePermanentAddressDetails] =
    useState(selectedUserPermanentAddressDetails)

  const [frontUpload, setFrontUpload] = useState<File | null>(null)
  const [backUpload, setBackUpload] = useState<File | null>(null)

  const [employeePassportDetails, setEmployeePassportDetails] = useState<
    EmployeePassportDetails | undefined
  >(undefined)
  const [checkBox, setCheckBox] = useState(false)

  useEffect(() => {
    if (checkBox) {
      setEmployeePermanentAddressDetails({
        permanentAddress: employeePresenetAddressDetails.presentAddress,
        permanentCity: employeePresenetAddressDetails.presentCity,
        permanentZip: employeePresenetAddressDetails.presentZip,
        permanentLandMark: employeePresenetAddressDetails.presentLandMark,
      })
    } else {
      setEmployeePermanentAddressDetails({
        permanentAddress: '',
        permanentCity: '',
        permanentZip: '',
        permanentLandMark: '',
      })
    }
  }, [
    checkBox,
    employeePresenetAddressDetails.presentAddress,
    employeePresenetAddressDetails.presentCity,
    employeePresenetAddressDetails.presentLandMark,
    employeePresenetAddressDetails.presentZip,
  ])

  useEffect(() => {
    if (
      employeePresenetAddressDetails.presentAddress &&
      employeePresenetAddressDetails?.presentCity &&
      employeePresenetAddressDetails.presentZip
    ) {
      setSaveButtonEnabled(true)
    } else {
      setSaveButtonEnabled(false)
    }
  }, [
    employeePresenetAddressDetails.presentAddress,
    employeePresenetAddressDetails?.presentCity,
    employeePresenetAddressDetails.presentZip,
  ])

  const onChangePresenetAddressHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    if (name === 'presentZip') {
      const presentZipValue = value.replace(/[^0-9]/gi, '')
      setEmployeePresenetAddressDetails((prevState) => {
        return { ...prevState, ...{ [name]: presentZipValue } }
      })
    } else {
      setEmployeePresenetAddressDetails((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }

  const onChangePermanentAddressHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    if (name === 'permanentZip') {
      const permanentZipValue = value.replace(/[^0-9]/gi, '')
      setEmployeePermanentAddressDetails((prevState) => {
        return { ...prevState, ...{ [name]: permanentZipValue } }
      })
    } else {
      setEmployeePermanentAddressDetails((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }

  const onPassportDetailsChangedHandler = (
    passportDetails: EmployeePassportDetails,
    frontImage: File | null,
    backImage: File | null,
  ) => {
    setEmployeePassportDetails(passportDetails)
    if (frontImage) {
      setFrontUpload(frontImage)
    } else if (backImage) {
      setBackUpload(backImage)
    }
  }

  const uploadFile = async () => {
    let passport = null
    const passportFormData = new FormData()
    if (frontUpload) {
      passportFormData.append('file1', frontUpload, frontUpload.name)
    }
    if (backUpload) {
      passportFormData.append('file2', backUpload, backUpload.name)
    }

    passport = passportFormData as FormData
    const prepareObject: EmployeePassportImage = {
      empId: employeeId,
      file1: passport,
    }

    await dispatch(
      reduxServices.personalInformation.uploadEmployeePassport(prepareObject),
    )
  }

  const handleSubmitPersonalInfoDetails = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    event.preventDefault()
    const resultAction = await dispatch(
      reduxServices.basicInformation.updateEmployeeBasicInformation({
        ...selectedUserBasicInformation,
        ...employeeContactDetails,
        ...employeeEmergencyContactDetails,
        ...employeePresenetAddressDetails,
        ...employeePermanentAddressDetails,
        ...employeePassportDetails,
        id: employeePersonalInformation.id,
      }),
    )

    if (frontUpload || backUpload) {
      await uploadFile()
    }

    if (
      reduxServices.basicInformation.updateEmployeeBasicInformation.fulfilled.match(
        resultAction,
      )
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Your changes have been saved successfully"
          />,
        ),
      )
      dispatch(
        reduxServices.generalInformation.getEmployeeGeneralInformation(
          employeeId,
        ),
      )

      handleActiveTab(1)
    }
  }
  const employeePresentZipNumber =
    employeePresenetAddressDetails?.presentZip &&
    employeePresenetAddressDetails?.presentZip.length > 5
      ? 'text-white'
      : 'text-danger'

  const changeContactDetailsHandler = (data: EmployeeContactInformation) => {
    setEmployeeContactDetails(() => {
      return { ...data }
    })
  }

  const changeEmergencyContactDetailsHandler = (
    data: EmployeeEmergencyContactInformation,
  ) => {
    setEmployeeEmergencyContactDetails(() => {
      return { ...data }
    })
  }

  return (
    <>
      <>
        {toggle === '' && (
          <>
            <CCardHeader>
              <h4 className="h4">Family Details</h4>
            </CCardHeader>
            <CCardBody className="ps-0 pe-0">
              <PersonalInfoOptions
                isViewingAnotherEmployee={isViewingAnotherEmployee}
                setToggle={setToggle}
              />
              <FamilyDetailsTable
                editButtonHandler={editButtonHandler}
                isFieldDisabled={true}
                striped={true}
                bordered={false}
                tableClassName=""
              />
            </CCardBody>

            <CCardHeader>
              <h4 className="h4">Visa Details</h4>
            </CCardHeader>
            <CCardBody className="ps-0 pe-0">
              {!isViewingAnotherEmployee ? (
                <OAddButton addButtonHandler={() => setToggle('AddVisa')} />
              ) : (
                <></>
              )}
              <VisaDetailsTable editVisaButtonHandler={editVisaButtonHandler} />
            </CCardBody>
            <CForm>
              <ContactNumberDetails
                employeeDetails={employeeBasicInformation}
                changeContactDetails={changeContactDetailsHandler}
                changeEmergencyContactDetails={
                  changeEmergencyContactDetailsHandler
                }
                setSaveButtonEnabled={setSaveButtonEnabled}
              />
              <CCardHeader>
                <h4 className="h4">Present Address</h4>
              </CCardHeader>
              <CCardBody>
                <CRow className="mt-4 mb-4">
                  <CFormLabel className="col-sm-3 col-form-label text-end">
                    Address:
                    <span
                      className={
                        employeePresenetAddressDetails?.presentAddress?.replace(
                          /^\s*/,
                          '',
                        )
                          ? 'text-white'
                          : 'text-danger'
                      }
                    >
                      *
                    </span>
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput
                      type="text"
                      name="presentAddress"
                      placeholder="Address"
                      size="sm"
                      onChange={onChangePresenetAddressHandler}
                      value={employeePresenetAddressDetails.presentAddress}
                      autoComplete="off"
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-4 mb-4">
                  <CFormLabel className="col-sm-3 col-form-label text-end">
                    City/Town:{' '}
                    <span
                      className={
                        employeePresenetAddressDetails?.presentCity?.replace(
                          /^\s*/,
                          '',
                        )
                          ? 'text-white'
                          : 'text-danger'
                      }
                    >
                      *
                    </span>
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput
                      type="text"
                      placeholder="City/Town"
                      size="sm"
                      name="presentCity"
                      onChange={onChangePresenetAddressHandler}
                      value={employeePresenetAddressDetails.presentCity}
                      autoComplete="off"
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-4 mb-4">
                  <CFormLabel className="col-sm-3 col-form-label text-end">
                    Zip:{' '}
                    <span
                      className={employeePresentZipNumber?.replace(/^\s*/, '')}
                    >
                      *
                    </span>
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput
                      type="text"
                      placeholder="Zip"
                      size="sm"
                      name="presentZip"
                      onChange={onChangePresenetAddressHandler}
                      value={employeePresenetAddressDetails.presentZip}
                      maxLength={6}
                      autoComplete="off"
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-4 mb-4">
                  <CFormLabel className="col-sm-3 col-form-label text-end">
                    Landmark:
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput
                      type="text"
                      placeholder="Landmark"
                      size="sm"
                      name="presentLandMark"
                      onChange={onChangePresenetAddressHandler}
                      value={employeePresenetAddressDetails.presentLandMark}
                      autoComplete="off"
                    />
                  </CCol>
                </CRow>
              </CCardBody>
              <CCardHeader>
                <h4 className="h4">Permanent Address</h4>
              </CCardHeader>
              <CCardBody>
                <CRow className="mt-4 mb-4">
                  <CFormCheck
                    id="flexCheckDefault"
                    label="Same as Present Address"
                    onClick={() => setCheckBox(!checkBox)}
                  />
                </CRow>
                <CRow className="mt-4 mb-4">
                  <CFormLabel className="col-sm-3 col-form-label text-end">
                    Address:
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput
                      disabled={checkBox}
                      type="text"
                      placeholder=" Address"
                      size="sm"
                      name="permanentAddress"
                      onChange={onChangePermanentAddressHandler}
                      value={
                        checkBox
                          ? employeePresenetAddressDetails.presentAddress
                          : employeePermanentAddressDetails.permanentAddress
                      }
                      autoComplete="off"
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-4 mb-4">
                  <CFormLabel className="col-sm-3 col-form-label text-end">
                    City/Town:
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput
                      type="text"
                      disabled={checkBox}
                      placeholder=" City/Town"
                      size="sm"
                      name="permanentCity"
                      onChange={onChangePermanentAddressHandler}
                      value={
                        checkBox
                          ? employeePresenetAddressDetails.presentCity
                          : employeePermanentAddressDetails.permanentCity
                      }
                      autoComplete="off"
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-4 mb-4">
                  <CFormLabel className="col-sm-3 col-form-label text-end">
                    Zip:
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput
                      type="text"
                      placeholder=" Zip"
                      size="sm"
                      disabled={checkBox}
                      name="permanentZip"
                      onChange={onChangePermanentAddressHandler}
                      value={
                        checkBox
                          ? employeePresenetAddressDetails.presentZip
                          : employeePermanentAddressDetails.permanentZip
                      }
                      maxLength={6}
                      autoComplete="off"
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-4 mb-4">
                  <CFormLabel className="col-sm-3 col-form-label text-end">
                    Landmark:
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput
                      type="text"
                      disabled={checkBox}
                      placeholder="Landmark"
                      size="sm"
                      name="permanentLandMark"
                      onChange={onChangePermanentAddressHandler}
                      value={
                        checkBox
                          ? employeePresenetAddressDetails.presentLandMark
                          : employeePermanentAddressDetails.permanentLandMark
                      }
                      autoComplete="off"
                    />
                  </CCol>
                </CRow>
              </CCardBody>
              <PassportDetails
                employeeDetails={employeeBasicInformation}
                handlePassportChange={onPassportDetailsChangedHandler}
              />
            </CForm>
            <CRow>
              <CCol md={{ span: 6, offset: 3 }}>
                <CButton
                  className="mt-1 ms-2 btn-ovh btn btn-success"
                  size="sm"
                  type="submit"
                  disabled={!saveButtonEnabled}
                  onClick={handleSubmitPersonalInfoDetails}
                >
                  Save
                </CButton>
              </CCol>
            </CRow>
          </>
        )}
        {toggle === 'AddFamily' && (
          <AddEditFamilyDetails
            headerTitle="Add Family Member"
            confirmButtonText="Add"
            backButtonHandler={() => setToggle('')}
          />
        )}
        {toggle === 'EditFamily' && (
          <AddEditFamilyDetails
            headerTitle="Edit Family Member"
            confirmButtonText="Update"
            backButtonHandler={() => setToggle('')}
            isEditFamilyDetails={true}
          />
        )}

        {toggle === 'AddVisa' && (
          <AddEditVisaDetails
            backButtonHandler={() => setToggle('')}
            headerTitle="Add Visa Details"
            confirmButtonText="Add"
          />
        )}
        {toggle === 'EditVisa' && (
          <AddEditVisaDetails
            headerTitle="Edit Visa Details"
            confirmButtonText="Update"
            backButtonHandler={() => setToggle('')}
            isEditVisaDetails={true}
          />
        )}
      </>
    </>
  )
}
export default PersonalInfoTab
