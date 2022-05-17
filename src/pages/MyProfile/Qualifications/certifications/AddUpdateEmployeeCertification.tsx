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
import { useFormik } from 'formik'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { OTextEditor } from '../../../../components/ReusableComponent/OTextEditor'
import OToast from '../../../../components/ReusableComponent/OToast'
import { addToast } from '../../../../reducers/appSlice'
import {
  getAllTechnology,
  getCertificateDetailsByTechnologyName,
  addEmployeeCertification,
  updateCertificateInformation,
} from '../../../../reducers/MyProfile/Qualifications/certificationSlice'
import { getAllEmployeeCertifications } from '../../../../reducers/MyProfile/Qualifications/certificationSlice'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import {
  EmployeeCertificationProps,
  EmployeeCertifications,
} from '../../../../types/MyProfile/Qualifications/certificationTypes'

function AddUpdateEmployeeCertification({
  isEditCertificationDetails = false,
  headerTitle,
  confirmButtonText,
  backButtonHandler,
}: EmployeeCertificationProps): JSX.Element {
  const initialCertificationDetails = {} as EmployeeCertifications

  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)
  const [addCertification, setAddCertification] = useState(
    initialCertificationDetails,
  )
  const [completedDate, setCompletedDate] = useState<Date | string>()
  const [expiryDate, setExpiryDate] = useState<Date | string>()
  const [error, setError] = useState<Date | null>(null)

  const getTechnologies = useTypedSelector(
    (state) => state.employeeCertificates.getAllTechnologies,
  )
  const getCertificateByTechnology = useTypedSelector(
    (state) => state.employeeCertificates.typeOfCertificate,
  )
  const employeeId = useTypedSelector(
    (state) => state.authentication.authenticatedUser.employeeId,
  )
  const fetchCertificateDetails = useTypedSelector(
    (state) => state.employeeCertificates.certificationDetails,
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getAllEmployeeCertifications())
  }, [dispatch])
  useEffect(() => {
    dispatch(getAllTechnology())
    if (addCertification?.technology) {
      dispatch(
        getCertificateDetailsByTechnologyName(addCertification?.technology),
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

  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor: htmlFor,
      className: className,
    }
  }
  const onChangeDateOfCompletionHandler = (date: Date) => {
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
    if (isEditCertificationDetails) {
      const formatDate = moment(date).format('DD/MM/YYYY')
      const name = 'expiryDate'
      setAddCertification((prevState) => {
        return { ...prevState, ...{ [name]: formatDate } }
      })
    } else {
      setExpiryDate(date)
    }
    setError(date)
  }
  const warningToastMessage = (
    <OToast
      toastMessage="Date of Expiry should be greater"
      toastColor="warning"
    />
  )

  if ((completedDate as string) <= (expiryDate as string)) {
    dispatch(addToast(warningToastMessage))
  }
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
      addCertification.name &&
      addCertification.code &&
      completedDate
    ) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [addCertification, completedDate])

  const handleClearInputFields = () => {
    setAddCertification({
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
  }
  const handleAddCertificateDetails = async () => {
    const prepareObject = {
      ...addCertification,
      ...{
        completedDate: moment(completedDate).format('DD/MM/YYYY'),
        expiryDate: moment(expiryDate).format('DD/MM/YYYY'),
        employeeId: employeeId,
      },
    }
    const addCertificateResultAction = await dispatch(
      addEmployeeCertification(prepareObject),
    )
    if (addEmployeeCertification.fulfilled.match(addCertificateResultAction)) {
      backButtonHandler()
      dispatch(addToast(successToastMessage))
    }
  }

  const handleUpdateCertificationDetails = async () => {
    const prepareObject = {
      ...addCertification,
      ...{
        completedDate: moment(completedDate).format('DD/MM/YYYY'),
        expiryDate: moment(expiryDate).format('DD/MM/YYYY'),
        employeeId: employeeId,
      },
    }
    const updateCertificateResultAction = await dispatch(
      updateCertificateInformation(prepareObject),
    )
    if (
      updateCertificateInformation.fulfilled.match(
        updateCertificateResultAction,
      )
    ) {
      backButtonHandler()
      dispatch(addToast(successToastMessage))
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
                value={addCertification.technology}
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
                value={addCertification.certificateType}
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
                value={addCertification.name}
                placeholder="Certification Name"
                maxLength={32}
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
                value={addCertification.code}
                placeholder="Certification Id"
                maxLength={32}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Completed Date:
              <span className={completedDate ? 'text-white' : 'text-danger'}>
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <DatePicker
                className="form-control"
                name="completedDate"
                maxDate={new Date()}
                value={completedDate as string}
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
                value={(expiryDate as string) || (expiryDate as string)}
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
                value={addCertification.percent}
                placeholder="100"
                onChange={handleInputChange}
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
                  onClick={handleUpdateCertificationDetails}
                >
                  {confirmButtonText}
                </CButton>
              ) : (
                <>
                  <CButton
                    className="btn-ovh me-1"
                    color="success"
                    disabled={!isAddButtonEnabled}
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
