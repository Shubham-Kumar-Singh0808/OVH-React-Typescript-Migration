/* eslint-disable sonarjs/cognitive-complexity */
// todo: remove eslint and fix all errors
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
import React, { SyntheticEvent, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import {
  AddEditEmployeeVisaDetails,
  EmployeeVisaDetails,
} from '../../../types/MyProfile/PersonalInfoTab/personalInfoTypes'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import personalInfoApi from '../../../middleware/api/MyProfile/PersonalInfoTab/personalInfoApi'
import OToast from '../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../reducers/reduxServices'
import { TextWhite, TextDanger } from '../../../constant/ClassName'

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
  const [dateOfIssue, setDateOfIssue] = useState<Date>()
  const [dateOfExpire, setDateOfExpire] = useState<Date>()
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined)
  const [imageUrl, setImageUrl] = useState<string>()
  const [error, setError] = useState<boolean>(false)
  const [inValidImage, setInvalidImage] = useState<boolean>(false)
  const [clearVisaType, setClearVisaType] = useState<boolean>(false)

  const [dateOfIssueFlag, setDateOfIssueFlag] = useState<boolean>(false)
  const [dateOfExpiryFlag, setDateOfExpiryFlag] = useState<boolean>(false)
  const [showDate, setShowDate] = useState<boolean>(true)
  const [newDateIssue, setNewDateIssue] = useState<string>('')
  const [newDateExpiry, setNewDateExpiry] = useState<string>('')

  const getEmployeeCountryDetails = useTypedSelector(
    reduxServices.personalInformation.selectors.countryDetails,
  )
  const getVisaCountryDetails = useTypedSelector(
    reduxServices.personalInformation.selectors.visaTypeDetails,
  )
  const getEditVisaDetails = useTypedSelector(
    reduxServices.personalInformation.selectors.employeeVisaDetails,
  )
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

  const dispatch = useAppDispatch()
  const deviceLocale: string =
    navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language

  const currentDateOfIssue = employeeVisaDetails.dateOfIssue as Date
  const dateIssueParts: string[] | string = employeeVisaDetails.dateOfIssue
    ? currentDateOfIssue.toString().split('/')
    : ''
  const newDateOfIssue = employeeVisaDetails.dateOfIssue
    ? new Date(
        Number(dateIssueParts[2]),
        Number(dateIssueParts[1]) - 1,
        Number(dateIssueParts[0]),
      )
    : new Date()

  const currentDateOfExpiry = employeeVisaDetails.dateOfExpire as Date
  const dateExpiryPart: string[] | string = employeeVisaDetails.dateOfExpire
    ? currentDateOfExpiry.toString().split('/')
    : ''
  const newDateOfExpiry = employeeVisaDetails.dateOfExpire
    ? new Date(
        Number(dateExpiryPart[2]),
        Number(dateExpiryPart[1]) - 1,
        Number(dateExpiryPart[0]),
      )
    : new Date()

  useEffect(() => {
    dispatch(reduxServices.personalInformation.getEmployeeCountryDetails())
    if (employeeVisaDetails?.countryId) {
      dispatch(
        reduxServices.personalInformation.getEmployeeVisaType(
          employeeVisaDetails.countryId,
        ),
      )
    }
  }, [dispatch, employeeVisaDetails?.countryId])

  useEffect(() => {
    if (selectedFile) {
      setImageUrl(URL.createObjectURL(selectedFile))
    }
  }, [selectedFile])

  const selectImageFile = selectedFile
    ? imageUrl
    : 'data:image/jpeg;base64,' + employeeVisaDetails.visaDetailsData

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
      const tempDateIssue = getEditVisaDetails.dateOfIssue
      const tempDateExpiry = getEditVisaDetails.dateOfExpire
      if (tempDateIssue !== undefined) {
        setNewDateIssue(tempDateIssue.toString())
      }
      if (tempDateExpiry) {
        setNewDateExpiry(tempDateExpiry.toString())
      }
      setShowDate(false)
      setTimeout(() => {
        setShowDate(true)
      }, 100)
    }
  }, [isEditVisaDetails, getEditVisaDetails])

  const onChangeCountryHandler = (e: {
    target: { name: string; value: string }
  }) => {
    const { name, value } = e.target
    if (
      name === 'countryId' &&
      employeeVisaDetails?.countryId !== BigInt(value)
    ) {
      setClearVisaType(true)
      setEmployeeVisaDetails((prevState: EmployeeVisaDetails) => {
        return { ...prevState, ...{ visaTypeId: undefined } }
      })
    }
    if (name === 'visaTypeId') {
      setClearVisaType(false)
    }
    setEmployeeVisaDetails((prevState) => {
      return { ...prevState, ...{ [name]: value } }
    })
  }

  const onChangeDateOfIssueHandler = (date: Date) => {
    const currentDateExpiry = isEditVisaDetails
      ? employeeVisaDetails.dateOfExpire
      : dateOfExpire

    validateDates(date, currentDateExpiry)

    if (isEditVisaDetails) {
      const name = 'dateOfIssue'
      setEmployeeVisaDetails((prevState: EmployeeVisaDetails) => {
        return { ...prevState, ...{ [name]: date } }
      })
      setDateOfIssue(date)
    } else {
      setDateOfIssue(date)
    }
    setDateOfIssueFlag(true)
  }

  const onChangeDateOfExpireHandler = (date: Date) => {
    const currentDateIssue = isEditVisaDetails
      ? employeeVisaDetails.dateOfIssue
      : dateOfIssue

    validateDates(currentDateIssue, date)

    if (isEditVisaDetails) {
      const name = 'dateOfExpire'
      setEmployeeVisaDetails((prevState: EmployeeVisaDetails) => {
        return { ...prevState, ...{ [name]: date } }
      })
      setDateOfExpire(date)
    } else {
      setDateOfExpire(date)
    }
    setDateOfExpiryFlag(true)
  }

  const onChangeFileEventHandler = (element: HTMLInputElement) => {
    const file = element.files
    if (!file) return
    if (Number(file[0].size) > Number(400000)) {
      setInvalidImage(true)
    } else {
      setInvalidImage(false)
    }

    setSelectedFile(file[0])
  }

  const handleClearDetails = () => {
    setEmployeeVisaDetails(initialEmployeeVisaDetails)
    setDateOfIssue(initialEmployeeVisaDetails.dateOfIssue)
    setDateOfExpire(initialEmployeeVisaDetails.dateOfExpire)
    setError(false)
    setImageUrl('')
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
      dateOfIssue,
      dateOfExpire,
    }
    const addVisaMemberResultAction = await dispatch(
      reduxServices.personalInformation.addEmployeeVisa(prepareObject),
    )
    if (
      reduxServices.personalInformation.addEmployeeVisa.fulfilled.match(
        addVisaMemberResultAction,
      )
    ) {
      if (selectedFile) {
        const newAddedVisaID = await personalInfoApi.getEmployeeVisaDetails(
          Number(employeeId),
        )
        const lastArrayIndex: number = newAddedVisaID.length - 1

        const formData = new FormData()
        formData.append('file', selectedFile, selectedFile.name)
        const visaId = newAddedVisaID[lastArrayIndex].id
        const file = formData as FormData

        await personalInfoApi.uploadVisaImage(BigInt(visaId as number), file)
      }
      dispatch(
        dispatch(
          reduxServices.app.actions.addToast(
            getToastMessage(actionMapping.added),
          ),
        ),
      )
    }
    backButtonHandler()
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
      if (selectedFile) {
        const formData = new FormData()
        formData.append('file', selectedFile, selectedFile.name)
        const visaId = employeeVisaDetails.id
        const file = formData as FormData

        await personalInfoApi.uploadVisaImage(visaId as bigint, file)
      }
      dispatch(
        reduxServices.app.actions.addToast(
          getToastMessage(actionMapping.updated),
        ),
      )
    }
    backButtonHandler()
  }

  const validateDates = (
    startDate: Date | undefined,
    endDate: Date | undefined,
  ) => {
    // const newStartDate = startDate?.setHours(0, 0, 0, 0)
    // const newEndtDate = endDate?.setHours(0, 0, 0, 0)
    if (startDate && endDate) {
      if (startDate > endDate) {
        setError(true)
        setIsAddButtonEnabled(false)
      } else {
        setError(false)
        setIsAddButtonEnabled(true)
      }
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
  const span6 = { span: 6, offset: 3 }

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
              onClick={() => {
                backButtonHandler()
                handleClearDetails()
              }}
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
                  employeeVisaDetails?.countryId ? TextWhite : TextDanger
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
                value={employeeVisaDetails?.countryId?.toString()}
                onChange={onChangeCountryHandler}
              >
                <option>Select Country</option>
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
                  employeeVisaDetails?.visaTypeId ? TextWhite : TextDanger
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
                value={employeeVisaDetails?.visaTypeId?.toString()}
                onChange={onChangeCountryHandler}
              >
                <option>Select Visa</option>
                {getVisaCountryDetails?.map((visaTypeItem, index) => (
                  <option
                    key={index}
                    value={visaTypeItem.visaTypeId?.toString()}
                  >
                    {visaTypeItem.visaType}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          {showDate ? (
            <>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Date of Issue:
                  <span
                    className={
                      employeeVisaDetails.dateOfIssue || dateOfIssue
                        ? TextWhite
                        : TextDanger
                    }
                  >
                    *
                  </span>
                </CFormLabel>
                <CCol sm={3} data-testid="dateOfIssuedInput">
                  <DatePicker
                    className="form-control"
                    name="dateOfIssue"
                    maxDate={new Date()}
                    value={
                      dateOfIssue?.toLocaleDateString(deviceLocale, {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      }) || newDateIssue
                    }
                    selected={
                      !dateOfIssueFlag && employeeVisaDetails.dateOfIssue
                        ? newDateOfIssue
                        : dateOfIssue
                    }
                    onChange={onChangeDateOfIssueHandler}
                    id="dateOfIssue"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    placeholderText="dd/mm/yyyy"
                  />
                </CCol>
              </CRow>
              <CRow className="mt-4 mb-4" data-testid="dateOfExiryInput">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Date of Expire :
                  <span
                    className={
                      employeeVisaDetails.dateOfExpire || dateOfExpire
                        ? TextWhite
                        : TextDanger
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
                      dateOfExpire?.toLocaleDateString(deviceLocale, {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      }) || newDateExpiry
                    }
                    selected={
                      !dateOfExpiryFlag && employeeVisaDetails.dateOfExpire
                        ? newDateOfExpiry
                        : dateOfExpire
                    }
                    onChange={onChangeDateOfExpireHandler}
                    id="dateOfExpire"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    placeholderText="dd/mm/yyyy"
                  />
                  {error && (
                    <p className="text-danger">
                      Date of Expire should be greater than Date of Issue
                    </p>
                  )}
                </CCol>
              </CRow>
            </>
          ) : (
            ''
          )}
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Upload VISA copy:
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                id="uploadedFile"
                className="form-control"
                type="file"
                name="file"
                accept="image/*,"
                onChange={(element: SyntheticEvent) =>
                  onChangeFileEventHandler(
                    element.currentTarget as HTMLInputElement,
                  )
                }
              />
            </CCol>
            {selectedFile || getEditVisaDetails?.visaDetailsData ? (
              <CCol sm={span6}>
                <img
                  src={selectImageFile}
                  alt=""
                  style={{ width: '100px', margin: '10px 0' }}
                />
              </CCol>
            ) : (
              <>
                <div className="w-100"></div>
                <CCol sm={span6}>
                  <p className=" text-info ">
                    Note: Please upload less than 400KB size image.
                  </p>
                </CCol>
              </>
            )}
            {inValidImage && (
              <>
                <CCol sm={span6}>
                  <p className=" text-danger ">
                    Please upload less than 400KB size image.
                  </p>
                </CCol>
              </>
            )}
          </CRow>
          <CRow>
            <CCol md={span6}>
              {isEditVisaDetails || employeeVisaDetails?.visaDetailsData ? (
                <CButton
                  className="btn-ovh me-2"
                  color="success"
                  disabled={clearVisaType || error || inValidImage}
                  onClick={handleUpdateVisaMember}
                >
                  {confirmButtonText}
                </CButton>
              ) : (
                <>
                  <CButton
                    className="btn-ovh me-1"
                    color="success"
                    disabled={!isAddButtonEnabled || error || inValidImage}
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
