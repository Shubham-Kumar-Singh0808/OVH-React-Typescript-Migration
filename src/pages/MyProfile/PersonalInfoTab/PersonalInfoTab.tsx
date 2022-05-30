import React, { useEffect, useState } from 'react'
import {
  CCardHeader,
  CCardBody,
  CRow,
  CFormLabel,
  CCol,
  CFormInput,
  CFormSelect,
  CFormCheck,
  CButton,
} from '@coreui/react-pro'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import FamilyDetailsTable from './FamilyDetailsTable'
import VisaDetailsTable from './VisaDetailsTable'
import AddEditVisaDetails from './AddEditVisaDetails'
import AddEditFamilyDetails from './AddEditFamilyDetails'
import OAddButton from '../../../components/ReusableComponent/OAddButton'
import { employeeBasicInformationThunk } from '../../../reducers/MyProfile/BasicInfoTab/basicInformatiomSlice'
import { useTypedSelector, useAppDispatch } from '../../../stateStore'
import { loggedInEmployeeSelectors } from '../../../reducers/MyProfile/GeneralTab/generalInformationSlice'
import { personalInfoThunk } from '../../../reducers/MyProfile/PersonalInfoTab/personalInfoTabSlice'
const PersonalInfoTab = (): JSX.Element => {
  const employeePersonalInformation = useTypedSelector(
    loggedInEmployeeSelectors.selectLoggedInEmployeeData,
  )
  const [toggle, setToggle] = useState('')
  const dispatch = useAppDispatch()

  const editButtonHandler = (familyId: number) => {
    setToggle('EditFamily')
    dispatch(personalInfoThunk.getEmployeeFamilyMember(familyId))
  }
  const editVisaButtonHandler = (id: number) => {
    setToggle('EditVisa')
    dispatch(personalInfoThunk.getEmployeeVisa(id))
  }
  const employeeBasicInformation = useTypedSelector(
    loggedInEmployeeSelectors.selectLoggedInEmployeeData,
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
  }
  const selectedUserContactDetails = {
    mobile: employeePersonalInformation.mobile,
    alternativeMobile: employeePersonalInformation.alternativeMobile,
    homeCode: employeePersonalInformation.homeCode,
    homeNumber: employeePersonalInformation.homeNumber,
    workCode: employeePersonalInformation.workCode,
    workNumber: employeePersonalInformation.workNumber,
  }
  const selectedUserEmergencyContactDetails = {
    emergencyContactName: employeePersonalInformation.emergencyContactName,
    emergencyPhone: employeePersonalInformation.emergencyPhone,
    emergencyRelationShip: employeePersonalInformation.emergencyRelationShip,
  }
  const selectedUserPresenetAddressDetails = {
    presentAddress: employeePersonalInformation.presentAddress,
    presentCity: employeePersonalInformation.presentCity,
    presentZip: employeePersonalInformation.presentZip,
    presentLandMark: employeePersonalInformation.presentLandMark,
  }
  const selectedUserPermanentAddressDetails = {
    permanentAddress: employeePersonalInformation.permanentAddress,
    permanentCity: employeePersonalInformation.permanentCity,
    permanentZip: employeePersonalInformation.permanentZip,
    permanentLandMark: employeePersonalInformation.permanentLandMark,
  }
  const selectedUserPassportDetails = {
    passportNumber: employeePersonalInformation.passportNumber,
    passportIssuedPlace: employeePersonalInformation.passportIssuedPlace,
    passportIssuedDate: employeePersonalInformation.passportIssuedDate,
    passportExpDate: employeePersonalInformation.passportExpDate,
  }
  const [saveButtonEnabled, setSaveButtonEnabled] = useState(false)
  const [
    employeeContactInformationEditData,
    setEmployeeContactInformationEditData,
  ] = useState(selectedUserContactDetails)

  const [
    employeeEmergencyContactInformationEditData,
    setEmployeeEmergencyContactInformationEditData,
  ] = useState(selectedUserEmergencyContactDetails)

  const [
    employeePresenetAddressInformationEditData,
    setEmployeePresenetAddressInformationEditData,
  ] = useState(selectedUserPresenetAddressDetails)
  const [
    employeePermanentAddressInformationEditData,
    setEmployeePermanentAddressInformationEditData,
  ] = useState(selectedUserPermanentAddressDetails)

  const [
    employeePassportInformationEditData,
    setEmployeePassportInformationEditData,
  ] = useState(selectedUserPassportDetails)
  const [checkBox, setCheckBox] = useState(false)

  useEffect(() => {
    if (checkBox) {
      setEmployeePermanentAddressInformationEditData({
        permanentAddress:
          employeePresenetAddressInformationEditData.presentAddress,
        permanentCity: employeePresenetAddressInformationEditData.presentCity,
        permanentZip: employeePresenetAddressInformationEditData.presentZip,
        permanentLandMark:
          employeePresenetAddressInformationEditData.presentLandMark,
      })
    } else {
      setEmployeePermanentAddressInformationEditData({
        permanentAddress: '',
        permanentCity: '',
        permanentZip: '',
        permanentLandMark: '',
      })
    }
  }, [
    checkBox,
    employeePresenetAddressInformationEditData.presentAddress,
    employeePresenetAddressInformationEditData.presentCity,
    employeePresenetAddressInformationEditData.presentLandMark,
    employeePresenetAddressInformationEditData.presentZip,
  ])
  useEffect(() => {
    if (
      employeeContactInformationEditData?.mobile &&
      employeeEmergencyContactInformationEditData?.emergencyContactName &&
      employeeEmergencyContactInformationEditData?.emergencyPhone &&
      employeeEmergencyContactInformationEditData?.emergencyRelationShip &&
      employeePresenetAddressInformationEditData.presentAddress &&
      employeePresenetAddressInformationEditData.presentCity &&
      employeePresenetAddressInformationEditData.presentZip
    ) {
      setSaveButtonEnabled(true)
    } else {
      setSaveButtonEnabled(false)
    }
  }, [
    employeeContactInformationEditData?.mobile,
    employeeEmergencyContactInformationEditData?.emergencyContactName,
    employeeEmergencyContactInformationEditData?.emergencyPhone,
    employeeEmergencyContactInformationEditData?.emergencyRelationShip,
    employeePresenetAddressInformationEditData.presentAddress,
    employeePresenetAddressInformationEditData.presentCity,
    employeePresenetAddressInformationEditData.presentZip,
  ])
  const onChangeContactDetailsHandler = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    if (name === 'mobile') {
      const mobileValue = value.replace(/[^0-9]/gi, '')
      setEmployeeContactInformationEditData((prevState) => {
        return { ...prevState, ...{ [name]: mobileValue } }
      })
    } else if (name === 'alternativeMobile') {
      const alternativeMobileValue = value.replace(/[^0-9]/gi, '')
      setEmployeeContactInformationEditData((prevState) => {
        return { ...prevState, ...{ [name]: alternativeMobileValue } }
      })
    } else if (name === 'homeCode') {
      const homeCodeValue = value.replace(/[^0-9]/gi, '')
      setEmployeeContactInformationEditData((prevState) => {
        return { ...prevState, ...{ [name]: homeCodeValue } }
      })
    } else if (name === 'homeNumber') {
      const homeNumberValue = value.replace(/[^0-9]/gi, '')
      setEmployeeContactInformationEditData((prevState) => {
        return { ...prevState, ...{ [name]: homeNumberValue } }
      })
    } else if (name === 'workCode') {
      const workCodeValue = value.replace(/[^0-9]/gi, '')
      setEmployeeContactInformationEditData((prevState) => {
        return { ...prevState, ...{ [name]: workCodeValue } }
      })
    } else if (name === 'workNumber') {
      const workNumberValue = value.replace(/[^0-9]/gi, '')
      setEmployeeContactInformationEditData((prevState) => {
        return { ...prevState, ...{ [name]: workNumberValue } }
      })
    } else {
      setEmployeeContactInformationEditData((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }
  const onChangeEmergencyContactDetailsHandler = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    if (name === 'emergencyPhone') {
      const emergencyPhoneValue = value.replace(/[^0-9]/gi, '')
      setEmployeeEmergencyContactInformationEditData((prevState) => {
        return { ...prevState, ...{ [name]: emergencyPhoneValue } }
      })
    } else if (name === 'emergencyContactName') {
      const emergencyContactNameValue = value.replace(/[^a-zA-Z\s]/gi, '')
      setEmployeeEmergencyContactInformationEditData((prevState) => {
        return { ...prevState, ...{ [name]: emergencyContactNameValue } }
      })
    } else {
      setEmployeeEmergencyContactInformationEditData((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }

  const onChangePresenetAddressHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    if (name === 'presentZip') {
      const presentZipValue = value.replace(/[^0-9]/gi, '')
      setEmployeePresenetAddressInformationEditData((prevState) => {
        return { ...prevState, ...{ [name]: presentZipValue } }
      })
    } else {
      setEmployeePresenetAddressInformationEditData((prevState) => {
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
      setEmployeePermanentAddressInformationEditData((prevState) => {
        return { ...prevState, ...{ [name]: permanentZipValue } }
      })
    } else {
      setEmployeePermanentAddressInformationEditData((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }

  const onChangePassportInformationHandler = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    setEmployeePassportInformationEditData((prevState) => {
      return { ...prevState, ...{ [name]: value } }
    })
  }
  const onDateChangeHandler = (date: Date, e: { name: string }) => {
    if (employeePassportInformationEditData) {
      const formatDate = moment(date).format('DD/MM/YYYY')
      const name = e.name
      setEmployeePassportInformationEditData((prevState) => {
        return { ...prevState, ...{ [name]: formatDate } }
      })
    }
  }

  console.log(employeePermanentAddressInformationEditData.permanentAddress)
  const handleSubmitBasicDetails = async () => {
    const prepareObject = {
      ...selectedUserBasicInformation,
      ...employeeContactInformationEditData,
      ...employeeEmergencyContactInformationEditData,
      ...employeePresenetAddressInformationEditData,
      ...employeePermanentAddressInformationEditData,
      ...employeePassportInformationEditData,
      id: employeePersonalInformation.id,
    }
    dispatch(
      employeeBasicInformationThunk.updateEmployeeBasicInformation(
        prepareObject,
      ),
    )
  }
  return (
    <>
      <>
        {toggle === '' && (
          <>
            <CCardHeader>
              <h4 className="h4">Family Details</h4>
            </CCardHeader>
            <CCardBody>
              <OAddButton addButtonHandler={() => setToggle('AddFamily')} />
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
            <CCardBody>
              <OAddButton addButtonHandler={() => setToggle('AddVisa')} />
              <VisaDetailsTable editVisaButtonHandler={editVisaButtonHandler} />
            </CCardBody>
            <CCardHeader>
              <h4 className="h4">Contact Details</h4>
            </CCardHeader>
            <CCardBody>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Mobile:{' '}
                  <span
                    className={
                      employeeContactInformationEditData?.mobile
                        ? 'text-white'
                        : 'text-danger'
                    }
                  >
                    *
                  </span>
                </CFormLabel>
                <CCol sm={1}>
                  <CFormInput
                    type="text"
                    size="sm"
                    placeholder="+91"
                    aria-label="Disabled input example"
                    disabled
                  />
                </CCol>
                <CCol sm={3}>
                  <CFormInput
                    type="text"
                    placeholder="98xxxxxxxx"
                    size="sm"
                    name="mobile"
                    onChange={onChangeContactDetailsHandler}
                    value={employeeContactInformationEditData.mobile}
                    maxLength={10}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Alternative Mobile:
                </CFormLabel>
                <CCol sm={1}>
                  <CFormInput
                    type="text"
                    size="sm"
                    placeholder="+91"
                    aria-label="Disabled input example"
                    disabled
                  />
                </CCol>
                <CCol sm={3}>
                  <CFormInput
                    type="text"
                    size="sm"
                    name="alternativeMobile"
                    placeholder="98xxxxxxxx"
                    value={employeeContactInformationEditData.alternativeMobile}
                    onChange={onChangeContactDetailsHandler}
                    maxLength={10}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Home:
                </CFormLabel>
                <CCol sm={1}>
                  <CFormInput
                    type="text"
                    size="sm"
                    placeholder="+91"
                    aria-label="Disabled input example"
                    disabled
                  />
                </CCol>
                <CCol sm={2}>
                  <CFormInput
                    type="text"
                    size="sm"
                    name="homeCode"
                    value={employeeContactInformationEditData.homeCode}
                    onChange={onChangeContactDetailsHandler}
                    maxLength={4}
                  />
                </CCol>
                <CCol sm={3}>
                  <CFormInput
                    type="text"
                    size="sm"
                    name="homeNumber"
                    onChange={onChangeContactDetailsHandler}
                    value={employeeContactInformationEditData.homeNumber}
                    maxLength={8}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Work:
                </CFormLabel>
                <CCol sm={1}>
                  <CFormInput
                    type="text"
                    size="sm"
                    placeholder="+91"
                    aria-label="Disabled input example"
                    disabled
                  />
                </CCol>
                <CCol sm={2}>
                  <CFormInput
                    type="text"
                    size="sm"
                    onChange={onChangeContactDetailsHandler}
                    value={employeeContactInformationEditData.workCode}
                    name="workCode"
                    maxLength={4}
                  />
                </CCol>
                <CCol sm={3}>
                  <CFormInput
                    type="text"
                    size="sm"
                    name="workNumber"
                    onChange={onChangeContactDetailsHandler}
                    value={employeeContactInformationEditData.workNumber}
                    maxLength={8}
                  />
                </CCol>
              </CRow>
            </CCardBody>
            <CCardHeader>
              <h4 className="h4">Emergency Contact</h4>
            </CCardHeader>
            <CCardBody>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Name:{' '}
                  <span
                    className={
                      employeeEmergencyContactInformationEditData?.emergencyContactName
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
                    size="sm"
                    name="emergencyContactName"
                    id="emergencyContactName"
                    placeholder="Name"
                    onChange={onChangeEmergencyContactDetailsHandler}
                    value={
                      employeeEmergencyContactInformationEditData.emergencyContactName
                    }
                  />
                </CCol>
              </CRow>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Mobile:{' '}
                  <span
                    className={
                      employeeEmergencyContactInformationEditData?.emergencyPhone
                        ? 'text-white'
                        : 'text-danger'
                    }
                  >
                    *
                  </span>
                </CFormLabel>
                <CCol sm={1}>
                  <CFormInput
                    type="text"
                    size="sm"
                    placeholder="+91"
                    aria-label="Disabled input example"
                    disabled
                  />
                </CCol>
                <CCol sm={3}>
                  <CFormInput
                    type="text"
                    id="Mobile"
                    placeholder="9xxxxxxxxx"
                    size="sm"
                    name="emergencyPhone"
                    onChange={onChangeEmergencyContactDetailsHandler}
                    value={
                      employeeEmergencyContactInformationEditData.emergencyPhone
                    }
                    maxLength={10}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Relationship:
                  <span
                    className={
                      employeeEmergencyContactInformationEditData?.emergencyRelationShip
                        ? 'text-white'
                        : 'text-danger'
                    }
                  >
                    *
                  </span>
                </CFormLabel>
                <CCol sm={3}>
                  <CFormSelect
                    aria-label="Relationship"
                    name="emergencyRelationShip"
                    id="Relationship"
                    size="sm"
                    onChange={onChangeEmergencyContactDetailsHandler}
                    value={
                      employeeEmergencyContactInformationEditData.emergencyRelationShip
                    }
                  >
                    <option value={''}>Select Relationship</option>
                    <option value="Brother">Brother</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Father">Father</option>
                    <option value="Friend">Friend</option>
                    <option value="Husband">Husband</option>
                    <option value="Mother">Mother</option>
                    <option value="Sister">Sister</option>
                    <option value="Son">Son</option>
                    <option value="Wife">Wife</option>
                    <option value="Other">Other</option>
                  </CFormSelect>
                </CCol>
              </CRow>
            </CCardBody>
            <CCardHeader>
              <h4 className="h4">Present Address</h4>
            </CCardHeader>
            <CCardBody>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Address:
                  <span
                    className={
                      employeePresenetAddressInformationEditData?.presentAddress
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
                    value={
                      employeePresenetAddressInformationEditData.presentAddress
                    }
                  />
                </CCol>
              </CRow>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  City/Town:{' '}
                  <span
                    className={
                      employeePresenetAddressInformationEditData?.presentCity
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
                    value={
                      employeePresenetAddressInformationEditData.presentCity
                    }
                  />
                </CCol>
              </CRow>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Zip:{' '}
                  <span
                    className={
                      employeePresenetAddressInformationEditData?.presentZip
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
                    placeholder="Zip"
                    size="sm"
                    name="presentZip"
                    onChange={onChangePresenetAddressHandler}
                    value={
                      employeePresenetAddressInformationEditData.presentZip
                    }
                    maxLength={6}
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
                    value={
                      employeePresenetAddressInformationEditData.presentLandMark
                    }
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
                        ? employeePresenetAddressInformationEditData.presentAddress
                        : employeePermanentAddressInformationEditData.permanentAddress
                    }
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
                        ? employeePresenetAddressInformationEditData.presentCity
                        : employeePermanentAddressInformationEditData.permanentCity
                    }
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
                        ? employeePresenetAddressInformationEditData.presentZip
                        : employeePermanentAddressInformationEditData.permanentZip
                    }
                    maxLength={6}
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
                        ? employeePresenetAddressInformationEditData.presentLandMark
                        : employeePermanentAddressInformationEditData.permanentLandMark
                    }
                  />
                </CCol>
              </CRow>
            </CCardBody>
            <CCardHeader>
              <h4 className="h4">Passport Details</h4>
            </CCardHeader>
            <CCardBody>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Number:
                </CFormLabel>
                <CCol sm={3}>
                  <CFormInput
                    type="text"
                    placeholder="Passport Number"
                    size="sm"
                    name="passportNumber"
                    onChange={onChangePassportInformationHandler}
                    value={employeePassportInformationEditData.passportNumber}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Place of Issue:
                </CFormLabel>
                <CCol sm={3}>
                  <CFormInput
                    type="text"
                    size="sm"
                    placeholder="Place"
                    name="passportIssuedPlace"
                    aria-label="Disabled input example"
                    disabled
                    onChange={onChangePassportInformationHandler}
                    value={
                      employeePassportInformationEditData.passportIssuedPlace
                    }
                  />
                </CCol>
              </CRow>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Date of Issue :
                </CFormLabel>
                <CCol sm={3}>
                  <DatePicker
                    id="passportIssuedDate"
                    className="form-control form-control-sm"
                    maxDate={new Date()}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    placeholderText="dd/mm/yyyy"
                    name="officialBirthday"
                    value={
                      employeePassportInformationEditData.passportIssuedDate
                    }
                    onChange={(date: Date) =>
                      onDateChangeHandler(date, { name: 'passportIssuedDate' })
                    }
                  />
                </CCol>
              </CRow>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Date of Expiry:
                </CFormLabel>
                <CCol sm={3}>
                  <DatePicker
                    id="passportExpDate"
                    className="form-control form-control-sm"
                    maxDate={new Date()}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    placeholderText="dd/mm/yyyy"
                    name="passportExpDate"
                    value={employeePassportInformationEditData.passportExpDate}
                    onChange={(date: Date) =>
                      onDateChangeHandler(date, { name: 'passportExpDate' })
                    }
                  />
                </CCol>
              </CRow>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Upload Passport Front Copy:
                </CFormLabel>
                <CCol sm={3}>
                  <CFormInput
                    type="file"
                    name="file"
                    className="form-control form-control-sm"
                    id="exampleFormControlFile2"
                  />
                </CCol>
              </CRow>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Upload Passport Back Copy:
                </CFormLabel>
                <CCol sm={3}>
                  <CFormInput
                    type="file"
                    name="file"
                    className="form-control form-control-sm"
                    id="exampleFormControlFile2"
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol md={{ span: 6, offset: 3 }}>
                  <CButton
                    className="btn-ovh btn btn-success mt-4"
                    size="sm"
                    type="submit"
                    onClick={handleSubmitBasicDetails}
                    disabled={!saveButtonEnabled}
                  >
                    Save
                  </CButton>
                </CCol>
              </CRow>
            </CCardBody>
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
