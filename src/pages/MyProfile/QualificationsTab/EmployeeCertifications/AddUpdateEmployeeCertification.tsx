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
import {
  EmployeeCertificationProps,
  EmployeeCertifications,
} from '../../../../types/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationTypes'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

import DatePicker from 'react-datepicker'
import { OTextEditor } from '../../../../components/ReusableComponent/OTextEditor'
import OToast from '../../../../components/ReusableComponent/OToast'
import { certificationThunk } from '../../../../reducers/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationSlice'
import moment from 'moment'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useFormik } from 'formik'

function AddUpdateEmployeeCertification({
  isEditCertificationDetails = false,
  headerTitle,
  confirmButtonText,
  backButtonHandler,
}: EmployeeCertificationProps): JSX.Element {
  const initialCertificationDetails = {} as EmployeeCertifications

  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const [addCertification, setAddCertification] = useState(
    initialCertificationDetails,
  )
  const [completedDate, setCompletedDate] = useState<Date | string>()
  const [expiryDate, setExpiryDate] = useState<Date | string>()
  const [error, setError] = useState<boolean>(false)

  const getTechnologies = useTypedSelector(
    (state) => state.employeeCertificates.getAllTechnologies,
  )
  const getCertificateByTechnology = useTypedSelector(
    (state) => state.employeeCertificates.typeOfCertificate,
  )
  const employeeId = useTypedSelector(
    (state) => state.authentication.authenticatedUser.employeeId,
  )
  const getCertificateDetails = useTypedSelector(
    (state) => state.employeeCertificates.editCertificateDetails,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(certificationThunk.getEmployeeCertificates())
  }, [dispatch])

  useEffect(() => {
    dispatch(certificationThunk.getTechnologies())
    if (addCertification?.technology) {
      dispatch(
        certificationThunk.getCertificateByTechnologyName(
          addCertification?.technology,
        ),
      )
    }
  }, [dispatch, addCertification?.technology])
  const successToastMessage = (
    <OToast
      toastMessage="Your changes have been saved successfully.."
      toastColor="success"
    />
  )
  const formik = useFormik({
    initialValues: { name: '', message: '' },
    onSubmit: (values) => {
      console.log('Logging in ', values)
    },
  })

  useEffect(() => {
    if (isEditCertificationDetails) {
      setAddCertification(getCertificateDetails)
    }
  }, [getCertificateDetails, isEditCertificationDetails])

  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor: htmlFor,
      className: className,
    }
  }

  const onChangeDateOfCompletionHandler = (date: Date) => {
    const currentDateExpiry = isEditCertificationDetails
      ? addCertification.expiryDate?.toString()
      : expiryDate?.toLocaleString()

    const tempDateExpiry = moment(currentDateExpiry).format('DD/MM/YYYY')
    const newDateExpiry = new Date(tempDateExpiry)

    validateDates(date, newDateExpiry)

    if (isEditCertificationDetails) {
      const formatDate = moment(date).format('DD/MM/YYYY')
      const name = 'completedDate'
      setAddCertification((prevState) => {
        return { ...prevState, ...{ [name]: formatDate } }
      })
    } else {
      setCompletedDate(date)
    }
  }

  const onChangeDateOfExpireHandler = (date: Date) => {
    const currentCompletedDate = isEditCertificationDetails
      ? getCertificateDetails?.completedDate?.toString()
      : completedDate?.toLocaleString()

    const tempDateCompleted = moment(currentCompletedDate).format('DD/MM/YYYY')
    const newDateCompleted = new Date(tempDateCompleted)

    validateDates(newDateCompleted, date)

    if (isEditCertificationDetails) {
      const formatDate = moment(date).format('DD/MM/YYYY')
      const name = 'expiryDate'
      setAddCertification((prevState) => {
        return { ...prevState, ...{ [name]: formatDate } }
      })
    } else {
      setExpiryDate(date)
    }
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

    setAddCertification((values) => {
      return { ...values, ...{ [name]: value } }
    })
  }

  useEffect(() => {
    if (
      addCertification.technology &&
      addCertification.certificateType &&
      addCertification.name?.replace(/\s+$/gi, '') &&
      addCertification.code?.replace(/\s+$/gi, '') &&
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
      percent: 0,
      name: '',
    })
    setCompletedDate('')
    setExpiryDate('')
    setError(false)
  }
  const handleAddCertificateDetails = async () => {
    if (!error) {
      const prepareObject = {
        ...addCertification,
        ...{
          completedDate: moment(completedDate).format('DD/MM/YYYY'),
          expiryDate: moment(expiryDate).format('DD/MM/YYYY'),
          employeeId: employeeId,
        },
      }
      const addCertificateResultAction = await dispatch(
        certificationThunk.addEmployeeCertification(prepareObject),
      )
      if (
        certificationThunk.addEmployeeCertification.fulfilled.match(
          addCertificateResultAction,
        )
      ) {
        backButtonHandler()
        dispatch(reduxServices.app.actions.addToast(successToastMessage))
      }
    }
  }

  const handleUpdateCertificationDetails = async () => {
    if (!error) {
      const prepareObject = {
        ...addCertification,
      }
      const updateCertificateResultAction = await dispatch(
        certificationThunk.updateEmployeeCertificate(prepareObject),
      )
      if (
        certificationThunk.updateEmployeeCertificate.fulfilled.match(
          updateCertificateResultAction,
        )
      ) {
        backButtonHandler()
        dispatch(reduxServices.app.actions.addToast(successToastMessage))
      }
    }
  }

  const validateDates = (startDate: Date, endDate: Date) => {
    if (startDate.getTime() > endDate.getTime()) {
      setError(true)
    } else {
      setError(false)
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
            <CFormLabel
              {...{
                ...dynamicFormLabelProps(
                  'technology',
                  'col-sm-3 col-form-label text-end',
                ),
              }}
            >
              Technology:
              <span
                className={
                  addCertification.technology ? 'text-white' : 'text-danger'
                }
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
                ...dynamicFormLabelProps(
                  'certificateType',
                  'col-sm-3 col-form-label text-end',
                ),
              }}
            >
              CertificateType:{' '}
              <span
                className={
                  addCertification.certificateType
                    ? 'text-white'
                    : 'text-danger'
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
                ...dynamicFormLabelProps(
                  'certification',
                  'col-sm-3 col-form-label text-end',
                ),
              }}
            >
              Certification:
              <span
                className={addCertification.name ? 'text-white' : 'text-danger'}
              >
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
                maxLength={26}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...{
                ...dynamicFormLabelProps(
                  'registrationNumber',
                  'col-sm-3 col-form-label text-end',
                ),
              }}
            >
              Registration No:
              <span
                className={addCertification.code ? 'text-white' : 'text-danger'}
              >
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
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Completed Date:
              <span
                className={
                  addCertification?.completedDate || completedDate
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
                name="completedDate"
                maxDate={new Date()}
                value={
                  (completedDate as string) ||
                  (addCertification?.completedDate as string)
                }
                selected={completedDate as Date}
                onChange={onChangeDateOfCompletionHandler}
                id="completedDate"
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
              Expiry Date :
            </CFormLabel>
            <CCol sm={3}>
              <DatePicker
                className="form-control"
                name="expiryDate"
                value={
                  (expiryDate as string) ||
                  (addCertification?.expiryDate as string)
                }
                selected={expiryDate as Date}
                onChange={onChangeDateOfExpireHandler}
                id="expiryDate"
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
              {...dynamicFormLabelProps(
                'percentage',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Percentage:
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="number"
                id="percentage"
                name="percent"
                value={addCertification?.percent}
                placeholder="100"
                onChange={handleInputChange}
                min={0}
                max={100}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Description:
            </CFormLabel>
            <CCol sm={8}>
              <OTextEditor
                setFieldValue={(val) => formik.setFieldValue('', val)}
                value={''}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              {isEditCertificationDetails ? (
                <CButton
                  className="btn-ovh me-2"
                  color="success"
                  disabled={!isButtonEnabled}
                  onClick={handleUpdateCertificationDetails}
                >
                  {confirmButtonText}
                </CButton>
              ) : (
                <>
                  <CButton
                    className="btn-ovh me-1"
                    color="success"
                    disabled={!isButtonEnabled}
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
