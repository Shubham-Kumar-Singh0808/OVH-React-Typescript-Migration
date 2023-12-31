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
import DatePicker from 'react-datepicker'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import moment from 'moment'
import OToast from '../../../../components/ReusableComponent/OToast'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import {
  EmployeeCertification,
  EmployeeCertificationProps,
} from '../../../../types/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationTypes'
import { reduxServices } from '../../../../reducers/reduxServices'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import {
  reformatDate,
  dateFormatPerLocale,
} from '../../../../utils/dateFormatUtils'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'

function AddUpdateEmployeeCertification({
  isEditCertificationDetails = false,
  headerTitle,
  confirmButtonText,
  backButtonHandler,
}: EmployeeCertificationProps): JSX.Element {
  const initialCertificationDetails = {} as EmployeeCertification

  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const [addCertification, setAddCertification] = useState(
    initialCertificationDetails,
  )
  const [completedDate, setCompletedDate] = useState<Date | string>()
  const [expiryDate, setExpiryDate] = useState<Date | string>()
  const [error, setError] = useState<boolean>(false)
  const [dateFormat, setDateFormat] = useState<string>('')

  const [completedDateFlag, setCompletedDateFlag] = useState<boolean>(false)
  const [expiryDateFlag, setExpirtyDateFlag] = useState<boolean>(false)

  const [showEditor, setShowEditor] = useState<boolean>(true)

  const getTechnologies = useTypedSelector(
    reduxServices.employeeCertifications.selectors.technologies,
  )
  const getCertificateByTechnology = useTypedSelector(
    reduxServices.employeeCertifications.selectors.certificateByTechnology,
  )
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const getCertificateDetails = useTypedSelector(
    reduxServices.employeeCertifications.selectors.certificateDetails,
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

  useEffect(() => {
    dispatch(reduxServices.employeeCertifications.getEmployeeCertificates())
  }, [dispatch])

  useEffect(() => {
    dispatch(reduxServices.employeeCertifications.getTechnologies())
    if (addCertification?.technology) {
      dispatch(
        reduxServices.employeeCertifications.getCertificateByTechnologyName(
          addCertification?.technology,
        ),
      )
    }
  }, [dispatch, addCertification?.technology])

  const commonFormatDate = 'DD/MM/YYYY' //format saved in DB
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

  let newCompletedDate = new Date()
  let newExpiryDate = new Date()
  if (addCertification.completedDate) {
    const currentCompletedDate = addCertification.completedDate as string
    newCompletedDate = reformatDate(currentCompletedDate)
  }
  if (addCertification.expiryDate) {
    const currentExpiryDate = addCertification.expiryDate as string
    newExpiryDate = reformatDate(currentExpiryDate)
  }

  const successToastMessage = (
    <OToast
      toastMessage="Your changes have been saved successfully.."
      toastColor="success"
    />
  )

  useEffect(() => {
    if (isEditCertificationDetails) {
      setAddCertification(getCertificateDetails)
    }
  }, [getCertificateDetails, isEditCertificationDetails])

  useEffect(() => {
    if (getCertificateDetails?.description) {
      setShowEditor(false)
      setTimeout(() => {
        setShowEditor(true)
      }, 100)
    }
  }, [getCertificateDetails])

  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor,
      className,
    }
  }

  const onChangeDateOfCompletionHandler = (date: Date) => {
    const currentDateExpiry = isEditCertificationDetails
      ? (addCertification.expiryDate as string)
      : (expiryDate as string)

    const dateParts: string[] | string = addCertification.expiryDate
      ? currentDateExpiry.split('/')
      : ''
    const newDateExpiry = addCertification.expiryDate
      ? new Date(
          Number(dateParts[2]),
          Number(dateParts[1]) - 1,
          Number(dateParts[0]),
        )
      : new Date(expiryDate as Date)

    validateDates(date, newDateExpiry)

    if (isEditCertificationDetails) {
      const formatDate = moment(date).format(commonFormatDate)
      const name = 'completedDate'
      setAddCertification((prevState) => {
        return { ...prevState, ...{ [name]: formatDate } }
      })
    }
    setCompletedDate(date)
    setCompletedDateFlag(true)
  }

  const onChangeDateOfExpireHandler = (date: Date) => {
    const currentDateCompleted = isEditCertificationDetails
      ? (addCertification.completedDate as string)
      : (completedDate as string)

    const dateParts: string[] | string = addCertification.completedDate
      ? currentDateCompleted.split('/')
      : ''
    const newDateCompleted = addCertification.completedDate
      ? new Date(
          Number(dateParts[2]),
          Number(dateParts[1]) - 1,
          Number(dateParts[0]),
        )
      : new Date(completedDate as Date)

    validateDates(newDateCompleted, date)

    if (isEditCertificationDetails) {
      const formatDate = moment(date).format(commonFormatDate)
      const name = 'expiryDate'
      setAddCertification((prevState) => {
        return { ...prevState, ...{ [name]: formatDate } }
      })
    }
    setExpiryDate(date)
    setExpirtyDateFlag(true)
  }

  useEffect(() => {
    if (error) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastMessage="Date of Expiry should be greater"
            toastColor="danger"
          />,
        ),
      )
    }
  }, [completedDate, dispatch, error, expiryDate])

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'code') {
      const registrationNumber = value.replace(/\s/g, '')
      setAddCertification((prevState) => {
        return { ...prevState, ...{ [name]: registrationNumber } }
      })
    } else if (name === 'name') {
      const certificate = value.replace(/^\s*/, '')
      setAddCertification((prevState) => {
        return { ...prevState, ...{ [name]: certificate } }
      })
    } else if (name === 'percent') {
      let percentValue = value.replace(/[^0-9]/g, '')
      if (Number(percentValue) > 100) percentValue = '100'
      setAddCertification((prevState) => {
        return { ...prevState, ...{ [name]: percentValue } }
      })
    } else if (name === 'technology') {
      setAddCertification((values) => {
        return { ...values, ...{ [name]: value, certificateType: '' } }
      })
    } else {
      setAddCertification((values) => {
        return { ...values, ...{ [name]: value } }
      })
    }
  }

  useEffect(() => {
    if (
      addCertification.technology &&
      addCertification.certificateType &&
      addCertification.name &&
      addCertification.code &&
      (completedDate || addCertification.completedDate)
    ) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [addCertification, completedDate])

  const handleClearInputFields = () => {
    setAddCertification({
      id: 0,
      technologyId: '',
      technologyName: '',
      certificateType: '',
      technology: '',
      code: '',
      percent: '',
      name: '',
      description: '',
    })
    setCompletedDate('')
    setExpiryDate('')
    setError(false)
    setShowEditor(false)
    setTimeout(() => {
      setShowEditor(true)
    }, 100)
  }

  const handleAddCertificateDetails = async () => {
    const prepareObject = {
      ...addCertification,
      ...{
        completedDate: moment(completedDate).format(commonFormatDate),
        expiryDate: moment(expiryDate).format(commonFormatDate),
        employeeId,
      },
    }
    const addCertificateResultAction = await dispatch(
      reduxServices.employeeCertifications.createEmployeeCertification(
        prepareObject,
      ),
    )

    if (
      reduxServices.employeeCertifications.createEmployeeCertification.fulfilled.match(
        addCertificateResultAction,
      )
    ) {
      backButtonHandler()
      dispatch(reduxServices.app.actions.addToast(successToastMessage))
    }
  }

  const handleUpdateCertificationDetails = async () => {
    const prepareObject = {
      ...addCertification,
    }
    const updateCertificateResultAction = await dispatch(
      reduxServices.employeeCertifications.updateEmployeeCertificate(
        prepareObject,
      ),
    )
    if (
      reduxServices.employeeCertifications.updateEmployeeCertificate.fulfilled.match(
        updateCertificateResultAction,
      )
    ) {
      backButtonHandler()
      dispatch(reduxServices.app.actions.addToast(successToastMessage))
    }
  }

  const handleDescription = (description: string) => {
    setAddCertification((prevState) => {
      return { ...prevState, ...{ description } }
    })
  }

  const validateDates = (startDate: Date, endDate: Date) => {
    const newStartDate = startDate.setHours(0, 0, 0, 0)
    const newEndtDate = endDate.setHours(0, 0, 0, 0)
    if (newStartDate > newEndtDate) {
      setError(true)
    } else {
      setError(false)
    }
  }

  const formLabel = 'col-sm-3 col-form-label text-end'

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
            <CFormLabel
              {...{
                ...dynamicFormLabelProps('technology', formLabel),
              }}
            >
              Technology:
              <span
                className={addCertification.technology ? TextWhite : TextDanger}
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                id="technology"
                name="technology"
                value={addCertification?.technology}
                onChange={handleInputChange}
              >
                <option value={''}>Select Technology</option>
                {getTechnologies?.map((certificateItem, index) => (
                  <option key={index} value={certificateItem.name}>
                    {certificateItem.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...{
                ...dynamicFormLabelProps('certificateType', formLabel),
              }}
            >
              CertificateType:{' '}
              <span
                className={
                  addCertification.certificateType ? TextWhite : TextDanger
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                id="certificateType"
                name="certificateType"
                disabled={!addCertification.technology}
                value={addCertification?.certificateType}
                onChange={handleInputChange}
              >
                <option value={''}>Select Type of Certificate</option>
                {getCertificateByTechnology?.map(
                  (certificateTypeItem, index) => (
                    <option
                      key={index}
                      value={certificateTypeItem.certificateType}
                    >
                      {certificateTypeItem.certificateType}
                    </option>
                  ),
                )}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...{
                ...dynamicFormLabelProps('certification', formLabel),
              }}
            >
              Certification:
              <span className={addCertification.name ? TextWhite : TextDanger}>
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="text"
                id="certification"
                name="name"
                value={addCertification?.name}
                placeholder="Certification Name"
                maxLength={50}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...{
                ...dynamicFormLabelProps('registrationNumber', formLabel),
              }}
            >
              Registration No:
              <span className={addCertification.code ? TextWhite : TextDanger}>
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="text"
                id="registrationNumber"
                name="code"
                value={addCertification?.code}
                placeholder="Certification Id"
                maxLength={24}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4" data-testid="completedDateInput">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Completed Date:
              <span
                className={
                  addCertification?.completedDate || completedDate
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
                name="completedDate"
                maxDate={new Date()}
                value={
                  (completedDate as string) ||
                  dateFormmatted(addCertification?.completedDate as string)
                }
                selected={
                  !completedDateFlag && addCertification.completedDate
                    ? newCompletedDate
                    : (completedDate as Date)
                }
                onChange={onChangeDateOfCompletionHandler}
                id="completedDate"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText={dateFormat}
                dateFormat={dateFormat}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4" data-testid="expiryDateInput">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Expiry Date :
            </CFormLabel>
            <CCol sm={3}>
              <DatePicker
                className="form-control"
                name="expiryDate"
                value={
                  (expiryDate as string) ||
                  dateFormmatted(addCertification?.expiryDate as string)
                }
                selected={
                  !expiryDateFlag && addCertification.expiryDate
                    ? newExpiryDate
                    : (expiryDate as Date)
                }
                onChange={onChangeDateOfExpireHandler}
                id="expiryDate"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText={dateFormat}
                dateFormat={dateFormat}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel {...dynamicFormLabelProps('percentage', formLabel)}>
              Percentage:
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="text"
                id="percentage"
                name="percent"
                max={100}
                value={addCertification?.percent}
                placeholder="100"
                onChange={handleInputChange}
                maxLength={3}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Description:
            </CFormLabel>
            {showEditor ? (
              <CCol sm={8}>
                <CKEditor<{
                  onChange: CKEditorEventHandler<'change'>
                }>
                  initData={addCertification?.description}
                  config={ckeditorConfig}
                  debug={true}
                  onChange={({ editor }) => {
                    handleDescription(editor.getData().trim())
                  }}
                />
              </CCol>
            ) : (
              ''
            )}
          </CRow>
          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              {isEditCertificationDetails ? (
                <CButton
                  className="btn-ovh me-2"
                  color="success"
                  disabled={error}
                  onClick={handleUpdateCertificationDetails}
                >
                  {confirmButtonText}
                </CButton>
              ) : (
                <>
                  <CButton
                    className="btn-ovh me-1"
                    color="success"
                    disabled={!isButtonEnabled || error}
                    onClick={handleAddCertificateDetails}
                  >
                    {confirmButtonText}
                  </CButton>
                  <CButton
                    color="warning "
                    className="btn-ovh"
                    onClick={handleClearInputFields}
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
export default AddUpdateEmployeeCertification
