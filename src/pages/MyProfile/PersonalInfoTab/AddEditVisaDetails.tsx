/* eslint-disable sonarjs/cognitive-complexity */
// todo: remove eslint and fix all errors
import {
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import {
  AddEditEmployeeVisaDetails,
  EmployeeVisaDetails,
} from '../../../types/MyProfile/PersonalInfoTab/personalInfoTypes'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import personalInfoApi from '../../../middleware/api/MyProfile/PersonalInfoTab/personalInfoApi'
import OToast from '../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../reducers/reduxServices'
import {
  reformatDate,
  dateFormatPerLocale,
} from '../../../utils/dateFormatUtils'
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
  const [dateOfIssue, setDateOfIssue] = useState<Date | string>()
  const [dateOfExpire, setDateOfExpire] = useState<Date | string>()
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined)
  const [imageUrl, setImageUrl] = useState<string>()
  const [error, setError] = useState<boolean>(false)
  const [inValidImage, setInvalidImage] = useState<boolean>(false)
  const [clearVisaType, setClearVisaType] = useState<boolean>(false)
  const [dateFormat, setDateFormat] = useState<string>('')
  const [clearFile, setClearFile] = useState<string>('')
  const [dateOfIssueFlag, setDateOfIssueFlag] = useState<boolean>(false)
  const [dateOfExpiryFlag, setDateOfExpiryFlag] = useState<boolean>(false)

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

  let newDateOfIssue = new Date()
  let newDateOfExpiry = new Date()
  if (employeeVisaDetails.dateOfIssue) {
    const currentDateOfIssue = employeeVisaDetails.dateOfIssue as string
    newDateOfIssue = reformatDate(currentDateOfIssue)
  }
  if (employeeVisaDetails.dateOfExpire) {
    const currentDateOfExpiry = employeeVisaDetails.dateOfExpire as string
    newDateOfExpiry = reformatDate(currentDateOfExpiry)
  }

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
    if (employeeVisaDetails?.countryId === '') {
      dispatch(reduxServices.personalInformation.actions.clearVisaType())
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
    }
  }, [isEditVisaDetails, getEditVisaDetails])

  const commonFormatDate = 'DD/MM/YYYY' //format saved in DB

  const onChangeCountryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === 'countryId' && employeeVisaDetails.countryId !== value) {
      setClearVisaType(true)
      setEmployeeVisaDetails((prevState) => {
        return { ...prevState, ...{ visaTypeId: '' } }
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
      ? (employeeVisaDetails.dateOfExpire as string)
      : (dateOfExpire as string)

    const dateParts: string[] | string = employeeVisaDetails.dateOfExpire
      ? currentDateExpiry.split('/')
      : ''
    const newDateExpiry = employeeVisaDetails.dateOfExpire
      ? new Date(
          Number(dateParts[2]),
          Number(dateParts[1]) - 1,
          Number(dateParts[0]),
        )
      : new Date(dateOfExpire as Date)

    validateDates(date, newDateExpiry)

    if (isEditVisaDetails) {
      const formatDate = moment(date).format(commonFormatDate)
      const name = 'dateOfIssue'
      setEmployeeVisaDetails((prevState) => {
        return { ...prevState, ...{ [name]: formatDate } }
      })
      setDateOfIssue(date)
    } else {
      setDateOfIssue(date)
    }
    setDateOfIssueFlag(true)
  }

  const onChangeDateOfExpireHandler = (date: Date) => {
    const currentDateIssue = isEditVisaDetails
      ? (employeeVisaDetails.dateOfIssue as string)
      : (dateOfIssue as string)

    const dateParts: string[] | string = employeeVisaDetails.dateOfExpire
      ? currentDateIssue.split('/')
      : ''
    const newDateIssue: number | Date = employeeVisaDetails.dateOfExpire
      ? new Date(
          Number(dateParts[2]),
          Number(dateParts[1]) - 1,
          Number(dateParts[0]),
        )
      : new Date(dateOfIssue as string)

    validateDates(newDateIssue, date)

    if (isEditVisaDetails) {
      const formatDate = moment(date).format(commonFormatDate)
      const name = 'dateOfExpire'
      setEmployeeVisaDetails((prevState) => {
        return { ...prevState, ...{ [name]: formatDate } }
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
    setClearFile(element.value)
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
    setImageUrl('')
    setClearFile('')
    setInvalidImage(false)
  }
  const actionMapping = {
    added: 'added',
    updated: 'updated',
  }
  const getToastMessage = (action: string) => {
    return (
      <OToast
        toastColor="success"
        toastMessage={`Visa details ${action} successfully`}
      />
    )
  }

  const handleAddVisaDetails = async () => {
    const prepareObject = {
      ...employeeVisaDetails,
      empId: employeeId,
      dateOfIssue: moment(dateOfIssue).format(commonFormatDate),
      dateOfExpire: moment(dateOfExpire).format(commonFormatDate),
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

        await personalInfoApi.uploadVisaImage(visaId, file)
      }
      dispatch(
        dispatch(
          reduxServices.app.actions.addToast(
            getToastMessage(actionMapping.added),
          ),
        ),
      )
      backButtonHandler()
    } else if (
      reduxServices.personalInformation.addEmployeeVisa.rejected.match(
        addVisaMemberResultAction,
      ) &&
      addVisaMemberResultAction.payload === 409
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="danger"
            toastMessage="            
            This visa details is already there for the particular Time Period"
          />,
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
      if (selectedFile) {
        const formData = new FormData()
        formData.append('file', selectedFile, selectedFile.name)
        const visaId = employeeVisaDetails.id as number
        const file = formData as FormData

        await personalInfoApi.uploadVisaImage(visaId, file)
      }
      dispatch(
        reduxServices.app.actions.addToast(
          getToastMessage(actionMapping.updated),
        ),
      )
      backButtonHandler()
    } else if (
      reduxServices.personalInformation.updateEmployeeVisa.rejected.match(
        updateVisaMemberResultAction,
      ) &&
      updateVisaMemberResultAction.payload === 409
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="danger"
            toastMessage="            
            This visa details is already there for the particular Time Period"
          />,
        ),
      )
    }
  }

  const validateDates = (startDate: Date, endDate: Date) => {
    const newStartDate = startDate.setHours(0, 0, 0, 0)
    const newEndtDate = endDate.setHours(0, 0, 0, 0)
    if (newStartDate > newEndtDate) {
      setError(true)
      setIsAddButtonEnabled(false)
    } else {
      setError(false)
      setIsAddButtonEnabled(true)
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
              Country :
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
              Visa Type :{' '}
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
              Date of Issue :
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
                autoComplete="off"
                className="form-control"
                name="dateOfIssue"
                maxDate={new Date()}
                value={
                  (dateOfIssue as string) ||
                  dateFormmatted(employeeVisaDetails.dateOfIssue as string)
                }
                selected={
                  !dateOfIssueFlag && employeeVisaDetails.dateOfIssue
                    ? newDateOfIssue
                    : (dateOfIssue as Date)
                }
                onChange={onChangeDateOfIssueHandler}
                id="dateOfIssue"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/mm/yyyy"
                dateFormat={dateFormat}
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
                autoComplete="off"
                className="form-control"
                name="dateOfExpire"
                value={
                  (dateOfExpire as string) ||
                  dateFormmatted(employeeVisaDetails?.dateOfExpire as string)
                }
                selected={
                  !dateOfExpiryFlag && employeeVisaDetails?.dateOfExpire
                    ? newDateOfExpiry
                    : (dateOfExpire as Date)
                }
                onChange={onChangeDateOfExpireHandler}
                id="dateOfExpire"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/mm/yyyy"
                dateFormat={dateFormat}
              />
              {error && (
                <p className="text-danger">
                  Date of Expire should be greater than Date of Issue
                </p>
              )}
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end pe-18">
              Upload VISA copy :
            </CFormLabel>
            <CCol>
              <input
                type="file"
                className="mt-1"
                data-testid="file-upload"
                id="fileUpload"
                name="file"
                value={clearFile}
                onChange={(element: React.SyntheticEvent) =>
                  onChangeFileEventHandler(
                    element.currentTarget as HTMLInputElement,
                  )
                }
                accept="image/*,"
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
