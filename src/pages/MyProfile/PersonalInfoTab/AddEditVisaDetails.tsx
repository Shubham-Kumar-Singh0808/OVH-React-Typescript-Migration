import {
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CForm,
  CButton,
  CFormLabel,
  CFormInput,
  CFormSelect,
} from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import {
  doFetchCountryDetails,
  doFetchCountryVisaDetails,
  doAddNewVisaDetails,
  doUpdateVisaDetails,
} from '../../../reducers/MyProfile/PersonalInfoTab/personalInfoTabSlice'
import DatePicker from 'react-datepicker'
import {
  AddEditEmployeeVisaDetails,
  EmployeeVisaDetails,
} from '../../../types/MyProfile/PersonalInfoTab/personalInfoTypes'

import 'react-datepicker/dist/react-datepicker.css'
import OToast from '../../../components/ReusableComponent/OToast'
import { addToast } from '../../../reducers/appSlice'
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
  const [dateOfIssue, setDateOfIssue] = useState<Date | string>()
  const [dateOfExpire, setDateOfExpire] = useState<Date | string>()
  const [selectedFile, setSelectedFile] = useState<File | string>()
  const [imageUrl, setImageUrl] = useState<string>()
  useEffect(() => {
    dispatch(doFetchCountryVisaDetails(employeeVisaDetails.countryId))
  }, [dispatch, employeeVisaDetails.countryId])
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
  useEffect(() => {
    if (selectedFile as File | string) {
      setImageUrl(URL.createObjectURL(selectedFile as File))
    }
  }, [selectedFile])

  const onChangeFieEventHandler = (e: any) => {
    setSelectedFile(e.target.File[0])
  }
  const selectImageFile = selectedFile
    ? imageUrl
    : 'data:image/jpeg;base64,' + fetchEditVisaDetails.visaDetailsData
  const eventHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setEmployeeVisaDetails((prevState) => {
      return { ...prevState, ...{ [name]: value } }
    })
  }

  const onChangeDateOfIssueHandler = (date: Date) => {
    if (isEditVisaDetails) {
      const formatDate = moment(date).format('DD/MM/YYYY')
      const name = 'dateOfIssue'
      setEmployeeVisaDetails((prevState) => {
        return { ...prevState, ...{ [name]: formatDate } }
      })
    } else {
      setDateOfIssue(date)
    }
  }
  const onChangeDateOfExpireHandler = (date: Date) => {
    if (isEditVisaDetails) {
      const formatDate = moment(date).format('DD/MM/YYYY')
      const name = 'dateOfExpire'
      setEmployeeVisaDetails((prevState) => {
        return { ...prevState, ...{ [name]: formatDate } }
      })
    } else {
      setDateOfExpire(date)
    }
  }
  const actionMapping = {
    added: 'added',
    updated: 'updated',
  }
  const getToastMessage = (action: string) => {
    return (
      <OToast
        toastColor="success"
        toastMessage={`Your Visa Member have been ${action} successfully.`}
      />
    )
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
      dispatch(dispatch(addToast(getToastMessage(actionMapping.added))))
    }
  }
  const handleUpdateVisaMember = async () => {
    const prepareObject = {
      ...employeeVisaDetails,
      ...{
        employeeId: employeeId,
      },
    }
    const addVisaMemberResultAction = await dispatch(
      doUpdateVisaDetails(prepareObject),
    )
    if (doUpdateVisaDetails.fulfilled.match(addVisaMemberResultAction)) {
      backButtonHandler()
      dispatch(dispatch(addToast(getToastMessage(actionMapping.updated))))
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
              <span
                className={
                  employeeVisaDetails.countryId ? 'text-white' : 'text-danger'
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                name="countryId"
                value={employeeVisaDetails.countryId}
                onChange={eventHandler}
              >
                <option value={''}>Select Country</option>
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
              <span
                className={
                  employeeVisaDetails.visaTypeId ? 'text-white' : 'text-danger'
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                name="visaTypeId"
                value={employeeVisaDetails.visaTypeId}
                size="sm"
                onChange={eventHandler}
              >
                <option value={''}>Select Visa</option>
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
              <span className={dateOfIssue ? 'text-white' : 'text-danger'}>
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <DatePicker
                className="form-control form-control-sm"
                name="dateOfIssue"
                maxDate={new Date()}
                value={
                  (dateOfIssue as string) ||
                  (employeeVisaDetails?.dateOfIssue as string)
                }
                selected={dateOfIssue as Date}
                onChange={onChangeDateOfIssueHandler}
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
              <span className={dateOfExpire ? 'text-white' : 'text-danger'}>
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <DatePicker
                className="form-control form-control-sm"
                name="dateOfExpire"
                maxDate={new Date()}
                value={
                  (dateOfExpire as string) ||
                  (employeeVisaDetails?.dateOfExpire as string)
                }
                selected={dateOfExpire as Date}
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
            <CFormLabel
              className="col-sm-3 col-form-label text-end"
              // size="sm"
              // value={selectedFile as string | File}
            >
              Upload VISA copy:
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                className="form-control form-control-sm"
                type="file"
                name="file"
                value={selectedFile as string}
                onChange={onChangeFieEventHandler}
              />
            </CCol>
            {selectedFile || fetchEditVisaDetails.visaDetailsData ? (
              <CCol sm={{ span: 6, offset: 3 }}>
                <img
                  src={selectImageFile}
                  alt=""
                  style={{ width: '100px', margin: '10px 0' }}
                />
              </CCol>
            ) : (
              <>
                <div className="w-100"></div>
                <CCol sm={{ span: 6, offset: 3 }}>
                  <p className=" text-info ">
                    Note: Please upload less than 400KB size image.
                  </p>
                </CCol>
              </>
            )}
          </CRow>

          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              {isEditVisaDetails ? (
                <CButton
                  className="btn-ovh me-2"
                  color="success"
                  onClick={handleUpdateVisaMember}
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
