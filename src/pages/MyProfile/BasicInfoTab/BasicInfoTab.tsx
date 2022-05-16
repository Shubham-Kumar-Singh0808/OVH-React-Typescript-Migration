import 'react-datepicker/dist/react-datepicker.css'

import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

import DatePicker from 'react-datepicker'
import DownloadSampleFileButton from './DownloadSampleFileButton'
import moment from 'moment'
import { selectLoggedInData } from '../../../reducers/MyProfile/GeneralTab/generalInformationSlice'
import { updateEmployeeDefaultPic } from '../../../reducers/MyProfile/BasicInfoTab/basicInformatiomSlice'

const BasicInfoTab = (): JSX.Element => {
  const employeeBasicInformation = useTypedSelector(selectLoggedInData)
  const {
    id,
    baseLocation,
    bloodgroup,
    departmentName,
    designation,
    emailId,
    anniversary,
    curentLocation,
    employmentTypeName,
    fullName,
    gender,
    jobTypeName,
    maritalStatus,
    officialBirthday,
    thumbPicture,
    personalEmail,
    realBirthday,
    projectManager,
    rbtCvPath,
    aboutMe,
    skypeId,
    rbtCvName,
  } = employeeBasicInformation
  const selectedUserBasicInformation = {
    id,
    baseLocation,
    bloodgroup,
    departmentName,
    designation,
    emailId,
    curentLocation,
    employmentTypeName,
    fullName,
    gender,
    jobTypeName,
    maritalStatus,
    thumbPicture,
    personalEmail,
    projectManager,
    rbtCvPath,
    rbtCvName,
    aboutMe,
    officialBirthday,
    realBirthday,
    anniversary,
    skypeId,
  }
  const [baseLocationShown, setBaseLocationShown] = useState<boolean>(false)
  const [realBirthdayShown, setRealBirthdayShown] = useState<boolean>(false)
  const [
    employeeBasicInformationEditData,
    setEmployeeBasicInformationEditData,
  ] = useState(selectedUserBasicInformation)
  const [saveButtonEnabled, setSaveButtonEnabled] = useState(false)

  const dispatch = useAppDispatch()

  // onchange handler for input fields
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    setEmployeeBasicInformationEditData((prevState) => {
      return { ...prevState, ...{ [name]: value } }
    })
  }

  // onchange handler for date pickers
  const onDateChangeHandler = (date: Date, e: { name: string }) => {
    if (employeeBasicInformationEditData) {
      const formatDate = moment(date).format('DD/MM/YYYY')
      const name = e.name
      setEmployeeBasicInformationEditData((prevState) => {
        return { ...prevState, ...{ [name]: formatDate } }
      })
    }
  }

  // condition to enable and disable save button
  useEffect(() => {
    if (
      employeeBasicInformationEditData.curentLocation &&
      employeeBasicInformationEditData.bloodgroup &&
      employeeBasicInformationEditData.maritalStatus &&
      employeeBasicInformationEditData.personalEmail &&
      employeeBasicInformationEditData.officialBirthday
    ) {
      setSaveButtonEnabled(true)
    } else {
      setSaveButtonEnabled(false)
    }
  }, [employeeBasicInformationEditData, baseLocationShown, realBirthdayShown])

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
  // change on gender the defaultPic api should call
  useEffect(() => {
    if (employeeBasicInformationEditData.gender) {
      dispatch(
        updateEmployeeDefaultPic(employeeBasicInformationEditData.gender),
      )
    }
  }, [dispatch, employeeBasicInformationEditData.gender])

  return (
    <>
      <CForm className="form-horizontal ng-pristine ng-valid-pattern ng-valid-email ng-valid ng-valid-required">
        <DownloadSampleFileButton />
        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Employee ID:
          </CFormLabel>
          <CCol sm={2}>
            <CFormLabel className="col-sm-15 col-form-label text-end">
              {employeeBasicInformation.id}
            </CFormLabel>
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Email ID:
          </CFormLabel>
          <CCol sm={2}>
            <CFormLabel className="col-sm-15 col-form-label text-end">
              {employeeBasicInformation.emailId}
            </CFormLabel>
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Full Name:
          </CFormLabel>
          <CCol sm={2}>
            <CFormLabel className="col-sm-15 col-form-label text-end">
              {employeeBasicInformation.fullName}
            </CFormLabel>
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Current Location:
            <span
              className={
                employeeBasicInformationEditData.curentLocation
                  ? 'text-white'
                  : 'text-danger'
              }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              size="sm"
              type="text"
              name="curentLocation"
              placeholder="Enter Location"
              value={employeeBasicInformationEditData.curentLocation}
              onChange={handleChange}
            />
            <CFormCheck
              className="mt-2"
              id="trigger"
              label="This is not the base location"
              checked={baseLocationShown}
              onChange={() => setBaseLocationShown(!baseLocationShown)}
            />
          </CCol>
        </CRow>
        {baseLocationShown && (
          <CRow className="mt-3 ">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Base Location:
              <span
                className={
                  employeeBasicInformationEditData.baseLocation
                    ? 'text-white'
                    : 'text-danger'
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                size="sm"
                type="text"
                name="baseLocation"
                placeholder="Enter Location"
                value={employeeBasicInformationEditData.baseLocation}
                onChange={handleChange}
              />
            </CCol>
          </CRow>
        )}
        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Gender:
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              size="sm"
              aria-label="Gender"
              name="gender"
              value={employeeBasicInformationEditData.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Blood group:
            <span
              className={
                employeeBasicInformationEditData.bloodgroup
                  ? 'text-white'
                  : 'text-danger'
              }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              size="sm"
              aria-label="bloodGroup"
              name="bloodgroup"
              value={employeeBasicInformationEditData.bloodgroup}
              onChange={handleChange}
            >
              <option value={''}>Select blood group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Official Birthday:
            <span
              className={
                employeeBasicInformationEditData.officialBirthday
                  ? 'text-white'
                  : 'text-danger'
              }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <DatePicker
              className="form-control form-control-sm"
              maxDate={new Date()}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              placeholderText="dd/mm/yyyy"
              name="officialBirthday"
              value={employeeBasicInformationEditData.officialBirthday}
              onChange={(date: Date) =>
                onDateChangeHandler(date, { name: 'officialBirthday' })
              }
            />
            <CFormCheck
              className="mt-2"
              id="trigger"
              name="officialDateOfBirth"
              label=" This is not a real birthday"
              checked={realBirthdayShown}
              onChange={() => setRealBirthdayShown(!realBirthdayShown)}
            />
          </CCol>
        </CRow>
        {realBirthdayShown && (
          <CRow className="mt-3 ">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Real Birthday:
              <span className="text-danger">*</span>
            </CFormLabel>
            <CCol sm={3}>
              <DatePicker
                className="form-control form-control-sm"
                maxDate={new Date()}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/mm/yyyy"
                name="realBirthday"
                value={employeeBasicInformationEditData.realBirthday}
                onChange={(date: Date) =>
                  onDateChangeHandler(date, { name: 'realBirthday' })
                }
              />
            </CCol>
          </CRow>
        )}
        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Marital Status:
            <span
              className={
                employeeBasicInformationEditData.maritalStatus
                  ? 'text-white'
                  : 'text-danger'
              }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              size="sm"
              aria-label="MaritalStatus"
              name="maritalStatus"
              value={employeeBasicInformationEditData.maritalStatus}
              onChange={handleChange}
            >
              <option value={''}>Select Marital Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </CFormSelect>
          </CCol>
        </CRow>
        {employeeBasicInformationEditData.maritalStatus === 'Married' && (
          <CRow className="mt-3 ">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Anniversary:
              <span className="text-danger">*</span>
            </CFormLabel>
            <CCol sm={3}>
              <DatePicker
                className="form-control form-control-sm"
                maxDate={new Date()}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/mm/yyyy"
                name="realBirthday"
                value={employeeBasicInformationEditData.anniversary}
                onChange={(date: Date) =>
                  onDateChangeHandler(date, { name: 'anniversary' })
                }
              />
            </CCol>
          </CRow>
        )}
        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Department:
          </CFormLabel>
          <CCol sm={2}>
            <CFormLabel className="col-form-label text-end">
              {employeeBasicInformation.departmentName}
            </CFormLabel>
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Reporting Manager:
          </CFormLabel>
          <CCol sm={6}>
            <CFormLabel className="col-sm-15 col-form-label text-end">
              {employeeBasicInformation.empManager}
            </CFormLabel>
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Employment Type:
          </CFormLabel>
          <CCol sm={2}>
            <CFormLabel className="col-form-label text-end">
              {employeeBasicInformation.employmentTypeName}
            </CFormLabel>
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Job Type:
          </CFormLabel>
          <CCol sm={2}>
            <CFormLabel className="col-form-label text-end">
              {employeeBasicInformation.jobTypeName}
            </CFormLabel>
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Country:
          </CFormLabel>
          <CCol sm={2}>
            <CFormLabel className="col-form-label text-end">
              {employeeBasicInformation.country}
            </CFormLabel>
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Personal Email:
            <span
              className={
                employeeBasicInformationEditData.personalEmail
                  ? 'text-white'
                  : 'text-danger'
              }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              size="sm"
              type="text"
              name="personalEmail"
              placeholder="Personal Email"
              value={employeeBasicInformationEditData.personalEmail}
              onChange={handleChange}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Skype ID:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
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
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Profile Picture:
          </CFormLabel>
          <CCol sm={3}>
            <div className="profile-avatar">
              <img
                width="120px"
                height="120px;"
                src={employeeBasicInformation.thumbPicture}
                alt="User Profile"
              />
            </div>
            <CFormInput
              type="file"
              className="form-control mt-2"
              id="exampleFormControlFile1"
              accept="image/*"
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            About Me:
          </CFormLabel>
          <CCol sm={9}></CCol>
        </CRow>
        <CRow className="mt-3">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Upload RBT CV:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="form-control"
              type="file"
              name="file"
              id="exampleFormControlFile2"
              accept=".doc, .docx, .pdf"
            />
          </CCol>
        </CRow>
        <CRow className="mt-3">
          <CCol md={{ span: 6, offset: 3 }}>
            {rbtCvName && (
              <a
                className="text-decoration-none cursor-pointer"
                href="RBT_CV"
                download={rbtCvName}
              >
                <i className="fa fa-paperclip me-1"></i>
                Rbt Cv
              </a>
            )}
          </CCol>
        </CRow>
        <CRow>
          <CCol md={{ span: 6, offset: 3 }}>
            <CButton
              className="btn-ovh btn btn-success mt-4"
              size="sm"
              disabled={!saveButtonEnabled}
              type="submit"
            >
              Save
            </CButton>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default BasicInfoTab
