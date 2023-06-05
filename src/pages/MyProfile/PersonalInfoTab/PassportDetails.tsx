import React, { SyntheticEvent, useEffect, useState } from 'react'
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
import {
  reformatDate,
  dateFormatPerLocale,
} from '../../../utils/dateFormatUtils'
import {
  EmployeeGeneralInformation,
  EmployeePassportDetails,
} from '../../../types/MyProfile/GeneralTab/generalInformationTypes'

export const PassportDetails = (props: {
  employeeDetails?: EmployeeGeneralInformation
  handlePassportChange?: (
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
  const [dateFormat, setDateFormat] = useState<string>('')
  const [passportIssuedDate, setPassportIssuedDate] = useState<Date | string>()
  const [passportExpDate, setPassportExpDate] = useState<Date | string>()
  const [passportIssuedDateFlag, setPassportIssuedDateFlag] =
    useState<boolean>(false)
  const [passportExpDatFlag, setPassportExpDatFlag] = useState<boolean>(false)

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

  const deviceLocale: string =
    navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language

  useEffect(() => {
    const localeDateFormat = dateFormatPerLocale.filter(
      (lang) => lang.label === navigator.languages[0],
    )
    setDateFormat(localeDateFormat[0].format)
  }, [])

  const dateFormmatted = (date: string) => {
    if (date) {
      const tempDateFormat = reformatDate(date as string)
      return tempDateFormat.toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    } else {
      return ''
    }
  }

  let newPassportIssuedDate = new Date()
  let newPassportExpDate = new Date()
  if (employeePassportDetails.passportIssuedDate) {
    const currentIssueDate =
      employeePassportDetails.passportIssuedDate as string
    newPassportIssuedDate = reformatDate(currentIssueDate)
  }
  if (employeePassportDetails.passportExpDate) {
    const currentDateOfExpiry =
      employeePassportDetails.passportExpDate as string
    newPassportExpDate = reformatDate(currentDateOfExpiry)
  }

  const onChangePassportInformationHandler = (
    changedValue:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = changedValue.target
    setEmployeePassportDetails((prevState) => {
      return { ...prevState, ...{ [name]: value } }
    })
    if (props.handlePassportChange)
      props.handlePassportChange(employeePassportDetails, null, null)
  }

  const onDateChangeHandler = (date: Date, changedValue: { name: string }) => {
    if (employeePassportDetails) {
      const formatDate = moment(date).format('DD/MM/YYYY')
      const { name } = changedValue
      setEmployeePassportDetails((prevState) => {
        return { ...prevState, ...{ [name]: formatDate } }
      })
      if (name === 'passportIssuedDate') {
        setPassportIssuedDate(date)
        setPassportIssuedDateFlag(true)
      }
      if (name === 'passportExpDate') {
        setPassportExpDate(date)
        setPassportExpDatFlag(true)
      }
      if (props.handlePassportChange)
        props.handlePassportChange(employeePassportDetails, null, null)
    }
  }

  useEffect(() => {
    if (frontUpload && props.handlePassportChange) {
      props.handlePassportChange(employeePassportDetails, frontUpload, null)
    }
    if (backUpload && props.handlePassportChange) {
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
    if (
      employeePassportDetails?.passportIssuedPlace &&
      employeePassportDetails?.passportNumber
    ) {
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
          <CFormLabel
            className="col-sm-3 col-form-label text-end"
            data-testid="passportNumber"
          >
            Number:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              autoComplete="off"
              type="text"
              placeholder="Passport Number"
              size="sm"
              name="passportNumber"
              data-testid="passportNumberInput"
              onChange={onChangePassportInformationHandler}
              value={employeePassportDetails.passportNumber}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4" data-testid="passportIssue">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Place of Issue:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              autoComplete="off"
              type="text"
              size="sm"
              placeholder="Place"
              data-testid="placeOfIssueInput"
              name="passportIssuedPlace"
              aria-label="Disabled input example"
              disabled={!isPassportButtonEnabled}
              onChange={onChangePassportInformationHandler}
              value={employeePassportDetails.passportIssuedPlace}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4" data-testid="passportIssuedDate">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Date of Issue :
          </CFormLabel>
          <CCol sm={3}>
            <DatePicker
              autoComplete="off"
              id="passportIssuedDate"
              className="form-control form-control-sm"
              maxDate={new Date()}
              data-testid="dateOfIssueInput"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              placeholderText={
                dateFormat === 'dd/MM/yyyy' ? 'dd/mm/yyyy' : dateFormat
              }
              dateFormat={dateFormat}
              name="passportIssuedDate"
              disabled={!isPassportButtonEnabled}
              value={dateFormmatted(
                employeePassportDetails.passportIssuedDate as string,
              )}
              selected={
                !passportIssuedDateFlag &&
                employeePassportDetails?.passportIssuedDate
                  ? newPassportIssuedDate
                  : (passportIssuedDate as Date)
              }
              onChange={(date: Date) =>
                onDateChangeHandler(date, {
                  name: 'passportIssuedDate',
                })
              }
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4" data-testid="passportExpDate">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Date of Expiry:
          </CFormLabel>
          <CCol sm={3}>
            <DatePicker
              autoComplete="off"
              id="passportExpDate"
              className="form-control form-control-sm"
              minDate={new Date()}
              data-testid="expiryDateInput"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              placeholderText={
                dateFormat === 'dd/MM/yyyy' ? 'dd/mm/yyyy' : dateFormat
              }
              dateFormat={dateFormat}
              name="passportExpDate"
              selected={
                !passportExpDatFlag && employeePassportDetails?.passportExpDate
                  ? newPassportExpDate
                  : (passportExpDate as Date)
              }
              disabled={!isPassportButtonEnabled}
              value={dateFormmatted(
                employeePassportDetails.passportExpDate as string,
              )}
              onChange={(date: Date) =>
                onDateChangeHandler(date, { name: 'passportExpDate' })
              }
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4" data-testid="frontUpload">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Upload Passport Front Copy:
          </CFormLabel>
          <CCol sm={3}>
            <input
              className="sh-updateTicket-file mt-1 cursor-pointer"
              type="file"
              name="file"
              accept="image/*,"
              data-testid="frontUploadInput"
              id="exampleFormControlFile1"
              disabled={!isPassportPlaceOfIssueButtonEnabled}
              onChange={(file1: SyntheticEvent) =>
                onChangeFileEventHandler(
                  file1.currentTarget as HTMLInputElement,
                )
              }
            />
            {props.employeeDetails?.passportFrontPagePath && (
              <div className="mt-2" data-testId="frontImagePreview">
                <img
                  className="mt-2 basic-info-img"
                  src={props.employeeDetails?.passportFrontPagePath}
                />{' '}
              </div>
            )}
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4" data-testid="backUpload">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Upload Passport Back Copy:
          </CFormLabel>
          <CCol sm={3}>
            <input
              id="exampleFormControlFile2"
              className="sh-updateTicket-file mt-1 cursor-pointer"
              type="file"
              name="file2"
              accept="image/*,"
              data-testid="backUploadInput"
              disabled={!isPassportPlaceOfIssueButtonEnabled}
              onChange={(file2: SyntheticEvent) =>
                onChangeFileEventHandler(
                  file2.currentTarget as HTMLInputElement,
                )
              }
            />
            {props.employeeDetails?.passportBackPagePath && (
              <div className="mt-2" data-testId="backImagePreview">
                <img
                  className="mt-2 basic-info-img"
                  src={props.employeeDetails?.passportBackPagePath}
                />{' '}
              </div>
            )}
          </CCol>
        </CRow>
      </CCardBody>
    </>
  )
}
