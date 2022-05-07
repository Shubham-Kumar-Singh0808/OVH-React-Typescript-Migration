import {
  CCardHeader,
  CCardBody,
  CCard,
  CRow,
  CCol,
  CForm,
  CButton,
  CFormLabel,
  CFormInput,
  CFormSelect,
} from '@coreui/react-pro'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import {
  doFetchCountryDetails,
  doFetchCountryVisaDetails,
  doAddNewVisaDetails,
} from '../../../reducers/MyProfile/PersonalInfoTab/personalInfoTabSlice'
import DatePicker from 'react-datepicker'
import {
  AddEditEmployeeVisaDetails,
  EmployeeVisaDetails,
} from '../../../types/MyProfile/PersonalInfoTab/personalInfoTypes'

import 'react-datepicker/dist/react-datepicker.css'
function AddEditVisaDetails({
  isEditVisaDetails = false,
  headerTitle,
  confirmButtonText,
  backButtonHandler,
}: AddEditEmployeeVisaDetails): JSX.Element {
  const employeeId = useTypedSelector(
    (state) => state.authentication.authenticatedUser.employeeId,
  )
  const fetchCountryDetails = useTypedSelector(
    (state) => state.familyDetails.SubCountries,
  )
  const fetchVisaCountryDetails = useTypedSelector(
    (state) => state.familyDetails.SubVisa,
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(doFetchCountryDetails())
  }, [dispatch])
  console.log(fetchCountryDetails)
  const initialEmployeeVisaDetails = {} as EmployeeVisaDetails
  const [employeeVisaDetails, setEmployeeVisaDetails] = useState(
    initialEmployeeVisaDetails,
  )
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)
  const [dateOfIssue, setDateOfIssue] = useState<Date>()
  const [dateOfExpire, setDateOfExpire] = useState<Date>()
  useEffect(() => {
    dispatch(doFetchCountryVisaDetails(initialEmployeeVisaDetails.countryId))
  }, [dispatch, initialEmployeeVisaDetails.countryId])
  const fetchEditVisaDetails = useTypedSelector(
    (state) => state.familyDetails.editVisaDetails,
  )
  console.log(fetchEditVisaDetails)
  useEffect(() => {
    if (isEditVisaDetails) {
      setEmployeeVisaDetails(fetchEditVisaDetails)
    }
  }, [isEditVisaDetails, fetchEditVisaDetails])
  useEffect(() => {
    if (
      employeeVisaDetails.countryId &&
      employeeVisaDetails.visaTypeId &&
      dateOfIssue &&
      dateOfExpire
    ) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [
    employeeVisaDetails.countryId,
    employeeVisaDetails.visaTypeId,
    dateOfIssue,
    dateOfExpire,
  ])

  const eventHandler = (e: any) => {
    const { name, value } = e.target
    setEmployeeVisaDetails((prevState) => {
      return { ...prevState, ...{ [name]: value } }
    })
  }
  const onChangeDateOfExpireHandler = (date: Date) => {
    setDateOfExpire(date)
  }
  const onChangeDateOfIssueHandler = (date: Date) => {
    setDateOfIssue(date)
  }
  const handleAddVisaDetails = async () => {
    const prepareObject = {
      ...employeeVisaDetails,
      dateOfIssue: moment(dateOfIssue).format('DD/MM/YYYY'),
      dateOfExpire: moment(dateOfExpire).format('DD/MM/YYYY'),
    }
    const addVisaMemberResultAction = await dispatch(
      doAddNewVisaDetails(prepareObject),
    )
    if (doAddNewVisaDetails.fulfilled.match(addVisaMemberResultAction)) {
      backButtonHandler()
    }
  }
  return (
    <>
      <CCardHeader>
        <h4 className="h4">{headerTitle}</h4>
      </CCardHeader>
      <CCardBody>
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              onClick={backButtonHandler}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Country:
              {!employeeVisaDetails.countryId ? (
                <span className="text-danger">*</span>
              ) : (
                <></>
              )}
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                name="countryId"
                value={employeeVisaDetails.countryId}
                onChange={eventHandler}
              >
                <option>Select Country</option>
                {fetchCountryDetails?.countries.map((countriesItem, index) => (
                  <option key={index} value={countriesItem.id}>
                    {countriesItem.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Visa Type:{' '}
              {!employeeVisaDetails.visaTypeId ? (
                <span className="text-danger">*</span>
              ) : (
                <></>
              )}
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                name="visaTypeId"
                value={employeeVisaDetails.visaTypeId}
                size="sm"
                onChange={eventHandler}
              >
                <option>Select Visa</option>
                {fetchVisaCountryDetails?.map((visaTypeItem, index) => (
                  <option key={index} value={visaTypeItem.visaTypeId}>
                    {visaTypeItem.visaType}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Date of Issue:
              {!dateOfIssue ? <span className="text-danger">*</span> : <></>}
            </CFormLabel>
            <CCol sm={3}>
              <DatePicker
                className="form-control form-control-sm"
                name="dateOfIssue"
                maxDate={new Date()}
                selected={dateOfIssue}
                onChange={onChangeDateOfIssueHandler}
                // value={dateOfIssue}
                id="dateOfIssue"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/mm/yyyy"
                dateFormat="dd/MM/yyyy"
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Date of Expire :
            </CFormLabel>
            <CCol sm={3}>
              <DatePicker
                className="form-control form-control-sm"
                name="dateOfExpire"
                maxDate={new Date()}
                // value={dateOfExpire}
                selected={dateOfExpire}
                onChange={onChangeDateOfExpireHandler}
                id="dateOfExpire"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/mm/yyyy"
                dateFormat="dd/MM/yyyy"
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Upload VISA copy:
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                className="form-control form-control-sm"
                type="file"
                name="file"
              />
            </CCol>
          </CRow>

          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              {isEditVisaDetails ? (
                <CButton
                  className="btn-ovh me-2"
                  color="success"
                  // onClick={handleUpdateVisaDetails}
                >
                  {confirmButtonText}
                </CButton>
              ) : (
                <>
                  <CButton
                    className="btn-ovh me-1"
                    color="success"
                    disabled={!isAddButtonEnabled}
                    onClick={handleAddVisaDetails}
                  >
                    {confirmButtonText}
                  </CButton>
                  <CButton
                    color="warning "
                    className="btn-ovh"
                    // onClick={handleClearDetails}
                  >
                    Clear
                  </CButton>
                </>
              )}
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </>
  )
}
export default AddEditVisaDetails
