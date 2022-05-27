import 'react-datepicker/dist/react-datepicker.css'

import {
  AddEditEmployeeVisaDetails,
  EmployeeVisaDetails,
} from '../../../types/MyProfile/PersonalInfoTab/personalInfoTypes'
import {
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { personalInfoThunk } from '../../../reducers/MyProfile/PersonalInfoTab/personalInfoTabSlice'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

import DatePicker from 'react-datepicker'
import OToast from '../../../components/ReusableComponent/OToast'
import { appActions } from '../../../reducers/appSlice'
import moment from 'moment'
function AddEditVisaDetails({
  isEditVisaDetails = false,
  headerTitle,
  confirmButtonText,
  backButtonHandler,
}: AddEditEmployeeVisaDetails): JSX.Element {
  const initialEmployeeVisaDetails = {} as EmployeeVisaDetails
  const [employeeVisaDetails, setEmployeeVisaDetails] = useState(
    initialEmployeeVisaDetails,
  )
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)
  const [dateOfIssue, setDateOfIssue] = useState<Date | string>()
  const [dateOfExpire, setDateOfExpire] = useState<Date | string>()
  const [error, setError] = useState<Date | null>(null)
  const getCountryDetails = useTypedSelector(
    (state) => state.personalInfoDetails.SubCountries,
  )
  const getVisaCountryDetails = useTypedSelector(
    (state) => state.personalInfoDetails.SubVisa,
  )
  const getVisaInformation = useTypedSelector(
    (state) => state.personalInfoDetails.editVisaDetails,
  )

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(personalInfoThunk.getEmployeeCountryDetails())
    if (employeeVisaDetails?.countryId) {
      dispatch(
        personalInfoThunk.getEmployeeVisaType(employeeVisaDetails?.countryId),
      )
    }
  }, [dispatch, employeeVisaDetails?.countryId])

  useEffect(() => {
    if ((dateOfIssue as string) <= (dateOfExpire as string)) {
      setError(null)
    }
  }, [dateOfIssue, dateOfExpire])
  useEffect(() => {
    if (
      employeeVisaDetails?.countryId &&
      employeeVisaDetails?.visaTypeId &&
      dateOfIssue &&
      dateOfExpire
    ) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [
    employeeVisaDetails?.countryId,
    employeeVisaDetails?.visaTypeId,
    dateOfIssue,
    dateOfExpire,
  ])
  useEffect(() => {
    if (isEditVisaDetails) {
      setEmployeeVisaDetails(getVisaInformation)
    }
  }, [isEditVisaDetails, getVisaInformation])
  const onChangeCountryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
    setError(date)
  }
  const handleClearDetails = () => {
    setEmployeeVisaDetails({
      id: '',
      empId: '',
      empName: '',
      visaTypeId: '',
      visaType: '',
      countryId: '',
    })
    setDateOfIssue('')
    setDateOfExpire('')
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
      personalInfoThunk.addEmployeeVisa(prepareObject),
    )
    if (
      personalInfoThunk.addEmployeeVisa.fulfilled.match(
        addVisaMemberResultAction,
      )
    ) {
      backButtonHandler()
      dispatch(
        dispatch(appActions.addToast(getToastMessage(actionMapping.added))),
      )
    }
  }
  const handleUpdateVisaMember = async () => {
    const prepareObject = {
      ...employeeVisaDetails,
    }
    const updateVisaMemberResultAction = await dispatch(
      personalInfoThunk.updateEmployeeVisa(prepareObject),
    )
    if (
      personalInfoThunk.updateEmployeeVisa.fulfilled.match(
        updateVisaMemberResultAction,
      )
    ) {
      backButtonHandler()
      dispatch(appActions.addToast(getToastMessage(actionMapping.updated)))
    }
  }
  const formLabelProps = {
    htmlFor: 'Country',
    className: 'col-sm-3 col-form-label text-end',
  }
  const visaTypeProps = {
    className: 'col-sm-3 col-form-label text-end',
    htmlFor: 'Visa Type',
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
            <CFormLabel {...formLabelProps}>
              Country:
              <span
                className={
                  employeeVisaDetails?.countryId ? 'text-white' : 'text-danger'
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                name="countryId"
                id="Country"
                value={employeeVisaDetails?.countryId}
                onChange={onChangeCountryHandler}
              >
                <option value={''}>Select Country</option>
                {getCountryDetails?.countries?.map((countriesItem, index) => (
                  <option key={index} value={countriesItem.id}>
                    {countriesItem.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel {...visaTypeProps}>
              Visa Type:{' '}
              <span
                className={
                  employeeVisaDetails?.visaTypeId ? 'text-white' : 'text-danger'
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                name="visaTypeId"
                id="Visa Type"
                value={employeeVisaDetails?.visaTypeId}
                onChange={onChangeCountryHandler}
              >
                <option value={''}>Select Visa</option>
                {getVisaCountryDetails?.map((visaTypeItem, index) => (
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
              <span
                className={
                  dateOfIssue || getVisaInformation.dateOfIssue
                    ? 'text-white'
                    : 'text-danger'
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <DatePicker
                className="form-control"
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
              <span
                className={
                  dateOfExpire || getVisaInformation.dateOfExpire
                    ? 'text-white'
                    : 'text-danger'
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <DatePicker
                className="form-control"
                name="dateOfExpire"
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
              {error && (
                <p className="text-danger">
                  Date of Expire should be greater than Date of Issue
                </p>
              )}
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Upload VISA copy:
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                className="form-control"
                type="file"
                name="file"
                accept="image/*,"
              />
            </CCol>
            <CCol sm={{ span: 6, offset: 3 }}>
              <p className=" text-info ">
                Note: Please upload less than 400KB size image.
              </p>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              {isEditVisaDetails ? (
                <CButton
                  className="btn-ovh me-2"
                  color="success"
                  onClick={handleUpdateVisaMember}
                  disabled={!isAddButtonEnabled}
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
                    onClick={handleClearDetails}
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
