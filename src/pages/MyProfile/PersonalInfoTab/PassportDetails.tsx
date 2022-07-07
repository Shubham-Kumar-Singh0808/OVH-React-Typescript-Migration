import {
  CCardHeader,
  CCardBody,
  CRow,
  CFormLabel,
  CCol,
  CFormInput,
} from '@coreui/react-pro'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import {
  EmployeeGeneralInformation,
  EmployeePassportDetails,
} from '../../../types/MyProfile/GeneralTab/generalInformationTypes'

export const PassportDetails = (props: {
  employeeDetails: EmployeeGeneralInformation
  handlePassportChange: (
    passportDetails: EmployeePassportDetails,
    frontImage: File | null,
    backImage: File | null,
  ) => void
}): JSX.Element => {
  const [isPassportButtonEnabled, setIsPassportButtonEnabled] =
    useState<boolean>(false)
  const [
    isPassportPlaceOfIssueButtonEnabled,
    setIsPassportPlaceOfIssueButtonEnabled,
  ] = useState<boolean>(false)

  const selectedUserPassportDetails = {
    passportNumber: props.employeeDetails?.passportNumber,
    passportIssuedPlace: props.employeeDetails?.passportIssuedPlace,
    passportIssuedDate: props.employeeDetails?.passportIssuedDate,
    passportExpDate: props.employeeDetails?.passportExpDate,
    passportFrontPagePath: props.employeeDetails?.passportFrontPagePath,
    passportBackPagePath: props.employeeDetails?.passportBackPagePath,
  }

  const [employeePassportDetails, setEmployeePassportDetails] = useState(
    selectedUserPassportDetails,
  )

  const [frontUpload, setFrontUpload] = useState<File | null>(null)
  const [backUpload, setBackUpload] = useState<File | null>(null)

  const onChangePassportInformationHandler = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    setEmployeePassportDetails((prevState) => {
      return { ...prevState, ...{ [name]: value } }
    })
    props.handlePassportChange(employeePassportDetails, null, null)
  }
  const onDateChangeHandler = (date: Date, e: { name: string }) => {
    if (employeePassportDetails) {
      const formatDate = moment(date).format('DD/MM/YYYY')
      const { name } = e
      setEmployeePassportDetails((prevState) => {
        return { ...prevState, ...{ [name]: formatDate } }
      })
      props.handlePassportChange(employeePassportDetails, null, null)
    }
  }

  useEffect(() => {
    if (frontUpload) {
      props.handlePassportChange(employeePassportDetails, frontUpload, null)
    }
    if (backUpload) {
      props.handlePassportChange(employeePassportDetails, null, backUpload)
    }
  }, [frontUpload, backUpload])

  useEffect(() => {
    if (employeePassportDetails?.passportNumber) {
      setIsPassportButtonEnabled(true)
    } else {
      setIsPassportButtonEnabled(false)
    }
  }, [employeePassportDetails?.passportNumber])

  useEffect(() => {
    if (employeePassportDetails?.passportIssuedPlace) {
      setIsPassportPlaceOfIssueButtonEnabled(true)
    } else {
      setIsPassportPlaceOfIssueButtonEnabled(false)
    }
  }, [employeePassportDetails?.passportIssuedPlace])

  const onChangeFileEventHandler = (element: HTMLInputElement) => {
    const file = element.files
    if (!file || !element.name) return
    if (Number(file[0].size) > Number(400000)) {
      return
    }

    if (element.name === 'file') {
      setFrontUpload(file[0])
    } else {
      setBackUpload(file[0])
    }
  }

  return (
    <>
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
              value={employeePassportDetails.passportNumber}
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
              disabled={!isPassportButtonEnabled}
              onChange={onChangePassportInformationHandler}
              value={employeePassportDetails.passportIssuedPlace}
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
              value={employeePassportDetails.passportIssuedDate}
              onChange={(date: Date) =>
                onDateChangeHandler(date, {
                  name: 'passportIssuedDate',
                })
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
              minDate={new Date()}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              placeholderText="dd/mm/yyyy"
              name="passportExpDate"
              value={employeePassportDetails.passportExpDate}
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
              accept="image/*,"
              className="form-control form-control-sm"
              id="exampleFormControlFile2"
              disabled={!isPassportPlaceOfIssueButtonEnabled}
              onChange={(file1: SyntheticEvent) =>
                onChangeFileEventHandler(
                  file1.currentTarget as HTMLInputElement,
                )
              }
            />
            <div className="mt-2">
              <img
                className="mt-2 basic-info-box"
                src={props.employeeDetails.passportFrontPagePath}
                alt="User Profile"
              />{' '}
            </div>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Upload Passport Back Copy:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              type="file"
              name="file2"
              accept="image/*,"
              className="form-control form-control-sm"
              id="exampleFormControlFile2"
              disabled={!isPassportPlaceOfIssueButtonEnabled}
              onChange={(file2: SyntheticEvent) =>
                onChangeFileEventHandler(
                  file2.currentTarget as HTMLInputElement,
                )
              }
            />
            <div className="mt-2">
              <img
                className="mt-2 basic-info-box"
                src={props.employeeDetails.passportBackPagePath}
                alt="User Profile"
              />{' '}
            </div>
          </CCol>
        </CRow>
      </CCardBody>
    </>
  )
}
