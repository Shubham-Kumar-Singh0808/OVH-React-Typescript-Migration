import {
  CCardHeader,
  CCardBody,
  CRow,
  CFormLabel,
  CCol,
  CFormInput,
  CButton,
} from '@coreui/react-pro'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import {
  EmployeeGeneralInformation,
  EmployeePassportDetails,
} from '../../../types/MyProfile/GeneralTab/generalInformationTypes'
import { EmployeePassportImage } from '../../../types/MyProfile/PersonalInfoTab/personalInfoTypes'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

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
  const [error, setError] = useState<boolean>(false)
  const [validImage, setValidImage] = useState<boolean>(true)
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
  }
  const onDateChangeHandler = (date: Date, e: { name: string }) => {
    if (employeePassportDetails) {
      const formatDate = moment(date).format('DD/MM/YYYY')
      const { name } = e
      setEmployeePassportDetails((prevState) => {
        return { ...prevState, ...{ [name]: formatDate } }
      })
    }
  }

  const dispatch = useAppDispatch()

  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

  // useEffect(() => {
  //   if (frontUpload) {
  //     props.handlePassportChange(employeePassportDetails, frontUpload, null)
  //   }
  // }, [frontUpload, backUpload])

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
      setValidImage(false)
      setError(false)
    } else {
      setValidImage(true)
      setError(true)
    }

    if (element.name === 'file') {
      setFrontUpload(file[0])
    } else {
      setBackUpload(file[0])
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
                className="basic-info-img"
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
                className="basic-info-img"
                src={props.employeeDetails.passportBackPagePath}
                alt="User Profile"
              />{' '}
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol md={{ span: 6, offset: 3 }}>
            <CButton
              className="mt-1 ms-2 btn-ovh btn btn-success"
              size="sm"
              onClick={uploadFile}
            >
              Save
            </CButton>
          </CCol>
        </CRow>
      </CCardBody>
    </>
  )
}
