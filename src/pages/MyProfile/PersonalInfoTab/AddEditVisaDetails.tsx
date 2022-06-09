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
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import DatePicker from 'react-datepicker'
import OToast from '../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../reducers/reduxServices'
import moment from 'moment'
import { format } from 'prettier'
import personalInfoApi from '../../../middleware/api/MyProfile/PersonalInfoTab/personalInfoApi'
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
  const [error, setError] = useState<boolean>(false)

  const [selectedDateIssue, setSelectedDateIssue] = useState<
    Date | string | number
  >()

  const selectedVisaID = useTypedSelector(
    reduxServices.personalInformation.selectors.selectedVisaID,
  )

  const getEmployeeCountryDetails = useTypedSelector(
    reduxServices.personalInformation.selectors.countryDetails,
  )
  const getVisaCountryDetails = useTypedSelector(
    reduxServices.personalInformation.selectors.visaTypeDetails,
  )
  const getEditVisaDetails = useTypedSelector(
    reduxServices.personalInformation.selectors.employeeVisaDetails,
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    async function getSelectedVisaDtails() {
      const selectedVisaDetails = await personalInfoApi.getEmployeeVisa(
        selectedVisaID as number,
      )
      setSelectedDateIssue(selectedVisaDetails.dateOfIssue)
      console.log(selectedVisaDetails)
    }
    getSelectedVisaDtails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(reduxServices.personalInformation.getEmployeeCountryDetails())
    if (employeeVisaDetails?.countryId) {
      dispatch(
        reduxServices.personalInformation.getEmployeeVisaType(
          employeeVisaDetails?.countryId,
        ),
      )
    }
  }, [dispatch, employeeVisaDetails?.countryId])

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
      setEmployeeVisaDetails(getEditVisaDetails)
    }
  }, [isEditVisaDetails, getEditVisaDetails])

  const onChangeCountryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setEmployeeVisaDetails((prevState) => {
      return { ...prevState, ...{ [name]: value } }
    })
  }

  const onChangeDateOfIssueHandler = (date: Date) => {
    const currentDateExpiry = isEditVisaDetails
      ? employeeVisaDetails.dateOfExpire?.toString()
      : dateOfExpire?.toLocaleString()

    const tempDateExpiry = moment(currentDateExpiry).format('DD/MM/YYYY')
    const newDateExpiry = new Date(tempDateExpiry)

    validateDates(date, newDateExpiry)

    if (isEditVisaDetails) {
      const formatDate = moment(date).format('DD/MM/YYYY')
      const name = 'dateOfIssue'
      setEmployeeVisaDetails((prevState) => {
        return { ...prevState, ...{ [name]: formatDate } }
      })
      setDateOfIssue(date)
    } else {
      setDateOfIssue(date)
    }
  }

  const onChangeDateOfExpireHandler = (date: Date) => {
    const currentDateIssue = isEditVisaDetails
      ? employeeVisaDetails.dateOfIssue?.toString()
      : dateOfIssue?.toLocaleString()

    const tempDateIssue = moment(currentDateIssue).format('DD/MM/YYYY')
    const newDateIssue = new Date(tempDateIssue)

    validateDates(newDateIssue, date)
    if (isEditVisaDetails) {
      const formatDate = moment(date).format('DD/MM/YYYY')
      const name = 'dateOfExpire'
      setEmployeeVisaDetails((prevState) => {
        return { ...prevState, ...{ [name]: formatDate } }
      })
      setDateOfExpire(date)
    } else {
      setDateOfExpire(date)
    }
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
    setError(false)
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
      reduxServices.personalInformation.addEmployeeVisa(prepareObject),
    )
    if (
      reduxServices.personalInformation.addEmployeeVisa.fulfilled.match(
        addVisaMemberResultAction,
      )
    ) {
      backButtonHandler()
      dispatch(
        dispatch(
          reduxServices.app.actions.addToast(
            getToastMessage(actionMapping.added),
          ),
        ),
      )
    }
  }
  const handleUpdateVisaMember = async () => {
    const prepareObject = {
      ...employeeVisaDetails,
    }
    const updateVisaMemberResultAction = await dispatch(
      reduxServices.personalInformation.updateEmployeeVisa(prepareObject),
    )
    if (
      reduxServices.personalInformation.updateEmployeeVisa.fulfilled.match(
        updateVisaMemberResultAction,
      )
    ) {
      backButtonHandler()
      dispatch(
        reduxServices.app.actions.addToast(
          getToastMessage(actionMapping.updated),
        ),
      )
    }
  }

  const validateDates = (startDate: Date, endDate: Date) => {
    if (startDate.getTime() > endDate.getTime()) {
      setError(true)
      setIsAddButtonEnabled(true)
    } else {
      setError(false)
      setIsAddButtonEnabled(false)
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
                {getEmployeeCountryDetails?.countries?.map(
                  (countriesItem, index) => (
                    <option key={index} value={countriesItem.id}>
                      {countriesItem.name}
                    </option>
                  ),
                )}
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
                  dateOfIssue || getEditVisaDetails.dateOfIssue
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
                // selected={
                //   isEditVisaDetails
                //     ? (selectedDateIssue as Date)
                //     : (dateOfIssue as Date)
                // }
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
                  dateOfExpire || getEditVisaDetails.dateOfExpire
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
                placeholderText="dd/MM/yyyy"
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
                  disabled={error}
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
